import bcrypt from "bcrypt";
import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Mutation: {
    deleteUser: async (_, { email, password }, { loggedInUser, client }) => {
      try {
        if (!loggedInUser) {
          return {
            success: false,
            error: "로그인이 필요합니다.",
          };
        }
        const ok = await bcrypt.compare(password, loggedInUser.password);
        console.log(ok);
        const User = await client.user.findFirst({
          where: {
            email: loggedInUser.email,
          },
        });

        if (!User) {
          return {
            success: false,
            error: "이메일 또는 비밀번호가 틀렸습니다.",
          };
        }
        if (User && ok) {
          await client.user.delete({
            where: {
              email,
            },
          });
          return {
            success: true,
          };
        }
      } catch (err) {
        console.log(err);
        return {
          success: false,
          error: "계정 삭제에 실패했습니다.",
        };
      }
    },
  },
};

export default resolvers;
