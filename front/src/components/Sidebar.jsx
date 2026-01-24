import { useMemo, useState, useRef } from "react";
import {
  Home,
  Star,
  Calendar,
  CheckSquare,
  Sun,
  Plus,
  Menu,
  Settings,
  LogOut,
  User,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";

const Sidebar = ({
  activeView = "tasks",
  setActiveView,
  showSidebar = true,
  setShowSidebar,
  showMobileSidebar = false,
  setShowMobileSidebar,
  userLists = [],
  onCreatelist,
  user,
  logout,
}) => {
  const [isAddingList, setIsAddingList] = useState(false);
  const [newListName, setNewListName] = useState("");
  const menuItems = useMemo(
    () => [
      { id: "today", icon: Sun, label: "O Meu Dia", count: 0 },
      { id: "important", icon: Star, label: "Importante", count: 0 },
      { id: "planned", icon: Calendar, label: "Planejado", count: 0 },
      { id: "assigned", icon: CheckSquare, label: "Atribuido a mim", count: 0 },
      { id: "tasks", icon: Home, label: "Tarefas", count: 0 },
    ],
    [],
  );

  const handleCreateList = () => {
    if (newListName.trim()) {
      onCreatelist(newListName.trim());
      setNewListName("");
      setIsAddingList(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleCreateList();
  };

  const handleItemClick = (id) => {
    setActiveView?.(id);
    setShowMobileSidebar?.(false);
  };

  return (
    <>
      {showMobileSidebar && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setShowMobileSidebar?.(false)}
        />
      )}
      <div
        className={cn(
          "fixed lg:relative inset-y-0 left-0 z-40 w-72 bg-sidebar backdrop-blur-xl shadow-2xl flex flex-col transition-transform duration-300",
          showMobileSidebar
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0",
          !showSidebar && "lg:-translate-x-full",
        )}
      >
        <div className="p-6 border-b border-sidebar-border">
          <div className="flex items-center justify-between mb-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowSidebar?.(!showSidebar)}
              className="hover:bg-sidebar-accent"
              aria-label="Toggle sidebar"
            >
              <Menu className="w-5 h-5" />
            </Button>
            {/* <Button
              variant="ghost"
              size="sm"
              className="hover:bg-sidebar-accent"
              aria-label="Settings"
            >
              <Settings className="w-5 h-5" />
            </Button> */}
            <ThemeToggle />
          </div>

          <div>
            <h1 className="text-2xl font-bold gradient-text">To Do List</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Designed by Marcus Phellypp
            </p>
          </div>
        </div>
        <nav className="flex-1 p-4 overflow-y-auto scroll-thin">
          <div className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;

              return (
                <Button
                  key={item.id}
                  variant={isActive ? "secondary" : "ghost"}
                  onClick={() => handleItemClick(item.id)}
                  className={cn(
                    "w-full justify-start gap-3 h-12 transition-all duration-200",
                    isActive &&
                      "hover:bg-sidebar-accent border-l-4 border-primary shadow-sm",
                    !isActive && "hover:bg-sidebar-accent hover:translate-x-1",
                  )}
                >
                  <Icon
                    className={cn(
                      "w-5 h-5 transition-colors",
                      isActive ? "text-primary" : "text-sidebar-foreground",
                    )}
                  />
                  <span className="flex-1 text-left font-medium">
                    {item.label}
                  </span>
                  {item.count > 0 && item.count !== undefined && (
                    <span className="px-2 py-1 text-xs font-semibold bg-primary/10 text-primary rounded-b-full">
                      {item.count}
                    </span>
                  )}
                </Button>
              );
            })}
          </div>

          {userLists.length > 0 && (
            <div className="mt-4 space-y-1">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase px-4 py-2">
                Minhas Listas
              </h3>
              {userLists.map((list) => {
                const isActive = activeView === list.id;
                return (
                  <Button
                    key={`user-list-${list.id}`}
                    variant={isActive ? "secondary" : "ghost"}
                    onClick={() => handleItemClick(list.id)}
                    className={cn(
                      "w-full justify-start gap-3 h-12 transition-all duration-200",
                      isActive &&
                        "hover:bg-sidebar-accent border-l-4 border-primary shadow-sm",
                      !isActive &&
                        "hover:bg-sidebar-accent hover:translate-x-1",
                    )}
                  >
                    <Home
                      className={cn(
                        "w-5 h-5 transition-colors",
                        isActive ? "text-primary" : "text-sidebar-foreground",
                      )}
                    />
                    <span className="flex-1 text-left font-medium">
                      {list.name}
                    </span>
                  </Button>
                );
              })}
            </div>
          )}
        </nav>

        <div className="p-4 border-t border-sidebar-border space-y-2">
          <div className="flex items-center gap-2">
            {isAddingList ? (
              <>
                <Input
                  value={newListName}
                  onChange={(e) => setNewListName(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Nome da Lista"
                  className="flex-1"
                />
                <Button
                  size="sm"
                  onClick={handleCreateList}
                  disabled={!newListName.trim()}
                >
                  <Plus className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setIsAddingList(false);
                    setNewListName("");
                  }}
                >
                  <X className="w-4 h-4" />
                </Button>
              </>
            ) : (
              <Button
                variant="ghost"
                className="w-full justify-start gap-3 text-primary"
                onClick={() => setIsAddingList(true)}
              >
                <Plus className="w-5 h-5" />
                Nova Lista
              </Button>
            )}
          </div>

          <div className="flex items-center gap-3 p-3 bg-sidebar-accent rounded-lg">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-primary-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-muted truncate">
                {user?.name || user?.email}
              </p>
              <p className="text-xs text-foreground truncate">{user?.email}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-destructive hover:bg-destructive/10"
            onClick={logout}
          >
            <LogOut className="w-5 h-5" />
            Sair
          </Button>
        </div>
      </div>
      {!showSidebar && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowSidebar?.(true)}
          className="hidden lg:flex fixed left-0 top-6 z-30 hover:bg-sidebar-accent"
          aria-label="Open sidebar"
        >
          <Menu className="w-5 h-5" />
        </Button>
      )}
    </>
  );
};

export default Sidebar;
