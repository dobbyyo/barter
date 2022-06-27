import { gql } from "apollo-server-core";

export default gql`
  type sendMessageResult {
    success: Boolean!
    error: String
    id: Int
  }
  type Mutation {
    sendMessage(payload: String!, roomId: Int, userId: Int): sendMessageResult!
  }
`;
