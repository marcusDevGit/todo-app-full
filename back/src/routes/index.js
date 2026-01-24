import { Router } from "express";
import authRoutes from "../modules/auth/auth.routes.js";
import taskRoutes from "../modules/tasks/task.routes.js";
import userRoutes from "../modules/users/user.routes.js";
import fileRoutes from "../modules/files/file.routes.js";
import tagRoutes from "../modules/tags/tag.routes.js";
import listRoutes from "../modules/lists/list.routes.js";
const router = Router();

router.use("/auth", authRoutes);
router.use("/tasks", taskRoutes);
router.use("/users", userRoutes);
router.use("/files", fileRoutes);
router.use("/tags", tagRoutes);
router.use("/lists", listRoutes);

export default router;
