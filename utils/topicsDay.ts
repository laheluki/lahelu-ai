export function whenIsDay(date: Date) {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const lastWeek = new Date(today);
  lastWeek.setDate(lastWeek.getDate() - 7);

  if (date.toString() === today.toDateString()) {
    return 'Today';
  } else if (date.toString() === yesterday.toDateString()) {
    return 'Yesterday';
  } else if (date > lastWeek) {
    return 'Last Week';
  } else {
    return 'Older';
  }
}
