import * as service from "./auth.service.js";
import { success } from "../../core/responses.js";

export const register = async (req, res, next) => {
  try {
    const data = await service.register(req.body);
    success(res, data, "Usuario registrado com sucesso", 201);
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const data = await service.login(req.body);
    success(res, data, "Login realizado com sucesso");
  } catch (error) {
    next(error);
  }
};
