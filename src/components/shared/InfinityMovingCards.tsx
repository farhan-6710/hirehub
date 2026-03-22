"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState, useCallback } from "react";
import companies from "@/constants/companies.json";
import Image from "next/image";

export const InfiniteMovingCards = ({
  direction = "left",
  speed = "fast",
  pauseOnHover = false,
  className,
}: {
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);

  const [start, setStart] = useState(false);

  // Memoize getDirection to avoid re-renders
  const getDirection = useCallback(() => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards",
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse",
        );
      }
    }
  }, [direction]); // Depend on the direction prop

  // Memoize getSpeed to avoid re-renders
  const getSpeed = useCallback(() => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      }
    }
  }, [speed]); // Depend on the speed prop

  // Memoize addAnimation and depend on getDirection and getSpeed
  const addAnimation = useCallback(() => {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }, [getDirection, getSpeed]); // Depend on getDirection and getSpeed

  useEffect(() => {
    if (!start) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      addAnimation(); // Run animation logic only when start is false (first load)
    }
  }, [addAnimation, start]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-0 max-w-full overflow-hidden [linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className,
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex min-w-full shrink-0 gap-8 py-4 w-max flex-nowrap",
          start && "animate-scroll",
          pauseOnHover && "hover:paused",
        )}
      >
        {companies.map((company) => (
          <li
            className="w-55 h-25 2xl:h-25 shrink-0 rounded-xl px-8 flex justify-center items-center"
            key={company.id}
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
