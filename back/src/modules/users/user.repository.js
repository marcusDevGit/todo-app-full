import prisma from "../../config/prisma.js";

export const findById = (id) =>
  prisma.user.findUnique({
    where: { id },
    select: { id: true, name: true, email: true, createdAt: true },
  });
export const update = (id, data) =>
  prisma.user.update({
    where: { id },
    data,
    select: { id: true, name: true, email: true },
  });
