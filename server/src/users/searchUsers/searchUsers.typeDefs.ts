import { gql } from "apollo-server-core";

export default gql`
  type searchResult {
    success: Boolean!
    error: String
    user: [User]
  }
  type Query {
    searchUsers(keyword: String!): searchResult!
  }
`;
