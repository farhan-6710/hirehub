import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionEyebrowProps {
  label: string;
  // Inner SVG elements (paths/circles) for a 24x24 stroke icon.
  icon: ReactNode;
  className?: string;
}

export function SectionEyebrow({ label, icon, className }: SectionEyebrowProps) {
  return (
    <p className={cn("flex items-center gap-2 text-sm font-medium tracking-[0.18em] text-primary uppercase", className)}>
      <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary/15 text-primary">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-3.5 w-3.5"
          aria-hidden="true"
        >
          {icon}
        </svg>
      </span>
      {label}
    </p>
  );
}
