export const formatDuration = (minutes?: number) => {
  if (!minutes || minutes < 1) return '0m';

  const days = Math.floor(minutes / (60 * 24));
  const hours = Math.floor((minutes % (60 * 24)) / 60);
  const mins = minutes % 60;

  let formatted = '';

  if (days > 0) {
    formatted += `${days}d `;
  }

  if (hours > 0) {
    formatted += `${hours}h `;
  }

  if (mins > 0) {
    formatted += `${mins}m`;
  }

  return formatted.trim();
};