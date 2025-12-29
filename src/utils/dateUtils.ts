// Get exam status based on current time
export type ExamStatus = "upcoming" | "ongoing" | "completed";

export const getExamStatus = (
  startTime: string | Date,
  endTime: string | Date
): ExamStatus => {
  const now = new Date();
  const start = new Date(startTime);
  const end = new Date(endTime);

  if (now < start) return "upcoming";
  if (now > end) return "completed";
  return "ongoing";
};

// Check if exam can be started right now
export const canStartExam = (
  startTime: string | Date,
  endTime: string | Date
): boolean => {
  const now = new Date();
  const start = new Date(startTime);
  const end = new Date(endTime);

  return now >= start && now <= end;
};

// Format date for display (e.g., "Dec 25, 2025")
export const formatExamDate = (date: string | Date): string => {
  const d = new Date(date);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

// Format date with time (e.g., "Dec 25, 2025 at 10:00 AM")
export const formatExamDateTime = (date: string | Date): string => {
  const d = new Date(date);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

// Get time remaining until exam starts (returns null if already started or ended)
export const getTimeUntilStart = (
  startTime: string | Date
): number | null => {
  const now = new Date();
  const start = new Date(startTime);

  if (now >= start) return null;
  return start.getTime() - now.getTime();
};
