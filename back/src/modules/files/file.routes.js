import { Router } from "express";
import * as controller from "./file.controller.js";
import auth from "../../middleware/authMiddleware.js";
import upload from "../../config/multer.js";

const router = Router();

router.use(auth);

/**
 * @swagger
 * /files/{taskId}:
 *   post:
 *     summary: Realizar upload de arquivo para uma tarefa
 *     tags: [Arquivos]
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da tarefa
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - file
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: Arquivo a ser enviado
 *     responses:
 *       201:
 *         description: Arquivo enviado com sucesso
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
 *                   example: Arquivo enviado com sucesso
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     filename:
 *                       type: string
 *                     path:
 *                       type: string
 *                     taskId:
 *                       type: integer
 *       400:
 *         description: Arquivo inválido ou não fornecido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post("/:taskId", upload.single("file"), controller.uploadFile);

/**
 * @swagger
 * /files/{taskId}:
 *   get:
 *     summary: Listar arquivos de uma tarefa
 *     tags: [Arquivos]
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da tarefa
 *     responses:
 *       200:
 *         description: Lista de arquivos retornada com sucesso
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
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       filename:
 *                         type: string
 *                       path:
 *                         type: string
 *                       taskId:
 *                         type: integer
 */
router.get("/:taskId", controller.getByTask);

/**
 * @swagger
 * /files/{id}:
 *   delete:
 *     summary: Excluir arquivo
 *     tags: [Arquivos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do arquivo
 *     responses:
 *       200:
 *         description: Arquivo excluído com sucesso
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
 *                   example: Arquivo excluído com sucesso
 *       404:
 *         description: Arquivo não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete("/:id", controller.remove);

export default router;
