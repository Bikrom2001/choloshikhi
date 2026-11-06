import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
  as?: "h1" | "h2";
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  tone = "light",
  className,
  as: Tag = "h2",
}: SectionHeadingProps) {
  const dark = tone === "dark";
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <p
          className={cn(
            "mb-3 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.14em]",
            dark ? "bg-white/10 text-accent" : "bg-accent-50 text-accent-700",
          )}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
          {eyebrow}
        </p>
      )}
      <Tag
        className={cn(
          "text-3xl font-extrabold leading-tight sm:text-4xl",
          dark ? "text-white" : "text-navy",
        )}
      >
        {title}
      </Tag>
      {description && (
        <p className={cn("mt-4 text-base leading-7 sm:text-lg", dark ? "text-navy-100" : "text-muted")}>
          {description}
        </p>
      )}
    </div>
  );
}
