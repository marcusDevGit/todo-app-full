import { Router } from "express";
import * as controller from "./task.controller.js";
import auth from "../../middleware/authMiddleware.js";
import { createTask, updateTask } from "./task.validation.js";
import validate from "../../middleware/validate.js";

const router = Router();

router.use(auth);
router.post("/", createTask, validate, controller.create);
router.get("/search", controller.search);
router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.put("/:id", updateTask, validate, controller.update);
router.delete("/:id", controller.remove);
router.get("/:id/subtasks", controller.getSubtasks);
router.post("/:id/subtasks", createTask, validate, controller.createSubtask);

export default router;
