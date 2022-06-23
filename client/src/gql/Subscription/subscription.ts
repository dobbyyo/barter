import gql from 'graphql-tag';

const roomUpdates = gql`
  subscription roomUpdates($id: Int!) {
    roomUpdates(id: $id) {
      id
      payload
      read
      createdAt
      updatedAt
      user {
        id
        name
        username
        email
        bio
        avatar
      }
      room {
        id
        unreadTotal
        users {
          id
          name
          username
          email
          bio
          avatar
        }
      }
    }
  }
`;

export default roomUpdates;
