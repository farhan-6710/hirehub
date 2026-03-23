"use client";

import * as React from "react";
import Link from "next/link";

import { ModeToggle } from "@/components/shared/ModeToggle";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type JobsPageHeaderProps = {
  onHeightChange?: (height: number) => void;
};

export function JobsPageHeader({ onHeightChange }: JobsPageHeaderProps) {
  const [headerHeight, setHeaderHeight] = React.useState(0);
  const headerRef = React.useRef<HTMLElement | null>(null);

  React.useLayoutEffect(() => {
    const headerEl = headerRef.current;
    if (!headerEl) return;

    const updateHeight = () => {
      const nextHeight = Math.round(headerEl.getBoundingClientRect().height);
      setHeaderHeight((prev) => {
        if (prev === nextHeight) return prev;
        return nextHeight;
      });
      onHeightChange?.(nextHeight);
    };

    updateHeight();

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(() => updateHeight());
      resizeObserver.observe(headerEl);
    }

    window.addEventListener("resize", updateHeight);
    return () => {
      window.removeEventListener("resize", updateHeight);
      resizeObserver?.disconnect();
    };
  }, [onHeightChange]);
  return (
    <>
      <header
        ref={headerRef}
        className="w-full border-b border-border fixed top-0 left-0 z-10 bg-background/80 backdrop-blur-sm"
      >
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 md:px-8">
          <Link
            href="/"
            className="text-2xl font-black leading-none tracking-tight sm:text-3xl"
            aria-label="HireHub Home"
          >
            <span className="bg-linear-to-r from-primary to-chart-2 bg-clip-text text-transparent">
              HIRE
            </span>
            <span className="text-foreground">HUB</span>
          </Link>

          <div className="flex items-center gap-2">
            <ModeToggle />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-full border border-border bg-card p-0.5 text-foreground"
                  aria-label="Open profile menu"
                >
                  <Avatar size="sm">
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" sideOffset={8}>
                <DropdownMenuLabel>Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* header placeholder to prevent content jump due to fixed header */}
      <div
        className="relative"
        style={{
          height: `${headerHeight}px`,
        }}
      />
    </>
  );
}
