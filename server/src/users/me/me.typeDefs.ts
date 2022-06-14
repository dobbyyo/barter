import { gql } from "apollo-server-core";

export default gql`
  type MeResult {
    success: Boolean!
    error: String
    user: User
  }
  type Query {
    me: MeResult!
  }
`;
