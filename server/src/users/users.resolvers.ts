import client from "../client";

export default {
  User: {
    totalFollowings: ({ id }) =>
      client.user.count({
        where: {
          followers: {
            some: {
              id,
            },
          },
        },
      }),
    totalFollowers: ({ id }) =>
      client.user.count({
        where: {
          followings: {
            some: { id },
          },
        },
      }),

    isMe: ({ id }, _, { loggedInUser }) => {
      return id === loggedInUser?.id;
    },

    isFollowing: async ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      const exists = await client.user.count({
        where: {
          username: loggedInUser.username,
          followings: {
            some: {
              id,
            },
          },
        },
      });
      return Boolean(exists);
    },
    posts: ({ id }) => client.user.findUnique({ where: { id } }).posts(),
  },
};
