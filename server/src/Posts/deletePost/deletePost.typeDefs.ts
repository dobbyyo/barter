import { gql } from "apollo-server-core";

export default gql`
  type deleteResult {
    success: Boolean!
    error: String
    id: Int
  }
  type Mutation {
    deletePost(id: Int!): deleteResult!
  }
`;
