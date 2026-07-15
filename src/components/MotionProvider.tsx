"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

// Respects the user's OS-level "reduce motion" preference for all
// framer-motion animations (transforms are skipped, opacity is kept).
export default function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
