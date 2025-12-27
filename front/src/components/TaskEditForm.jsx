import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent } from "./ui/card";
import { X } from "lucide-react";
import TagSelector from "./TagSelector";

const TaskEditForm = ({ task, onSave, onCancel, loading = false }) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || "");
  const [priority, setPriority] = useState(task.priority || 0);
  const [selectedTags, setSelectedTags] = useState(
    task.tags?.map((t) => t.tag) || []
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      title,
      description,
      priority: parseInt(priority),
      tags: selectedTags.map((t) => t.name),
    });
  };

  return (
    <Card className="glass-card animate-fade-in ">
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
            <label className="text-sm font-medium">Descrição</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descrição (opcional)"
              className="w-full p-2 border rounded-md bg-background/50 text-sm"
              rows="3"
            />
          </div>
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
          <TagSelector
            selectedTags={selectedTags}
            onTagsChange={setSelectedTags}
            loading={loading}
          />
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
