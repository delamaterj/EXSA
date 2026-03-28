export const formatGroupedDates = (dates: string[]) => {
  if (!dates || dates.length === 0) return "";

  // Convert to Date objects
  const dateObjects = dates.map((d) => new Date(d));

  // Group by time (hour + minute)
  const groups: { [key: string]: Date[] } = {};

  dateObjects.forEach((date) => {
    const timeKey = date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      timeZone: "America/Chicago",
    });

    if (!groups[timeKey]) {
      groups[timeKey] = [];
    }

    groups[timeKey].push(date);
  });

  // Build output
  const results: string[] = [];

  Object.entries(groups).forEach(([time, groupDates]) => {
    const formattedDays = groupDates.map((date) =>
      date.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        timeZone: "America/Chicago",
      })
    );

    const joinedDays =
      formattedDays.length > 1
        ? formattedDays.slice(0, -1).join(", ") +
          " & " +
          formattedDays[formattedDays.length - 1]
        : formattedDays[0];

    results.push(`${joinedDays} at ${time}`);
  });

  return results.join(" | ");
};