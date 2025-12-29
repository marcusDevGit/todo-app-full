import * as service from "./task.service.js";
import { success } from "../../core/responses.js";

export const create = async (req, res, next) => {
  try {
    const task = await service.create(req.user.id, req.body);
    success(res, task, "Tarefa criada com sucesso", 201);
  } catch (error) {
    next(error);
  }
};

export const getAll = async (req, res, next) => {
  try {
    const tasks = await service.getAll(req.user.id);
    success(res, tasks);
  } catch (error) {
    next(error);
  }
};

export const search = async (req, res, next) => {
  try {
    const tasks = await service.search(req.user.id, req.query);
    success(res, tasks);
  } catch (error) {
    next(error);
  }
};

export const getById = async (req, res, next) => {
  try {
    const task = await service.getById(req.params.id, req.user.id);
    success(res, task);
  } catch (error) {
    next(error);
  }
};

export const update = async (req, res, next) => {
  try {
    const task = await service.update(req.params.id, req.user.id, req.body);
    success(res, task, "Tarefa atualizada com sucesso");
  } catch (error) {
    console.error("update erro:", error.message);
    next(error);
  }
};

export const remove = async (req, res, next) => {
  try {
    await service.remove(req.params.id, req.user.id);
    success(res, null, "Tarefa deletada com sucesso");
  } catch (error) {
    next(error);
  }
};

export const getSubtasks = async (req, res, next) => {
  try {
    const subtasks = await service.getSubtasks(req.params.id, req.user.id);
    success(res, subtasks);
  } catch (error) {
    next(error);
  }
};

export const createSubtask = async (req, res, next) => {
  try {
    const subtask = await service.createSubtask(
      req.params.id,
      req.user.id,
      req.body
    );
    success(res, subtask, "Subtarefa criada com sucesso", 201);
  } catch (error) {
    next(error);
  }
};
