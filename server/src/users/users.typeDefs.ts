import { gql } from "apollo-server";

export default gql`
  type User {
    id: Int!
    name: String!
    username: String!
    email: String!
    createdAt: String!
    updatedAt: String!
    bio: String
    avatar: String
    followings: [User]
    followers: [User]
    totalFollowings: Int!
    totalFollowers: Int!
    isMe: Boolean!
    isFollowing: Boolean!
  }
`;
