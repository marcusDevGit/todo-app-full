import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  X,
  Calendar,
  AlertCircle,
  Edit2,
  ChevronDown,
  Paperclip,
  FileText,
} from "lucide-react";
import TaskEditForm from "./TaskEditForm";
import SubTarefaForm from "./SubtaskForm";
import SubTaskList from "./SubtaskList";
import { taskService } from "@/services/taskService";
import { useToast } from "@/hooks/useToast";

const TaskDetails = ({ task, onClose, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [subtasks, setSubtasks] = useState(task.subtasks || []);
  const [showSubtasks, setShowSubtasks] = useState(false);
  const [attachments, setAttachments] = useState([]);
  const { addToast } = useToast();

  useEffect(() => {
    setSubtasks(task.subtasks || []);
    loadAttachments();
  }, [task]);

  const loadAttachments = async () => {
    try {
      const response = await taskService.getFiles(task.id);
      setAttachments(response.data.data || []);
    } catch (error) {
      console.error("Erro ao carregar anexos:", error);
    }
  };

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

  const handleCreateSubTask = async (data) => {
    setLoading(true);
    try {
      await taskService.createSubtask(task.id, data);
      addToast("Subtarefa criada com sucesso", "success");
      onUpdate();
    } catch (error) {
      console.error("Erro ao criar subtarefa:", error);
      addToast("Erro ao criar subtarefa:", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleToggleSubtaskStatus = async (subtask) => {
    try {
      const newStatus =
        subtask.status === "completed" ? "pending" : "completed";
      await taskService.updateTask(subtask.id, { status: newStatus });
      setSubtasks(
        subtasks.map((st) =>
          st.id === subtask.id ? { ...st, status: newStatus } : st,
        ),
      );
    } catch (error) {
      console.error("Error updating subtask status:", error);
      addToast("Erro ao atualizar o status da subtarefa", "error");
    }
  };

  const handleDeleteSubtask = async (subtask) => {
    if (!window.confirm("Deletar esta subtarefa?")) return;
    try {
      await taskService.deleteTask(subtask.id);
      addToast("Subtarefa deletada com sucesso", "success");
      setSubtasks(subtasks.filter((st) => st.id !== subtask.id));
    } catch (error) {
      console.error("Error ao deletar subtarefa:", error);
      addToast("Erro ao deletar subtarefa", "error");
    }
  };
  if (!task) return null;

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

  const parseLocalDate = (dateStr) => {
    const [year, month, day] = dateStr.split("T")[0].split("-");
    return new Date(year, month - 1, day);
  };

  const isOverdue = task.dueDate && parseLocalDate(task.dueDate) < new Date();

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
          {task.dueDate && (
            <div
              className={`flex items-center gap-2 text-sm ${
                isOverdue ? "text-red-500" : "text-muted-foreground"
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>
                Vencimento: {parseLocalDate(task.dueDate).toLocaleDateString()}
              </span>
            </div>
          )}
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
              Status: {task.status === "completed" ? "Concluída" : "Pendente"}
            </span>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium flex items-center gap-2">
                <Paperclip className="w-4 h-4" /> Anexos
              </p>
            </div>
            <div className="spacy-y-1">
              {attachments.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center gap-2 p-2 bg-muted/50 text-sm"
                >
                  <FileText className="w-4 h-4 text-blue-500" />
                  <span className="truncate flex-1">{file.filename}</span>
                </div>
              ))}
              {attachments.length === 0 && (
                <p className="text-xs text-muted-foreground italic">
                  Nenhum anexo.
                </p>
              )}
            </div>
          </div>

          {subtasks.length > 0 && (
            <div className="mt-4 space-y-3">
              <Button
                variant="ghost"
                onClick={() => setShowSubtasks(!showSubtasks)}
                className="w-full justify-between text-sm font-medium"
              >
                <span> Subtarefas ({subtasks.length})</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    showSubtasks ? "rotate-180" : ""
                  }`}
                />
              </Button>
              {showSubtasks && (
                <div className="mt-3 space-y-3">
                  <SubTarefaForm
                    onSubmit={handleCreateSubTask}
                    loading={loading}
                  />
                  <SubTaskList
                    subtasks={subtasks}
                    onToggleStatus={handleToggleSubtaskStatus}
                    onDelete={handleDeleteSubtask}
                    loading={loading}
                  />
                </div>
              )}
            </div>
          )}
          <div className="border-t pt-4 space-y-3">
            <SubTarefaForm onSubmit={handleCreateSubTask} loading={loading} />
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
