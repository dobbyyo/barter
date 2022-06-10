import { gql } from "apollo-server-core";

export default gql`
  type seeRoomResult {
    success: Boolean!
    error: String
    room: Room
  }
  type Query {
    seeRoom(id: Int!): seeRoomResult!
  }
`;
