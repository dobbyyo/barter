require("dotenv").config();
import express, { Express } from "express";
import morgan from "morgan";
import { ApolloServer, ExpressContext } from "apollo-server-express";
import { graphqlUploadExpress } from "graphql-upload";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import {
  ConnectionContext,
  SubscriptionServer,
} from "subscriptions-transport-ws";
import { execute, subscribe } from "graphql";
import { createServer, Server } from "http";

import { getUser } from "./users/users.utils";
import schema from "./schema";
import client from "./client";

// const PORT = process.env.PORT;

const startServer = async () => {
  const app: Express = express();
  app.use(graphqlUploadExpress());
  app.use(morgan("tiny"));
  app.use("/static", express.static("uploads"));

  const httpServer: Server = createServer(app);

  const subscriptionServer: SubscriptionServer = SubscriptionServer.create(
    {
      schema,
      execute,
      subscribe,
      async onConnect(
        { Token }: any,
        webSocket: any,
        context: ConnectionContext
      ) {
        console.log(context.request.headers.Token);
        console.log(Token);

        if (Token === undefined) {
          throw new Error("권한이 없습니다.");
        }
        const isUser = await getUser(Token);
        return { loggedInUser: isUser };
      },
      onDisconnect(webSocket: any, context: ConnectionContext) {},
    },
    {
      server: httpServer,
      path: "/graphql",
    }
  );

  const apolloServer: any = new ApolloServer({
    schema,
    context: async ({ req }) => {
      return {
        loggedInUser: await getUser(req.headers.token),
        client,
      };
    },
    introspection: true,
    plugins: [
      ApolloServerPluginLandingPageGraphQLPlayground,
      {
        async serverWillStart() {
          return {
            async drainServer() {
              subscriptionServer.close();
            },
          };
        },
      },
    ],
  });
  await apolloServer.start();

  apolloServer.applyMiddleware({ app });
  httpServer.listen(process.env.PORT, () =>
    console.log(
      `🚀 Server: http://localhost:${process.env.PORT}${apolloServer.graphqlPath}`
    )
  );
};
startServer();
