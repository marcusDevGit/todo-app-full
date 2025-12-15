import prisma from "../../config/prisma.js";

export const create = (data) =>
  prisma.task.create({
    data,
    include: { tags: { include: { tag: true } } },
  });
export const findByUser = (userId) =>
  prisma.task.findMany({
    where: { userId, parentId: null },
    include: {
      tags: { include: { tag: true } },
      subtasks: true,
      attachments: true,
    },
    orderBy: { createdAt: "desc" },
  });
export const findById = (id, userId) =>
  prisma.task.findFirst({
    where: { id, userId },
    include: {
      tags: { include: { tag: true } },
      subtasks: true,
      attachments: true,
    },
  });
export const update = (id, data) =>
  prisma.task.update({
    where: { id },
    data,
    include: { tags: { include: { tag: true } }, subtasks: true },
  });
export const remove = (id) => prisma.task.delete({ where: { id } });
