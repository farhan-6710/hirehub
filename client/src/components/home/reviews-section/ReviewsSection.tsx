"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowLeft01Icon, ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { REVIEWS } from "@/constants/data";
import BlurryBlobSectionWrapper from "@/components/shared/BlurryBlobSectionWrapper";
import { SectionEyebrow } from "@/components/shared/SectionEyebrow";
import { brand } from "@/constants/brand";
import { useAutoplayCarousel } from "@/hooks/useAutoplayCarousel";
import { ReviewCard } from "./ReviewCard";

const ARROW_BUTTON =
  "absolute top-1/2 z-10 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/95 text-foreground shadow-sm transition-colors hover:border-primary/50 hover:text-primary";

export default function ReviewsSection() {
  const { emblaRef, selectedIndex, scrollSnaps, scrollPrev, scrollNext, scrollTo } =
    useAutoplayCarousel();

  return (
    <BlurryBlobSectionWrapper
      id="reviews"
      className="border-b border-border bg-card"
      contentClassName="px-4 py-12 sm:px-6 lg:px-10"
      containerClassName="flex flex-col gap-8"
      firstBlobColor="bg-primary/25"
      secondBlobColor="bg-chart-2/20"
      firstBlobClassName="h-32 w-32 right-4 top-4 sm:right-8 sm:top-2 lg:right-14 lg:top-4"
      secondBlobClassName="h-24 w-24 left-4 bottom-2 top-auto sm:left-8 lg:left-14"
    >
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-3 text-center">
        <SectionEyebrow
          label="Candidate Stories"
          icon={
            <>
              <path d="M12 6v6l4 2" />
              <circle cx="12" cy="12" r="9" />
            </>
          }
        />
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Real Feedback From Hiring Journeys
        </h2>
        <p className="text-muted-foreground">
          A few snapshots from professionals and recruiters using {brand.name} every day.
        </p>
      </div>

      <div>
        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="-ml-4 flex">
              {REVIEWS.map((review, index) => (
                <div
                  key={`${review.name}-${index}`}
                  className="min-w-0 flex-[0_0_100%] pl-4 md:flex-[0_0_50%] lg:flex-[0_0_33.333%] cursor-grab"
                >
                  <ReviewCard {...review} />
                </div>
              ))}
            </div>
          </div>

          <button type="button" aria-label="Previous review" onClick={scrollPrev} className={`${ARROW_BUTTON} left-2`}>
            <HugeiconsIcon icon={ArrowLeft01Icon} className="h-4 w-4" />
          </button>
          <button type="button" aria-label="Next review" onClick={scrollNext} className={`${ARROW_BUTTON} right-2`}>
            <HugeiconsIcon icon={ArrowRight01Icon} className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-6 flex items-center justify-center gap-2">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Go to review slide ${index + 1}`}
              onClick={() => scrollTo(index)}
              className={`h-2.5 rounded-full transition-all ${
                index === selectedIndex ? "w-7 bg-primary" : "w-2.5 bg-border hover:bg-muted-foreground"
              }`}
            />
          ))}
        </div>
      </div>
    </BlurryBlobSectionWrapper>
  );
}
