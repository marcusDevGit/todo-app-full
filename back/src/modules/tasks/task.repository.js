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

export const search = (userId, filter) => {
  const where = { userId, parentId: null };

  if (filter.title) {
    where.title = { contains: filter.title, mode: "insensitive" };
  }

  if (filter.listId && filter.listId !== "undefined") {
    where.listId = parseInt(filter.listId);
  }
  if (filter.tagIds && filter.tagIds.length > 0) {
    where.tags = {
      some: { tagId: { in: filter.tagIds } },
    };
  }

  if (filter.dueDateFrom || filter.dueDateTo) {
    where.dueDate = {};
    if (filter.dueDateFrom) {
      where.dueDate.gte = new Date(filter.dueDateFrom);
    }
    if (filter.dueDateTo) {
      where.dueDate.lte = new Date(filter.dueDateTo);
    }
  }
  if (filter.priority !== undefined) {
    where.priority = filter.priority;
  }
  if (filter.status === "in_progress") {
    where.subtasks = { some: { status: "pending" } };
  } else if (filter.status) {
    where.status = filter.status;
  }

  return prisma.task.findMany({
    where,
    include: {
      tags: { include: { tag: true } },
      subtasks: true,
      attachments: true,
    },
    orderBy: { createdAt: "desc" },
  });
};

export const update = (id, data) =>
  prisma.task.update({
    where: { id },
    data,
    include: { tags: { include: { tag: true } }, subtasks: true },
  });
export const remove = (id) => prisma.task.delete({ where: { id } });
