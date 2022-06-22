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
        totalFollowers
        totalFollowings
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
          bio
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
        comments {
          id
          payload
          isMine
          createdAt
          user {
            id
            name
            username
            email
            bio
            avatar
          }
        }
        hashtag {
          id
          hashtag
        }
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
  }
`;

export const seeProfile = gql`
  query seeProfile($username: String!) {
    seeProfile(username: $username) {
      success
      error
      user {
        id
        name
        username
        email
        bio
        avatar
        totalFollowings
        totalFollowers
        isMe
        isFollowing
        posts {
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
            bio
            avatar
          }
        }
      }
    }
  }
`;

export const categoryPost = gql`
  query categoryPost($category: String!, $page: Int!) {
    categoryPost(category: $category, page: $page) {
      success
      error
      totalPages
      posts {
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
          bio
          avatar
        }
      }
    }
  }
`;
