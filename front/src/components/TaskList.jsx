import { Button } from "@/components/ui/button";
import { Circle, CheckCircle2, Star, Trash2, Car } from "lucide-react";
import { Card, CardContent } from "./ui/card";

const TaskList = ({
  tasks = [],
  onToggleStatus,
  onToggleImportant,
  onDelete,
  onSelectTask,
}) => {
  const activeTasks = tasks.filter((t) => t.status !== "completed");
  const completedTasks = tasks.filter((t) => t.status === "completed");

  return (
    <div className="space-y-3">
      {activeTasks.map((task) => (
        <Card
          key={task.id}
          className="glass-card animate-fade-in hover:shadow-lg transition-all"
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
                <Circle className="w-5 h-5 text-primary hover:text-primary/80" />
              </Button>
              <span className="flex-1 font-medium">{task.title}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleImportant(task);
                }}
                className="p-0 h-auto hover:bg-transparent"
              >
                {/* <Star
                  className={`w-4 h-4 ${
                    task.important
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-400 hover:text-yellow-400"
                  }`}
                /> */}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(task);
                }}
                className="p-9 h-auto hover:bg-transparent"
              >
                <Trash2 className="w-4 h-4 text-gray-400 hover:text-red-500" />
              </Button>
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
            Concluidas
            <span className="px-2 py-1 text-xs bg-muted rounded-full">
              {completedTasks.length}
            </span>
          </h3>
          {completedTasks.map((task) => (
            <Card
              key={task.id}
              className="glass-card animate-fade-in opacity-75 hover:opacity-90 transition-all"
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
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(task);
                    }}
                    className="p-0 h-auto hover:bg-transparent"
                  >
                    <Trash2 className="w-4 h-4 text-gray-400 hover:text-red-500" />
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
