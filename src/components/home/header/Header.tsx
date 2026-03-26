"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { BotIcon, Menu01Icon } from "@hugeicons/core-free-icons";
import { Button } from "../../ui/button";
import { ModeToggle } from "@/components/shared/ModeToggle";
import AiAssistant from "@/components/ai-assistant/AiAssistant";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Modal from "@/components/modals/Modal";
import LoginForm from "@/components/auth/LoginForm";
import SignUpForm from "@/components/auth/SignUpForm";
import AuthAccountAction from "@/components/auth/AuthAccountAction";
import MobileNavigation from "./MobileNavigation";
import { AnimatedHeaderWrapper } from "./AnimatedHeaderWrapper";
import Link from "next/link";
import { useCallback, useState } from "react";

const NAV_ITEMS = [
  { label: "Metrics", href: "#metrics" },
  { label: "Reviews", href: "#reviews" },
  { label: "FAQs", href: "#faqs" },
  { label: "Contact", href: "#contact" },
];

export function Header() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [isAiAssistantOpen, setIsAiAssistantOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const actionButtonClass =
    "rounded-lg border border-border bg-card text-foreground hover:bg-muted/80 transition-colors";

  const handleAnchorClick = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      event.preventDefault();

      const target = document.querySelector(href);
      if (!(target instanceof HTMLElement)) {
        if (href === "#home") {
          window.scrollTo({ top: 0, behavior: "smooth" });
          window.history.replaceState(null, "", href);
        }
        return;
      }

      target.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.replaceState(null, "", href);
    },
    [],
  );

  const handleMobileNavigate = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      handleAnchorClick(event, href);
      setIsMobileNavOpen(false);
    },
    [handleAnchorClick],
  );

  const handleOpenAiAssistantFromMobile = useCallback(() => {
    setIsMobileNavOpen(false);
    setIsAiAssistantOpen(true);
  }, []);

  const handleOpenLoginFromMobile = useCallback(() => {
    setIsMobileNavOpen(false);
    setShowLoginModal(true);
  }, []);

  const handleOpenSignupFromMobile = useCallback(() => {
    setIsMobileNavOpen(false);
    setShowSignupModal(true);
  }, []);

  return (
    <AnimatedHeaderWrapper>
      <a
        href="#home"
        onClick={(event) => {
          handleAnchorClick(event, "#home");
        }}
        className="text-2xl font-black leading-none tracking-tight sm:text-3xl"
      >
        <span className="bg-linear-to-r from-primary to-chart-2 bg-clip-text text-transparent">
          HIRE
        </span>
        <span className="text-foreground">HUB</span>
      </a>

      <nav className="hidden items-center gap-8 text-base text-muted-foreground md:flex">
        {NAV_ITEMS.map((item) => (
          <a
            key={item.label}
            href={item.href}
            onClick={(event) => {
              handleAnchorClick(event, item.href);
            }}
            className="transition-colors hover:text-foreground"
          >
            {item.label}
          </a>
        ))}
      </nav>

      <Sheet open={isMobileNavOpen} onOpenChange={setIsMobileNavOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            className="md:hidden rounded-lg border border-border bg-card p-3"
            aria-label="Open navigation menu"
          >
            <HugeiconsIcon
              icon={Menu01Icon}
              strokeWidth={2}
              className="h-5 w-5"
              aria-hidden="true"
            />
          </Button>
        </SheetTrigger>
        <SheetContent
          side="left"
          title="Navigation"
          className="w-full max-w-sm p-0"
        >
          <MobileNavigation
            items={NAV_ITEMS}
            onNavigate={handleMobileNavigate}
            onOpenAiAssistant={handleOpenAiAssistantFromMobile}
            onOpenLogin={handleOpenLoginFromMobile}
            onOpenSignup={handleOpenSignupFromMobile}
          />
        </SheetContent>
      </Sheet>

      <div className="action-buttons hidden items-center gap-2 md:flex">
        <AuthAccountAction
          onOpenLogin={() => setShowLoginModal(true)}
          onOpenSignup={() => setShowSignupModal(true)}
          buttonClassName={actionButtonClass}
        />
        <ModeToggle />
        <Sheet open={isAiAssistantOpen} onOpenChange={setIsAiAssistantOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="md" className={actionButtonClass}>
              <HugeiconsIcon
                icon={BotIcon}
                strokeWidth={2}
                className="size-4.5"
              />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            title="HireHub AI Assistant"
            className="w-full sm:max-w-md h-full p-0 outline-none"
          >
            <AiAssistant
              className="h-full border-0 rounded-none shadow-none"
              title="ShopNow Assistant"
              placeholder="Ask about products, orders, or anything..."
              context={[]}
            />
          </SheetContent>
        </Sheet>
        <Button
          asChild
          variant="glow"
          size="lg"
          className="text-lg rounded-xl px-6 ml-4"
        >
          <Link href="/jobs">Find Jobs</Link>
        </Button>
      </div>

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
    </AnimatedHeaderWrapper>
  );
}
