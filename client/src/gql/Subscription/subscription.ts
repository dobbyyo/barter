import gql from 'graphql-tag';

const roomUpdates = gql`
  subscription roomUpdates($id: Int!) {
    roomUpdates(id: $id) {
      id
      payload
      read
      user {
        username
        avatar
      }
    }
  }
`;

export default roomUpdates;
