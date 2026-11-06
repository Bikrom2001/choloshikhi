"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  /** "header" = compact badge + name, "footer" = large badge on dark background */
  variant?: "header" | "footer";
  priority?: boolean;
}

/**
 * Official logo (/public/brand/logo.jpg), shown exactly as supplied:
 * object-contain, never cropped, recolored or redrawn.
 * The logo is a circular badge, so in the compact header the institute name
 * is set beside it for legibility at small sizes.
 */
export function Logo({ className, variant = "header", priority = false }: LogoProps) {
  const { src, width, height, alt } = siteConfig.logo;
  const [missing, setMissing] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Catch load errors that happened before hydration.
  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth === 0) setMissing(true);
  }, []);

  const isFooter = variant === "footer";

  const badge = missing ? null : (
    <span
      className={cn(
        "relative block shrink-0 overflow-hidden rounded-full bg-white",
        isFooter ? "h-32 w-32 shadow-lift ring-4 ring-white/10" : "h-12 w-12 ring-1 ring-line sm:h-14 sm:w-14",
      )}
    >
      <Image
        ref={imgRef}
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        sizes={isFooter ? "128px" : "56px"}
        onError={() => setMissing(true)}
        className="h-full w-full object-contain"
      />
    </span>
  );

  return (
    <Link
      href="/"
      aria-label={`${siteConfig.name} — Home`}
      className={cn("inline-flex shrink-0 items-center gap-3", className)}
    >
      {badge}
      {!isFooter && (
        <span className="flex flex-col leading-none">
          <span className="font-display text-lg font-extrabold tracking-tight text-navy sm:text-xl">
            Cholo<span className="text-brand">Shikhi</span>
          </span>
          <span className="mt-1 text-[0.6rem] font-bold uppercase tracking-[0.28em] text-navy-500">
            IT Institute
          </span>
        </span>
      )}
      {isFooter && missing && (
        <span className="font-display text-2xl font-extrabold text-white">
          Cholo<span className="text-brand">Shikhi</span>
        </span>
      )}
    </Link>
  );
}
