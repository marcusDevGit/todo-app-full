import { body } from "express-validator";

export const createTask = [
  body("title")
    .notEmpty()
    .withMessage("Título é obrigatório")
    .isLength({ max: 255 })
    .withMessage("Título muito longo"),
  body("description")
    .optional()
    .isLength({ max: 1000 })
    .withMessage("Descrição muito longa"),
  body("dueDate")
    .optional()
    .isISO8601()
    .withMessage("Data deve estar no formato ISO8601"),
  body("status")
    .optional()
    .isIn(["pending", "in_progress", "completed"])
    .withMessage("Status inválido"),
  body("priority")
    .optional()
    .isInt({ min: 0, max: 5 })
    .withMessage("Prioridade deve ser entre 0 e 5"),
  body("tags").optional().isArray().withMessage("Tags deve ser um array"),
  body("tags.*").optional().isString().withMessage("Tag deve ser string"),
];

export const updateTask = [
  body("title")
    .optional()
    .isLength({ max: 255 })
    .withMessage("Título muito longo"),
  body("description")
    .optional()
    .isLength({ max: 1000 })
    .withMessage("Descrição muito longa"),
  body("dueDate")
    .optional()
    .isISO8601()
    .withMessage("Data deve estar no formato ISO8601"),
  body("status")
    .optional()
    .isIn(["pending", "in_progress", "completed"])
    .withMessage("Status inválido"),
  body("priority")
    .optional()
    .isInt({ min: 0, max: 5 })
    .withMessage("Prioridade deve ser entre 0 e 5"),
];
