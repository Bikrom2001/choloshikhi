import { ChevronDown, CircleAlert } from "lucide-react";
import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const controlBase =
  "w-full rounded-xl border bg-white px-4 text-[0.95rem] text-ink placeholder:text-muted/70 transition-colors focus:outline-none focus:ring-4";
const controlState = (invalid: boolean) =>
  invalid
    ? "border-red-400 focus:border-red-500 focus:ring-red-100"
    : "border-line hover:border-navy-200 focus:border-brand focus:ring-brand-100";

interface FieldProps {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: ReactNode;
  className?: string;
}

/** Label + control + error/hint wrapper with proper ARIA wiring. */
export function Field({ id, label, required, error, hint, children, className }: FieldProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-navy">
        {label}
        {required ? (
          <span className="ml-0.5 text-accent-600" aria-hidden="true">
            *
          </span>
        ) : (
          <span className="ml-1.5 text-xs font-normal text-muted">(ঐচ্ছিক)</span>
        )}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} role="alert" className="mt-1.5 flex items-center gap-1.5 text-sm text-red-600">
          <CircleAlert className="h-4 w-4 shrink-0" aria-hidden="true" />
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="mt-1.5 text-xs text-muted">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

function describedBy(id: string, error?: string, hint?: string) {
  if (error) return `${id}-error`;
  if (hint) return `${id}-hint`;
  return undefined;
}

type InputProps = InputHTMLAttributes<HTMLInputElement> & { id: string; error?: string; hint?: string };

export function Input({ id, error, hint, className, ...rest }: InputProps) {
  return (
    <input
      id={id}
      name={id}
      aria-invalid={Boolean(error)}
      aria-describedby={describedBy(id, error, hint)}
      className={cn(controlBase, "h-12", controlState(Boolean(error)), className)}
      {...rest}
    />
  );
}

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  id: string;
  error?: string;
  placeholder: string;
  options: Array<{ value: string; label: string }>;
};

export function Select({ id, error, placeholder, options, className, ...rest }: SelectProps) {
  return (
    <div className="relative">
      <select
        id={id}
        name={id}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(
          controlBase,
          "h-12 cursor-pointer appearance-none pr-10",
          controlState(Boolean(error)),
          className,
        )}
        {...rest}
      >
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <ChevronDown
        className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-navy"
        aria-hidden="true"
      />
    </div>
  );
}

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & { id: string; error?: string; hint?: string };

export function Textarea({ id, error, hint, className, ...rest }: TextareaProps) {
  return (
    <textarea
      id={id}
      name={id}
      aria-invalid={Boolean(error)}
      aria-describedby={describedBy(id, error, hint)}
      className={cn(controlBase, "min-h-32 resize-y py-3", controlState(Boolean(error)), className)}
      {...rest}
    />
  );
}
