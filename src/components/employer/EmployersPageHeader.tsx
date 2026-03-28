"use client";

import * as React from "react";
import Link from "next/link";

import { ModeToggle } from "@/components/shared/ModeToggle";
import AuthAccountAction from "@/components/auth/AuthAccountAction";
import Modal from "@/components/modals/Modal";
import LoginForm from "@/components/auth/LoginForm";
import SignUpForm from "@/components/auth/SignUpForm";
import { HugeiconsIcon } from "@hugeicons/react";
import { Menu01Icon, SparklesIcon } from "@hugeicons/core-free-icons";

type EmployersPageHeader = {
  onHeightChange?: (height: number) => void;
  handleToggleSidebar: () => void;
  isFixed?: boolean;
};

export function EmployersPageHeader({
  onHeightChange,
  handleToggleSidebar,
  isFixed = true,
}: EmployersPageHeader) {
  const [headerHeight, setHeaderHeight] = React.useState(0);
  const [showLoginModal, setShowLoginModal] = React.useState(false);
  const [showSignupModal, setShowSignupModal] = React.useState(false);
  const headerRef = React.useRef<HTMLElement | null>(null);

  const actionButtonClass =
    "rounded-lg border border-border bg-card text-foreground hover:bg-muted/80 transition-colors";

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
              onOpenLogin={() => setShowLoginModal(true)}
              onOpenSignup={() => setShowSignupModal(true)}
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

      <Modal
        open={showLoginModal}
        className="max-w-sm! p-8"
        onOpenChange={setShowLoginModal}
        title="Login to Your Account"
        description="Enter your credentials to access your account"
      >
        <LoginForm
          setShowLoginModal={setShowLoginModal}
          setShowSignupModal={setShowSignupModal}
        />
      </Modal>

      <Modal
        open={showSignupModal}
        className="max-w-sm! p-8"
        onOpenChange={setShowSignupModal}
        title="Create Your Account"
        description="Sign up to start applying for jobs"
      >
        <SignUpForm
          setShowLoginModal={setShowLoginModal}
          setShowSignupModal={setShowSignupModal}
        />
      </Modal>
    </>
  );
}
