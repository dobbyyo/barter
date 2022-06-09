import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Mutation: {
    editComment: async (_, { id, payload }, { loggedInUser, client }) => {
      try {
        if (!loggedInUser) {
          return {
            success: false,
            error: "로그인이 필요합니다.",
          };
        }
        const comment = await client.comment.findUnique({
          where: { id },
          select: {
            userId: true,
          },
        });
        if (!comment) {
          return {
            success: false,
            error: "댓글을 찾을 수 없습니다.",
          };
        } else if (comment.userId !== loggedInUser.id) {
          return {
            success: false,
            error: "권한이 없습니다.",
          };
        } else {
          await client.comment.update({
            where: {
              id,
            },
            data: {
              payload,
            },
          });
        }
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
