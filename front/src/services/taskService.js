import api from "./api";

export const taskService = {
  getTasks: () => api.get("/tasks"),

  createTask: (data) => api.post("/tasks", data),

  updateTask: (id, data) => api.put(`/tasks/${id}`, data),

  deleteTask: (id) => api.delete(`/tasks/${id}`),
  getSubtasks: (id) => api.get(`/tasks/${id}/subtasks`),
  createSubtask: (id, data) => api.post(`/tasks/${id}/subtasks`, data),
};
