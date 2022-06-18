import { gql } from "apollo-server-core";

export default gql`
  type editCommentResult {
    success: Boolean!
    error: String
    id: Int
  }
  type Mutation {
    editComment(id: Int!, payload: String!): editCommentResult!
  }
`;
