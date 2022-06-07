import { gql } from "apollo-server";

export default gql`
  type seeProfileResult {
    success: Boolean!
    error: String
    user: User
  }
  type Query {
    seeProfile(username: String!): seeProfileResult!
  }
`;
