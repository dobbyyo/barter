import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Mutation: {
    followUser: async (_, { username }, { loggedInUser, client }) => {
      try {
        if (!loggedInUser) {
          return {
            success: false,
            error: "로그인이 필요합니다.",
          };
        }
        const User = await client.user.findUnique({ where: { username } });
        if (!User) {
          return {
            success: false,
            error: "존재하지 않는 유저입니다.",
          };
        }
        await client.user.update({
          where: {
            id: loggedInUser.id,
          },
          data: {
            followings: {
              connect: {
                username,
              },
            },
          },
        });
        return {
          success: true,
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
