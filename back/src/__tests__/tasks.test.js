import request from "supertest";
import app from "../app.js";
import prisma from "../config/prisma.js";

describe("Tasks API", () => {
  let userId;
  let token;

  beforeAll(async () => {
    await prisma.attachment.deleteMany();
    await prisma.taskTag.deleteMany();
    await prisma.task.deleteMany();
    await prisma.tag.deleteMany();
    await prisma.user.deleteMany();

    const res = await request(app).post("/api/auth/register").send({
      name: "Task User",
      email: "task@test.com",
      password: "123456",
    });

    token = res.body.data.token;
    userId = res.body.data.user.id;
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe("POST /api/tasks", () => {
    it("deve criar uma nova tarefa", async () => {
      const res = await request(app)
        .post("/api/tasks")
        .set("Authorization", `Bearer ${token}`)
        .send({
          title: "Test Task",
          description: "Test Description",
          status: "pending",
          priority: 1,
        });

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty("id");
    });

    it("não deve criar tarefa sem token", async () => {
      // amazonq-ignore-next-line
      const res = await request(app).post("/api/tasks").send({
        title: "Test Task",
      });

      expect(res.status).toBe(401);
    });
  });

  describe("GET /api/tasks", () => {
    it("deve listar todas as tarefas do usuário", async () => {
      const res = await request(app)
        .get("/api/tasks")
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
    });
  });

  describe("Subtarefas", () => {
    let parentTaskId;
    // let token;

    beforeAll(async () => {
      const res = await request(app)
        .post("/api/tasks")
        .set("Authorization", `Bearer ${token}`)
        .send({ title: "Tarefa Principal" });
      parentTaskId = res.body.data.id;
    });

    it("deve criar subtarefa", async () => {
      const res = await request(app)
        .post(`/api/tasks/${parentTaskId}/subtasks`)
        .set("Authorization", `Bearer ${token}`)
        .send({ title: "Subtarefa 1" });

      expect(res.status).toBe(201);
      expect(res.body.data.parentId).toBe(parentTaskId);
    });
  });
});
