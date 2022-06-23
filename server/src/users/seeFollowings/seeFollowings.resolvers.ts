import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Query: {
    seeFollowings: async (_, { username, lastId }, { client }) => {
      try {
        const isUser = await client.user.findUnique({
          where: { username },
          select: { id: true },
        });
        if (!isUser) {
          return {
            success: false,
            error: "유저가 존재하지 않습니다.",
          };
        }
        const followings = await client.user
          .findUnique({ where: { username } })
          .followings({
            take: 10,
            skip: lastId === undefined ? 0 : 1,
            ...(lastId && { cursor: { id: lastId } }),
          });
        const totalFollowings = await client.user.count({
          where: { followings: { some: { username } } },
        });
        return {
          success: true,
          followings,
          totalPages: Math.ceil(totalFollowings / 10),
        };
      } catch (err) {
        return {
          success: false,
          error: "실패했습니다.",
        };
      }
    },
  },
};

export default resolvers;
