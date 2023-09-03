import dotenv from "dotenv";
import fs from "fs";
import S3 from "aws-sdk/clients/s3";

dotenv.config();

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey,
});

interface FileProps {
  path: string;
  filename: string;
}

export function uploadFile(file: FileProps) {
  const fileStream = fs.createReadStream(file.path);

  const uploadParams = {
    Bucket: bucketName!,
    Body: fileStream,
    Key: file.filename,
  };

  return s3.upload(uploadParams).promise();
}
