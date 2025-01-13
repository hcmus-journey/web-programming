import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";

// Cấu hình AWS S3 Client
const s3Client = new S3Client({
  region: "ap-southeast-1",
});

// Hàm upload ảnh lên S3
export default async function uploadToS3(file) {
  const fileExtension = file.originalname.split(".").pop();
  const fileName = `products/images/${uuidv4()}.${fileExtension}`;

  const uploadParams = {
    Bucket: "hat-shop",
    Key: fileName,
    Body: file.buffer, // Nội dung file
    ContentType: file.mimetype, // Định dạng file (VD: 'image/png')
    ContentDisposition: "inline", // Đảm bảo file không bị tải xuống khi truy cập
    ACL: "public-read", // Cho phép truy cập công khai
  };

  try {
    // Thực hiện upload file lên S3
    const command = new PutObjectCommand(uploadParams);
    await s3Client.send(command);

    // Trả về URL truy cập file trên S3
    return `https://hat-shop.s3.ap-southeast-1.amazonaws.com/${fileName}`;
  } catch (err) {
    console.error("Error uploading to S3:", err);
    throw new Error("Failed to upload file to S3");
  }
}
