/** Join class names, skipping falsy values. */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

const bdtFormatter = new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 });

/** Format a BDT amount, e.g. 5590 → "৳5,590" */
export function formatBDT(amount: number): string {
  return `৳${bdtFormatter.format(amount)}`;
}

/** Discount percentage rounded to the nearest whole number. */
export function discountPercent(regular: number, offer: number): number {
  if (regular <= 0 || offer >= regular) return 0;
  return Math.round(((regular - offer) / regular) * 100);
}

export function savings(regular: number, offer: number): number {
  return Math.max(0, regular - offer);
}

const dateFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "Asia/Dhaka",
});

export function formatDate(iso: string): string {
  return dateFormatter.format(new Date(iso));
}

/** Two-letter initials for avatar fallbacks. */
export function initials(name: string): string {
  const parts = name.replace(/[^\p{L}\s]/gu, "").trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "CS";
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1]?.[0] ?? "" : "";
  return (first + last).toUpperCase();
}

/** Case-insensitive match helper for client-side search. */
export function matchesQuery(query: string, ...fields: Array<string | string[]>): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return fields.some((field) =>
    Array.isArray(field)
      ? field.some((f) => f.toLowerCase().includes(q))
      : field.toLowerCase().includes(q),
  );
}

export function absoluteUrl(path: string, base: string): string {
  return new URL(path, base).toString();
}

/** Promise-based delay used to simulate async work in the frontend-only phase. */
export function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
