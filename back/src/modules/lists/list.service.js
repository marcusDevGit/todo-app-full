import * as listRepository from "./list.repository.js";
import AppError from "../../core/error.js";

export const create = async (name, userId) => {
  if (!name || name.trim() === "") {
    throw new AppError("Nome da lista é obrigatorio", 400);
  }
  return listRepository.create(name, userId);
};

export const getAll = async (userId) => {
  return listRepository.getAll(userId);
};

export const getById = async (id, userId) => {
  const list = await listRepository.getById(id);
  if (!list || list.userId !== userId) {
    throw new AppError("Lista não econtrada ou acesso negado", 404);
  }
  return list;
};

export const update = async (id, name, userId) => {
  if (!name || name.trim() === "") {
    throw new AppError("Nome da lista é obrigatorio", 400);
  }
  const existingList = await listRepository.getById(id);
  if (!existingList || existingList.userId !== userId) {
    throw new AppError("Lista não encontrada ou acesso negado", 404);
  }
  return listRepository.update(id, name);
};

export const remove = async (id, userId) => {
  const existingList = await listRepository.getById(id);
  if (!existingList || existingList.userId !== userId) {
    throw new AppError("Lista não encontrada ou acesso negado", 404);
  }
  return listRepository.remove(id);
};
