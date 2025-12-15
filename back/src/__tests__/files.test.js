import request from "supertest";
import app from "../app.js";
import prisma from "../config/prisma.js";
import fs from "fs";

describe("Files Api", () => {
  let token;
  let taskId;

  beforeAll(async () => {
    await prisma.attachment.deleteMany();
    await prisma.task.deleteMany();
    await prisma.user.deleteMany();

    const userRes = await request(app).post("/api/auth/register").send({
      name: "File User",
      email: "file@test.com",
      // amazonq-ignore-next-line
      password: "123456",
    });
    token = userRes.body.data.token;

    const taskRes = await request(app)
      .post("/api/tasks")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Task com arquivo",
        description: "Test task",
      });
    taskId = taskRes.body.data.id;

    //cria arquivo para test
    if (!fs.existsSync("src/uploads")) {
      fs.mkdirSync("src/uploads", { recursive: true });
    }
    fs.writeFileSync("test-file.txt", "Conteudo de teste");
  });

  //limpar arquivo
  afterAll(async () => {
    if (fs.existsSync("test-file.txt")) {
      fs.unlinkSync("test-file.txt");
    }
    await prisma.$disconnect();
  });

  describe("POST /api/files/:taskId", () => {
    it("deve fazer upload de arquivo", async () => {
      const res = await request(app)
        .post(`/api/files/${taskId}`)
        .set("Authorization", `Bearer ${token}`)
        .attach("file", "test-file.txt");

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty("id");
      expect(res.body.data).toHaveProperty("filename");
    });
    it("não deve fazer upload sem o token", async () => {
      const res = await request(app)
        .post(`/api/files/${taskId}`)
        .attach("file", "test-file.txt");

      expect(res.status).toBe(401);
    });
  });
  describe("GET /api/files/:taskId", () => {
    it("deve listar arquivos da tarefa", async () => {
      const res = await request(app)
        .get(`/api/files/${taskId}`)
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
    });
  });
});
