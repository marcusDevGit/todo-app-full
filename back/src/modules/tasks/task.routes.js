import { Router } from "express";
import * as controller from "./task.controller.js";
import auth from "../../middleware/authMiddleware.js";
import { createTask, updateTask } from "./task.validation.js";
import validate from "../../middleware/validate.js";

const router = Router();

router.use(auth);

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Criar nova tarefa
 *     tags: [Tarefas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *                 example: Completar relatório
 *               description:
 *                 type: string
 *                 example: Finalizar o relatório mensal de vendas
 *               status:
 *                 type: string
 *                 enum: [pending, in_progress, completed]
 *                 example: pending
 *               priority:
 *                 type: integer
 *                 minimum: 0
 *                 maximum: 3
 *                 example: 2
 *               important:
 *                 type: boolean
 *                 example: false
 *               dueDate:
 *                 type: string
 *                 format: date-time
 *                 example: 2026-02-01T10:00:00Z
 *               listId:
 *                 type: integer
 *                 example: 1
 *               tags:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 example: [1, 2]
 *     responses:
 *       201:
 *         description: Tarefa criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Tarefa criada com sucesso
 *                 data:
 *                   $ref: '#/components/schemas/Task'
 */
router.post("/", createTask, validate, controller.create);

/**
 * @swagger
 * /tasks/search:
 *   get:
 *     summary: Buscar tarefas com filtros
 *     tags: [Tarefas]
 *     parameters:
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         description: Buscar por título
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [pending, in_progress, completed]
 *         description: Filtrar por status
 *       - in: query
 *         name: priority
 *         schema:
 *           type: integer
 *           minimum: 0
 *           maximum: 3
 *         description: Filtrar por prioridade
 *       - in: query
 *         name: dueDateFrom
 *         schema:
 *           type: string
 *           format: date
 *         description: Data de vencimento inicial
 *       - in: query
 *         name: dueDateTo
 *         schema:
 *           type: string
 *           format: date
 *         description: Data de vencimento final
 *       - in: query
 *         name: tagIds
 *         schema:
 *           type: string
 *         description: IDs de tags em formato JSON (ex. "[1,2,3]")
 *     responses:
 *       200:
 *         description: Tarefas encontradas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Task'
 */
router.get("/search", controller.search);

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Listar todas as tarefas do usuário
 *     tags: [Tarefas]
 *     responses:
 *       200:
 *         description: Lista de tarefas retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Task'
 */
router.get("/", controller.getAll);

/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Buscar tarefa por ID
 *     tags: [Tarefas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da tarefa
 *     responses:
 *       200:
 *         description: Tarefa retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Task'
 *       404:
 *         description: Tarefa não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/:id", controller.getById);

/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Atualizar tarefa
 *     tags: [Tarefas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da tarefa
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [pending, in_progress, completed]
 *               priority:
 *                 type: integer
 *                 minimum: 0
 *                 maximum: 3
 *               important:
 *                 type: boolean
 *               dueDate:
 *                 type: string
 *                 format: date-time
 *               listId:
 *                 type: integer
 *               tags:
 *                 type: array
 *                 items:
 *                   type: integer
 *     responses:
 *       200:
 *         description: Tarefa atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Tarefa atualizada com sucesso
 *                 data:
 *                   $ref: '#/components/schemas/Task'
 *       404:
 *         description: Tarefa não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put("/:id", updateTask, validate, controller.update);

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Excluir tarefa
 *     tags: [Tarefas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da tarefa
 *     responses:
 *       200:
 *         description: Tarefa excluída com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Tarefa excluída com sucesso
 *       404:
 *         description: Tarefa não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete("/:id", controller.remove);

/**
 * @swagger
 * /tasks/{id}/subtasks:
 *   get:
 *     summary: Listar subtarefas de uma tarefa
 *     tags: [Tarefas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da tarefa pai
 *     responses:
 *       200:
 *         description: Lista de subtarefas retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Task'
 */
router.get("/:id/subtasks", controller.getSubtasks);

/**
 * @swagger
 * /tasks/{id}/subtasks:
 *   post:
 *     summary: Criar subtarefa
 *     tags: [Tarefas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da tarefa pai
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *                 example: Revisar seção 1
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [pending, in_progress, completed]
 *                 example: pending
 *     responses:
 *       201:
 *         description: Subtarefa criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Subtarefa criada com sucesso
 *                 data:
 *                   $ref: '#/components/schemas/Task'
 */
router.post("/:id/subtasks", createTask, validate, controller.createSubtask);

export default router;
