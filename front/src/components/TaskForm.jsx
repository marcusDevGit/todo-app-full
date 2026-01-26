import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";

const TaskForm = ({ onsubmit, loading = false }) => {
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    onsubmit({ title });
    setTitle("");
  };
  return (
    <Card className="galss-card animate-fade-in">
      <CardContent className="p-4">
        <form onSubmit={handleSubmit} className="flex items-center gap-3">
          <div className="w-5 h-5 text-primary/60 flex-shrink-0">●</div>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Adicionar uma nova tarefa"
            className="flex-1 border-0 bg-transparent focus-visible:right-0 focus-visible:ring-offset-0"
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
  );
};

export default TaskForm;
