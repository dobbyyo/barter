import { gql } from "apollo-server";

export default gql`
  type JoinResult {
    success: Boolean!
    error: String
  }
  type Mutation {
    join(
      name: String!
      username: String!
      email: String!
      password: String!
    ): JoinResult!
  }
`;
