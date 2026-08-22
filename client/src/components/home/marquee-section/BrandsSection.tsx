"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { InfiniteMovingCards } from "@/components/shared/InfinityMovingCards";
import { fade } from "@/animations";

export default function BrandsSection() {
  const ref = useRef(null);
  return (
    <motion.div
      ref={ref}
      variants={fade}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="relative z-0 border-y border-border"
    >
      <InfiniteMovingCards direction="left" speed="fast" />
    </motion.div>
  );
}
