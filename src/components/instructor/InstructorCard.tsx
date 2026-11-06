import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Instructor } from "@/types";
import { Avatar } from "@/components/ui/Avatar";
import { SampleBadge } from "@/components/ui/Feedback";

export function InstructorCard({ instructor }: { instructor: Instructor }) {
  const href = `/instructors/${instructor.slug}`;
  return (
    <article className="group card relative flex h-full flex-col items-center overflow-hidden p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
      <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-br from-navy-50 to-brand-50" aria-hidden="true" />
      <Avatar name={instructor.name} src={instructor.photo} size="lg" className="relative mt-2 shadow-soft" />
      <h3 className="mt-4 text-lg font-bold">
        <Link href={href} className="after:absolute after:inset-0 hover:text-brand">
          {instructor.name}
        </Link>
      </h3>
      <p className="mt-1 text-sm font-semibold text-brand">{instructor.role}</p>
      <p className="mt-2 text-sm text-muted">{instructor.specialization}</p>
      <div className="mt-auto flex w-full items-center justify-between pt-5">
        {instructor.isPlaceholder ? <SampleBadge>Profile coming soon</SampleBadge> : <span />}
        <span className="grid h-9 w-9 place-items-center rounded-full bg-navy-50 text-navy transition-colors group-hover:bg-brand group-hover:text-white">
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </span>
      </div>
    </article>
  );
}
