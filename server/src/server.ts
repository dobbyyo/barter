require("dotenv").config();
import { ApolloServer } from "apollo-server";
import { getUser } from "./users/users.utils";
import { typeDefs, resolvers } from "./schema";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import client from "./client";

const PORT = process.env.PORT;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    return {
      loggedInUser: await getUser(req.headers.token),
      client,
    };
  },
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

server
  .listen(PORT)
  .then(() => console.log("Server is running on http://localhost:4000/"));
