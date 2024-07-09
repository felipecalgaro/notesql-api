import dotenv from "dotenv";
import fs from "fs";
import { PutObjectCommand, S3 } from "@aws-sdk/client-s3";

dotenv.config();

const bucketName = process.env.AWS_BUCKET_NAME as string;
const region = process.env.AWS_BUCKET_REGION as string;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID as string;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY as string;

const s3 = new S3({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});

interface FileProps {
  path: string;
  filename: string;
}

export async function uploadFile(file: FileProps) {
  const fileStream = fs.createReadStream(file.path);

  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: file.filename,
  };

  const object = new PutObjectCommand(uploadParams);

  await s3.send(object);
  const location = `${uploadParams.Bucket}/${uploadParams.Key}`;

  return { location };
}
