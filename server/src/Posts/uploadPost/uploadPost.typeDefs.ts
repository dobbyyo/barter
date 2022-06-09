import { gql } from "apollo-server-core";

export default gql`
  scalar Upload

  type uploadResult {
    success: Boolean!
    error: String
    Post: Post
  }
  type Mutation {
    uploadPost(file: Upload!, title: String!, caption: String): uploadResult!
  }
`;
