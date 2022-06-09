import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Query: {
    seeFeed: async (_, { page }, { loggedInUser, client }) => {
      try {
        if (loggedInUser) {
          return {
            success: false,
            error: "로그인이 필요합니다.",
          };
        }
        const posts = client.post.findMany({
          where: {
            OR: [
              {
                user: {
                  followers: {
                    some: {
                      id: loggedInUser.id,
                    },
                  },
                },
              },
              {
                userId: loggedInUser.id,
              },
            ],
          },
          orderBy: {
            createdAt: "desc",
          },
          take: 5,
          skip: (page - 1) * 5,
        });
        const total = await client.post.count({
          where: {
            OR: [
              {
                user: {
                  followers: {
                    some: {
                      id: loggedInUser.id,
                    },
                  },
                },
              },
              {
                userId: loggedInUser.id,
              },
            ],
          },
        });

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
