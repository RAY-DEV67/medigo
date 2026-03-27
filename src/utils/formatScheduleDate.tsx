const formatScheduledDate = (dateString: string | undefined): string => {
  if (!dateString) return "";

  const date = new Date(dateString);
  const now = new Date();

  // Set times to midnight for accurate day-by-day comparison
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const targetDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
  );

  const diffTime = targetDate.getTime() - today.getTime();
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Tomorrow";

  // Returns "Feb 24th" format
  const month = date.toLocaleString("en-US", { month: "short" });
  const day = date.getDate();

  const getOrdinal = (n: number) => {
    const s = ["th", "st", "nd", "rd"];
    const v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  };

  return `${month} ${getOrdinal(day)}`;
};

export default formatScheduledDate;
