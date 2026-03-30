"use client";

import * as React from "react";

import { ModeToggle } from "@/components/shared/ModeToggle";
import AuthAccountAction from "@/components/auth/AuthAccountAction";
import { HugeiconsIcon } from "@hugeicons/react";
import { Menu01Icon } from "@hugeicons/core-free-icons";
import { useAuthModal } from "@/providers/AuthModalContext";

type EmployersPageHeader = {
  onHeightChange?: (height: number) => void;
  handleToggleSidebar: () => void;
  getIsMobile?: () => boolean;
  isFixed?: boolean;
};

export function EmployersPageHeader({
  onHeightChange,
  handleToggleSidebar,
  getIsMobile,
  isFixed = true,
}: EmployersPageHeader) {
  const { openLoginModal, openSignupModal } = useAuthModal();
  const [headerHeight, setHeaderHeight] = React.useState(0);
  const headerRef = React.useRef<HTMLElement | null>(null);

  const actionButtonClass =
    "rounded-lg border border-border bg-card text-foreground hover:bg-muted/80 transition-colors";

  React.useEffect(() => {
    if (getIsMobile?.()) {
      handleToggleSidebar();
    }
  }, [getIsMobile, handleToggleSidebar]);

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
        className={`relative z-1 w-full border-b border-border bg-background/80 backdrop-blur-sm ${
          isFixed ? "fixed top-0 left-0 z-10" : "relative"
        }`}
      >
        <div className="mx-auto flex w-full items-center justify-between px-4 py-4 md:px-8">
          <div
            className="bg-card rounded-md p-2 border cursor-pointer"
            onClick={handleToggleSidebar}
          >
            <HugeiconsIcon icon={Menu01Icon} className="h-5 w-5 text-primary" />
          </div>
          <div className="flex items-center gap-2">
            <ModeToggle />
            <AuthAccountAction
              onOpenLogin={openLoginModal}
              onOpenSignup={openSignupModal}
              buttonClassName={actionButtonClass}
            />
          </div>
        </div>
      </header>

      {isFixed && (
        <div
          className="relative"
          style={{
            height: `${headerHeight}px`,
          }}
        />
      )}
    </>
  );
}
