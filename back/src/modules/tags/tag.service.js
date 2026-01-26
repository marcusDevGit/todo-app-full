import prisma from "../../config/prisma.js";

const colors = [
  "#ef4444",
  "#f97316",
  "#eab308",
  "#22c55e",
  "#06b6d4",
  "#8b5cf6",
  "#ec4899",
  "#6672d6",
  "#c676b9",
  "#d6d566",
  "#ffafa3",
  "#3d0338",
];
export const create = async (data) => {
  const color = data.color || colors[Math.floor(Math.random() * colors.length)];
  return prisma.tag.create({
    data: { ...data, color },
  });
};

export const getAll = () => prisma.tag.findMany();

export const update = async (id, data) => {
  return prisma.tag.update({
    where: { id: parseInt(id) },
    data,
  });
};

export const remove = async (id) => {
  return prisma.tag.delete({ where: { id: parseInt(id) } });
};
