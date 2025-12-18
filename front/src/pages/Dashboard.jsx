import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/hooks/useAuth";
// import Layout from "@/components/Layout";
import { Menu, Plus, Circle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import Sidebar from "@/components/Sidebar";
import { taskService } from "@/services/taskService";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [loading, setLoading] = useState(false);
  // const [activeView, setActiveView] = useState(tasks);
  const [showSidebar, setShowSidebar] = useState(true);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);

  const loadTasks = useCallback(async () => {
    try {
      const response = await taskService.getTasks();
      setTasks(response.data.data);
    } catch (error) {
      console.error("Erro ao caregar tarefas:", error);
    }
  }, []);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    loadTasks();
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
      await loadTasks();
    } catch (error) {
      console.error("Erro ao criar a tarefa:", error);
    }
    setLoading(false);
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

  const activeTasks = tasks.filter((t) => t.status !== "completed");
  const completedTasks = tasks.filter((t) => t.status === "completed");

  return (
    <div className="flex h-screen">
      <Sidebar
        activeView={activeTasks}
        // setActiveView={setActiveView}
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
                  {/* {activeView === "tasks" ? "Tarefas" : "O Meu Dia"} */}
                </h2>
                <p className="text-muted-foreground mt-1">
                  {activeTasks.length} ativas · {completedTasks.length}{" "}
                  concluídas
                </p>
              </div>
            </div>

            <Card className="glass-card animate-fade-in">
              <CardContent className="p-4">
                <form
                  onSubmit={handleCreateTask}
                  className="flex items-center gap-3"
                >
                  <Circle className="w-5 h-5 text-primary/60 flex-shrink-0" />
                  <Input
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="Nova tarefa"
                    className="flex-1 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                  <Button
                    type="submit"
                    disabled={loading}
                    size="sm"
                    className="bg-gradient-to-r from-primary to-blue-500 hover:from-primary/90 hover:to-blue-500/90"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="space-y-3">
              {activeTasks.map((task) => (
                <Card
                  key={task.id}
                  className="glass-card animate-fade-in hover:shadow-lg transition-all cursor-pointer"
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleTaskStatus(task)}
                        className="p-0 h-auto hover:bg-transparent"
                      >
                        <Circle className="w-5 h-5 text-primary hover:text-primary/80" />
                      </Button>
                      <span className="flex-1">{task.title}</span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(task.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {completedTasks.length > 0 && (
                <div className="mt-8 space-y-3">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    Concluídas
                    <span className="px-2 py-1 text-xs bg-muted rounded-full">
                      {completedTasks.length}
                    </span>
                  </h3>
                  {completedTasks.map((task) => (
                    <Card
                      key={task.id}
                      className="glass-card animate-fade-in opacity-75 hover:opacity-90 transition-all"
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleTaskStatus(task)}
                            className="p-0 h-auto hover:bg-transparent"
                          >
                            <CheckCircle2 className="w-5 h-5 text-primary" />
                          </Button>
                          <span className="flex-1 line-through text-muted-foreground">
                            {task.title}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {new Date(task.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
              {tasks.length === 0 && (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-10 h-10 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    Nenhuma tarefa encontrada
                  </h3>
                  <p className="text-muted-foreground">
                    Adicione sua primeira tarefa para começar!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
