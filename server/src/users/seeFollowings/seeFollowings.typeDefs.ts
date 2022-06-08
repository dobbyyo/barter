import { gql } from "apollo-server-core";

export default gql`
  type SeeFollowingsResult {
    success: Boolean!
    error: String
    followings: [User]
    totalPages: Int
  }
  type Query {
    seeFollowings(username: String!, page: Int!): SeeFollowingsResult
  }
`;
