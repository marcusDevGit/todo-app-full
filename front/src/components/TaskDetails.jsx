import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { X, Calendar, AlertCircle } from "lucide-react";

const TaskDetails = ({ task, onClose }) => {
  if (!task) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end lg:items-center justify-center p-4">
      <Card className=" w-full max-w-md glass-card animate-slide-in">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="gradient-text">Detalhes da Tarefa</CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="p-0 h-auto"
          >
            <X className="w-5 h-5" />
          </Button>
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
