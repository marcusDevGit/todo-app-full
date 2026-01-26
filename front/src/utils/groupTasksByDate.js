function normalizeDate(date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

export function isOverdue(dueDate) {
  if (!dueDate) return false;
  const today = normalizeDate(new Date());
  const due = normalizeDate(dueDate);
  return due < today;
}

export function isToday(dueDate) {
  if (!dueDate) return false;
  const today = normalizeDate(new Date());
  const due = normalizeDate(dueDate);
  return due.getTime() === today.getTime();
}

export function isTomorrow(dueDate) {
  if (!dueDate) return false;
  const tomorrow = normalizeDate(new Date());
  tomorrow.setDate(tomorrow.getDate() + 1);
  const due = normalizeDate(dueDate);
  return due.getTime() === tomorrow.getTime();
}

export function isInNext7Days(dueDate) {
  if (!dueDate) return false;
  const today = normalizeDate(new Date());
  const due = normalizeDate(dueDate);
  const daysDiff = Math.floor((due - today) / (1000 * 60 * 60 * 24));
  return daysDiff >= 2 && daysDiff <= 7;
}

export function formatSectionDate(date) {
  if (!date) return "";
  const d = new Date(date);
  const localDate = new Date(d.getTime() + d.getTimezoneOffset() * 60000);

  const weekdays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
  const weekday = weekdays[localDate.getDay()];

  const formatted = localDate.toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "short",
  });

  return `${weekday}, ${formatted}`;
}

export function groupTasksByDate(tasks) {
  const groups = {
    overdue: [],
    today: [],
    tomorrow: [],
    next7Days: {},
    noDate: [],
  };

  tasks.forEach((task) => {
    if (!task.dueDate) {
      groups.noDate.push(task);
    } else if (isOverdue(task.dueDate)) {
      groups.overdue.push(task);
    } else if (isToday(task.dueDate)) {
      groups.today.push(task);
    } else if (isTomorrow(task.dueDate)) {
      groups.tomorrow.push(task);
    } else if (isInNext7Days(task.dueDate)) {
      // Group by specific day within next 7 days
      const dateKey = normalizeDate(task.dueDate).toISOString().split("T")[0];
      if (!groups.next7Days[dateKey]) {
        groups.next7Days[dateKey] = [];
      }
      groups.next7Days[dateKey].push(task);
    }
  });

  // Sort next7Days by date
  const sortedNext7Days = Object.keys(groups.next7Days)
    .sort()
    .reduce((acc, key) => {
      acc[key] = groups.next7Days[key];
      return acc;
    }, {});

  groups.next7Days = sortedNext7Days;

  return groups;
}
