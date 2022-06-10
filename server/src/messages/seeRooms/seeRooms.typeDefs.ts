import { gql } from "apollo-server-core";

export default gql`
  type seeRoomsResult {
    success: Boolean!
    error: String
    room: [Room]
  }
  type Query {
    seeRooms: seeRoomsResult!
  }
`;
