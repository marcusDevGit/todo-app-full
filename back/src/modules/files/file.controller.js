import * as service from "./file.service.js";
import { success } from "../../core/responses.js";

export const uploadFile = async (req, res, next) => {
  try {
    const attachment = await service.uploadFile(req.params.taskId, req.file);
    success(res, attachment, "Arquivo anexado", 201);
  } catch (error) {
    next(error);
  }
};

export const getByTask = async (req, res, next) => {
  try {
    const files = await service.getByTask(req.params.taskId);
    success(res, files);
  } catch (error) {
    next(error);
  }
};

export const remove = async (req, res, next) => {
  try {
    await service.remove(req.params.id);
    success(res, null, "Arquivo removido");
  } catch (error) {
    next(error);
  }
};
