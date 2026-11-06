import { cn, discountPercent, formatBDT } from "@/lib/utils";

interface PriceTagProps {
  regularPrice: number;
  offerPrice: number;
  size?: "md" | "lg";
  className?: string;
}

/** Offer price highlighted, regular price struck through. */
export function PriceTag({ regularPrice, offerPrice, size = "md", className }: PriceTagProps) {
  return (
    <div className={cn("flex flex-wrap items-baseline gap-x-2.5 gap-y-1", className)}>
      <span className="sr-only">
        অফার মূল্য {formatBDT(offerPrice)}, নিয়মিত মূল্য {formatBDT(regularPrice)}
      </span>
      <span
        aria-hidden="true"
        className={cn("font-display font-extrabold text-brand", size === "lg" ? "text-4xl" : "text-2xl")}
      >
        {formatBDT(offerPrice)}
      </span>
      <del aria-hidden="true" className={cn("font-medium text-muted", size === "lg" ? "text-lg" : "text-sm")}>
        {formatBDT(regularPrice)}
      </del>
    </div>
  );
}

export function DiscountBadge({
  regularPrice,
  offerPrice,
  className,
}: {
  regularPrice: number;
  offerPrice: number;
  className?: string;
}) {
  const pct = discountPercent(regularPrice, offerPrice);
  if (!pct) return null;
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full bg-accent px-3 py-1 text-xs font-bold text-white shadow-cta",
        className,
      )}
    >
      {pct}% OFF
    </span>
  );
}
