import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Query: {
    seeRooms: async (_, __, { loggedInUser, client }) => {
      try {
        if (!loggedInUser) {
          return {
            success: false,
            error: "로그인이 필요합니다.",
          };
        }
        const rooms = client.room.findMany({
          where: {
            users: {
              some: {
                id: loggedInUser.id,
              },
            },
          },
        });
        return {
          success: true,
          room: rooms,
        };
      } catch (err) {
        return {
          success: false,
          error: "실패했습니다",
        };
      }
    },
  },
};

export default resolvers;
