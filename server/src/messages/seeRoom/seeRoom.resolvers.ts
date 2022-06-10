import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Query: {
    seeRoom: async (_, { id }, { loggedInUser, client }) => {
      try {
        if (!loggedInUser) {
          return {
            success: false,
            error: "로그인이 필요합니다.",
          };
        }
        const isRoom = await client.room.findFirst({
          where: {
            id,
            users: {
              some: {
                id: loggedInUser.id,
              },
            },
          },
        });
        if (!isRoom) {
          return {
            success: false,
            error: "방이 없습니다.",
          };
        }
        return {
          success: true,
          room: isRoom,
        };
      } catch (err) {
        console.log(err);
        return {
          success: false,
          error: "실패했습니다.",
        };
      }
    },
  },
};

export default resolvers;
