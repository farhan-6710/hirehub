"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import BlurryBlobTwo from "@/components/shared/BlurryBlobTwo";

interface BlurryBlobSectionWrapperProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  contentClassName?: string;
  containerClassName?: string;
  withContainer?: boolean;
  firstBlobColor?: string;
  secondBlobColor?: string;
  blobClassName?: string;
  firstBlobClassName?: string;
  secondBlobClassName?: string;
}

export default function BlurryBlobSectionWrapper({
  children,
  id,
  className,
  contentClassName,
  containerClassName,
  withContainer = true,
  firstBlobColor = "bg-primary/30",
  secondBlobColor = "bg-chart-2/25",
  blobClassName = "rounded-xl opacity-25",
  firstBlobClassName,
  secondBlobClassName,
}: BlurryBlobSectionWrapperProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.45,
    margin: "0px 0px -12% 0px",
  });

  return (
    <section
      id={id}
      ref={sectionRef}
      className={cn("relative scroll-mt-12 overflow-hidden", className)}
    >
      <BlurryBlobTwo
        className={blobClassName}
        firstBlobColor={firstBlobColor}
        secondBlobColor={secondBlobColor}
        firstBlobClassName={firstBlobClassName}
        secondBlobClassName={secondBlobClassName}
      />
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn("relative z-10", contentClassName)}
      >
        {withContainer ? (
          <div className={cn("mx-auto w-full max-w-6xl", containerClassName)}>
            {children}
          </div>
        ) : (
          children
        )}
      </motion.div>
    </section>
  );
}
