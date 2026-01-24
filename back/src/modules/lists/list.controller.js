import * as listService from "./list.service.js";
import AppError from "../../core/error.js";

export const create = async (req, res, next) => {
  try {
    const { name } = req.body;
    const userId = req.userId;
    const newList = await listService.create(name, userId);
    res.status(201).json({ data: newList });
  } catch (error) {
    next(error);
  }
};

export const getAll = async (req, res, next) => {
  try {
    const userId = req.userId;
    const lists = await listService.getAll(userId);
    res.status(200).json({ data: lists });
  } catch (error) {
    next(error);
  }
};

export const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.userId;
    const list = await listService.getById(parseInt(id), userId);
    if (!list) {
      throw new AppError("lista não encontrada", 404);
    }
    res.status(200).json({ data: list });
  } catch (error) {
    next(error);
  }
};

export const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const userId = req.userId;
    const updatedList = await listService.update(parseInt(id), name, userId);
    res.status(200).json({ data: updatedList });
  } catch (error) {
    next(error);
  }
};

export const remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.userId;
    await listService.remove(parseInt(id), userId);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
