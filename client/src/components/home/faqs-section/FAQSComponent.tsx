"use client";

import { useState } from "react";
import type { AccordionComponentProps } from "@/types/accordionTypes";
import { cn } from "@/lib/utils";
import { AccordionTriggerIcon } from "./AccordionTriggerIcon";
import BlurryBlobSectionWrapper from "@/components/shared/BlurryBlobSectionWrapper";
import { brand } from "@/constants/brand";
import { FaqsHelpAside } from "./FaqsHelpAside";
import { SectionEyebrow } from "@/components/shared/SectionEyebrow";

export const FAQSComponent = ({
  data,
  multipleOpen = true,
}: AccordionComponentProps) => {
  const [openId, setOpenId] = useState<number | null>(1);
  const [openIds, setOpenIds] = useState([1]);

  const handleAccordionTrigger = (id: number) => {
    if (multipleOpen) {
      setOpenIds((prev) =>
        prev.includes(id) ? prev.filter((item) => id !== item) : [...prev, id],
      );
    } else {
      setOpenId((prev) => (prev === id ? null : id));
    }
  };

  return (
    <BlurryBlobSectionWrapper
      id="faqs"
      className="border-b border-border"
      contentClassName="px-4 py-10 sm:px-6 sm:py-12 lg:px-10 lg:py-14"
      containerClassName="flex flex-col gap-8"
      firstBlobColor="bg-primary/25"
      secondBlobColor="bg-chart-2/20"
      firstBlobClassName="h-28 w-28 right-2 top-2 sm:right-6 lg:right-10"
      secondBlobClassName="h-24 w-24 left-2 bottom-2 top-auto sm:left-6 lg:left-10"
    >
      <div className="flex max-w-2xl flex-col gap-3 text-center lg:text-left">
        <SectionEyebrow
          label="FAQs"
          className="justify-center lg:justify-start"
          icon={
            <>
              <circle cx="12" cy="12" r="10" />
              <path d="M12 17h.01" />
              <path d="M10 9a2 2 0 1 1 4 0c0 1.5-2 2-2 3" />
            </>
          }
        />
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Frequently Asked Questions
        </h2>
        <p className="text-muted-foreground">
          Everything you need to know about using {brand.name}.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr] lg:items-start">
        <div className="w-full rounded-lg bg-card text-foreground">
          {data.map((item) => {
            const isOpen = multipleOpen
              ? openIds.includes(item.id)
              : openId === item.id;

            return (
              <div
                key={item.id}
                className={cn(
                  "-mt-px border border-border transition-colors duration-300 first:mt-0 first:rounded-t-lg last:rounded-b-lg hover:cursor-pointer hover:bg-muted/40",
                  isOpen &&
                    "relative z-1 border-primary bg-glow-green-bg hover:bg-glow-green-bg",
                )}
              >
                <button
                  className={cn(
                    "flex w-full items-center justify-between bg-transparent px-6 py-6 text-left text-base text-foreground",
                    "[&_svg]:rotate-180 [&_svg]:transition-transform [&_svg]:duration-300",
                    isOpen && "[&_svg]:rotate-0 [&_svg]:text-primary",
                  )}
                  onClick={() => {
                    handleAccordionTrigger(item.id);
                  }}
                  aria-expanded={isOpen}
                >
                  <h3 className="text-md">{item.title}</h3>
                  <AccordionTriggerIcon />
                </button>

                <div
                  className={cn(
                    "grid grid-rows-[0fr] transition-[grid-template-rows] duration-400 [transition-timing-function:cubic-bezier(0.165,0.84,0.44,1)]",
                    isOpen && "grid-rows-[1fr]",
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-6 text-md">{item.content}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <FaqsHelpAside />
      </div>
    </BlurryBlobSectionWrapper>
  );
};
