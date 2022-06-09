import { gql } from "apollo-server-express";

export default gql`
  type seePostResult {
    success: Boolean!
    error: String
    post: Post
  }
  type Query {
    seePost(id: Int!): seePostResult!
  }
`;
