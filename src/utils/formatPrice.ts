export const formatPrice = (
  amount: number | string | undefined,
  includeDecimals: boolean = false
): string => {
  if (amount === undefined || amount === null) return "₦0";

  const numericValue = typeof amount === "string" ? parseFloat(amount) : amount;

  if (isNaN(numericValue)) return "₦0";

  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    // Nigerian Naira uses the symbol ₦
    minimumFractionDigits: includeDecimals ? 2 : 0,
    maximumFractionDigits: includeDecimals ? 2 : 0,
  })
    .format(numericValue)
    .replace("NGN", "₦") // Some environments use NGN instead of the symbol
    .trim();
};
