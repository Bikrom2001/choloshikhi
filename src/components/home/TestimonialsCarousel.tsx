"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import type { Testimonial } from "@/types";
import { Avatar } from "@/components/ui/Avatar";
import { SampleBadge } from "@/components/ui/Feedback";
import { cn } from "@/lib/utils";

interface TestimonialsCarouselProps {
  testimonials: Testimonial[];
  courseTitles: Record<string, string>;
  intervalMs?: number;
}

/** Auto-playing, pausable, keyboard-accessible testimonial carousel. */
export function TestimonialsCarousel({ testimonials, courseTitles, intervalMs = 6000 }: TestimonialsCarouselProps) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const count = testimonials.length;

  const go = useCallback(
    (next: number, dir: number) => {
      setDirection(dir);
      setIndex((next + count) % count);
    },
    [count],
  );

  useEffect(() => {
    if (paused || count < 2) return;
    const id = window.setInterval(() => go(index + 1, 1), intervalMs);
    return () => window.clearInterval(id);
  }, [index, paused, count, intervalMs, go]);

  if (count === 0) return null;
  const current = testimonials[index];

  return (
    <div
      className="relative mx-auto max-w-3xl"
      role="region"
      aria-roledescription="carousel"
      aria-label="Student testimonials"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") go(index - 1, -1);
        if (e.key === "ArrowRight") go(index + 1, 1);
      }}
    >
      <div className="card relative overflow-hidden px-6 py-10 sm:px-12 sm:py-12">
        <Quote className="absolute right-6 top-6 h-16 w-16 text-brand-50" aria-hidden="true" />
        <div className="relative min-h-[15rem] sm:min-h-[13rem]">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.figure
              key={current.id}
              custom={direction}
              initial={{ opacity: 0, x: direction * 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -40 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${count}`}
            >
              <div className="flex items-center gap-1" aria-label={`${current.rating} out of 5 stars`}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={cn("h-5 w-5", i < current.rating ? "fill-accent text-accent" : "text-navy-100")}
                    aria-hidden="true"
                  />
                ))}
              </div>
              <blockquote className="mt-5 text-lg leading-8 text-ink sm:text-xl sm:leading-9">
                “{current.quote}”
              </blockquote>
              <figcaption className="mt-7 flex flex-wrap items-center gap-4">
                <Avatar name={current.name} size="sm" className="ring-2" />
                <div>
                  <p className="font-bold text-navy">{current.name}</p>
                  <p className="text-sm text-muted">{courseTitles[current.courseSlug] ?? current.role}</p>
                </div>
                {current.isSample && <SampleBadge className="ml-auto">নমুনা রিভিউ</SampleBadge>}
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => go(index - 1, -1)}
          aria-label="Previous testimonial"
          className="grid h-11 w-11 place-items-center rounded-full border border-line bg-white text-navy transition-colors hover:border-brand hover:text-brand"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <div className="flex gap-2">
          {testimonials.map((t, i) => (
            <button
              key={t.id}
              type="button"
              onClick={() => go(i, i > index ? 1 : -1)}
              aria-label={`Go to testimonial ${i + 1}`}
              aria-current={i === index}
              className={cn(
                "h-2.5 rounded-full transition-all",
                i === index ? "w-8 bg-brand" : "w-2.5 bg-navy-100 hover:bg-navy-200",
              )}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => go(index + 1, 1)}
          aria-label="Next testimonial"
          className="grid h-11 w-11 place-items-center rounded-full border border-line bg-white text-navy transition-colors hover:border-brand hover:text-brand"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
