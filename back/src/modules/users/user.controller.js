import * as service from "./user.service.js";
import { success } from "../../core/responses.js";

export const getProfile = async (req, res, next) => {
  try {
    const user = await service.getProfile(req.user.id);
    success(res, user);
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const user = await service.updateProfile(req.user.id, req.body);
    success(res, "Perfil atualizado");
  } catch (error) {
    next(error);
  }
};
