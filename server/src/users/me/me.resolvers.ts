import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Query: {
    me: async (_, __, { client, loggedInUser }) => {
      try {
        if (!loggedInUser) {
          return {
            success: false,
            error: "로그인이 필요합니다.",
          };
        }
        const user = client.user.findUnique({
          where: {
            id: loggedInUser.id,
          },
        });
        return {
          success: true,
          user,
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
