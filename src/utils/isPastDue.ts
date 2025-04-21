export function isPastDue(dueDateIso: string): boolean {
  const today = new Date();
  const dueDate = new Date(dueDateIso);

  // Clear time to compare by date only
  today.setHours(0, 0, 0, 0);
  dueDate.setHours(0, 0, 0, 0);

  return dueDate < today;
}
