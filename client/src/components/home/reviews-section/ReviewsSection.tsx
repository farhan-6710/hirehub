"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { REVIEWS } from "@/constants/data";
import BlurryBlobSectionWrapper from "@/components/shared/BlurryBlobSectionWrapper";

export default function ReviewsSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      emblaApi?.scrollTo(index);
    },
    [emblaApi],
  );

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    const onReInit = () => {
      setScrollSnaps(emblaApi.scrollSnapList());
      onSelect();
    };

    onReInit();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onReInit);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onReInit);
    };
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    const intervalId = window.setInterval(() => {
      emblaApi.scrollNext();
    }, 3000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [emblaApi]);

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
        <p className="flex items-center gap-2 text-sm font-medium tracking-[0.18em] text-primary uppercase">
          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary/15 text-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-3.5 w-3.5"
            >
              <path d="M12 6v6l4 2" />
              <circle cx="12" cy="12" r="9" />
            </svg>
          </span>
          Candidate Stories
        </p>
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Real Feedback From Hiring Journeys
        </h2>
        <p className="text-muted-foreground">
          A few snapshots from professionals and recruiters using Hirehub every
          day.
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
                  <article className="h-full rounded-2xl border border-border bg-background p-6 shadow-xs transition-colors duration-300 hover:border-primary/50 hover:bg-glow-green-bg">
                    <div className="mb-4 flex items-center gap-2 text-base leading-none text-chart-2">
                      {Array.from({ length: 5 }).map((_, starIndex) => (
                        <span key={starIndex}>
                          {starIndex < review.rating ? "★" : "☆"}
                        </span>
                      ))}
                    </div>
                    <p className="mb-6 text-sm leading-6 text-muted-foreground">
                      &ldquo;{review.quote}&rdquo;
                    </p>
                    <div>
                      <h3 className="text-base font-semibold text-foreground">
                        {review.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {review.role}
                      </p>
                    </div>
                  </article>
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            aria-label="Previous review"
            onClick={scrollPrev}
            className="absolute top-1/2 left-2 z-10 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/95 text-foreground shadow-sm transition-colors hover:border-primary/50 hover:text-primary"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>

          <button
            type="button"
            aria-label="Next review"
            onClick={scrollNext}
            className="absolute top-1/2 right-2 z-10 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/95 text-foreground shadow-sm transition-colors hover:border-primary/50 hover:text-primary"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </div>

        <div className="mt-6 flex items-center justify-center gap-2">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Go to review slide ${index + 1}`}
              onClick={() => {
                scrollTo(index);
              }}
              className={`h-2.5 rounded-full transition-all ${
                index === selectedIndex
                  ? "w-7 bg-primary"
                  : "w-2.5 bg-border hover:bg-muted-foreground"
              }`}
            />
          ))}
        </div>
      </div>
    </BlurryBlobSectionWrapper>
  );
}
