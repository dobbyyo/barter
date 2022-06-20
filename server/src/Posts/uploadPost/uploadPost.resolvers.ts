import { createWriteStream, ReadStream, WriteStream } from "fs";
import { uploadImgS3 } from "../../shared/shared.utils";
import { finished } from "stream/promises";
import { Resolvers } from "../../types";
import { processHashtags } from "../posts.utils";

const resolvers: Resolvers = {
  Mutation: {
    uploadPost: async (
      _,
      { file, caption, title, category },
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
        console.log(file, caption, title, category);
        if ((process.env.NODE_ENV = "development" && file)) {
          const { filename, createReadStream } = await file.file;
          const newFilename = `${loggedInUser.id}-${Date.now()}-${filename}`;
          const readStream: ReadStream = createReadStream();
          const writeStream: WriteStream = createWriteStream(
            process.cwd() + "/postImgs/" + newFilename
          );
          readStream.pipe(writeStream);
          postImgsUrl = `http://localhost:4000/static/${newFilename}`;
          await finished(writeStream);
        }

        // if ((process.env.NODE_ENV = "production" && file)) {
        //   postImgsUrl = await uploadImgS3(file, loggedInUser.id, "postImgs");
        // }

        const newPost = await client.post.create({
          data: {
            file: postImgsUrl,
            title,
            caption,
            category,
            user: {
              connect: {
                id: loggedInUser.id,
              },
            },
            ...(hashtagObj &&
              hashtagObj.length > 0 && {
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
      } catch (err) {
        console.log(file);
        console.log(err);
        return {
          success: false,
          error: "실패했습니다.",
        };
      }
    },
  },
};

export default resolvers;
