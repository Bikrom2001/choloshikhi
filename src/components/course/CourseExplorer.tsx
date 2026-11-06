"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { useDeferredValue, useEffect, useMemo, useState } from "react";
import type { Course, CourseCategory, CourseCategoryId } from "@/types";
import { CourseCard } from "@/components/course/CourseCard";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/Feedback";
import { cn, discountPercent, matchesQuery } from "@/lib/utils";

type SortKey = "featured" | "price-asc" | "price-desc" | "discount";

const sortOptions: Array<{ value: SortKey; label: string }> = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "discount", label: "Biggest Discount" },
];

interface CourseExplorerProps {
  courses: Course[];
  categories: CourseCategory[];
  initialCategory?: string;
  initialQuery?: string;
}

/** Client-side course search, category filter and sorting (URL-synced). */
export function CourseExplorer({ courses, categories, initialCategory, initialQuery = "" }: CourseExplorerProps) {
  const validInitial = categories.some((c) => c.id === initialCategory) ? (initialCategory as CourseCategoryId) : "all";
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState<CourseCategoryId | "all">(validInitial);
  const [sort, setSort] = useState<SortKey>("featured");
  const deferredQuery = useDeferredValue(query);
  const isStale = deferredQuery !== query;

  // Keep the URL shareable without triggering a navigation.
  useEffect(() => {
    const params = new URLSearchParams();
    if (category !== "all") params.set("category", category);
    if (query.trim()) params.set("q", query.trim());
    const qs = params.toString();
    window.history.replaceState(null, "", qs ? `?${qs}` : window.location.pathname);
  }, [category, query]);

  const counts = useMemo(() => {
    const map = new Map<string, number>();
    courses.forEach((c) => map.set(c.category, (map.get(c.category) ?? 0) + 1));
    return map;
  }, [courses]);

  const results = useMemo(() => {
    const filtered = courses.filter(
      (c) =>
        (category === "all" || c.category === category) &&
        matchesQuery(deferredQuery, c.title, c.shortDescription, c.tags),
    );
    const sorted = [...filtered];
    if (sort === "price-asc") sorted.sort((a, b) => a.offerPrice - b.offerPrice);
    if (sort === "price-desc") sorted.sort((a, b) => b.offerPrice - a.offerPrice);
    if (sort === "discount")
      sorted.sort(
        (a, b) => discountPercent(b.regularPrice, b.offerPrice) - discountPercent(a.regularPrice, a.offerPrice),
      );
    return sorted;
  }, [courses, category, deferredQuery, sort]);

  const reset = () => {
    setQuery("");
    setCategory("all");
    setSort("featured");
  };

  const chips: Array<{ id: CourseCategoryId | "all"; label: string; count: number }> = [
    { id: "all", label: "All Courses", count: courses.length },
    ...categories
      .filter((c) => counts.has(c.id))
      .map((c) => ({ id: c.id, label: c.label, count: counts.get(c.id) ?? 0 })),
  ];

  return (
    <div>
      <div className="card p-4 sm:p-5">
        <div className="flex flex-col gap-3 md:flex-row">
          <label className="relative flex-1">
            <span className="sr-only">Search courses</span>
            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" aria-hidden="true" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="কোর্স খুঁজুন — যেমন: Python, Design, Marketing"
              className="h-12 w-full rounded-xl border border-line bg-surface pl-12 pr-10 text-[0.95rem] focus:border-brand focus:bg-white focus:outline-none focus:ring-4 focus:ring-brand-100"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-full text-muted hover:bg-navy-50 hover:text-navy"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </label>
          <label className="relative md:w-60">
            <span className="sr-only">Sort courses</span>
            <SlidersHorizontal className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" aria-hidden="true" />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="h-12 w-full cursor-pointer appearance-none rounded-xl border border-line bg-surface pl-11 pr-4 text-[0.95rem] font-medium text-navy focus:border-brand focus:outline-none focus:ring-4 focus:ring-brand-100"
            >
              {sortOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="-mx-1 mt-4 flex gap-2 overflow-x-auto px-1 pb-1" role="group" aria-label="Filter by category">
          {chips.map((chip) => {
            const active = category === chip.id;
            return (
              <button
                key={chip.id}
                type="button"
                onClick={() => setCategory(chip.id)}
                aria-pressed={active}
                className={cn(
                  "inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-all",
                  active
                    ? "border-navy bg-navy text-white shadow-soft"
                    : "border-line bg-white text-navy hover:border-brand hover:text-brand",
                )}
              >
                {chip.label}
                <span
                  className={cn(
                    "rounded-full px-1.5 text-xs",
                    active ? "bg-white/20 text-white" : "bg-navy-50 text-muted",
                  )}
                >
                  {chip.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <p className="mt-6 text-sm text-muted" aria-live="polite">
        <span className="font-semibold text-navy">{results.length}</span> টি কোর্স পাওয়া গেছে
      </p>

      {results.length === 0 ? (
        <EmptyState
          className="mt-4"
          title="কোনো কোর্স পাওয়া যায়নি"
          description="অন্য কোনো শব্দ দিয়ে খুঁজুন অথবা ফিল্টার রিসেট করুন।"
          action={
            <Button variant="primary" onClick={reset}>
              Reset filters
            </Button>
          }
        />
      ) : (
        <motion.ul
          layout
          className={cn(
            "mt-4 grid gap-6 transition-opacity sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
            isStale && "opacity-60",
          )}
        >
          <AnimatePresence mode="popLayout">
            {results.map((course, i) => (
              <motion.li
                key={course.slug}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25 }}
              >
                <CourseCard course={course} priority={i < 4} />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      )}
    </div>
  );
}
