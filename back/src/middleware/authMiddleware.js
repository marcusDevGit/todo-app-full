import { verifyToken } from "../utils/jwt.js";
import AppError from "../core/error.js";

export default (req, res, next) => {
  console.log("body", req.body);
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) throw new AppError("Token não fornecido", 401);
    req.user = verifyToken(token);
    req.userId = req.user.id;
    next();
  } catch (error) {
    next(new AppError("Token invalido", 401));
  }
};
