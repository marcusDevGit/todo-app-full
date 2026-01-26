import { Router } from "express";
import * as listController from "./list.controller.js";
import authMiddleware from "../../middleware/authMiddleware.js";

const router = Router();

router.use(authMiddleware);

/**
 * @swagger
 * /lists:
 *   post:
 *     summary: Criar nova lista
 *     tags: [Listas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: Projetos Pessoais
 *     responses:
 *       201:
 *         description: Lista criada com sucesso
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
 *                   example: Lista criada com sucesso
 *                 data:
 *                   $ref: '#/components/schemas/List'
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post("/", listController.create);

/**
 * @swagger
 * /lists:
 *   get:
 *     summary: Listar todas as listas do usuário
 *     tags: [Listas]
 *     responses:
 *       200:
 *         description: Listas retornadas com sucesso
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
 *                     $ref: '#/components/schemas/List'
 */
router.get("/", listController.getAll);

/**
 * @swagger
 * /lists/{id}:
 *   get:
 *     summary: Buscar lista por ID
 *     tags: [Listas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da lista
 *     responses:
 *       200:
 *         description: Lista retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/List'
 *       404:
 *         description: Lista não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/:id", listController.getById);

/**
 * @swagger
 * /lists/{id}:
 *   put:
 *     summary: Atualizar lista
 *     tags: [Listas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da lista
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Novo Nome da Lista
 *     responses:
 *       200:
 *         description: Lista atualizada com sucesso
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
 *                   example: Lista atualizada com sucesso
 *                 data:
 *                   $ref: '#/components/schemas/List'
 *       404:
 *         description: Lista não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put("/:id", listController.update);

/**
 * @swagger
 * /lists/{id}:
 *   delete:
 *     summary: Excluir lista
 *     tags: [Listas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da lista
 *     responses:
 *       200:
 *         description: Lista excluída com sucesso
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
 *                   example: Lista excluída com sucesso
 *       404:
 *         description: Lista não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete("/:id", listController.remove);

export default router;
