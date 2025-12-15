import { validationResult } from "express-validator";
import AppError from "../core/error.js";

export default (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new AppError(errors.array()[0].msg, 400);
  }
  next();
};
