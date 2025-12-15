import pkg from "jsonwebtoken";
const { sign, verify } = pkg;

export const generateToken = (playload) =>
  sign(playload, process.env.JWT_SECRET, { expiresIn: "1d" });

export const verifyToken = (token) => verify(token, process.env.JWT_SECRET);
