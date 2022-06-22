import bcrypt from "bcrypt";
import { createWriteStream, ReadStream, WriteStream } from "fs";
import { uploadImgS3 } from "../../shared/shared.utils";

import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Mutation: {
    editProfile: async (
      _,
      { name, username, email, password: newPassword, bio, avatar },
      { client, loggedInUser }
    ) => {
      try {
        if (!loggedInUser) {
          return {
            success: false,
            error: "로그인이 필요합니다.",
          };
        }
        console.log("ava" + avatar);
        let avatarUrl = null;

        if ((process.env.NODE_ENV = "development" && avatar)) {
          const { filename, createReadStream } = await avatar.file;
          const newFilename = `${loggedInUser.id}-${Date.now()}-${filename}`;
          const readStream: ReadStream = createReadStream();
          const writeStream: WriteStream = createWriteStream(
            process.cwd() + "/avatars/" + newFilename
          );
          readStream.pipe(writeStream);
          avatarUrl = `http://localhost:4000/static/${newFilename}`;
        }

        // if ((process.env.NODE_ENV = "production" && avatar)) {
        //   avatarUrl = await uploadImgS3(avatar, loggedInUser.id, "avatars");
        // }

        let hashPassword = null;
        if (newPassword) {
          hashPassword = await bcrypt.hash(newPassword, 10);
        }
        await client.user.update({
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
        return {
          success: true,
        };
      } catch (err) {
        console.log("a" + avatar);

        console.log("err" + err);
        return {
          success: false,
          error: "업데이트에 실패했습니다.",
        };
      }
    },
  },
};

export default resolvers;
