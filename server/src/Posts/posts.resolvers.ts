import client from "../client";

export default {
  Post: {
    user: ({ userId }) => client.user.findUnique({ where: { id: userId } }),
    hashtag: ({ id }) =>
      client.hashtag.findMany({
        where: {
          posts: {
            some: {
              id,
            },
          },
        },
      }),
    likes: ({ id }) => client.like.count({ where: { postId: id } }),
    comments: ({ id }) => client.comment.count({ where: { postId: id } }),
    isMine: ({ userId }, _: null, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      return userId === loggedInUser.id;
    },
  },
  Hashtag: {
    posts: ({ id }, { page }, { loggedInUser }) => {
      return client.hashtag
        .findUnique({
          where: {
            id,
          },
        })
        .posts();
    },
    totalPosts: ({ id }) =>
      client.post.count({
        where: {
          hashtags: {
            some: {
              id,
            },
          },
        },
      }),
  },
};
