import { Router } from "express";
import * as controller from "./file.controller.js";
import auth from "../../middleware/authMiddleware.js";
import upload from "../../config/multer.js";

const router = Router();

router.use(auth);
router.post("/:taskId", upload.single("file"), controller.uploadFile);
router.get("/:taskId", controller.getByTask);
router.delete("/:id", controller.remove);

export default router;
