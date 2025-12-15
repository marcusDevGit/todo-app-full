import * as repository from "./task.repository.js";
import prisma from "../../config/prisma.js";
import AppError from "../../core/error.js";

export const create = async (userId, data) => {
  const { tags, subtasks, ...taskData } = data;

  const task = await prisma.task.create({
    data: {
      ...taskData,
      userId,
      tags: tags
        ? {
            create: await Promise.all(
              tags.map(async (tagName) => {
                let tag = await prisma.tag.findFirst({
                  where: { name: tagName },
                });
                if (!tag)
                  tag = await prisma.tag.create({ data: { name: tagName } });
                return { tagId: tag.id };
              })
            ),
          }
        : undefined,
      subtasks: subtasks
        ? {
            create: subtasks.map((st) => ({ ...st, userId })),
          }
        : undefined,
    },
    include: { tags: { include: { tag: true } }, subtasks: true },
  });
  return task;
};
export const getAll = (userId) => repository.findByUser(userId);
export const getById = async (id, userId) => {
  const task = await repository.findById(parseInt(id), userId);
  if (!task) throw new AppError("Tarefa não encontrada", 404);
  return task;
};
export const update = async (id, userId, data) => {
  await getById(id, userId);
  const { tags, subtasks, ...taskData } = data;
  return prisma.task.update({
    where: { id: parseInt(id) },
    data: {
      ...taskData,
      tags: tags
        ? {
            deleteMany: {},
            create: await Promise.all(
              tags.map(async (tagName) => {
                let tag = await prisma.tag.findFirst({
                  where: { name: tagName },
                });
                if (!tag)
                  tag = await prisma.tag.create({ data: { name: tagName } });
                return { tagId: tag.id };
              })
            ),
          }
        : undefined,
    },
    include: { tags: { include: { tag: true } }, subtasks: true },
  });
};
export const remove = async (id, userId) => {
  await getById(id, userId);
  return repository.remove(parseInt(id));
};

export const getSubtasks = async (parentId, userId) => {
  await getById(parentId, userId);
  return prisma.task.findMany({
    where: { parentId: parseInt(parentId), userId },
    include: { tags: { include: { tag: true } } },
  });
};

export const createSubtask = async (parentId, userId, data) => {
  await getById(parentId, userId);
  return prisma.task.create({
    data: { ...data, userId, parentId: parseInt(parentId) },
    include: { tags: { include: { tag: true } } },
  });
};
