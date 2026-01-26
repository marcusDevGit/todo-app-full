import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent } from "./ui/card";
import { X } from "lucide-react";
import { taskService } from "@/services/taskService";
import { useToast } from "@/hooks/useToast";

const TagSelector = ({ selectedTags = [], onTagsChange, loading = false }) => {
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [tagLoading, setTagLoading] = useState(false);
  const { addToast } = useToast();

  const colors = [
    "#ef4444",
    "#f97316",
    "#eab308",
    "#22c55e",
    "#06b6d4",
    "#8b5cf6",
    "#ec4899",
    "#6672d6",
    "#c676b9",
    "#d6d566",
    "#ffafa3",
  ];

  useEffect(() => {
    loadTags();
  }, []);

  const loadTags = async () => {
    try {
      const response = await taskService.getTags();
      setTags(response.data.data);
    } catch (error) {
      console.error("Erro ao carregar tags:", error);
      addToast("Erro ao carregar tags:", "error");
    }
  };

  const handleAddTag = (tag) => {
    if (selectedTags.find((t) => t.id === tag.id)) return;
    onTagsChange([...selectedTags, tag]);
    setShowDropdown(false);
  };

  const handleRemoveTag = (tagId) => {
    onTagsChange(selectedTags.filter((t) => t.id !== tagId));
  };

  const handleCreateTag = async () => {
    if (!newTag.trim()) return;
    setTagLoading(true);
    try {
      const color = colors[Math.floor(Math.random() * colors.length)];
      const response = await taskService.createTag({ name: newTag, color });
      const tag = response.data.data;
      handleAddTag(tag);
      setNewTag("");
      await loadTags();
      addToast("Tag criada com sucesso", "success");
    } catch (error) {
      console.error("Erro ao cria tag:", error.response?.data || error);
      addToast(error.response?.data?.message || "Erro ao cria tag:", "error");
    } finally {
      setTagLoading(false);
    }
  };

  const handleDeleteTag = async (tagId) => {
    if (!window.confirm("Tem certeza que deseja excluir esta tag?")) return;
    setTagLoading(true);
    try {
      await taskService.deleteTag(tagId);
      await loadTags();
      // Remove a tag das selecionadas se estava selecionada
      if (selectedTags.find((t) => t.id === tagId)) {
        onTagsChange(selectedTags.filter((t) => t.id !== tagId));
      }
      addToast("Tag excluída com sucesso", "success");
    } catch (error) {
      console.error("Erro ao excluir tag:", error.response?.data || error);
      addToast(error.response?.data?.message || "Erro ao excluir tag", "error");
    } finally {
      setTagLoading(false);
    }
  };

  const availableTags = tags.filter(
    (t) => !selectedTags.find((st) => st.id === t.id),
  );

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Tags</label>
      <div className="flex flex-wrap gap-2">
        {selectedTags.map((tag) => (
          <div
            key={tag.id}
            className="flex items-center gap-1 px-2 py-1 bg-primary/10 rounded-full text-sm"
            style={{ backgroundColor: tag.color || "#3b82f6" }}
          >
            <span>{tag.name}</span>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => handleRemoveTag(tag.id)}
              className="p-0 h-auto"
            >
              <X className="w-3 h-3" />
            </Button>
          </div>
        ))}
      </div>

      <div className="relative">
        <Button
          type="button"
          variant="outline"
          onClick={() => setShowDropdown(!showDropdown)}
          className="w-full justify-start"
        >
          + Adicionar tag
        </Button>
        {showDropdown && (
          <Card className="absolute top-full left-0 right-0 mt-1 z-10 glass-card max-h-48 overflow-y-auto">
            <CardContent className="p-2 space-y-2">
              <div className="flex gap-1">
                <Input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleCreateTag();
                    }
                  }}
                  placeholder="Nova tag"
                  className="text-sm"
                />
                <Button
                  type="button"
                  size="sm"
                  disabled={loading}
                  onClick={handleCreateTag}
                >
                  +
                </Button>
              </div>
              <div className=" flex flex-wrap gap-2">
                {availableTags.map((tag) => (
                  <div
                    key={tag.id}
                    className="flex items-center gap-1 rounded-md overflow-hidden"
                    style={{ backgroundColor: tag.color || "#3b82f6" }}
                  >
                    <Button
                      type="button"
                      onClick={() => handleAddTag(tag)}
                      variant="ghost"
                      className="text-white text-sm hover:bg-black/10 rounded-none px-3"
                    >
                      {tag.name}
                    </Button>
                    <Button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteTag(tag.id);
                      }}
                      variant="ghost"
                      size="sm"
                      className="text-white hover:bg-red-600/80 rounded-none px-2 h-full"
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default TagSelector;
