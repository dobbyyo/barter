import gql from 'graphql-tag';

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
    }
  }
`;

export const editPost = gql`
  mutation editPost($id: Int!, $title: String!, $caption: String!, $file: Upload, $category: String!) {
    editPost(id: $id, title: $title, caption: $caption, file: $file, category: $category) {
      success
      error
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
