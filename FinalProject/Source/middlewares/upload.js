import multer from "multer";

const storage = multer.memoryStorage(); // Lưu file trong bộ nhớ
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // Giới hạn kích thước 10MB
});

export default upload;
