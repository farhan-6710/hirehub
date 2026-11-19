"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { Menu01Icon } from "@hugeicons/core-free-icons";
import { Button } from "../../ui/button";
import { ModeToggle } from "@/components/shared/ModeToggle";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import AuthAccountAction from "@/components/auth/AuthAccountAction";
import MobileNavigation from "./MobileNavigation";
import { AnimatedHeaderWrapper } from "./AnimatedHeaderWrapper";
import Link from "next/link";
import { useState } from "react";
import { useAuthModal } from "@/providers/AuthModalContext";
import { brand } from "@/constants/brand";
import { scrollToAnchor } from "@/utils/scrollToAnchor";
import { HOME_NAV_ITEMS } from "@/constants/homeNavigation";
import { AiAssistantSheet } from "./AiAssistantSheet";
import { BrandWordmark } from "@/components/shared/BrandWordmark";

export function Header() {
  const { openLoginModal, openSignupModal } = useAuthModal();
  const [isAiAssistantOpen, setIsAiAssistantOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const actionButtonClass =
    "rounded-lg border border-border bg-card text-foreground hover:bg-muted/80 transition-colors";

  const closeMobileNavThen = (action: () => void) => () => {
    setIsMobileNavOpen(false);
    action();
  };

  const handleMobileNavigate = (
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    scrollToAnchor(event, href);
    setIsMobileNavOpen(false);
  };

  return (
    <AnimatedHeaderWrapper>
      <a
        href="#home"
        onClick={(event) => scrollToAnchor(event, "#home")}
        className="text-2xl font-black leading-none tracking-tight sm:text-3xl"
      >
        <BrandWordmark />
      </a>

      <nav className="hidden items-center gap-8 text-base text-muted-foreground md:flex">
        {HOME_NAV_ITEMS.map((item) => (
          <a
            key={item.label}
            href={item.href}
            onClick={(event) => scrollToAnchor(event, item.href)}
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
            items={HOME_NAV_ITEMS}
            onNavigate={handleMobileNavigate}
            onOpenAiAssistant={closeMobileNavThen(() => setIsAiAssistantOpen(true))}
            onOpenLogin={closeMobileNavThen(openLoginModal)}
            onOpenSignup={closeMobileNavThen(openSignupModal)}
          />
        </SheetContent>
      </Sheet>

      <div className="action-buttons hidden items-center gap-2 md:flex">
        <AuthAccountAction
          onOpenLogin={openLoginModal}
          onOpenSignup={openSignupModal}
          buttonClassName={actionButtonClass}
        />
        <ModeToggle />
        <AiAssistantSheet
          open={isAiAssistantOpen}
          onOpenChange={setIsAiAssistantOpen}
          triggerClassName={actionButtonClass}
        />
        <Button
          asChild
          variant="glow"
          size="lg"
          className="text-lg rounded-xl px-6 ml-4"
        >
          <Link href={brand.portals.candidate.path}>
            {brand.portals.candidate.label}
          </Link>
        </Button>
      </div>
    </AnimatedHeaderWrapper>
  );
}
