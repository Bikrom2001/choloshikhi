"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/** Global animation settings — respects the user's reduced-motion preference. */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
