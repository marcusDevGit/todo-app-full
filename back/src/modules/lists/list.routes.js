import { Router } from "express";
import * as listController from "./list.controller.js";
import authMiddleware from "../../middleware/authMiddleware.js";

const router = Router();

router.use(authMiddleware);

router.post("/", listController.create);
router.get("/", listController.getAll);
router.get("/:id", listController.getById);
router.put("/:id", listController.update);
router.delete("/:id", listController.remove);

export default router;
