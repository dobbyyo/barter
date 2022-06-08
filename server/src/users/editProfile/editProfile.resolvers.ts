import bcrypt from "bcrypt";
import { createWriteStream, ReadStream, WriteStream } from "fs";

import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Mutation: {
    editProfile: async (
      _,
      { name, username, email, password: newPassword, bio, avatar },
      { client, loggedInUser }
    ) => {
      try {
        let avatarUrl = null;
        const { filename, createReadStream } = await avatar.file;
        const newFilename = `${loggedInUser.id}-${Date.now()}-${filename}`;
        const readStream: ReadStream = createReadStream();
        const writeStream: WriteStream = createWriteStream(
          process.cwd() + "/uploads/" + newFilename
        );
        readStream.pipe(writeStream);
        avatarUrl = `http://localhost:4000/static/${newFilename}`;
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
            ...(avatarUrl && { avatar: avatarUrl }),
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
        console.log(err);
        return {
          success: false,
          error: "업데이트에 실패했습니다.",
        };
      }
    },
  },
};

export default resolvers;
