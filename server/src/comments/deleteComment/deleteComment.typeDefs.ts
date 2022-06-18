import { gql } from "apollo-server-core";

export default gql`
  type DeleteCommentResult {
    success: Boolean!
    error: String
    id: Int
  }
  type Mutation {
    deleteComment(id: Int!): DeleteCommentResult!
  }
`;
