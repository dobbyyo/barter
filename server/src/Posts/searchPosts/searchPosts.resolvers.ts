import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Query: {
    searchPosts: async (_, { keyword, page }, { client }) => {
      try {
        const isPost = await client.post.findMany({
          where: {
            OR: [
              {
                title: {
                  contains: keyword.toLowerCase(),
                },
              },
            ],
          },
          take: 8,
          skip: (page - 1) * 8,
        });
        console.log(isPost.length);
        if (isPost.length === 0) {
          return {
            success: false,
            error: "포스터가 없습니다.",
          };
        }
        const totalPages = await client.post.count({
          where: {
            OR: [
              {
                title: {
                  contains: keyword.toLowerCase(),
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
