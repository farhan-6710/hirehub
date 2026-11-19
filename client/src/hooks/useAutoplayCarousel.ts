import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";

const AUTOPLAY_INTERVAL_MS = 3000;

export function useAutoplayCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    const onReInit = () => {
      setScrollSnaps(emblaApi.scrollSnapList());
      onSelect();
    };

    onReInit();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onReInit);
    const intervalId = window.setInterval(() => emblaApi.scrollNext(), AUTOPLAY_INTERVAL_MS);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onReInit);
      window.clearInterval(intervalId);
    };
  }, [emblaApi]);

  return { emblaRef, selectedIndex, scrollSnaps, scrollPrev, scrollNext, scrollTo };
}
