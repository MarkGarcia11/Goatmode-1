export function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function formatPrice(cents: number, currency = "$") {
  return `${currency}${(cents / 100).toFixed(cents % 100 === 0 ? 0 : 2)}`;
}
