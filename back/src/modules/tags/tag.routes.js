import { Router } from "express";
import * as controller from "./tag.controller.js";
import auth from "../../middleware/authMiddleware.js";

const router = Router();

router.use(auth);
router.get("/", controller.getAll);
router.post("/", controller.create);

export default router;
