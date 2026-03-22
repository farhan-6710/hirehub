"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function AnimatedHeaderWrapper({ children }: { children: React.ReactNode }) {
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed inset-x-0 top-0 z-50 p-2 sm:p-3"
    >
      <div
        className={cn(
          "mx-auto flex w-full items-center justify-between rounded-2xl border transition-all duration-300",
          isScrolled
            ? "max-w-4xl border-border bg-card/80 px-4 py-3 shadow-sm backdrop-blur-md"
            : "max-w-7xl border-transparent bg-transparent px-4 py-4 sm:px-6 lg:px-8",
        )}
      >
        {children}
      </div>
    </motion.header>
  );
}
