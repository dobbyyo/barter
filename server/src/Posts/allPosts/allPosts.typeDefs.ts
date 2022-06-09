import { gql } from "apollo-server-core";

export default gql`
  type allPostsResult {
    success: Boolean!
    error: String
    post: [Post]
    totalPages: Int
  }
  type Query {
    allPosts(page: Int!): allPostsResult!
  }
`;
