import { createWriteStream, ReadStream, WriteStream } from "fs";
import { uploadImgS3 } from "../../shared/shared.utils";

import { Resolvers } from "../../types";
import { processHashtags } from "../posts.utils";

const resolvers: Resolvers = {
  Mutation: {
    editPost: async (
      _,
      { id, title, caption, file, category },
      { client, loggedInUser }
    ) => {
      try {
        let postImgsUrl = null;

        if (!loggedInUser) {
          return {
            success: false,
            error: "로그인이 필요합니다.",
          };
        }
        const isPost = await client.post.findFirst({
          where: {
            id,
            userId: loggedInUser.id,
          },
          include: {
            hashtags: {
              select: {
                hashtag: true,
              },
            },
          },
        });
        if (!isPost) {
          return {
            success: false,
            error: "포스터를 찾을 수 없습니다.",
          };
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

        // if ((process.env.NODE_ENV = "production" && file)) {
        //   postImgsUrl = await uploadImgS3(file, loggedInUser.id, "postImgs");
        // }

        await client.post.update({
          where: {
            id,
          },
          data: {
            title,
            caption,
            category,
            hashtags: {
              disconnect: isPost.hashtags,
              connectOrCreate: processHashtags(caption),
            },
            ...(postImgsUrl && { file: postImgsUrl }),
          },
        });
        return {
          success: true,
        };
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
