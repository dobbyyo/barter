import { Context, Resolvers } from "../../types";

// const resolvers: Resolvers = {
//   Query: {
//     seeProfile: (_, { username }, { client }) =>
//       client.user.findUnique({
//         where: {
//           username,
//         },
//       }),
//   },
// };

const resolvers: Resolvers = {
  Query: {
    seeProfile: async (_, { username }, { client }) => {
      try {
        const user = await client.user.findUnique({
          where: { username },
        });
        if (!user) {
          return {
            success: false,
            error: "존재하지 않는 유저입니다.",
          };
        }
        return {
          user,
        };
      } catch (err) {
        return {
          success: false,
          error: "존재하지 않습니다.",
        };
      }
    },
  },
};

export default resolvers;
