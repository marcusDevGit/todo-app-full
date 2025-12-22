import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { X, Calendar, AlertCircle, Edit2 } from "lucide-react";
import TaskEditForm from "./TaskEditForm";
import { taskService } from "@/services/taskService";
import { useToast } from "@/hooks/useToast";

const TaskDetails = ({ task, onClose, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();

  if (!task) return null;

  const handleSave = async (data) => {
    setLoading(true);
    try {
      await taskService.updateTask(task.id, data);
      addToast("tarefa atualizada com sucesso", "success");
      onUpdate();
      setIsEditing(false);
    } catch (error) {
      console.error("Erro ao atualizar a tarefa:", error);
      addToast("Erro ao atualizar a tarefa:", "error");
    } finally {
      setLoading(false);
    }
  };

  if (isEditing) {
    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-end lg:items-center justify-center p-4">
        <div className="w-full max-w-md">
          <TaskEditForm
            task={task}
            onSave={handleSave}
            onCancel={() => setIsEditing(false)}
            loading={loading}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end lg:items-center justify-center p-4">
      <Card className=" w-full max-w-md glass-card animate-slide-in">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="gradient-text">Detalhes da Tarefa</CardTitle>
          <div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsEditing(true)}
              className="p-0 h-auto"
            >
              <Edit2 className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="p-0 h-auto"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold text-lg">{task.title}</h3>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>
              Criada em {new Date(task.createdAt).toLocaleDateString()}
            </span>
          </div>
          {task.description && (
            <div>
              <p className="text-sm font-medium mb-2">Descrição</p>
              <p className="text-sm text-muted-foreground">
                {task.description}
              </p>
            </div>
          )}
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-yellow-500" />
            <span className="text-sm">
              Status: {task.status === "comleted" ? "Concluída" : "Pendente"}
            </span>
          </div>
          <Button variant="outline" className="w-full" onClick={onClose}>
            Fechar
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default TaskDetails;
