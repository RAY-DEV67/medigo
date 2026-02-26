export const capitalizeFirstWord = (str: string) => {
  if (!str) return "";

  const lowercased = str.toLowerCase();

  return lowercased.charAt(0).toUpperCase() + lowercased.slice(1);
};
