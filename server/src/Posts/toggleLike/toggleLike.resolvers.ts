import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Mutation: {
    toggleLike: async (_, { id }, { loggedInUser, client }) => {
      try {
        if (!loggedInUser) {
          return {
            success: false,
            error: "로그인이 필요합니다.",
          };
        }
        const post = client.post.findUnique({
          where: {
            id,
          },
        });

        if (!post) {
          return {
            success: false,
            error: "게시글을 찾을수 없습니다.",
          };
        }

        const likeWhere = {
          postId_userId: {
            userId: loggedInUser.id,
            postId: id,
          },
        };

        const like = await client.like.findUnique({
          where: likeWhere,
        });

        if (like) {
          await client.like.delete({
            where: likeWhere,
          });
        } else {
          await client.like.create({
            data: {
              user: {
                connect: {
                  id: loggedInUser.id,
                },
              },
              post: {
                connect: {
                  id: (await post).id,
                },
              },
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
