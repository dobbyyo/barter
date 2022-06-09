import AWS from "aws-sdk";

AWS.config.update({
  credentials: {
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET,
  },
});

export const uploadImgS3 = async (
  file: any,
  userId: string | number,
  folderName: string
) => {
  try {
    const { filename, createReadStream } = await file.file;
    const readStream = createReadStream();
    const objectName = `${folderName}/${userId}-${Date.now()}-${filename}`;
    const { Location } = await new AWS.S3()
      .upload({
        Bucket: "barter-uploads",
        Key: objectName,
        ACL: "public-read-write",
        Body: readStream,
      })
      .promise();
    return Location;
  } catch (err) {
    console.log(err);
    console.log("S3 ERR");
    return;
  }
};
