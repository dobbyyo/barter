import { gql } from "apollo-server-core";

export default gql`
  type seeFeedResult {
    success: Boolean!
    error: String
    post: [Post]
    totalPages: Int
  }
  type Query {
    seeFeed(page: Int!): seeFeedResult!
  }
`;
