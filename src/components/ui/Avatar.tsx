import { cn, initials } from "@/lib/utils";
import { SmartImage } from "@/components/ui/SmartImage";

interface AvatarProps {
  name: string;
  src?: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const sizes = {
  sm: "h-10 w-10 text-sm",
  md: "h-14 w-14 text-lg",
  lg: "h-24 w-24 text-3xl",
  xl: "h-32 w-32 text-4xl",
};

const palettes = [
  "from-navy to-brand",
  "from-brand to-navy-600",
  "from-accent to-accent-700",
  "from-navy-700 to-navy-950",
];

/** Photo avatar with an initials fallback (used while instructor photos are pending). */
export function Avatar({ name, src, size = "md", className }: AvatarProps) {
  const palette = palettes[name.length % palettes.length];
  return (
    <div
      className={cn(
        "relative shrink-0 overflow-hidden rounded-full bg-gradient-to-br font-display font-bold text-white ring-4 ring-white",
        sizes[size],
        palette,
        className,
      )}
    >
      {src ? (
        <SmartImage src={src} alt={name} fill sizes="128px" className="object-cover" />
      ) : (
        <span className="grid h-full w-full place-items-center" aria-hidden="true">
          {initials(name)}
        </span>
      )}
      {!src && <span className="sr-only">{name}</span>}
    </div>
  );
}
