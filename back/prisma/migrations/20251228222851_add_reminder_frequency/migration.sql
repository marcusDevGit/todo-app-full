-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "lastReminderSent" TIMESTAMP(3),
ADD COLUMN     "reminderFrequency" TEXT DEFAULT 'once',
ADD COLUMN     "reminderTime" TEXT;
