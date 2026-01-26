import { useState } from "react";
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
  AlertCircle,
} from "lucide-react";
import { Card, CardContent } from "./ui/card";
import ReminderBadge from "./ReminderBadge";
import { groupTasksByDate, formatSectionDate } from "@/utils/groupTasksByDate";

const PlannedView = ({
  tasks = [],
  onToggleStatus,
  onToggleImportant,
  onDelete,
  onToggleSubtask,
  onEditTask,
  activeView,
}) => {
  const [expandedSections, setExpandedSections] = useState({
    overdue: true,
    today: true,
    tomorrow: true,
    next7Days: true,
    noDate: false,
  });

  const [expandedTasks, setExpandedTasks] = useState({});

  const toggleSection = (sectionId) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  const toggleExpanded = (taskId) => {
    setExpandedTasks((prev) => ({
      ...prev,
      [taskId]: !prev[taskId],
    }));
  };

  const getPriorityColor = (priority) => {
    const colors = {
      0: "border-l-4 border-gray-400",
      1: "border-l-4 border-yellow-400",
      2: "border-l-4 border-orange-500",
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

  const renderTask = (task) => {
    const progress = getProgressPercentage(task);
    const isExpanded = expandedTasks[task.id];
    const isCompleted = task.status === "completed";

    return (
      <Card
        className={`glass-card animate-fade-in hover:shadow-lg transition-all ${getPriorityColor(
          task.priority,
        )} ${isCompleted ? "opacity-75" : ""}`}
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
              {isCompleted ? (
                <CheckCircle2 className="w-5 h-5 text-primary" />
              ) : (
                <Circle className="w-5 h-5 text-primary hover:text-primary/80" />
              )}
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
              <div className="flex items-center gap-1 text-sm text-muted-foreground bg-gray-700 px-2 py-1 rounded-full">
                <List className="w-3 h-3" />
                <span className="truncate max-w-20">{task.list.name}</span>
              </div>
            )}

            <span
              className={`flex-1 font-medium ${
                isCompleted ? "line-through text-muted-foreground" : ""
              }`}
            >
              {task.title}
            </span>

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
            {!isCompleted && (
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
            {task.dueDate && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
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
              <span className="text-xs text-muted-foreground">{progress}%</span>
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
    );
  };

  const renderSection = (
    title,
    tasks,
    sectionId,
    icon = null,
    highlighted = false,
  ) => {
    if (tasks.length === 0) return null;

    const isExpanded = expandedSections[sectionId];
    const activeTasks = tasks.filter((t) => t.status !== "completed");
    const completedTasks = tasks.filter((t) => t.status === "completed");

    return (
      <div className="space-y-3 mb-6">
        <Button
          variant="ghost"
          onClick={() => toggleSection(sectionId)}
          className={`w-full justify-between h-auto p-3 ${
            highlighted ? "bg-primary/10 hover:bg-primary/20" : ""
          }`}
        >
          <div className="flex items-center gap-3">
            {icon}
            <h3
              className={`text-lg font-semibold ${
                highlighted ? "text-primary" : ""
              }`}
            >
              {title}
            </h3>
            <span className="px-2 py-1 text-xs bg-muted rounded-full">
              {tasks.length}
            </span>
          </div>
          <ChevronDown
            className={`w-5 h-5 transition-transform ${
              isExpanded ? "rotate-180" : ""
            }`}
          />
        </Button>

        {isExpanded && (
          <div className="space-y-3 pl-2">
            {activeTasks.map((task) => (
              <div key={task.id}>{renderTask(task)}</div>
            ))}
            {completedTasks.length > 0 && (
              <div className="mt-6 space-y-3">
                <h4 className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
                  Concluídas
                  <span className="px-2 py-1 text-xs bg-muted rounded-full">
                    {completedTasks.length}
                  </span>
                </h4>
                {completedTasks.map((task) => (
                  <div key={task.id}>{renderTask(task)}</div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  const tasksWithDueDate = tasks.filter((t) => t.dueDate);
  const grouped = groupTasksByDate(tasksWithDueDate);

  return (
    <div className="space-y-4">
      {renderSection(
        "Atrasadas",
        grouped.overdue,
        "overdue",
        <AlertCircle className="w-5 h-5 text-red-500" />,
        false,
      )}

      {renderSection(
        "Hoje",
        grouped.today,
        "today",
        <Calendar className="w-5 h-5 text-primary" />,
        true,
      )}

      {renderSection("Amanhã", grouped.tomorrow, "tomorrow")}

      {Object.keys(grouped.next7Days).length > 0 && (
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Próximos 7 dias</h3>
          {Object.entries(grouped.next7Days).map(([dateKey, dateTasks]) => {
            const formattedDate = formatSectionDate(dateKey);
            return (
              <div key={`next7Days-${dateKey}`}>
                {renderSection(
                  formattedDate,
                  dateTasks,
                  `next7Days-${dateKey}`,
                )}
              </div>
            );
          })}
        </div>
      )}

      {grouped.noDate.length > 0 &&
        renderSection("Sem data", grouped.noDate, "noDate")}

      {tasksWithDueDate.length === 0 && (
        <div className="text-center py-12">
          <div className="w-20 h-20 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Calendar className="w-10 h-10 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold mb-2">
            Nenhuma tarefa planejada
          </h3>
          <p className="text-muted-foreground">
            Adicione datas de vencimento às suas tarefas para vê-las aqui!
          </p>
        </div>
      )}
    </div>
  );
};

export default PlannedView;
