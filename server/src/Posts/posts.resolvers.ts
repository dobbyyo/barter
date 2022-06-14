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
    commentNumber: ({ id }) => client.comment.count({ where: { postId: id } }),
    comments: ({ id }) =>
      client.comment.findMany({
        where: { postId: id },
        include: {
          user: true,
        },
      }),
    isMine: ({ userId }, _: null, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      return userId === loggedInUser.id;
    },
    isLiked: async ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      const ok = await client.like.findUnique({
        where: {
          postId_userId: {
            postId: id,
            userId: loggedInUser.id,
          },
        },
        select: {
          id: true,
        },
      });
      if (ok) {
        return true;
      }
      return false;
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
