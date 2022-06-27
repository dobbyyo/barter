import gql from 'graphql-tag';

// 유저
export const join = gql`
  mutation join($name: String!, $username: String!, $email: String!, $password: String!) {
    join(name: $name, username: $username, email: $email, password: $password) {
      success
      error
    }
  }
`;

export const login = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      success
      error
    }
  }
`;

export const deleteUser = gql`
  mutation deleteUser($email: String!, $password: String!) {
    deleteUser(email: $email, password: $password) {
      success
      error
    }
  }
`;

export const editProfile = gql`
  mutation editProfile(
    $name: String
    $username: String
    $email: String
    $password: String
    $bio: String
    $avatar: Upload
  ) {
    editProfile(name: $name, username: $username, email: $email, password: $password, bio: $bio, avatar: $avatar) {
      success
      error
    }
  }
`;

export const followUser = gql`
  mutation followUser($username: String!) {
    followUser(username: $username) {
      success
      error
    }
  }
`;

export const unfollowUser = gql`
  mutation unfollowUser($username: String!) {
    unfollowUser(username: $username) {
      success
      error
    }
  }
`;

// 댓글
export const createComment = gql`
  mutation createComment($postId: Int!, $payload: String!) {
    createComment(postId: $postId, payload: $payload) {
      id
      success
      error
    }
  }
`;

export const editComment = gql`
  mutation editComment($id: Int!, $payload: String!) {
    editComment(id: $id, payload: $payload) {
      id
      success
      error
    }
  }
`;

export const deleteComment = gql`
  mutation deleteComment($id: Int!) {
    deleteComment(id: $id) {
      id
      success
      error
    }
  }
`;

// 포스터

export const uploadPost = gql`
  mutation uploadPost($file: Upload!, $title: String!, $caption: String, $category: String!) {
    uploadPost(file: $file, title: $title, caption: $caption, category: $category) {
      success
      error
      Post {
        id
        file
        title
        caption
        category
        isMine
        user {
          id
          username
          email
          avatar
        }
        hashtag {
          id
          hashtag
        }
      }
    }
  }
`;

export const deletePost = gql`
  mutation deletePost($id: Int!) {
    deletePost(id: $id) {
      success
      error
      id
    }
  }
`;

export const editPost = gql`
  mutation editPost($id: Int!, $title: String!, $caption: String!, $file: Upload, $category: String!) {
    editPost(id: $id, title: $title, caption: $caption, file: $file, category: $category) {
      success
      error
      id
    }
  }
`;

export const toggleLike = gql`
  mutation toggleLike($id: Int!) {
    toggleLike(id: $id) {
      success
      error
    }
  }
`;

// 메시지
export const sendMessage = gql`
  mutation sendMessage($payload: String!, $roomId: Int, $userId: Int) {
    sendMessage(payload: $payload, roomId: $roomId, userId: $userId) {
      success
      error
      id
    }
  }
`;

export const readMessage = gql`
  mutation readMessage($id: Int!) {
    readMessage(id: $id) {
      success
      error
    }
  }
`;
