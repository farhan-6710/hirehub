import * as React from "react";

import BlurryBlobTwo from "@/components/shared/BlurryBlobTwo";
import { cn } from "@/lib/utils";

type PageBackgroundWrapperProps = {
  children: React.ReactNode;
  className?: string;
};

export function PageBackgroundWrapper({
  children,
  className,
}: PageBackgroundWrapperProps) {
  return (
    <div
      className={cn("relative isolate min-h-screen bg-background", className)}
    >
      {/* Fixed page background */}
      <div className="pointer-events-none fixed inset-0 z-0">
        {/* grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-size-[48px_48px] opacity-30" />

        {/* blobs */}
        <BlurryBlobTwo
          className="rounded-xl opacity-45"
          firstBlobColor="bg-emerald-950/40 dark:bg-emerald-950"
          secondBlobColor="bg-emerald-900/60 dark:bg-emerald-900"
        />

        {/* Faded Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_38%,var(--color-background)_95%)]" />
      </div>

      <div className="relative z-10">{children}</div>
    </div>
  );
}
