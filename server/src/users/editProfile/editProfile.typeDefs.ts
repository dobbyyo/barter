import { gql } from "apollo-server";

export default gql`
  type EditResult {
    success: Boolean!
    error: String
  }

  type Mutation {
    editProfile(
      name: String
      username: String
      email: String
      password: String
      bio: String
    ): EditResult!
  }
`;
