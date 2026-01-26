import prisma from "../config/prisma.js";

const processedReminders = new Set();

const shouldSendReminder = (task, now) => {
  if (!task.reminderDate) return false;
  if (task.status === "completed") return false;

  const reminderDate = new Date(task.reminderDate);
  const lastSent = task.lastReminderSent
    ? new Date(task.lastReminderSent)
    : null;

  if (task.reminderTime) {
    const [hours, minutes] = task.reminderTime.split(":");
    reminderDate.setHours(parseInt(hours), parseInt(minutes), 0);
  }

  switch (task.reminderFrequency) {
    case "once":
      return reminderDate <= now && !lastSent;

    case "daily":
      if (lastSent) {
        const daysSince = Math.floor((now - lastSent) / (1000 * 60 * 60 * 24));
        return daysSince >= 1;
      }
      return reminderDate <= now;

    case "weekly":
      if (lastSent) {
        const daysSince = Math.floor((now - lastSent) / (1000 * 60 * 60 * 24));
        return daysSince >= 7;
      }
      return reminderDate <= now;

    case "monthly":
      if (lastSent) {
        const monthsSince = Math.floor(
          (now - lastSent) / (1000 * 60 * 60 * 24 * 30)
        );
        return monthsSince >= 1;
      }
      return reminderDate <= now;

    default:
      return false;
  }
};

export const CheckReminders = async () => {
  const now = new Date();

  const reminders = await prisma.task.findMany({
    where: {
      reminderDate: {
        lte: now,
      },
      status: { not: "completed" },
    },
    include: { user: true },
  });

  for (const task of reminders) {
    if (shouldSendReminder(task, now)) {
      const reminderId = `${task.id}`;

      if (processedReminders.has(reminderId)) {
        const time = task.reminderTime ? ` às ${task.reminderTime}` : "";

        await prisma.task.update({
          where: { id: task.id },
          data: { lastReminderSent: now },
        });

        processedReminders.add(reminderId);

        setTimeout(() => processedReminders.delete(reminderId), 3600000);
      }
    }
  }
  return reminders;
};
