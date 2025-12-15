import multer, { diskStorage } from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "src/uploads/"),
  // amazonq-ignore-next-line
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
export default multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } });
