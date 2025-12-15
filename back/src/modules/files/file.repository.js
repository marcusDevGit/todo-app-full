import prisma from "../../config/prisma.js";

export const create = (data) => prisma.attachment.create({ data });
export const findByTask = (taskId) =>
  prisma.attachment.findMany({ where: { taskId } });
export const remove = (id) => prisma.attachment.delete({ where: { id } });
