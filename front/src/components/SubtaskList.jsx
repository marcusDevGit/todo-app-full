import { Button } from "./ui/button";
import { Circle, CheckCircle2, Trash2 } from "lucide-react";
import { Card, CardContent } from "./ui/card";

const SubTaskList = ({
  subtasks = [],
  onToggleStatus,
  onDelete,
  loading = false,
}) => {
  if (subtasks.length === 0) return null;

  return (
    <div className="space-y-2">
      <h4 className="text-sm font-semibold">Subtarefas ({subtasks.length})</h4>
      {subtasks.map((subtask) => (
        <Card key={subtask.id} className="glass-card">
          <CardContent className="p-3">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onToggleStatus(subtask)}
                disabled={loading}
                className="p-0 h-auto hover:bg-transparent"
              >
                {subtask.status === "completed" ? (
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                ) : (
                  <Circle className="w-4 h-4 text-primary" />
                )}
              </Button>
              <span
                className={`flex-1 text-sm ${
                  subtask.status === "completed"
                    ? "line-through text-muted-foreground"
                    : ""
                }`}
              >
                {subtask.title}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDelete(subtask)}
                disabled={loading}
                className="p-0 h-auto hover:bg-transparent"
              >
                <Trash2 className="w-3 h-3 text-gray-400 hover:bg-transparent" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default SubTaskList;
