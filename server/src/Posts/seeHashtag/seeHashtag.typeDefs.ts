import { gql } from "apollo-server";

export default gql`
  type seeHashtagResult {
    success: Boolean!
    error: String
    posts: [Post]
    totalPages: Int
  }
  type Query {
    seeHashtag(keyword: String!, page: Int!): seeHashtagResult!
  }
`;
