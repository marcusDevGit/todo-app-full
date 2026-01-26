import api from "./api";

export const listService = {
  // Cria uma nova lista no backend
  createList: (name) => api.post("/lists", { name }),
  // Obtém todas as listas do usuário no backend
  getLists: () => api.get("/lists"),
};
