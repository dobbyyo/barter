import bcrypt from "bcrypt";
import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Mutation: {
    join: async (_, { name, username, email, password }, { client }) => {
      try {
        const existingUser = await client.user.findFirst({
          where: {
            OR: [
              {
                username,
              },
              {
                email,
              },
            ],
          },
        });
        if (existingUser) {
          return {
            success: false,
            error: "유저네임 또는 이메일이 이미 존재합니다.",
          };
        }
        const uglyPassword = await bcrypt.hash(password, 10);
        await client.user.create({
          data: {
            username,
            email,
            name,
            password: uglyPassword,
          },
        });
        return {
          success: true,
        };
      } catch (err) {
        return {
          success: false,
          error: "아이디를 생성하지 못했습니다.",
        };
      }
    },
  },
};

export default resolvers;
