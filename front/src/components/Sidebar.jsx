import React, { useMemo } from "react";
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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Sidebar = ({
  activeView = "tasks",
  setActiveView,
  showSidebar = true,
  setShowSidebar,
  showMobileSidebar = false,
  setShowMobileSidebar,
  user,
  logout,
}) => {
  const menuItems = useMemo(
    () => [
      { id: "today", icon: Sun, label: "O Meu Dia", count: 0 },
      { id: "important", icon: Star, label: "Importante", count: 0 },
      { id: "planned", icon: Calendar, label: "Planejado", count: 0 },
      { id: "assigned", icon: CheckSquare, label: "Atribuido a mim", count: 0 },
      { id: "tasks", icon: Home, label: "Tarefas", count: 0 },
    ],
    []
  );

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
          !showSidebar && "lg:-translate-x-full"
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
            <Button
              variant="ghost"
              size="sm"
              className="hover:bg-sidebar-accent"
              aria-label="Settings"
            >
              <Settings className="w-5 h-5" />
            </Button>
          </div>

          <div>
            <h1 className="text-2xl font-bold gradient-text">To Do List</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Designed by Slandio Soares
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
                    !isActive && "hover:bg-sidebar-accent hover:translate-x-1"
                  )}
                >
                  <Icon
                    className={cn(
                      "w-5 h-5 transition-colors",
                      isActive ? "text-primary" : "text-sidebar-foreground"
                    )}
                  />
                  <span className="flex-1 text-left font-medium">
                    {item.label}
                  </span>
                  {item.count > 0 && (
                    <span className="px-2 py-1 text-xs font-semibold bg-primary/10 text-primary rounded-b-full">
                      {item.count}
                    </span>
                  )}
                </Button>
              );
            })}
          </div>
        </nav>

        <div className="p-4 border-t border-sidebar-border space-y-2">
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-primary"
          >
            <Plus className="w-5 h-5" />
            Nova Lista
          </Button>

          <div className="flex items-center gap-3 p-3 bg-sidebar-accent rounded-lg">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-primary-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-muted-foreground truncate">
                {user?.name || user?.email}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {user?.email}
              </p>
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
