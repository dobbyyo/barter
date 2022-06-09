import { Context, Resolvers } from "../../types";

const resolvers: Resolvers = {
  Query: {
    seeProfile: async (_, { username }, { client }) => {
      try {
        const user = await client.user.findUnique({
          where: { username },
        });
        if (!user) {
          return {
            success: false,
            error: "존재하지 않는 유저입니다.",
          };
        }
        return {
          success: true,
          user,
          include: {
            followings: true,
            followers: true,
          },
        };
      } catch (err) {
        return {
          success: false,
          error: "존재하지 않습니다.",
        };
      }
    },
  },
};

export default resolvers;
