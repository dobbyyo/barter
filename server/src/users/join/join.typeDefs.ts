import { gql } from "apollo-server";

export default gql`
  type Mutation {
    join(
      name: String!
      username: String!
      email: String!
      password: String!
    ): MutationResult!
  }
`;
