import { Button } from "@/components/ui/button";
import {
  Circle,
  CheckCircle2,
  Star,
  Trash2,
  Calendar,
  ChevronDown,
  Edit2,
  Paperclip,
  List,
} from "lucide-react";
import { Card, CardContent } from "./ui/card";
import ReminderBadge from "./ReminderBadge";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const TaskList = ({
  tasks = [],
  onToggleStatus,
  onToggleImportant,
  onDelete,
  onSelectTask,
  onToggleSubtask,
  onEditTask,
  activeView,
}) => {
  const [expandedTasks, setExpandedTasks] = useState({});

  const activeTasks = tasks.filter((t) => t.status !== "completed");
  const completedTasks = tasks.filter((t) => t.status === "completed");

  const toggleExpanded = (taskId) => {
    setExpandedTasks((prev) => ({
      ...prev,
      [taskId]: !prev[taskId],
    }));
  };

  const getPriorityColor = (priority) => {
    const colors = {
      0: "border-l-4 border-gray-400", // Baixa
      1: "border-l-4 border-yellow-400", // Média
      2: "border-l-4 border-orange-500", // Alta
      3: "border-l-4 border-red-500",
    };
    return colors[priority] || colors[0];
  };

  const getProgressPercentage = (task) => {
    if (!task.subtasks || task.subtasks.length === 0) return 0;
    const completedSubtasks = task.subtasks.filter(
      (st) => st.status === "completed",
    ).length;
    return Math.round((completedSubtasks / task.subtasks.length) * 100);
  };

  const isOverdue = (dueDate) => {
    if (!dueDate) return false;
    const dueTime = new Date(dueDate).getTime();
    const todayTime = new Date().setHours(23, 59, 59, 999);
    return dueTime < todayTime;
  };

  const formatDueDate = (dueDate) => {
    if (!dueDate) return null;

    const date = new Date(dueDate);
    const localDate = new Date(
      date.getTime() + date.getTimezoneOffset() * 60000,
    );

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (localDate.toDateString() === today.toDateString()) return "Hoje";
    if (localDate.toDateString() === tomorrow.toDateString()) return "Amanhã";
    return localDate.toLocaleDateString("pt-BR", {
      month: "short",
      day: "numeric",
    });
  };

  useEffect(() => {
    const checkReminders = () => {
      const now = new Date();
      tasks.forEach((task) => {
        if (task.reminderDate && task.reminderTime) {
          const date = new Date(task.reminderDate);
          const localDate = new Date(
            date.getTime() + date.getTimezoneOffset() * 60000,
          );
          const reminderDateTimeStr = `${
            localDate.toISOString().split("T")[0]
          }T${task.reminderTime}:00`;
          const reminderTime = new Date(reminderDateTimeStr);
          const timeDiff = reminderTime - now;
          if (Math.abs(timeDiff) <= 10000) {
            toast.info(`Lembrete: ${task.title}`, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
            if (Notification.permission === "granted") {
              new Notification(`Lembrete: ${task.title}`, {
                body: "È hora de verificar sua tarefa!",
                // icon: "/favicon.ico"
                requireInteraction: true,
                silent: false,
                vibrate: [200, 100, 200],
              });
            } else if (Notification.permission !== "denied") {
              Notification.requestPermission().then((permission) => {
                if (permission === "granted") {
                  new Notification(`Lembrete: ${task.title}`, {
                    body: "È hora de verificar sua tarefa!",
                    // icon: "/favicon.ico"
                    requireInteraction: true,
                    silent: false,
                    vibrate: [200, 100, 200],
                  });
                }
              });
            }
          }
        }
      });
    };

    const interval = setInterval(checkReminders, 10000);
    checkReminders();
    return () => clearInterval(interval);
  }, [tasks]);

  return (
    <div className="space-y-3">
      {activeTasks.map((task) => {
        const progress = getProgressPercentage(task);
        const overdue = isOverdue(task.dueDate);
        const isExpanded = expandedTasks[task.id];
        return (
          <div key={task.id}>
            <Card
              className={`glass-card animate-fade-in hover:shadow-lg transition-all ${getPriorityColor(
                task.priority,
              )}`}
            >
              <CardContent className="p-4 space-y-2">
                <div className="flex items-center gap-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleStatus(task);
                    }}
                    className="p-0 h-auto hover:bg-transparent"
                  >
                    <Circle className="w-5 h-5 text-primary hover:text-primary/80" />
                  </Button>

                  {task.subtasks && task.subtasks.length > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleExpanded(task.id);
                      }}
                      className="p-0 h-auto"
                    >
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${
                          isExpanded ? "rotate-180" : ""
                        }`}
                      />
                    </Button>
                  )}
                  {task.list && activeView !== task.list.id && (
                    <div className="flex items-center gap-1 text-sm text-muted-foreground bg-gray-700 px-2 py-1  rounded-full">
                      <List className="w-3 h-3" />
                      <span className="truncate max-w-20">
                        {task.list.name}
                      </span>
                    </div>
                  )}

                  <span className="flex-1 font-medium">{task.title}</span>

                  {task.attachments && task.attachments.length > 0 && (
                    <Paperclip className="w-4 h-4 text-blue-700" />
                  )}

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleImportant(task);
                    }}
                    className="p-0 h-auto hover:bg-transparent"
                  >
                    <Star
                      className={`w-4 h-4 ${
                        task.important
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-yellow-500 hover:text-yellow-400"
                      }`}
                    />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onEditTask?.(task);
                    }}
                    className="p-0 h-auto hover:bg-transparent"
                  >
                    <Edit2 className="w-4 h-4 text-green-700 hover:text-primary" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(task);
                    }}
                    className="p-0 h-auto hover:bg-transparent"
                  >
                    <Trash2 className="w-4 h-4 text-amber-700 hover:text-red-500" />
                  </Button>
                  {task.dueDate && (
                    <div
                      className={`flex items-center gap-1 text-xs ${
                        overdue ? "text-red-500" : "text-muted-foreground"
                      }`}
                    >
                      <Calendar className="w-3 h-3" />
                      <span>{formatDueDate(task.dueDate)}</span>
                    </div>
                  )}
                  {task.reminderDate && (
                    <ReminderBadge reminderDate={task.reminderDate} />
                  )}
                </div>
                {task.description && (
                  <div className="text-sm text-muted-foreground">
                    {task.description}
                  </div>
                )}
                {progress > 0 && (
                  <div className="flex items-center gap-2 pl-7">
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-blue-500 transition-all"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {progress}%
                    </span>
                  </div>
                )}
                {task.tags && task.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {task.tags.map((tagObj) => (
                      <span
                        key={tagObj.tag.id}
                        className="px-2 py-1 text-xs bg-primary/10 rounded-full"
                        style={{
                          backgroundColor: tagObj.tag.color || "#3b82f6",
                        }}
                      >
                        {tagObj.tag.name}
                      </span>
                    ))}
                  </div>
                )}
                {isExpanded && task.subtasks && task.subtasks.length > 0 && (
                  <div className="mt-3 space-y-2 border-t pt-3 pl-7">
                    {task.subtasks.map((subtask) => (
                      <div
                        key={subtask.id}
                        className="flex items-center gap-2 text-sm"
                      >
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleSubtask?.(subtask);
                          }}
                          className="p-0 h-auto hover:bg-transparent"
                        >
                          {subtask.status === "completed" ? (
                            <CheckCircle2 className="w-4 h-4 text-primary" />
                          ) : (
                            <Circle className="w-4 h-4 text-gray-400" />
                          )}
                        </Button>
                        <span
                          className={
                            subtask.status === "completed"
                              ? "line-through text-muted-foreground"
                              : ""
                          }
                        >
                          {subtask.title}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        );
      })}
      {completedTasks.length > 0 && (
        <div className="mt-8 space-y-3">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            Concluidas
            <span className="px-2 py-1 text-xs bg-muted rounded-full">
              {completedTasks.length}
            </span>
          </h3>
          {completedTasks.map((task) => (
            <Card
              key={task.id}
              className="glass-card animate-fade-in opacity-75 hover:opacity-90 transition-all cursor-pointer"
              onClick={() => onSelectTask?.(task)}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleStatus(task);
                    }}
                    className="p-0 h-auto hover:bg-transparent"
                  >
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                  </Button>
                  <span className="flex-1 line-through text-muted-foreground">
                    {task.title}
                  </span>

                  {task.list && activeView !== task.list.id && (
                    <div className="flex items-center gap-1 text-sm text-muted-foreground bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
                      <List className="w-3 h-3" />
                      <span className="truncate max-w-20">
                        {task.list.name}
                      </span>
                    </div>
                  )}
                  {task.attachments && task.attachments.length > 0 && (
                    <Paperclip className="w-4 h-4 text-muted-foreground" />
                  )}

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(task);
                    }}
                    className="p-0 h-auto hover:bg-transparent"
                  >
                    <Trash2 className="w-4 h-4 text-amber-700 hover:text-red-500" />
                  </Button>
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
          <h3 className="text-xl font-semibold mb-2">Nenhuma tarefa ainda</h3>
          <p className="text-muted-foreground">
            Adicione sua primeira tarefa para começar!
          </p>
        </div>
      )}
    </div>
  );
};

export default TaskList;
