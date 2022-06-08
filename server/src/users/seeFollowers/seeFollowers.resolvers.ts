import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Query: {
    seeFollowers: async (_, { username, page }, { client }) => {
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
        const followers = await client.user
          .findUnique({ where: { username } })
          .followers({
            take: 5,
            skip: (page - 1) * 5,
          });
        const totalFollowers = await client.user.count({
          where: { followers: { some: { username } } },
        });
        return {
          success: true,
          followers,
          totalPages: Math.ceil(totalFollowers / 5),
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
