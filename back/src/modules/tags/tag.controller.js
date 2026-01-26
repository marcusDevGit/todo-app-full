import * as service from "./tag.service.js";
import { success } from "../../core/responses.js";

export const getAll = async (req, res, next) => {
  try {
    const tags = await service.getAll();
    success(res, tags);
  } catch (error) {
    next(error);
  }
};

export const create = async (req, res, next) => {
  try {
    const tag = await service.create(req.body);
    success(res, tag, "Tag criada com sucesso", 201);
  } catch (error) {
    next(error);
  }
};

export const del = async (req, res, next) => {
  try {
    await service.remove(req.params.id);
    success(res, null, "Tag excluída com sucesso");
  } catch (error) {
    next(error);
  }
};
