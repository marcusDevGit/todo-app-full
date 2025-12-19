import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
// import Layout from "@/components/Layout";
import { Menu, Plus, Circle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Sidebar from "@/components/Sidebar";
import TaskForm from "@/components/TaskForm";
import TaskList from "@/components/TaskList";
import TaskDetails from "@/components/TaskDetails";
import { taskService } from "@/services/taskService";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeView, setActiveView] = useState(tasks);
  const [showSidebar, setShowSidebar] = useState(true);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const loadTasks = async () => {
    try {
      const response = await taskService.getTasks();
      setTasks(response.data.data);
    } catch (error) {
      console.error("Erro ao caregar tarefas:", error);
    }
  };
  useEffect(() => {
    loadTasks();
  }, []);

  const handleCreateTask = async (data) => {
    setLoading(true);
    try {
      await taskService.createTask({
        title: data.title,
        status: "pending",
      });
      loadTasks();
    } catch (error) {
      console.error("Erro ao criar a tarefa:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleTaskStatus = async (task) => {
    try {
      const newStatus = task.status === "completed" ? "pending" : "completed";
      await taskService.updateTask(task.id, { status: newStatus });
      await loadTasks();
    } catch (error) {
      console.error("Erro ao atualizar status da tarefa", error);
    }
  };

  const handleToggleImportant = async (task) => {
    try {
      const newImportant = !task.important;
      await taskService.updateTask(task.id, { important: newImportant });
      loadTasks();
    } catch (error) {
      console.error("Erro ao marca com importante:", error);
    }
  };

  const handleDeleteTask = async (task) => {
    if (!confirm("Tem certeza que deseja deletar esta tarefa?")) return;
    try {
      await taskService.deleteTask(task.id);
      loadTasks();
      setSelectedTask(null);
    } catch (error) {
      console.error("Erro ao deletar tarefa:", error);
    }
  };

  const activeTasks = tasks.filter((t) => t.status !== "completed");
  const completedTasks = tasks.filter((t) => t.status === "completed");

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
                  Minhas Tarefas
                  {activeView === "tasks" ? "Tarefas" : "O Meu Dia"}
                </h2>
                <p className="text-muted-foreground mt-1">
                  {activeTasks.length} ativas · {completedTasks.length}
                  concluídas
                </p>
              </div>
            </div>

            <TaskForm onsubmit={handleCreateTask} loading={loading} />

            <TaskList
              tasks={tasks}
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
          onClose={() => setSelectedTask(null)}
        />
      )}
    </div>
  );
};

export default Dashboard;
