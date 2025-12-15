import prisma from "../../config/prisma.js";
import { hashPassword, comparePassword } from "../../utils/password.js";
import { generateToken } from "../../utils/jwt.js";
import AppError from "../../core/error.js";

export const register = async ({ name, email, password }) => {
  const exists = await prisma.user.findUnique({ where: { email } });
  if (exists) throw new AppError("Email já Cadastrado", 400);

  const hashedPassword = await hashPassword(password);
  const user = await prisma.user.create({
    data: { name, email, password: hashedPassword },
    select: { id: true, name: true, email: true, createdAt: true },
  });
  return {
    user,
    token: generateToken({ id: user.id, email: user.email }),
  };
};

export const login = async ({ email, password }) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await comparePassword(password, user.password))) {
    throw new AppError("Credenciais invalidas", 401);
  }
  return {
    user: { id: user.id, name: user.name, email: user.email },
    token: generateToken({ id: user.id, email: user.email }),
  };
};
