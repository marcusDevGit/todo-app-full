import { X, CheckCircle2, AlertCircle, Info } from "lucide-react";
import { Button } from "./ui/button";

const Toast = ({ id, message, type, onRemove }) => {
  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-gray-500" />,
    error: <AlertCircle className="w-5 h-5 text-gray-500" />,
    info: <Info className="w-5 h-5 text-gray-500" />,
  };

  const bgColors = {
    success: "bg-green-50 border-green-200",
    error: "bg-red-50 border-red-200",
    info: "bg-blue-50 border-blue-200",
  };

  console.log("Toast Renderizando", { id, message, type });
  return (
    <div
      className={`glass-card animate-slide-in border ${bgColors[type]} p-4 flex items-center gap-3 max-w-md`}
    >
      {icons[type]}
      <span className="flex-1 text-sm font-medium">{message}</span>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onRemove(id)}
        className="p-0 h-auto"
      >
        <X className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default Toast;
