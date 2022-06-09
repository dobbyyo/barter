import { gql } from "apollo-server-core";

export default gql`
  type createCommentResult {
    success: Boolean!
    error: String
  }
  type Mutation {
    createComment(postId: Int!, payload: String!): createCommentResult!
  }
`;
