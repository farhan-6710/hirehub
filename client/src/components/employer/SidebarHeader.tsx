import { motion } from "framer-motion";
import Link from "next/link";
import { brand } from "@/constants/brand";
import { BrandWordmark } from "@/components/shared/BrandWordmark";

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
      <Link
        href="/"
        className="text-2xl font-black leading-none tracking-tight sm:text-3xl"
        aria-label={`${brand.name} Home`}
      >
        <BrandWordmark collapsed={!sidebarExpanded} />
      </Link>
    </motion.div>
  );
};
