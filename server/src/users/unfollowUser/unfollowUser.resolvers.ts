import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Mutation: {
    unfollowUser: async (_, { username }, { loggedInUser, client }) => {
      try {
        const User = await client.user.findUnique({
          where: { username },
        });
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
              disconnect: {
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
          error: "실패했습니다.",
        };
      }
    },
  },
};

export default resolvers;
