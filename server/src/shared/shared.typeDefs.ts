import { gql } from "apollo-server-core";

export default gql`
  type MutationResult {
    success: Boolean!
    error: String
  }
`;
