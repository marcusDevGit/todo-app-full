import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent } from "./ui/card";
import { Plus } from "lucide-react";

const SubTarefaForm = ({ onSubmit, loading = false }) => {
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSubmit({ title });
    setTitle("");
  };

  return (
    <Card className="glass-card">
      <CardContent className="p-4">
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Adicionar subtarefa...."
            className="flex-1 border-0 bg-transparent focus-visible:ring-0"
          />
          <Button
            type="submit"
            disabled={loading}
            className="bg-transparent-to-r from-primary to-blue-500"
            size="sm"
          >
            <Plus className="w-4 h-4" />
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default SubTarefaForm;
