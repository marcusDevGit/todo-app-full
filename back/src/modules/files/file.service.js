import * as repository from "./file.repository.js";
import AppError from "../../core/error.js";

export const uploadFile = async (taskId, file) => {
  return repository.create({
    taskId: parseInt(taskId),
    filename: file.originalname,
    url: `/uploads/${file.filename}`,
    size: file.size,
    mime: file.mimetype,
  });
};

export const getByTask = (taskId) => repository.findByTask(parseInt(taskId));
export const remove = (id) => repository.remove(parseInt(id));

// export const getById = async (id) => {
//     const file = await repository.findById(parseInt(id));
//     if (!file) {
//         throw new AppError('File não encontrado', 404)
//     }
// }
