import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Query: {
    randomPosts: async (_, __, { client }) => {
      try {
        const posts = client.post.findMany({
          take: 10,
        });
        return {
          success: true,
          post: posts,
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
