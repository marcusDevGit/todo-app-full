import request from "supertest";
import app from "../app.js";
import prisma from "../config/prisma.js";

describe("Tags API", () => {
  let token;

  beforeAll(async () => {
    await prisma.attachment.deleteMany();
    await prisma.taskTag.deleteMany();
    await prisma.task.deleteMany();
    await prisma.tag.deleteMany();
    await prisma.user.deleteMany();

    // amazonq-ignore-next-line
    const res = await request(app).post("/api/auth/register").send({
      name: "Tag User",
      email: "tag@test.com",
      // amazonq-ignore-next-line
      password: "123456",
    });
    token = res.body.data.token;
  });
  afterAll(async () => {
    await prisma.$disconnect();
  });
  describe("POST /api/tags", () => {
    it("deve criar nova tag", async () => {
      const res = await request(app)
        .post("/api/tags")
        .set("Authorization", `Bearer ${token}`)
        .send({ name: "Urgente", color: "#ff0000" });

      expect(res.status).toBe(201);
      expect(res.body.data.name).toBe("Urgente");
    });
  });

  describe("GET /api/tags", () => {
    it("deve lista tags", async () => {
      const res = await request(app)
        .get("/api/tags")
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(Array.isArray(res.body.data)).toBe(true);
    });
  });
});
