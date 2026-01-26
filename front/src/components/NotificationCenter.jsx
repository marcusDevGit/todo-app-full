import { useEffect, useState } from "react";
import { Bell, X } from "lucide-react";
import { Button } from "./ui/button";

const NotificationCenter = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const storedNotifications = localStorage.getItem("pendingNotifications");
      if (storedNotifications) {
        const notif = JSON.parse(storedNotifications);
        setNotifications((prev) => [...prev, notif]);
        localStorage.removeItem("pendingNotifications");

        setTimeout(() => {
          setNotifications((prev) => prev.slice(1));
        }, 5000);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {notifications.map((notif, idx) => (
        <div
          key={idx}
          className="glass-card flex items-center gap-3 max-w-sm animate-slide-in"
        >
          <Bell className="w-5 h-5 text-blue-500" />
          <div className="flex-1">
            <p className="font-medium text-sm">{notif.title}</p>
            {notif.time && (
              <p className="text-xs text-muted-foreground">{notif.time}</p>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setNotifications((prev) => prev.slice(1))}
            className="p-0 h-auto"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      ))}
    </div>
  );
};

export default NotificationCenter;
