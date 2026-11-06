import Link from "next/link";
import { ArrowRight, BarChart3, Clock } from "lucide-react";
import type { Course } from "@/types";
import { ButtonLink } from "@/components/ui/Button";
import { SmartImage } from "@/components/ui/SmartImage";
import { DiscountBadge, PriceTag } from "@/components/course/PriceTag";
import { courseCategories } from "@/data/courses";

interface CourseCardProps {
  course: Course;
  priority?: boolean;
}

export function CourseCard({ course, priority = false }: CourseCardProps) {
  const href = `/courses/${course.slug}`;
  const category = courseCategories.find((c) => c.id === course.category)?.label;

  return (
    <article className="group card flex h-full flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift">
      <Link href={href} className="relative block aspect-[16/10] overflow-hidden bg-navy-50" tabIndex={-1} aria-hidden="true">
        <SmartImage
          src={course.thumbnail}
          alt=""
          fill
          priority={priority}
          sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          fallbackLabel={course.title}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/40 via-transparent to-transparent" />
        <DiscountBadge
          regularPrice={course.regularPrice}
          offerPrice={course.offerPrice}
          className="absolute left-3 top-3"
        />
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex flex-wrap items-center gap-2 text-xs font-semibold">
          {category && <span className="rounded-full bg-brand-50 px-2.5 py-1 text-brand-700">{category}</span>}
          {course.duration && (
            <span className="inline-flex items-center gap-1 rounded-full bg-navy-50 px-2.5 py-1 text-navy">
              <Clock className="h-3.5 w-3.5" aria-hidden="true" />
              {course.duration}
            </span>
          )}
          <span className="inline-flex items-center gap-1 text-muted">
            <BarChart3 className="h-3.5 w-3.5" aria-hidden="true" />
            {course.level}
          </span>
        </div>

        <h3 className="text-lg font-bold leading-snug">
          <Link href={href} className="transition-colors hover:text-brand">
            {course.title}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted">{course.shortDescription}</p>

        <div className="mt-auto pt-5">
          <PriceTag regularPrice={course.regularPrice} offerPrice={course.offerPrice} />
          <div className="mt-4 grid grid-cols-2 gap-2">
            <ButtonLink href={href} variant="outline" size="sm" aria-label={`View details: ${course.title}`}>
              View Details
            </ButtonLink>
            <ButtonLink
              href={`/admission?course=${course.slug}`}
              variant="accent"
              size="sm"
              aria-label={`Enroll now: ${course.title}`}
            >
              Enroll Now
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </ButtonLink>
          </div>
        </div>
      </div>
    </article>
  );
}
