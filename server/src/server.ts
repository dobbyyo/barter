require("dotenv").config();
import { ApolloServer } from "apollo-server-express";
import { graphqlUploadExpress } from "graphql-upload";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import express, { Express } from "express";
import morgan from "morgan";

import { getUser } from "./users/users.utils";
import { typeDefs, resolvers } from "./schema";
import client from "./client";
import pubsub from "./pubsub";

const PORT = process.env.PORT;

const startServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    // csrfPrevention: true,
    context: async ({ req }) => {
      return {
        loggedInUser: await getUser(req.headers.token),
        client,
      };
    },
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  });
  await server.start();
  const app: Express = express();
  app.use(morgan("tiny"));

  app.use("/static", express.static("uploads"));
  app.use(graphqlUploadExpress());

  server.applyMiddleware({ app });

  await new Promise<void>((r) => app.listen({ port: PORT }, r));

  console.log(`🚀 Server: http://localhost:${PORT}${server.graphqlPath}`);
};
startServer();
