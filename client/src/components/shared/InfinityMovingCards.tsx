"use client";

import { cn } from "@/lib/utils";
import type { CSSProperties } from "react";
import companies from "@/constants/companies.json";
import Image from "next/image";

const SPEED_DURATIONS = { fast: "20s", normal: "40s", slow: "80s" } as const;

interface InfiniteMovingCardsProps {
  direction?: "left" | "right";
  speed?: keyof typeof SPEED_DURATIONS;
  pauseOnHover?: boolean;
  className?: string;
}

// The list renders twice so the scroll animation loops without a gap.
const LOOPED_COMPANIES = [
  ...companies.map((company) => ({ ...company, isCopy: false })),
  ...companies.map((company) => ({ ...company, isCopy: true })),
];

export const InfiniteMovingCards = ({
  direction = "left",
  speed = "fast",
  pauseOnHover = false,
  className,
}: InfiniteMovingCardsProps) => {
  const animationStyle = {
    "--animation-direction": direction === "left" ? "forwards" : "reverse",
    "--animation-duration": SPEED_DURATIONS[speed],
  } as CSSProperties;

  return (
    <div
      style={animationStyle}
      className={cn("scroller relative z-0 max-w-full overflow-hidden", className)}
    >
      <ul
        className={cn(
          "flex min-w-full shrink-0 gap-8 py-4 w-max flex-nowrap animate-scroll",
          pauseOnHover && "hover:paused",
        )}
      >
        {LOOPED_COMPANIES.map((company) => (
          <li
            className="w-55 h-25 2xl:h-25 shrink-0 rounded-xl px-8 flex justify-center items-center"
            key={`${company.id}-${company.isCopy}`}
            aria-hidden={company.isCopy}
          >
            <Image
              src={company.path}
              alt="company-logo"
              width={280}
              height={100}
              className="text-slate-950 dark:text-gray-200"
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
