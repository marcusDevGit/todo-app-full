import request from "supertest";
import app from "../app.js";
import prisma from "../config/prisma.js";

describe("User API", () => {
  let token;
  let userId;

  beforeAll(async () => {
    await prisma.task.deleteMany();
    await prisma.user.deleteMany();

    // amazonq-ignore-next-line
    const res = await request(app).post("/api/auth/register").send({
      name: "User Test",
      email: "user@test.com",
      password: "123456",
    });
    token = res.body.data.token;
    // amazonq-ignore-next-line
    userId = res.body.data.user.discribe;
  });
  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe("GET /api/users/profile", () => {
    it("deve retornar o perfil do usuário", async () => {
      const res = await request(app)
        .get("/api/users/profile")
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty("id");
      expect(res.body.data).toHaveProperty("name");
      expect(res.body.data).toHaveProperty("email");
    });
    it("não deve retornar perfil sem token", async () => {
      const res = await request(app).get("/api/users/profile");

      expect(res.status).toBe(401);
    });
  });
  describe("PUT /api/users/profile", () => {
    it("deve atualizar perfil do usuário", async () => {
      const res = await request(app)
        .put("/api/users/profile")
        .set("Authorization", `Bearer ${token}`)
        .send({
          name: "Nome Atualizado",
        });
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
    });
  });
});
