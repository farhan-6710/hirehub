import * as React from "react";
import { useTheme } from "next-themes";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/providers/authContext";
import UserAvatar from "@/components/auth/UserAvatar";
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
  onOpenLogin: () => void;
  onOpenSignup: () => void;
};

export default function MobileNavigation({
  items,
  onNavigate,
  onOpenAiAssistant,
  onOpenLogin,
  onOpenSignup,
}: MobileNavigationProps) {
  const { user } = useAuth();
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
        

        {user ? (
          <div className="flex justify-start">
            <UserAvatar />
          </div>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="h-11 w-full justify-center gap-2 rounded-lg border border-border bg-card"
              >
                <HugeiconsIcon
                  icon={LogIn}
                  strokeWidth={2}
                  className="h-4 w-4"
                />
                <span>Account</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={onOpenLogin}
              >
                Login
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={onOpenSignup}
              >
                Sign Up
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}

        <Button
          variant="outline"
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
          variant="outline"
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
