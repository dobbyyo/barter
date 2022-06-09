import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Mutation: {
    createComment: async (_, { postId, payload }, { loggedInUser, client }) => {
      try {
        if (!loggedInUser) {
          return {
            success: false,
            error: "로그인이 필요합니다.",
          };
        }
        const post = await client.post.findUnique({
          where: {
            id: postId,
          },
          select: {
            id: true,
          },
        });
        if (!post) {
          return {
            success: false,
            error: "게시글이 없습니다.",
          };
        }
        await client.comment.create({
          data: {
            payload,
            post: {
              connect: {
                id: postId,
              },
            },
            user: {
              connect: {
                id: loggedInUser.id,
              },
            },
          },
        });
        return {
          success: true,
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
