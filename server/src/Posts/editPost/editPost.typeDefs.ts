import { gql } from "apollo-server-core";

export default gql`
  scalar Upload

  type Mutation {
    editPost(
      id: Int!
      title: String!
      caption: String!
      category: String!
      file: Upload
    ): MutationResult!
  }
`;
