import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Query: {
    seeFollowings: async (_, { username, page }, { client }) => {
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
            take: 5,
            skip: (page - 1) * 5,
          });
        const totalFollowings = await client.user.count({
          where: { followings: { some: { username } } },
        });
        return {
          success: true,
          followings,
          totalPages: Math.ceil(totalFollowings / 5),
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
