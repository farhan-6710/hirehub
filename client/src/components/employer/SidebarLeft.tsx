import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowLeft01Icon, ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { Button } from "../ui/button";
import { SidebarHeader } from "./SidebarHeader";
import { SidebarNavigation } from "./SidebarNavigation";

interface SidebarLeftProps {
  isSidebarLeftExpanded: boolean;
  showTooltips: boolean;
  currentPage: string;
  onNavigate: (page: string) => void;
  handleToggleSidebar: () => void;
  isMobile?: boolean;
}

const SidebarLeft: React.FC<SidebarLeftProps> = ({
  isSidebarLeftExpanded,
  showTooltips,
  currentPage,
  onNavigate,
  handleToggleSidebar,
  isMobile = false,
}) => {
  const variants = isMobile
    ? {
        expanded: { x: 0, width: 264 },
        collapsed: { x: "-100%", width: 264 },
      }
    : {
        expanded: { width: 340, x: 0 },
        collapsed: { width: 74, x: 0 },
      };

  return (
    <motion.aside
      initial={false}
      animate={isSidebarLeftExpanded ? "expanded" : "collapsed"}
      variants={variants}
      transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
      className={cn(
        "bg-card dark:bg-card/30 backdrop-blur-sm border-r border-border text-foreground flex flex-col z-20",
        isMobile
          ? "fixed left-0 top-0 bottom-0 z-50 h-full shadow-2xl"
          : "relative",
      )}
    >
      <SidebarHeader sidebarExpanded={isSidebarLeftExpanded} />

      <SidebarNavigation
        isSidebarLeftExpanded={isSidebarLeftExpanded}
        showTooltips={showTooltips}
        currentPage={currentPage}
        onNavigate={onNavigate}
      />

      <Button
        variant="ghost"
        size="icon"
        onClick={handleToggleSidebar}
        className="absolute -right-3 top-24 h-7 w-7 rounded-full border border-border bg-card text-foreground shadow-lg hover:bg-primary/10 hover:text-primary hover:shadow-xl transition-all duration-200 z-10"
      >
        {isSidebarLeftExpanded ? (
          <HugeiconsIcon icon={ArrowLeft01Icon} size={16} />
        ) : (
          <HugeiconsIcon icon={ArrowRight01Icon} size={16} />
        )}
      </Button>
    </motion.aside>
  );
};

export default SidebarLeft;
