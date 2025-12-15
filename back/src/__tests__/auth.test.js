import request from "supertest";
import app from "../app.js";
import prisma from "../config/prisma.js";

describe("Auth API", () => {
  beforeAll(async () => {
    await prisma.task.deleteMany();
    await prisma.user.deleteMany();
  });
  afterAll(async () => {
    await prisma.$disconnect();
  });
  describe("POST /api/auth/register", () => {
    it("deve registrar um novo usuario", async () => {
      const res = await request(app).post("/api/auth/register").send({
        name: "Test User",
        email: "test@test.com",
        password: "123456",
      });
      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.user).toHaveProperty("id");
      expect(res.body.data).toHaveProperty("token");
    });
    it("não deve resgistrar com email duplicado", async () => {
      const res = await request(app).post("/api/auth/register").send({
        name: "Test User",
        email: "test@test.com",
        password: "123456",
      });
      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });
  });
  describe("POST /api/auth/login", () => {
    it("deve fazer login com credenciais válidas", async () => {
      // amazonq-ignore-next-line
      const res = await request(app).post("/api/auth/login").send({
        email: "test@test.com",
        password: "123456",
      });
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty("token");
    });
    it("não deve fazer login com credenciais inválidas", async () => {
      const res = await request(app).post("/api/auth/login").send({
        email: "test@test.com",
        password: "wrong",
      });

      expect(res.status).toBe(401);
      expect(res.body.success).toBe(false);
    });
  });
});
