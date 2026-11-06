"use client";

import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import type { BlogPost } from "@/types";
import { BlogCard } from "@/components/blog/BlogCard";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/Feedback";
import { Reveal } from "@/components/ui/Reveal";
import { cn, matchesQuery } from "@/lib/utils";

interface BlogExplorerProps {
  posts: BlogPost[];
  categories: readonly string[];
}

export function BlogExplorer({ posts, categories }: BlogExplorerProps) {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(
    () =>
      posts.filter(
        (p) => (category === "All" || p.category === category) && matchesQuery(query, p.title, p.excerpt, p.tags),
      ),
    [posts, category, query],
  );

  const showFeatured = category === "All" && !query.trim() && filtered.length > 0;
  const [featured, ...rest] = filtered;
  const grid = showFeatured ? rest : filtered;
  const available = ["All", ...categories.filter((c) => posts.some((p) => p.category === c))];

  return (
    <div>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1" role="group" aria-label="Filter posts by category">
          {available.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              aria-pressed={category === c}
              className={cn(
                "shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition-all",
                category === c ? "border-navy bg-navy text-white" : "border-line bg-white text-navy hover:border-brand hover:text-brand",
              )}
            >
              {c}
            </button>
          ))}
        </div>
        <label className="relative md:w-72">
          <span className="sr-only">Search articles</span>
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="আর্টিকেল খুঁজুন…"
            className="h-11 w-full rounded-full border border-line bg-white pl-11 pr-4 text-sm focus:border-brand focus:outline-none focus:ring-4 focus:ring-brand-100"
          />
        </label>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          className="mt-8"
          title="কোনো আর্টিকেল পাওয়া যায়নি"
          description="অন্য শব্দ দিয়ে খুঁজুন অথবা সব ক্যাটাগরি দেখুন।"
          action={
            <Button
              onClick={() => {
                setCategory("All");
                setQuery("");
              }}
            >
              সব আর্টিকেল দেখুন
            </Button>
          }
        />
      ) : (
        <>
          {showFeatured && featured && (
            <div className="mt-8">
              <BlogCard post={featured} featured />
            </div>
          )}
          {grid.length > 0 && (
            <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {grid.map((post, i) => (
                <Reveal as="li" key={post.slug} delay={(i % 3) * 0.06}>
                  <BlogCard post={post} />
                </Reveal>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
}
