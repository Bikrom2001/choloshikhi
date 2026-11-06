"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";
import { GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";

type SmartImageProps = Omit<ImageProps, "onError"> & {
  fallbackLabel?: string;
};

/**
 * next/image wrapper with a branded fallback.
 * If a remote image fails to load, a clean navy/blue placeholder is shown
 * instead of a broken-image icon.
 */
export function SmartImage({ className, fallbackLabel, alt, fill, ...props }: SmartImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={cn(
          "flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-navy to-brand-700 text-white/90",
          fill ? "absolute inset-0" : "h-full w-full",
          className,
        )}
      >
        <GraduationCap className="h-10 w-10 opacity-80" aria-hidden="true" />
        {fallbackLabel && (
          <span className="max-w-[80%] text-center font-display text-sm font-semibold">{fallbackLabel}</span>
        )}
      </div>
    );
  }

  return <Image alt={alt} fill={fill} className={className} onError={() => setFailed(true)} {...props} />;
}
