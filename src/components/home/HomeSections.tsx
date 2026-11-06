import Link from "next/link";
import { ArrowRight, Flame, GraduationCap, Laptop, Users } from "lucide-react";
import type { Course, FeatureItem, Instructor, Stat } from "@/types";
import { CourseCard } from "@/components/course/CourseCard";
import { InstructorCard } from "@/components/instructor/InstructorCard";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SampleBadge } from "@/components/ui/Feedback";
import { cn } from "@/lib/utils";

/* ------------------------------ Stats ------------------------------ */

const STAT_STYLES = [
  {
    icon: GraduationCap,
    badge: "ক্যারিয়ার ট্র্যাক",
    iconBox: "bg-brand-50 text-brand border-brand-200/60",
    badgeStyle: "bg-brand-50/80 text-brand border-brand-200/80",
    glow: "bg-brand/20",
    accentHover: "hover:border-brand/40",
    numberColor: "text-navy group-hover:text-brand",
    bottomGlow: "from-brand/20 via-brand to-brand/20",
  },
  {
    icon: Flame,
    badge: "সীমিত সুযোগ",
    iconBox: "bg-accent-50 text-accent border-accent-200/60",
    badgeStyle: "bg-accent-50/80 text-accent-700 border-accent-200/80",
    glow: "bg-accent/25",
    accentHover: "hover:border-accent/40",
    numberColor: "text-navy group-hover:text-accent",
    bottomGlow: "from-accent/20 via-accent to-accent/20",
  },
  {
    icon: Users,
    badge: "সফল অ্যালামনাই",
    iconBox: "bg-emerald-50 text-emerald-600 border-emerald-200/60",
    badgeStyle: "bg-emerald-50/80 text-emerald-700 border-emerald-200/80",
    glow: "bg-emerald-500/20",
    accentHover: "hover:border-emerald-500/40",
    numberColor: "text-navy group-hover:text-emerald-600",
    bottomGlow: "from-emerald-500/20 via-emerald-500 to-emerald-500/20",
  },
  {
    icon: Laptop,
    badge: "হাতে-কলমে কাজ",
    iconBox: "bg-indigo-50 text-indigo-600 border-indigo-200/60",
    badgeStyle: "bg-indigo-50/80 text-indigo-700 border-indigo-200/80",
    glow: "bg-indigo-500/20",
    accentHover: "hover:border-indigo-500/40",
    numberColor: "text-navy group-hover:text-indigo-600",
    bottomGlow: "from-indigo-500/20 via-indigo-500 to-indigo-500/20",
  },
];

export function StatsSection({ stats }: { stats: Stat[] }) {
  return (
    <section aria-label="CholoShikhi at a glance" className="relative z-10 -mt-2 bg-white">
      <div className="container-page">
        {/* Floating container with subtle ambient gradient glow */}
        <div className="relative -translate-y-8 sm:-translate-y-10">
          <div
            className="pointer-events-none absolute -inset-0.5 rounded-[2rem] bg-gradient-to-r from-brand/20 via-accent/25 to-brand/20 opacity-70 blur-[3px]"
            aria-hidden="true"
          />

          <div className="relative rounded-[2rem] border border-line bg-white/95 p-3.5 shadow-lift backdrop-blur-xl sm:p-5">
            <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
              {stats.map((stat, i) => {
                const style = STAT_STYLES[i % STAT_STYLES.length];
                const IconComponent = style.icon;

                return (
                  <Reveal key={stat.label} delay={i * 0.06}>
                    <div
                      className={cn(
                        "group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-line/70 bg-gradient-to-b from-white via-white to-surface p-4 transition-all duration-300 ease-out sm:p-5",
                        "hover:-translate-y-1 hover:shadow-lg",
                        style.accentHover
                      )}
                    >
                      {/* Ambient hover glow in corner */}
                      <div
                        className={cn(
                          "pointer-events-none absolute -bottom-8 -right-8 h-28 w-28 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100",
                          style.glow
                        )}
                        aria-hidden="true"
                      />

                      {/* Header with Icon and Badge */}
                      <div className="flex items-center justify-between gap-2">
                        <div
                          className={cn(
                            "flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl border transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-xs",
                            style.iconBox
                          )}
                        >
                          <IconComponent className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
                        </div>

                        {stat.isPlaceholder ? (
                          <SampleBadge>Editable</SampleBadge>
                        ) : (
                          <span
                            className={cn(
                              "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] sm:text-xs font-semibold tracking-wide",
                              style.badgeStyle
                            )}
                          >
                            <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse" />
                            {style.badge}
                          </span>
                        )}
                      </div>

                      {/* Numbers and text */}
                      <div className="mt-4 sm:mt-5">
                        <p
                          className={cn(
                            "font-display text-2xl min-[400px]:text-3xl sm:text-4xl font-extrabold tracking-tight transition-colors duration-200",
                            style.numberColor
                          )}
                        >
                          {stat.value}
                        </p>
                        <p className="mt-1 font-bold text-ink text-sm sm:text-base">
                          {stat.label}
                        </p>
                        <p className="mt-1 text-xs sm:text-sm text-muted leading-relaxed">
                          {stat.description}
                        </p>
                      </div>

                      {/* Glowing bottom accent line on hover */}
                      <div
                        className={cn(
                          "pointer-events-none absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r opacity-0 transition-opacity duration-300 group-hover:opacity-100",
                          style.bottomGlow
                        )}
                        aria-hidden="true"
                      />
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ Popular courses ------------------------------ */

export function PopularCoursesSection({ courses }: { courses: Course[] }) {
  return (
    <section className="section pt-8 sm:pt-10" aria-labelledby="popular-courses">
      <div className="container-page">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            align="left"
            eyebrow="Popular Courses"
            title={<span id="popular-courses">আমাদের জনপ্রিয় কোর্সসমূহ</span>}
            description="ক্যারিয়ারের লক্ষ্য অনুযায়ী কোর্স বেছে নিন — সব কোর্সে চলছে বিশেষ অফার মূল্য।"
          />
          <ButtonLink href="/courses" variant="outline">
            সব কোর্স দেখুন
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </ButtonLink>
        </div>
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {courses.map((course, i) => (
            <Reveal as="li" key={course.slug} delay={(i % 4) * 0.06}>
              <CourseCard course={course} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------ Why choose ------------------------------ */

export function WhyChooseSection({ items }: { items: FeatureItem[] }) {
  return (
    <section className="section bg-surface" aria-labelledby="why-choose">
      <div className="container-page">
        <SectionHeading
          eyebrow="Why CholoShikhi"
          title={<span id="why-choose">কেন CholoShikhi বেছে নেবেন?</span>}
          description="আমরা বিশ্বাস করি — সঠিক গাইডলাইন আর হাতে-কলমে অনুশীলনই দক্ষ প্রফেশনাল তৈরির মূল চাবিকাঠি।"
        />
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <Reveal as="li" key={item.title} delay={(i % 3) * 0.07}>
              <div className="group card h-full p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-lift sm:p-7">
                <span
                  className={cn(
                    "grid h-13 w-13 place-items-center rounded-2xl transition-colors",
                    i % 2 === 0
                      ? "bg-brand-50 text-brand group-hover:bg-brand group-hover:text-white"
                      : "bg-accent-50 text-accent-600 group-hover:bg-accent group-hover:text-white",
                  )}
                >
                  <Icon name={item.icon} className="h-6 w-6" />
                </span>
                <h3 className="mt-5 font-sans text-lg font-bold">{item.title}</h3>
                <p className="mt-2 leading-7 text-muted">{item.description}</p>
              </div>
            </Reveal>
          ))}
        </ul>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/programs" variant="primary">
            সব প্রোগ্রাম দেখুন
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </ButtonLink>
          <ButtonLink href="/career-support" variant="outline">
            ক্যারিয়ার সাপোর্ট সম্পর্কে জানুন
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ Learning process ------------------------------ */

export function LearningProcessSection({ steps }: { steps: FeatureItem[] }) {
  return (
    <section className="section relative overflow-hidden bg-navy" aria-labelledby="learning-process">
      <div className="pointer-events-none absolute -left-20 top-0 h-72 w-72 rounded-full bg-brand/30 blur-3xl" aria-hidden="true" />
      <div className="container-page relative">
        <SectionHeading
          tone="dark"
          eyebrow="Learning Process"
          title={<span id="learning-process">৫টি ধাপে আপনার শেখার যাত্রা</span>}
          description="কোর্স বেছে নেওয়া থেকে ক্যারিয়ার গড়া পর্যন্ত — একটি পরিষ্কার ও সহজ পথ।"
        />
        <div className="relative mt-14">
        <div className="absolute left-[10%] right-[10%] top-8 hidden h-px border-t-2 border-dashed border-white/20 md:block" aria-hidden="true" />
        <ol className="relative grid gap-6 md:grid-cols-5 md:gap-4">
          {steps.map((step, i) => (
            <Reveal as="li" key={step.title} delay={i * 0.08} className="relative">
              <div className="flex gap-4 md:flex-col md:items-center md:text-center">
                <span className="relative grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-white text-navy shadow-lift">
                  <Icon name={step.icon} className="h-7 w-7" />
                  <span className="absolute -right-2 -top-2 grid h-7 w-7 place-items-center rounded-full bg-accent text-sm font-bold text-white ring-4 ring-navy">
                    {i + 1}
                  </span>
                </span>
                <div>
                  <h3 className="text-lg font-bold text-white md:mt-5">{step.title}</h3>
                  <p className="mt-1.5 text-sm leading-6 text-navy-100">{step.description}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ Featured instructors ------------------------------ */

export function FeaturedInstructorsSection({ instructors }: { instructors: Instructor[] }) {
  return (
    <section className="section" aria-labelledby="featured-instructors">
      <div className="container-page">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            align="left"
            eyebrow="Our Instructors"
            title={<span id="featured-instructors">অভিজ্ঞ মেন্টরদের কাছে শিখুন</span>}
            description="প্রতিটি বিষয়ে নিবেদিত ইনস্ট্রাক্টর — যারা আপনাকে ধাপে ধাপে গাইড করবেন।"
          />
          <Link href="/instructors" className="inline-flex items-center gap-2 font-semibold text-brand hover:gap-3 transition-all">
            সব ইনস্ট্রাক্টর <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {instructors.map((instructor, i) => (
            <Reveal as="li" key={instructor.slug} delay={i * 0.06}>
              <InstructorCard instructor={instructor} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
