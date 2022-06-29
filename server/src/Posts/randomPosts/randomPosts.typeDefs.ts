import { gql } from "apollo-server-core";

export default gql`
  type randomSuccess {
    success: Boolean!
    error: String
    post: [Post]
  }
  type Query {
    randomPosts: randomSuccess
  }
`;
