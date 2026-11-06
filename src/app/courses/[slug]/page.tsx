import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  BarChart3,
  BookOpenCheck,
  Check,
  CheckCircle2,
  Clock,
  ListChecks,
  Target,
  UserCheck,
  Wrench,
} from "lucide-react";
import { CourseCard } from "@/components/course/CourseCard";
import { DiscountBadge, PriceTag } from "@/components/course/PriceTag";
import { CTASection } from "@/components/sections/CTASection";
import { Accordion } from "@/components/ui/Accordion";
import { Avatar } from "@/components/ui/Avatar";
import { ButtonLink } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { Notice, SampleBadge } from "@/components/ui/Feedback";
import { PageHero } from "@/components/ui/PageHero";
import { SmartImage } from "@/components/ui/SmartImage";
import { getAllCourses, getCategoryLabel, getCourseBySlug, getRelatedCourses } from "@/services/courses";
import { getInstructorBySlug } from "@/services/content";
import { buildMetadata } from "@/lib/seo";
import { formatBDT, savings } from "@/lib/utils";
import { whatsappLink } from "@/lib/whatsapp";
import { siteConfig } from "@/config/site";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const courses = await getAllCourses();
  return courses.map((c) => ({ slug: c.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);
  if (!course) return { title: "Course not found" };
  return buildMetadata({
    title: course.title,
    description: `${course.shortDescription} অফার মূল্য ${formatBDT(course.offerPrice)} (নিয়মিত ${formatBDT(course.regularPrice)})।`,
    path: `/courses/${course.slug}`,
    image: course.thumbnail,
  });
}

function ListCard({ icon: IconCmp, title, items, columns = 1 }: { icon: typeof Target; title: string; items: string[]; columns?: 1 | 2 }) {
  return (
    <section className="card p-6 sm:p-8">
      <h2 className="flex items-center gap-3 text-xl font-extrabold sm:text-2xl">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-50 text-brand">
          <IconCmp className="h-5 w-5" aria-hidden="true" />
        </span>
        {title}
      </h2>
      <ul className={`mt-5 grid gap-3 ${columns === 2 ? "sm:grid-cols-2" : ""}`}>
        {items.map((item) => (
          <li key={item} className="flex gap-3 leading-7 text-ink/90">
            <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-brand" aria-hidden="true" />
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default async function CourseDetailsPage({ params }: Props) {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);
  if (!course) notFound();

  const [instructor, related] = await Promise.all([
    course.instructorSlug ? getInstructorBySlug(course.instructorSlug) : Promise.resolve(undefined),
    getRelatedCourses(course, 3),
  ]);

  const enrollHref = `/admission?course=${course.slug}`;
  const waMessage = `আসসালামু আলাইকুম, আমি "${course.title}" কোর্সটি সম্পর্কে জানতে চাই।`;
  const totalTopics = course.curriculum.reduce((sum, m) => sum + m.topics.length, 0);

  const courseJsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.title,
    description: course.overview,
    provider: { "@type": "EducationalOrganization", name: siteConfig.name, url: siteConfig.url },
    offers: {
      "@type": "Offer",
      price: course.offerPrice,
      priceCurrency: "BDT",
      category: "Paid",
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd) }} />
      <PageHero
        eyebrow={getCategoryLabel(course.category)}
        title={course.title}
        description={course.shortDescription}
        breadcrumbs={[{ label: "Courses", href: "/courses" }, { label: course.title }]}
      >
        <div className="flex flex-wrap gap-3 text-sm font-semibold">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2">
            <BarChart3 className="h-4 w-4 text-accent" aria-hidden="true" />
            {course.level}
          </span>
          {course.duration && (
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2">
              <Clock className="h-4 w-4 text-accent" aria-hidden="true" />
              {course.duration}
            </span>
          )}
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2">
            <ListChecks className="h-4 w-4 text-accent" aria-hidden="true" />
            {course.curriculum.length} মডিউল · {totalTopics} টপিক
          </span>
        </div>
      </PageHero>

      <div className="container-page grid gap-8 py-12 lg:grid-cols-[1fr_22rem] lg:gap-10 lg:py-16 xl:grid-cols-[1fr_24rem]">
        {/* Main column */}
        <div className="min-w-0 space-y-8">
          <section className="card p-6 sm:p-8" aria-labelledby="overview">
            <h2 id="overview" className="text-xl font-extrabold sm:text-2xl">
              কোর্স ওভারভিউ
            </h2>
            <p className="mt-4 text-[1.05rem] leading-8 text-ink/90">{course.overview}</p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {course.tags.map((tag) => (
                <li key={tag} className="rounded-full bg-navy-50 px-3 py-1 text-sm font-medium text-navy">
                  {tag}
                </li>
              ))}
            </ul>
          </section>

          <ListCard icon={BookOpenCheck} title="যা যা শিখবেন" items={course.whatYouWillLearn} columns={2} />

          <section className="card p-6 sm:p-8" aria-labelledby="curriculum">
            <div className="flex flex-wrap items-end justify-between gap-2">
              <h2 id="curriculum" className="flex items-center gap-3 text-xl font-extrabold sm:text-2xl">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-50 text-brand">
                  <ListChecks className="h-5 w-5" aria-hidden="true" />
                </span>
                কোর্স কারিকুলাম
              </h2>
              <p className="text-sm text-muted">
                {course.curriculum.length} মডিউল · {totalTopics} টপিক
              </p>
            </div>
            <ol className="mt-6 space-y-3">
              {course.curriculum.map((module, i) => (
                <li key={module.title} className="rounded-2xl border border-line bg-surface/60 p-5">
                  <div className="flex items-start gap-4">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-navy font-display text-sm font-bold text-white">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="min-w-0">
                      <h3 className="font-sans text-lg font-bold">{module.title}</h3>
                      <ul className="mt-3 flex flex-wrap gap-2">
                        {module.topics.map((topic) => (
                          <li key={topic} className="inline-flex items-center gap-1.5 rounded-lg bg-white px-3 py-1.5 text-sm text-ink/80 shadow-sm">
                            <Check className="h-3.5 w-3.5 text-brand" aria-hidden="true" />
                            {topic}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
            <p className="mt-4 text-xs text-muted">* কারিকুলামটি একটি নির্দেশক রূপরেখা; চূড়ান্ত সিলেবাস ভর্তির সময় জানানো হবে।</p>
          </section>

          <ListCard icon={Target} title="লার্নিং আউটকাম" items={course.learningOutcomes} />

          <div className="grid gap-8 md:grid-cols-2">
            <ListCard icon={Wrench} title="প্রয়োজনীয় দক্ষতা" items={course.requirements} />
            <ListCard icon={UserCheck} title="কারা ভর্তি হবেন" items={course.whoShouldEnroll} />
          </div>

          <section className="card p-6 sm:p-8" aria-labelledby="features">
            <h2 id="features" className="text-xl font-extrabold sm:text-2xl">
              কোর্সের বৈশিষ্ট্য
            </h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {course.features.map((f) => (
                <li key={f} className="flex items-center gap-3 rounded-xl bg-surface px-4 py-3 font-medium text-navy">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-accent text-white">
                    <Check className="h-4 w-4" aria-hidden="true" />
                  </span>
                  {f}
                </li>
              ))}
            </ul>
          </section>

          <section className="card p-6 sm:p-8" aria-labelledby="instructor">
            <h2 id="instructor" className="text-xl font-extrabold sm:text-2xl">
              ইনস্ট্রাক্টর
            </h2>
            {instructor ? (
              <div className="mt-5 flex flex-col gap-5 sm:flex-row sm:items-center">
                <Avatar name={instructor.name} src={instructor.photo} size="lg" className="ring-navy-50" />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-xl font-bold">{instructor.name}</h3>
                    {instructor.isPlaceholder && <SampleBadge>Profile coming soon</SampleBadge>}
                  </div>
                  <p className="font-semibold text-brand">{instructor.role}</p>
                  <p className="mt-2 leading-7 text-muted">{instructor.bio}</p>
                  <Link href={`/instructors/${instructor.slug}`} className="mt-3 inline-flex items-center gap-1 font-semibold text-brand hover:underline">
                    প্রোফাইল দেখুন <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            ) : (
              <p className="mt-4 text-muted">ইনস্ট্রাক্টরের তথ্য শীঘ্রই প্রকাশ করা হবে।</p>
            )}
          </section>

          <section aria-labelledby="course-faq">
            <h2 id="course-faq" className="mb-5 text-xl font-extrabold sm:text-2xl">
              প্রায়শই জিজ্ঞাসিত প্রশ্ন
            </h2>
            <Accordion items={course.faqs} />
          </section>
        </div>

        {/* Sticky pricing sidebar */}
        <aside className="lg:sticky lg:top-24 lg:self-start" aria-label="Pricing and admission">
          <div className="card overflow-hidden">
            <div className="relative aspect-[16/10] bg-navy-50">
              <SmartImage src={course.thumbnail} alt={course.title} fill sizes="(min-width: 1024px) 24rem, 100vw" className="object-cover" fallbackLabel={course.title} />
              <DiscountBadge regularPrice={course.regularPrice} offerPrice={course.offerPrice} className="absolute left-4 top-4" />
            </div>
            <div className="p-6">
              <p className="text-sm font-semibold text-muted">কোর্স ফি</p>
              <PriceTag regularPrice={course.regularPrice} offerPrice={course.offerPrice} size="lg" className="mt-1" />
              <p className="mt-2 inline-flex rounded-full bg-accent-50 px-3 py-1 text-sm font-semibold text-accent-700">
                আপনি সাশ্রয় করছেন {formatBDT(savings(course.regularPrice, course.offerPrice))}
              </p>
              <dl className="mt-5 space-y-3 border-t border-line pt-5 text-sm">
                <div className="flex justify-between gap-4">
                  <dt className="text-muted">লেভেল</dt>
                  <dd className="text-right font-semibold text-navy">{course.level}</dd>
                </div>
                {course.duration && (
                  <div className="flex justify-between gap-4">
                    <dt className="text-muted">মেয়াদ</dt>
                    <dd className="font-semibold text-navy">{course.duration}</dd>
                  </div>
                )}
                <div className="flex justify-between gap-4">
                  <dt className="text-muted">মডিউল</dt>
                  <dd className="font-semibold text-navy">{course.curriculum.length}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-muted">ব্যাচ শিডিউল</dt>
                  <dd className="text-right font-semibold text-navy">ভর্তির সময় জানানো হবে</dd>
                </div>
              </dl>
              <div className="mt-6 grid gap-3">
                <ButtonLink href={enrollHref} variant="accent" size="lg" className="w-full">
                  Enroll Now
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </ButtonLink>
                <ButtonLink href={whatsappLink(waMessage)} external variant="outline" size="lg" className="w-full">
                  <WhatsAppIcon className="h-5 w-5 text-[#25D366]" />
                  WhatsApp-এ জানুন
                </ButtonLink>
              </div>
            </div>
          </div>
          <Notice className="mt-4">সব মূল্য বাংলাদেশি টাকায় (BDT)। অফার মূল্য সীমিত সময়ের জন্য প্রযোজ্য হতে পারে।</Notice>
        </aside>
      </div>

      {/* Mobile sticky enroll bar */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-white/95 px-4 py-3 pr-20 backdrop-blur lg:hidden">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="font-display text-xl font-extrabold text-brand">{formatBDT(course.offerPrice)}</p>
            <del className="text-xs text-muted">{formatBDT(course.regularPrice)}</del>
          </div>
          <ButtonLink href={enrollHref} variant="accent">
            Enroll Now
          </ButtonLink>
        </div>
      </div>

      <section className="section bg-surface" aria-labelledby="related-courses">
        <div className="container-page">
          <h2 id="related-courses" className="text-2xl font-extrabold sm:text-3xl">
            সম্পর্কিত কোর্স
          </h2>
          <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((c) => (
              <li key={c.slug}>
                <CourseCard course={c} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="pb-16 lg:pb-0">
        <CTASection />
      </div>
    </>
  );
}
