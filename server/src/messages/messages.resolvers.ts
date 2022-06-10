import client from "../client";

export default {
  Room: {
    users: ({ id }) =>
      client.room
        .findUnique({
          where: { id },
        })
        .users(),
    message: ({ id }) =>
      client.message.findMany({
        where: {
          roomId: id,
        },
      }),
    unreadTotal: ({ id }, _: null, { loggedInUser }) => {
      if (!loggedInUser) {
        return 0;
      }
      return client.message.count({
        where: {
          read: false,
          roomId: id,
          user: {
            id: {
              not: loggedInUser.id,
            },
          },
        },
      });
    },
  },
  Message: {
    user: ({ id }) => client.message.findUnique({ where: { id } }).user(),
  },
};
