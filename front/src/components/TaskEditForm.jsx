import { useState, useEffect, useRef } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent } from "./ui/card";
import { X, Trash2, Paperclip, Upload, FileText, List } from "lucide-react";
import TagSelector from "./TagSelector";
import { taskService } from "@/services/taskService";
import { useToast } from "@/hooks/useToast";
import { Checkbox } from "./ui/checkbox";
import { Label } from "@radix-ui/react-label";

const TaskEditForm = ({
  task,
  onSave,
  onCancel,
  loading = false,
  userLists = [],
}) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || "");
  const [priority, setPriority] = useState(task.priority || 0);
  const [reminderDate, setReminderDate] = useState(
    task.reminderDate
      ? new Date(task.reminderDate).toISOString().split("T")[0]
      : "",
  );
  const [reminderTime, setReminderTime] = useState(task.reminderTime || "");
  const [reminderFrequency, setReminderFrequency] = useState(
    task.reminderFrequency || "once",
  );
  const [dueDate, setDueDate] = useState(
    task.dueDate ? new Date(task.dueDate).toISOString().split("T")[0] : "",
  );
  const [selectedTags, setSelectedTags] = useState(
    task.tags?.map((t) => t.tag) || [],
  );
  const [selectedListId, setSelectedListId] = useState(task.listId || "");
  const [attachments, setAttachments] = useState([]);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);
  const { addToast } = useToast();

  const [isSubtaskEnabled, setIsSubtaskEnabled] = useState(false);
  const [newSubtaskTitle, setNewSubtaskTitle] = useState("");
  const [subtaskError, setSubtaskError] = useState("");
  const [existingSubtasks, setExistingSubtasks] = useState(task.subtasks || []);

  useEffect(() => {
    loadAttachments();
  }, []);
  const loadAttachments = async () => {
    try {
      const response = await taskService.getFiles(task.id);
      setAttachments(response.data.data || []);
    } catch (error) {
      console.error("Erro ao carregar anexos:", error);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      await taskService.uploadFile(task.id, file);
      addToast("Arquivo adicionado com sucesso!", "success");
      loadAttachments();
    } catch (error) {
      console.error("Erro ao adicionar arquivo", error);
      addToast("Erro ao adicionar arquivo", "error");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubtaskEnabled && !newSubtaskTitle.trim()) {
      setSubtaskError("O nome da subtarefa não poder ser vazio.");
      return;
    } else {
      setSubtaskError("");
    }

    const data = {
      title,
      description,
      priority: parseInt(priority),
      tags: selectedTags.map((t) => t.name),
      listId: selectedListId ? parseInt(selectedListId) : null,
    };

    if (dueDate.trim()) {
      data.dueDate = new Date(dueDate).toISOString();
    }
    if (reminderDate.trim()) {
      data.reminderDate = new Date(reminderDate).toISOString();
    }
    if (reminderTime.trim()) {
      data.reminderTime = reminderTime;
    }
    if (reminderFrequency.trim()) {
      data.reminderFrequency = reminderFrequency;
    }

    const subtaskData =
      isSubtaskEnabled && newSubtaskTitle.trim()
        ? { title: newSubtaskTitle }
        : null;
    onSave(data, subtaskData);
  };

  const handleDeleteExistingSubtask = async (subtaskId) => {
    if (!window.confirm("Tem certeza que deseja excluir esta subtarefa?"))
      return;
    try {
      await taskService.deleteTask(subtaskId);
      setExistingSubtasks(existingSubtasks.filter((t) => t.id !== subtaskId));
    } catch (error) {
      console.error("Erro ao excluir subtarefa:", error);
      setSubtaskError("Erro ao excluir subtarefa.");
    }
  };

  return (
    <Card className="glass-card animate-fade-in max-h-[90vh] overflow-y-auto">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium">Titulo</label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Titulo da tarefa"
              required
            />
          </div>
          <div>
            {existingSubtasks.length > 0 && (
              <div className="mb-4 space-y-2">
                <Label className="text-sm font-medium">
                  Subtarefas Existentes
                </Label>
                {existingSubtasks.map((subtask) => (
                  <div key={subtask.id} className="flex items-center gap-2">
                    <div className="flex-1 p-2 border rounded-md bg-background/50">
                      <span className="text-sm">{subtask.title}</span>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive hover:text-destructive/90"
                      onClick={() => handleDeleteExistingSubtask(subtask.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
            <div className="flex items-center gap-2 mb-2">
              <Checkbox
                id="createSubtask"
                checked={isSubtaskEnabled}
                onCheckedChange={(checked) => {
                  setIsSubtaskEnabled(checked);
                  if (!checked) setNewSubtaskTitle("");
                  setSubtaskError("");
                }}
              />
              <Label
                htmlFor="createSubtask"
                className="text-sm text-muted-foreground cursor-pointer"
              >
                Adicionar Subtarefa
              </Label>
            </div>
            {isSubtaskEnabled && (
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Input
                    value={newSubtaskTitle}
                    onChange={(e) => setNewSubtaskTitle(e.target.value)}
                    placeholder="Nome da subtarefa"
                    className="mt-2 flex-1"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="mt-2 h-8 w-8 text-destructive"
                    onClick={() => {
                      setIsSubtaskEnabled(false);
                      setNewSubtaskTitle("");
                      setSubtaskError("");
                    }}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                {subtaskError && (
                  <p className="text-destructive text-sm">{subtaskError}</p>
                )}
              </div>
            )}
          </div>
          <div>
            <label className="text-sm font-medium">Descrição</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descrição (opcional)"
              className="w-full p-2 border rounded-md bg-background/50 text-sm"
              rows="3"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium">Prioridade</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full p-2 border rounded-md bg-background/50 text-sm"
              >
                <option value="0">Baixa</option>
                <option value="1">Média</option>
                <option value="2">Alta</option>
                <option value="3">Urgente</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium">Data de Vencimento</label>
              <Input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium">Data de Lembrete</label>
              <Input
                type="date"
                value={reminderDate}
                onChange={(e) => setReminderDate(e.target.value)}
                className="w-full"
              />
            </div>
            {reminderDate && (
              <div>
                <label className="text-sm font-medium">Hora do Lembrete</label>
                <Input
                  type="time"
                  value={reminderTime}
                  onChange={(e) => setReminderTime(e.target.value)}
                  className="w-full"
                />
              </div>
            )}
          </div>

          {reminderDate && (
            <div>
              <label className="text-sm font-medium">Frequência</label>
              <select
                value={reminderFrequency}
                onChange={(e) => setReminderFrequency(e.target.value)}
                className="w-full p-2 border rounded-md text-sm"
              >
                <option value="once">Um vez</option>
                <option value="daily">Diariamente</option>
                <option value="weekly">Semanalmente</option>
                <option value="monthly">Mensalmente</option>
              </select>
            </div>
          )}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium flex items-center gap-2">
                <Paperclip className="w-4 h-4" /> Anexos
              </label>
              <div className="relative">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload-edit"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={uploading}
                  onClick={() => fileInputRef.current?.click()}
                  className="h-8 text-xs"
                >
                  <Upload className="w-3 h-3 mr-1" />
                  {uploading ? "Adicionando..." : "Adicionar Anexo"}
                </Button>
              </div>
            </div>
            <div className="space-y-1">
              {attachments.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center gap-2 p-2 bg-muted/50 rounded-md text-sm"
                >
                  <FileText className="w-4 h-4 text-blue-500" />
                  <span className="truncate flex-1">{file.filename}</span>
                </div>
              ))}
            </div>
          </div>

          <TagSelector
            selectedTags={selectedTags}
            onTagsChange={setSelectedTags}
            loading={loading}
          />
          <div className="space-y-1">
            <label className="text-sm font-medium flex items-center gap-2">
              <List className="w-4 h-4" /> Lista
            </label>
            <select
              value={selectedListId}
              onChange={(e) => setSelectedListId(e.target.value)}
              className="w-full p-2 border rounded-md bg-background/50 text-sm"
            >
              <option value="">Nenhuma lista</option>
              {userLists.map((list) => (
                <option key={list.id} value={list.id}>
                  {list.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex gap-2">
            <Button type="submit" disabled={loading} className="flex-1">
              Salvar
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default TaskEditForm;
