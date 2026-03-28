import { motion } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import { SparklesIcon } from "@hugeicons/core-free-icons";
import Link from "next/link";

interface SidebarHeaderProps {
  sidebarExpanded: boolean;
}

export const SidebarHeader: React.FC<SidebarHeaderProps> = ({
  sidebarExpanded,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="p-6 border-b border-border flex items-center justify-center"
    >
      <motion.div
        initial={false}
        animate={{ scale: sidebarExpanded ? 1 : 1 }}
        className={`flex items-center ${sidebarExpanded ? "gap-3" : "gap-0"}`}
      >
        {sidebarExpanded ? (
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
        ) : (
          <Link
            href="/"
            className="text-2xl font-black leading-none tracking-tight sm:text-3xl"
            aria-label="HireHub Home"
          >
            <span className="bg-linear-to-r from-primary to-chart-2 bg-clip-text text-transparent">
              H
            </span>
          </Link>
        )}
      </motion.div>
    </motion.div>
  );
};
