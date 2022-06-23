import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Query: {
    searchUsers: async (_, { keyword }, { client }) => {
      try {
        const isUser = await client.user.findMany({
          where: {
            username: {
              startsWith: keyword.toLowerCase(),
            },
          },
        });
        if (!isUser) {
          return {
            success: false,
            error: "유저를 찾을 수 없습니다.",
          };
        }
        return {
          success: true,
          user: isUser,
        };
      } catch {
        return {
          success: false,
          error: "실패했습니다.",
        };
      }
    },
  },
};
export default resolvers;
