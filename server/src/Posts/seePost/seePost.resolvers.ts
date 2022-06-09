import { Resolvers } from "../../types";

const resolver: Resolvers = {
  Query: {
    seePost: async (_, { id }, { client }) => {
      try {
        const isPost = await client.post.findUnique({
          where: { id },
        });
        if (!isPost) {
          return {
            success: false,
            error: "포스터가 없습니다.",
          };
        }
        return {
          success: true,
          post: isPost,
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

export default resolver;
