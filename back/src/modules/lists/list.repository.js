import prisma from "../../config/prisma.js";

export const create = async (name, userId) => {
  return prisma.list.create({
    data: {
      name,
      userId,
    },
  });
};

export const getAll = async (userId) => {
  return prisma.list.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
};

export const getById = async (id) => {
  return prisma.list.findUnique({
    where: { id },
  });
};

export const update = async (id, name) => {
  return prisma.list.update({
    where: { id },
    data: { name },
  });
};

export const remove = async (id) => {
  return prisma.list.delete({
    where: { id },
  });
};
