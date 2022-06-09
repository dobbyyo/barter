import { gql } from "apollo-server-core";

export default gql`
  type seeLikesResult {
    success: Boolean!
    error: String
    user: [User]
  }
  type Query {
    seeLikes(id: Int!): seeLikesResult!
  }
`;
