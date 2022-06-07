import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Mutation: {
    login: async (_, { email, password }, { client }) => {
      try {
        const user = await client.user.findFirst({
          where: { email },
        });
        if (!user) {
          return {
            success: false,
            error: "이메일이 존재하지 않습니다.",
          };
        }
        const passwordOk = await bcrypt.compare(password, user.password);
        if (!passwordOk) {
          return {
            success: false,
            error: "비밀번호가 틀렸습니다.",
          };
        }
        const token = await jwt.sign({ id: user.id }, process.env.SECRET_KEY);
        return {
          success: true,
          token,
        };
      } catch (err) {
        return {
          success: false,
          error: "로그인이 실패했습니다.",
        };
      }
    },
  },
};

export default resolvers;
