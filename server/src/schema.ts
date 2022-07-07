import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeResolvers, mergeTypeDefs } from "@graphql-tools/merge";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { GraphQLSchema } from "graphql";

const loadedTypes = loadFilesSync(`${__dirname}/**/*.typeDefs.{js,ts}`);
const loadedResolvers = loadFilesSync(`${__dirname}/**/*.resolvers.{js,ts}`);

export const typeDefs = mergeTypeDefs(loadedTypes);
export const resolvers: any = mergeResolvers(loadedResolvers);

const schema: GraphQLSchema = makeExecutableSchema({ typeDefs, resolvers });

export default schema;
