import { gql } from "apollo-server-core";

export default gql`
  type DeleteResult {
    success: Boolean!
    error: String
  }
  type Mutation {
    deleteUser(email: String!, password: String!): DeleteResult!
  }
`;
