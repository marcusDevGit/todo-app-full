import { Router } from "express";
import * as controller from "./user.controller.js";
import auth from "../../middleware/authMiddleware.js";

const router = Router();

router.use(auth);
router.get("/profile", controller.getProfile);
router.put("/profile", controller.updateProfile);

export default router;
