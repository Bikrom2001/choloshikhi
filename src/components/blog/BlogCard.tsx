import Link from "next/link";
import { CalendarDays, Clock } from "lucide-react";
import type { BlogPost } from "@/types";
import { SmartImage } from "@/components/ui/SmartImage";
import { cn, formatDate } from "@/lib/utils";

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
}

export function BlogCard({ post, featured = false }: BlogCardProps) {
  const href = `/blog/${post.slug}`;
  return (
    <article
      className={cn(
        "group card flex h-full flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lift",
        featured && "lg:grid lg:grid-cols-2",
      )}
    >
      <Link
        href={href}
        tabIndex={-1}
        aria-hidden="true"
        className={cn("relative block overflow-hidden bg-navy-50", featured ? "aspect-[16/10] lg:aspect-auto lg:min-h-80" : "aspect-[16/10]")}
      >
        <SmartImage
          src={post.coverImage}
          alt=""
          fill
          sizes={featured ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          fallbackLabel={post.category}
        />
        <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-navy shadow-soft">
          {post.category}
        </span>
      </Link>
      <div className={cn("flex flex-1 flex-col p-6", featured && "lg:justify-center lg:p-10")}>
        <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-muted">
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
            <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" aria-hidden="true" />
            {post.readingMinutes} মিনিট পড়া
          </span>
        </div>
        <h3 className={cn("mt-3 font-sans font-bold leading-snug", featured ? "text-2xl lg:text-3xl" : "text-lg")}>
          <Link href={href} className="hover:text-brand">
            {post.title}
          </Link>
        </h3>
        <p className={cn("mt-3 text-muted", featured ? "text-base leading-7" : "line-clamp-2 text-sm leading-6")}>
          {post.excerpt}
        </p>
        <Link href={href} className="mt-auto inline-flex items-center gap-1 pt-5 text-sm font-bold text-brand hover:underline">
          বিস্তারিত পড়ুন →<span className="sr-only">: {post.title}</span>
        </Link>
      </div>
    </article>
  );
}
