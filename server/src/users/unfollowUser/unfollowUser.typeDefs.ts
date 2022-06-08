import { gql } from "apollo-server-core";

export default gql`
  type UnfollowResult {
    success: Boolean!
    error: String
  }
  type Mutation {
    unfollowUser(username: String!): UnfollowResult!
  }
`;
