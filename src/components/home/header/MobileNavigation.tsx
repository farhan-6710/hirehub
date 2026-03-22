import * as React from "react";
import { useTheme } from "next-themes";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  BotIcon,
  LogIn,
  Moon01Icon,
  Sun01Icon,
} from "@hugeicons/core-free-icons";
import { Button } from "@/components/ui/button";

type NavItem = {
  label: string;
  href: string;
};

type MobileNavigationProps = {
  items: NavItem[];
  onNavigate: (
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => void;
  onOpenAiAssistant: () => void;
};

export default function MobileNavigation({
  items,
  onNavigate,
  onOpenAiAssistant,
}: MobileNavigationProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = theme === "dark" ? "Dark" : "Light";

  const handleThemeToggle = () => {
    if (!mounted) return;
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className="flex h-full flex-col justify-between p-6">
      <div className="space-y-6">
        <a
          href="#home"
          onClick={(event) => {
            onNavigate(event, "#home");
          }}
          className="flex justify-center py-4 text-5xl font-black leading-none tracking-tight"
        >
          <span className="bg-linear-to-r from-primary to-chart-2 bg-clip-text text-transparent">
            HIRE
          </span>
          <span className="text-foreground">HUB</span>
        </a>

        <nav className="flex flex-col gap-3 text-base font-medium text-foreground">
          {items.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(event) => {
                onNavigate(event, item.href);
              }}
              className="transition-colors hover:text-muted-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>

      <div className="flex flex-col gap-3 pt-6">
        <Button
          variant="secondary"
          className="h-11 w-full justify-center gap-2 rounded-lg border border-border bg-card"
          onClick={handleThemeToggle}
        >
          <HugeiconsIcon
            icon={theme === "light" ? Moon01Icon : Sun01Icon}
            strokeWidth={2}
            className="h-4 w-4"
          />
          <span>{mounted ? currentTheme : "Light"}</span>
        </Button>

        <Button
          variant="secondary"
          className="h-11 w-full justify-center gap-2 rounded-lg border border-border bg-card"
        >
          <HugeiconsIcon icon={LogIn} strokeWidth={2} className="h-4 w-4" />
          <span>Login</span>
        </Button>

        <Button
          variant="secondary"
          className="h-11 w-full justify-center gap-2 rounded-lg border border-border bg-card"
          onClick={onOpenAiAssistant}
        >
          <HugeiconsIcon icon={BotIcon} strokeWidth={2} className="h-4 w-4" />
          <span>AI Assistant</span>
        </Button>
      </div>
    </div>
  );
}
