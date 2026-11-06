import { Info, SearchX } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

export function EmptyState({ title, description, action, className }: EmptyStateProps) {
  return (
    <div className={cn("card flex flex-col items-center px-6 py-14 text-center", className)} role="status">
      <span className="grid h-14 w-14 place-items-center rounded-2xl bg-navy-50 text-navy">
        <SearchX className="h-7 w-7" aria-hidden="true" />
      </span>
      <h3 className="mt-4 text-xl font-bold">{title}</h3>
      {description && <p className="mt-2 max-w-md text-muted">{description}</p>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}

/** Small dashed label used to mark sample/placeholder content honestly. */
export function SampleBadge({ children = "নমুনা", className }: { children?: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border border-dashed border-accent/60 bg-accent-50 px-2.5 py-0.5 text-[0.7rem] font-semibold text-accent-700",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function Notice({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("flex gap-3 rounded-2xl border border-brand-100 bg-brand-50 p-4 text-sm text-navy", className)}>
      <Info className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
      <div className="leading-6">{children}</div>
    </div>
  );
}
