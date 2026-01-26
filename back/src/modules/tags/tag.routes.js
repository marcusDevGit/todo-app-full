import { Router } from "express";
import * as controller from "./tag.controller.js";
import auth from "../../middleware/authMiddleware.js";

const router = Router();

router.use(auth);

/**
 * @swagger
 * /tags:
 *   get:
 *     summary: Listar todas as tags
 *     tags: [Tags]
 *     responses:
 *       200:
 *         description: Lista de tags retornada com sucesso
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
 *                     $ref: '#/components/schemas/Tag'
 *       401:
 *         description: Não autenticado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/", controller.getAll);

/**
 * @swagger
 * /tags:
 *   post:
 *     summary: Criar nova tag
 *     tags: [Tags]
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
 *                 example: Trabalho
 *               color:
 *                 type: string
 *                 example: "#3b82f6"
 *                 description: Cor em hexadecimal (opcional, será gerada automaticamente se não fornecida)
 *     responses:
 *       201:
 *         description: Tag criada com sucesso
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
 *                   example: Tag criada com sucesso
 *                 data:
 *                   $ref: '#/components/schemas/Tag'
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Não autenticado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post("/", controller.create);

/**
 * @swagger
 * /tags/{id}:
 *   delete:
 *     summary: Excluir uma tag
 *     tags: [Tags]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da tag
 *     responses:
 *       200:
 *         description: Tag excluída com sucesso
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
 *                   example: Tag excluída com sucesso
 *       401:
 *         description: Não autenticado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Tag não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete("/:id", controller.del);

export default router;
