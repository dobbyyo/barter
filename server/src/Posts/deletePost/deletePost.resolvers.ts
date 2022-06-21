import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Mutation: {
    deletePost: async (_, { id }, { loggedInUser, client }) => {
      try {
        if (!loggedInUser) {
          return {
            success: false,
            error: "로그인이 필요합니다.",
          };
        }
        const post = await client.post.findUnique({
          where: {
            id,
          },
          select: {
            userId: true,
            id: true,
          },
        });
        if (!post) {
          return {
            success: false,
            error: "게시글을 찾을수 없습니다.",
          };
        } else if (post.userId !== loggedInUser.id) {
          return {
            success: false,
            error: "권한이 없습니다.",
          };
        } else {
          await client.post.delete({
            where: {
              id,
            },
          });
        }
        return {
          success: true,
          id: post.id,
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
