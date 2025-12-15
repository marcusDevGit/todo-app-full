import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { taskService } from "@/services/taskService";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [loading, setLoading] = useState(false);

  const loadTasks = async () => {
    try {
      const response = await taskService.getTasks();
      setTasks(response.data.data);
    } catch (error) {
      console.error("Erro ao caregar tarefas:", error);
    }
  };

  useEffect(() => {
    loadTasks(); //eslint-disable-line react-hooks/exhaustive-deps
  }, []);

  const handleCreateTask = async (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    setLoading(true);
    try {
      await taskService.createTask({
        title: newTask,
        status: "pending",
      });
      setNewTask("");
      loadTasks();
    } catch (error) {
      console.error("Erro ao criar a tarefa:", error);
    }
    setLoading(false);
  };

  const toggleTaskStatus = async (task) => {
    try {
      const newStatus = task.status === "completed" ? "pending" : "completed";
      await taskService.updateTask(task.id, { status: newStatus });
      loadTasks();
    } catch (error) {
      console.error("Erro ao atualizar status da tarefa", error);
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Bem-vindo, {user?.name || "Usuario"}!
          </h1>
          <Button onClick={logout} variant="outline">
            Sair
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Nova Tarefa</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreateTask} className="flex gap2">
              <Input
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Digite sua tarefa..."
                className="flex-1"
              />
              <Button type="submit" disabled={loading}>
                {loading ? "Criando" : "Criar"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Suas Tarefas ({tasks.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {tasks.length === 0 ? (
              <p className="text-gray-600 text-center py-4">
                Nenhuma tarefa encontrada. Crie sua primeira tarefa!
              </p>
            ) : (
              <div className="space-y-2">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    className={`flex items-center gap-3 p-3 border rouded-lg ${
                      task.status === "completed"
                        ? "bg-green-50 border-green-200"
                        : "bg-white border-gray-200"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={task.status === "completed"}
                      onChange={() => toggleTaskStatus(task)}
                      className="w-4 h-4"
                    />
                    <span
                      className={`flex-1 ${
                        task.status === "completed"
                          ? "line-through text-gray-500"
                          : "text-gray-900"
                      }`}
                    >
                      {task.title}
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(task.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Dashboard;
