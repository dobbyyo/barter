import bcrypt from "bcrypt";
import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Mutation: {
    editProfile: async (
      _,
      { name, username, email, password: newPassword, bio, avatar },
      { client, loggedInUser }
    ) => {
      try {
        let hashPassword = null;
        if (newPassword) {
          hashPassword = await bcrypt.hash(newPassword, 10);
        }
        const updateUser = await client.user.update({
          where: { id: loggedInUser.id },
          data: {
            name,
            username,
            email,
            bio,
            ...(hashPassword && { password: hashPassword }),
          },
        });
        if (updateUser.id) {
          return {
            success: true,
          };
        } else {
          return {
            success: false,
            error: "업데이트에 실패했습니다.",
          };
        }
      } catch (err) {
        return {
          success: false,
          error: "업데이트에 실패했습니다.",
        };
      }
    },
  },
};

export default resolvers;
