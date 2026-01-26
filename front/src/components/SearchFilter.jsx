import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent } from "./ui/card";
import { Check, Search, X } from "lucide-react";

const SearchFilter = ({ onSearch, tags = [] }) => {
  const [title, setTitle] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [dueDateFrom, setDueDateFrom] = useState("");
  const [dueDateTo, setDueDateTo] = useState("");
  const [priority, setPriority] = useState("");
  const [status, setStatus] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const performSearch = (filters) => {
    onSearch({
      title: filters.title,
      tagIds:
        filters.selectedTags.length > 0
          ? JSON.stringify(filters.selectedTags)
          : "",
      dueDateFrom: filters.dueDateFrom,
      dueDateTo: filters.dueDateTo,
      priority: filters.priority,
      status: filters.status,
    });
  };

  useEffect(() => {
    performSearch({
      title,
      selectedTags,
      dueDateFrom,
      dueDateTo,
      priority,
      status,
    });
  }, [title, selectedTags, dueDateFrom, dueDateTo, priority, status]);

  const handleReset = () => {
    setTitle("");
    setSelectedTags([]);
    setDueDateFrom("");
    setDueDateTo("");
    setPriority("");
    setStatus("");
  };

  const toggleTag = (tagId) => {
    setSelectedTags(
      selectedTags.includes(tagId)
        ? selectedTags.filter((t) => t !== tagId)
        : [...selectedTags, tagId],
    );
  };

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Buscar por título..."
          className="flex-1"
        />

        <Button
          onClick={() => setShowFilters(!showFilters)}
          variant="outline"
          size="sm"
        >
          <Search className="w-4 h-4 mr-1" />
          Filtros
        </Button>
      </div>

      {showFilters && (
        <Card className=" glass-card p-4">
          <CardContent className="space-y-3 p-0">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium">De</label>
                <Input
                  type="date"
                  value={dueDateFrom}
                  onChange={(e) => setDueDateFrom(e.target.value)}
                />
              </div>
              <div>
                <label className="text-xs font-medium">Até</label>
                <Input
                  type="date"
                  value={dueDateTo}
                  onChange={(e) => setDueDateTo(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium">Prioridade</label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="w-full p-2 border rounded-md text-sm bg-background"
                >
                  <option value="">Todas</option>
                  <option value="0">Baixa</option>
                  <option value="1">Média</option>
                  <option value="2">Alta</option>
                  <option value="3">Urgente</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-medium">Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full p-2 border rounded-md text-sm bg-background"
                >
                  <option value="">Todos</option>
                  <option value="pending">Pendente</option>
                  <option value="in_progress">Em Progresso</option>
                  <option value="completed">Completada</option>
                </select>
              </div>
            </div>
            <div>
              <label className="text-xs font-medium">
                Tags ({selectedTags.length})
              </label>
              <div className="flex flex-wrap gap-2 mt-2">
                {tags.map((tag) => {
                  const isSelected = selectedTags.includes(tag.id);
                  return (
                    <Button
                      key={tag.id}
                      size="sm"
                      className="text-white"
                      style={{
                        backgroundColor: tag.color || "#3b82f6",
                        opacity: isSelected ? 1 : 0.6,
                      }}
                      onClick={() => toggleTag(tag.id)}
                    >
                      {tag.name}
                      {isSelected && <Check className="w-3 h-3 ml-1" />}
                    </Button>
                  );
                })}
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                onClick={handleReset}
                variant="outline"
                size="sm"
                className="flex-1"
              >
                <X className="w-4 h-4 mr-1" />
                Limpar Filtros
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
export default SearchFilter;
