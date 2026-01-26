import { Bell } from "lucide-react";

const ReminderBadge = ({ reminderDate }) => {
  if (!reminderDate) return null;

  const reminder = new Date(reminderDate);
  const localReminder = new Date(
    reminder.getTime() + reminder.getTimezoneOffset() * 60000
  );
  const now = new Date();
  const isOverdue = localReminder < now;

  return (
    <div
      className={`flex items-center gap-1 text-xs px-2 py-1 rounded-full ${
        isOverdue ? "bg-red-100 text-red-700" : "bg-blue-100 text-blue-700"
      }`}
    >
      <Bell className="w-3 h-3" />
      <span>
        {localReminder.toLocaleDateString("pt-BR", {
          month: "short",
          day: "numeric",
        })}
      </span>
    </div>
  );
};

export default ReminderBadge;
