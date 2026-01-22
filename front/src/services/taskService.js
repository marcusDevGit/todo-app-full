import api from "./api";

export const taskService = {
  getTasks: () => api.get("/tasks"),
  search: (filters) => api.get("/tasks/search", { params: filters }),
  createTask: (data) => api.post("/tasks", data),
  updateTask: (id, data) => api.put(`/tasks/${id}`, data),
  deleteTask: (id) => api.delete(`/tasks/${id}`),
  getSubtasks: (id) => api.get(`/tasks/${id}/subtasks`),
  createSubtask: (id, data) => api.post(`/tasks/${id}/subtasks`, data),
  getTags: () => api.get("/tags"),
  createTag: (data) => api.post("/tags", data),

  uploadFile: (taskId, file) => {
    const formData = new FormData();
    formData.append("file", file);
    return api.post(`/files/${taskId}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
  getFiles: (taskId) => api.get(`/files/${taskId}`),
};
