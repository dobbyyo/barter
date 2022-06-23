import { gql } from "apollo-server-core";

export default gql`
  type SeeFollowersResult {
    success: Boolean!
    error: String
    followers: [User]
    totalPages: Int
  }
  type Query {
    seeFollowers(username: String!, lastId: Int): SeeFollowersResult!
  }
`;
