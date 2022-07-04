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

export const seeFeed = gql`
  query seeFeed($page: Int!) {
    seeFeed(page: $page) {
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

export const randomPosts = gql`
  query randomPosts {
    randomPosts {
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
        totalPosts
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

export const seeHashtag = gql`
  query seeHashtag($keyword: String!, $page: Int!) {
    seeHashtag(keyword: $keyword, page: $page) {
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

export const searchPosts = gql`
  query searchPosts($keyword: String!, $page: Int!) {
    searchPosts(keyword: $keyword, page: $page) {
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

export const searchUsers = gql`
  query searchUsers($keyword: String!) {
    searchUsers(keyword: $keyword) {
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

export const seeFollowings = gql`
  query seeFollowings($username: String!, $lastId: Int) {
    seeFollowings(username: $username, lastId: $lastId) {
      success
      error
      totalPages
      followings {
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
      }
    }
  }
`;

export const seeFollowers = gql`
  query seeFollowers($username: String!, $lastId: Int) {
    seeFollowers(username: $username, lastId: $lastId) {
      success
      error
      totalPages
      followers {
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
      }
    }
  }
`;

export const seeRooms = gql`
  query seeRooms {
    seeRooms {
      success
      error
      room {
        id
        unreadTotal
        createdAt
        updatedAt
        users {
          id
          name
          username
          email
          bio
          avatar
        }
        message {
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
        }
      }
    }
  }
`;

export const seeRoom = gql`
  query seeRoom($id: Int!) {
    seeRoom(id: $id) {
      success
      error
      room {
        id
        message {
          id
          payload
          read
          user {
            username
            email
            avatar
          }
        }
      }
    }
  }
`;
