import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/useToast";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import Sidebar from "@/components/Sidebar";
import TaskForm from "@/components/TaskForm";
import TaskList from "@/components/TaskList";
import TaskDetails from "@/components/TaskDetails";
import SearchFilter from "@/components/SearchFilter";
import { taskService } from "@/services/taskService";

const Dashboard = () => {
  const { user, logout, loading: authLoading } = useAuth();
  const { addToast } = useToast();
  const [tasks, setTasks] = useState([]);
  const [allTags, setAllTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeView, setActiveView] = useState("tasks");
  const [showSidebar, setShowSidebar] = useState(true);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const loadTasks = async () => {
    try {
      const response = await taskService.getTasks();
      setTasks(response.data.data);
    } catch (error) {
      console.error("Erro ao caregar tarefas:", error);
      addToast("Erro ao caregar tarefas:", "error");
    }
  };

  const loadTags = async () => {
    try {
      const response = await taskService.getTags();
      setAllTags(response.data.data);
    } catch (error) {
      console.error("Erro ao caregar tags:", error);
      addToast("Erro ao caregar tags:", " error");
    }
  };

  const handleSearch = async (filters) => {
    setLoading(true);
    try {
      const response = await taskService.search(filters);
      setTasks(response.data.data);
    } catch (error) {
      console.error("Erro ao buscar tarefas:", error);
      addToast("Erro ao buscar tarefas", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!authLoading && user) {
      loadTasks();
      loadTags();
    }
  }, [authLoading, user]);

  const handleCreateTask = async (data) => {
    setLoading(true);
    try {
      await taskService.createTask({
        title: data.title,
        status: "pending",
      });
      addToast("Tarefa criada com sucesso!", "success");
      loadTasks();
    } catch (error) {
      console.error("Erro ao criar a tarefa:", error);
      addToast("Erro ao criar a tarefa:", "error");
    } finally {
      setLoading(false);
    }
  };

  const toggleTaskStatus = async (task) => {
    try {
      const newStatus = task.status === "completed" ? "pending" : "completed";
      await taskService.updateTask(task.id, { status: newStatus });
      addToast(
        newStatus === "completed" ? "Tarefa concluida!" : "Tarefa reaberta",
        "success"
      );
      loadTasks();
    } catch (error) {
      console.error("Erro ao atualizar status da tarefa", error);
      addToast("Erro ao atualizar status da tarefa", "error");
    }
  };

  const handleToggleImportant = async (task) => {
    try {
      const newImportant = !task.important;
      await taskService.updateTask(task.id, { important: newImportant });
      addToast(
        newImportant
          ? "Tarefa marcada como importante!"
          : "Removido de importante",
        "success"
      );
      loadTasks();
    } catch (error) {
      console.error("Erro ao marca com importante:", error);
      addToast("Erro ao marca com importante:", "error");
    }
  };

  const handleDeleteTask = async (task) => {
    // eslint-disable-next-line no-alert
    if (!window.confirm("Tem certeza que deseja deletar esta tarefa?")) return;
    try {
      await taskService.deleteTask(task.id);
      addToast("Tarefa deletada com sucesso!", "success");
      loadTasks();
      setSelectedTask(null);
    } catch (error) {
      console.error("Erro ao deletar tarefa:", error);
      addToast("Erro ao deletar tarefa:", "error");
    }
  };

  const getFilteredTasks = () => {
    const today = new Date().toDateString();

    switch (activeView) {
      case "today":
        return tasks.filter(
          (t) => new Date(t.createdAt).toDateString() === today
        );
      case "important":
        return tasks.filter((t) => t.important);
      case "planned":
        return tasks.filter((t) => t.dueDate);
      case "assigned":
        return tasks.filter((t) => t.userId);
      default:
        return tasks;
    }
  };

  const filteredTasks = getFilteredTasks();
  const activeTasks = filteredTasks.filter((t) => t.status !== "completed");
  const completedTasks = filteredTasks.filter((t) => t.status === "completed");

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      <Sidebar
        activeView={activeView}
        setActiveView={setActiveView}
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
        showMobileSidebar={showMobileSidebar}
        setShowMobileSidebar={setShowMobileSidebar}
        user={user}
        logout={logout}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="lg:hidden flex items-center justify-between p-4 bg-card border-b">
          <Button
            onClick={() => setShowMobileSidebar(true)}
            size="sm"
            variant="ghost"
          >
            <Menu className="w-6 h-6" />
          </Button>
          <h1 className="text-xl font-bold gradient-text">To Do List</h1>
          <div className="w-10" />
        </div>
        <div className="flex-1 overflow-y-auto p-6 scrollbar-thin">
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold gradient-text">
                  {activeView === "tasks"
                    ? "Tarefas"
                    : activeView === "today"
                    ? " O Meu Dia"
                    : activeView === "important"
                    ? "Importante"
                    : activeView === "planned"
                    ? "Planejado"
                    : " Atribuído a min"}
                </h2>
                <p className="text-muted-foreground mt-1">
                  {activeTasks.length} ativas ● {completedTasks.length}
                  {""}
                  concluídas
                </p>
              </div>
            </div>
            <SearchFilter onSearch={handleSearch} tags={allTags} />
            <TaskForm onsubmit={handleCreateTask} loading={loading} />
            <TaskList
              tasks={filteredTasks}
              onToggleStatus={toggleTaskStatus}
              onToggleImportant={handleToggleImportant}
              onDelete={handleDeleteTask}
              onSelectTask={setSelectedTask}
            />
          </div>
        </div>
      </div>
      {selectedTask && (
        <TaskDetails
          task={selectedTask}
          onClose={() => {
            setSelectedTask(null);
            loadTasks();
          }}
          onUpdate={loadTasks}
        />
      )}
    </div>
  );
};

export default Dashboard;
