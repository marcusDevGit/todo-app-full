import { verifyToken } from "../utils/jwt.js";
import AppError from "../core/error.js";

export default (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) throw new AppError("Token não fornecido", 401);
    req.user = verifyToken(token);
    next();
  } catch (error) {
    next(new AppError("Token invalido", 401));
  }
};
