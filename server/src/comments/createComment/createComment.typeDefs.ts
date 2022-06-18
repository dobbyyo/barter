import { gql } from "apollo-server-core";

export default gql`
  type createCommentResult {
    success: Boolean!
    error: String
    id: Int
  }
  type Mutation {
    createComment(postId: Int!, payload: String!): createCommentResult!
  }
`;
