"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { HugeiconsIcon } from "@hugeicons/react";
import { Moon01Icon, Sun01Icon } from "@hugeicons/core-free-icons";
import { Button } from "../ui/button";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Use effect to set mounted state
  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Avoid rendering until mounted
  if (!mounted) return null;

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <Button
      variant="secondary"
      size="md"
      onClick={toggleTheme}
      className="rounded-lg border border-border bg-card text-foreground"
    >
      {theme === "light" ? (
        <HugeiconsIcon icon={Moon01Icon} className="size-4.5" />
      ) : (
        <HugeiconsIcon icon={Sun01Icon} className="size-4.5 text-gray-200" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
