import { createWriteStream, ReadStream, WriteStream } from "fs";
import { uploadImgS3 } from "../../shared/shared.utils";

import { Resolvers } from "../../types";
import { processHashtags } from "../posts.utils";

const resolvers: Resolvers = {
  Mutation: {
    uploadPost: async (
      _,
      { file, caption, title },
      { client, loggedInUser }
    ) => {
      try {
        let hashtagObj = [];
        let postImgsUrl = null;

        if (!loggedInUser) {
          return {
            success: false,
            error: "로그인이 필요합니다.",
          };
        }
        if (caption) {
          hashtagObj = processHashtags(caption);
        }

        if ((process.env.NODE_ENV = "development" && file)) {
          const { filename, createReadStream } = await file.file;
          const newFilename = `${loggedInUser.id}-${Date.now()}-${filename}`;
          const readStream: ReadStream = createReadStream();
          const writeStream: WriteStream = createWriteStream(
            process.cwd() + "/postImgs/" + newFilename
          );
          readStream.pipe(writeStream);
          postImgsUrl = `http://localhost:4000/static/${newFilename}`;
        }

        if ((process.env.NODE_ENV = "production" && file)) {
          postImgsUrl = await uploadImgS3(file, loggedInUser.id, "postImgs");
        }

        const newPost = await client.post.create({
          data: {
            file: postImgsUrl,
            title,
            caption,
            user: {
              connect: {
                id: loggedInUser.id,
              },
            },
            ...(hashtagObj.length > 0 && {
              hashtags: {
                connectOrCreate: hashtagObj,
              },
            }),
          },
        });
        return {
          success: true,
          Post: newPost,
        };
      } catch (err) {}
    },
  },
};

export default resolvers;
