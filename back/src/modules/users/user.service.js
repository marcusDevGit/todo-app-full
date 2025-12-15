import * as repository from "./user.repository.js";
import { hashPassword } from "../../utils/password.js";
import AppError from "../../core/error.js";

export const getProfile = async (userId) => {
  const user = await repository.findById(userId);
  if (!user) throw new AppError("Usuario não encontrado", 404);
  return user;
};

export const updateProfile = async (userId, data) => {
  if (data.password) data.password = await hashPassword(data.password);
  return repository.update(userId, data);
};
