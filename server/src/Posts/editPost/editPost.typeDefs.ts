import { gql } from "apollo-server-core";

export default gql`
  scalar Upload
  type editResult {
    success: Boolean!
    error: String
    id: Int
  }
  type Mutation {
    editPost(
      id: Int!
      title: String!
      caption: String!
      category: String!
      file: Upload
    ): editResult!
  }
`;
