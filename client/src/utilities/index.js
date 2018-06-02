export function getWeekStartEndDates() {
  let now = new Date();
  now = new Date(now.getTime() -
    (now.getMilliseconds() +
      (1000 * now.getSeconds()) +
      (1000 * 60 * now.getMinutes()) +
      (1000 * 60 * 60 * now.getHours())));
  const startDay = 1; // 0=sunday, 1=monday etc.
  const d = now.getDay(); // get the current day
  // rewind to start day
  const weekStart = new Date(now.valueOf() - ((d <= 0 ? 7 - startDay : d - startDay) * 86400000));
  // add 7 days minus 1ms to get last day
  const weekEnd = new Date((weekStart.valueOf() + (7 * 86400000)) - 1);
  return {
    weekStart: weekStart.toISOString(),
    weekEnd: weekEnd.toISOString(),
  };
}
