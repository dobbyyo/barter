import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Query: {
    allPosts: async (_, { page }, { client }) => {
      try {
        const posts = client.post.findMany({
          orderBy: {
            createdAt: "desc",
          },
          take: 5,
          skip: (page - 1) * 5,
        });
        const total = await client.post.count({});
        return {
          success: true,
          post: posts,
          totalPages: Math.ceil(total / 5),
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
