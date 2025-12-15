import prisma from "../../config/prisma.js";

export const getAll = () => prisma.tag.findMany();

export const create = (data) => prisma.tag.create({ data });
