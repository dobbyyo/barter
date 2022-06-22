import { gql } from "apollo-server-core";

export default gql`
  type categoryPostResult {
    success: Boolean!
    error: String
    posts: [Post]
    totalPages: Int
  }
  type Query {
    categoryPost(category: String!, page: Int!): categoryPostResult!
  }
`;
