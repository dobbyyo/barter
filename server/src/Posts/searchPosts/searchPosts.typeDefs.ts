import { gql } from "apollo-server-core";

export default gql`
  type searchPostsResult {
    success: Boolean!
    error: String
    posts: [Post]
    totalPages: Int
  }
  type Query {
    searchPosts(keyword: String!, page: Int!): searchPostsResult!
  }
`;
