import gql from 'graphql-tag';

export const ME_QUERY = gql`
  query me {
    me {
      success
      error
      user {
        id
        name
        username
        email
        bio
        avatar
      }
    }
  }
`;

export const allPosts = gql`
  query allPosts($page: Int!) {
    allPosts(page: $page) {
      success
      error
      totalPages
      post {
        id
        file
        title
        caption
        category
        likes
        isMine
        isLiked
        updatedAt
        createdAt
        commentNumber
        user {
          id
          name
          username
          email
          avatar
        }
      }
    }
  }
`;

export const seePost = gql`
  query seePost($id: Int!) {
    seePost(id: $id) {
      success
      error
      post {
        id
        file
        title
        caption
        category
        likes
        isMine
        isLiked
        updatedAt
        createdAt
        commentNumber
        hashtag {
          id
          hashtag
        }
        user {
          id
          name
          username
          email
          avatar
        }
      }
    }
  }
`;
