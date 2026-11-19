import { useSyncExternalStore, type MouseEvent } from "react";
import { useTheme } from "next-themes";
import { HugeiconsIcon } from "@hugeicons/react";
import { BotIcon, Moon01Icon, Sun01Icon } from "@hugeicons/core-free-icons";
import AuthAccountAction from "@/components/auth/AuthAccountAction";
import { Button } from "@/components/ui/button";
import { BrandWordmark } from "@/components/shared/BrandWordmark";

type NavItem = {
  label: string;
  href: string;
};

type MobileNavigationProps = {
  items: NavItem[];
  onNavigate: (event: MouseEvent<HTMLAnchorElement>, href: string) => void;
  onOpenAiAssistant: () => void;
  onOpenLogin: () => void;
  onOpenSignup: () => void;
};

const subscribeNoop = () => () => {};

const WIDE_BUTTON = "h-11 w-full justify-center gap-2 rounded-lg border border-border bg-card";

export default function MobileNavigation({
  items,
  onNavigate,
  onOpenAiAssistant,
  onOpenLogin,
  onOpenSignup,
}: MobileNavigationProps) {
  const { theme, setTheme } = useTheme();
  // Theme is unknown on the server; wait for mount to avoid a hydration mismatch.
  const mounted = useSyncExternalStore(
    subscribeNoop,
    () => true,
    () => false,
  );

  const isDark = mounted && theme === "dark";

  return (
    <div className="flex h-full flex-col justify-between p-6">
      <div className="space-y-6">
        <a
          href="#home"
          onClick={(event) => onNavigate(event, "#home")}
          className="flex justify-center py-4 text-5xl font-black leading-none tracking-tight"
        >
          <BrandWordmark />
        </a>

        <nav className="flex flex-col gap-3 text-base font-medium text-foreground">
          {items.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(event) => onNavigate(event, item.href)}
              className="transition-colors hover:text-muted-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>

      <div className="flex flex-col gap-3 pt-6">
        <div className="flex justify-start">
          <AuthAccountAction
            onOpenLogin={onOpenLogin}
            onOpenSignup={onOpenSignup}
            buttonClassName={WIDE_BUTTON}
            label="Account"
          />
        </div>

        <Button
          variant="outline"
          className={WIDE_BUTTON}
          onClick={() => mounted && setTheme(isDark ? "light" : "dark")}
        >
          <HugeiconsIcon icon={isDark ? Sun01Icon : Moon01Icon} strokeWidth={2} className="h-4 w-4" />
          <span>{isDark ? "Dark" : "Light"}</span>
        </Button>

        <Button variant="outline" className={WIDE_BUTTON} onClick={onOpenAiAssistant}>
          <HugeiconsIcon icon={BotIcon} strokeWidth={2} className="h-4 w-4" />
          <span>AI Assistant</span>
        </Button>
      </div>
    </div>
  );
}
