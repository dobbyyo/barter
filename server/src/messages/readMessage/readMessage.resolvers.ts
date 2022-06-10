import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Mutation: {
    readMessage: async (_, { id }, { loggedInUser, client }) => {
      try {
        const message = await client.message.findFirst({
          where: {
            id,
            userId: {
              not: loggedInUser.id,
            },
            room: {
              users: {
                some: {
                  id: loggedInUser.id,
                },
              },
            },
          },
          select: {
            id: true,
          },
        });
        if (!message) {
          return {
            success: false,
            error: "메세지가 없습니다.",
          };
        }
        await client.message.update({
          where: {
            id,
          },
          data: {
            read: true,
          },
        });
        return {
          success: true,
        };
      } catch (err) {
        return {
          success: false,
          error: "메세지가 없습니다.",
        };
      }
    },
  },
};

export default resolvers;
