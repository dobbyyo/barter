import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Query: {
    seeLikes: async (_, { id }, { client }) => {
      try {
        const likes = await client.like.findMany({
          where: {
            postId: id,
          },
          select: {
            user: true,
          },
        });
        if (!likes) {
          return {
            success: false,
            error: "좋아요가 없습니다.",
          };
        }
        return {
          success: true,
          user: likes.map((like) => like.user),
        };
      } catch (err) {
        return {
          success: false,
          error: "좋아요가 없습니다.",
        };
      }
    },
  },
};

export default resolvers;
