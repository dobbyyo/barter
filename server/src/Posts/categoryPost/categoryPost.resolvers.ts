import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Query: {
    categoryPost: async (_, { category, page }, { client }) => {
      try {
        const isPost = await client.post.findMany({
          where: {
            OR: [
              {
                category: {
                  contains: category,
                },
              },
            ],
          },
          take: 8,
          skip: (page - 1) * 8,
        });
        if (!isPost) {
          return {
            success: false,
            error: "포스터가 없습니다.",
          };
        }
        const totalPages = await client.post.count({
          where: {
            OR: [
              {
                category: {
                  contains: category,
                },
              },
            ],
          },
        });
        return {
          success: true,
          posts: isPost,
          totalPages: Math.ceil(totalPages / 8),
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
