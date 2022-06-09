import { gql } from "apollo-server-express";

export default gql`
  type Post {
    id: Int!
    user: User!
    file: String!
    title: String!
    caption: String
    likes: Int!
    hashtag: [Hashtag]
    isMine: Boolean!
    comments: Int!
    createdAt: String!
    updatedAt: String!
  }
  type Hashtag {
    id: Int!
    hashtag: String!
    posts(page: Int!): [Post]
    totalPosts: Int!
    createdAt: String!
    updatedAt: String!
  }
  type Like {
    id: Int!
    post: Post!
    createdAt: String!
    updatedAt: String!
  }
`;
