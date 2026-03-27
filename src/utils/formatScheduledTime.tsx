const formatTimeOnly = (dateString: string | undefined): string => {
  if (!dateString) return "";

  const date = new Date(dateString);

  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }); // Result example: "2:30 PM"
};

export default formatTimeOnly;
