import Link from "next/link";
import { ArrowRight, CheckCircle2, MessageCircle } from "lucide-react";
import { CourseCard } from "@/components/course/CourseCard";
import { CTASection } from "@/components/sections/CTASection";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { additionalProgramSlugs, programs } from "@/data/programs";
import { getAllCourses } from "@/services/courses";
import { buildMetadata } from "@/lib/seo";
import { formatBDT } from "@/lib/utils";
import { whatsappLink } from "@/lib/whatsapp";

export const metadata = buildMetadata({
  title: "Programs — আমরা যা শেখাই",
  description:
    "Web Development, Design, Web App Making, Marketing, Graphics, Video Editing, SSC & HSC Academic ও Linux — CholoShikhi IT Institute-এর শেখার ক্ষেত্রসমূহ ও সংশ্লিষ্ট কোর্স।",
  path: "/programs",
});

export default async function ProgramsPage() {
  const courses = await getAllCourses();
  const bySlug = new Map(courses.map((c) => [c.slug, c]));
  const more = additionalProgramSlugs.map((s) => bySlug.get(s)).filter((c) => c !== undefined);

  return (
    <>
      <PageHero
        eyebrow="Programs"
        title="আমরা যা শেখাই"
        description="ডিজাইন থেকে ডেভেলপমেন্ট, মার্কেটিং থেকে একাডেমিক — আপনার লক্ষ্য অনুযায়ী শেখার ক্ষেত্র বেছে নিন।"
        breadcrumbs={[{ label: "Programs" }]}
      >
        <nav aria-label="Jump to program">
          <ul className="flex flex-wrap gap-2">
            {programs.map((p) => (
              <li key={p.id}>
                <a
                  href={`#${p.id}`}
                  className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/20"
                >
                  <Icon name={p.icon} className="h-4 w-4 text-accent" />
                  {p.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </PageHero>

      <section className="section pt-12">
        <div className="container-page">
          <ul className="grid gap-6 md:grid-cols-2">
            {programs.map((program, i) => {
              const related = program.courseSlugs.map((s) => bySlug.get(s)).filter((c) => c !== undefined);
              return (
                <Reveal as="li" key={program.id} delay={(i % 2) * 0.06}>
                  <article id={program.id} className="card flex h-full scroll-mt-28 flex-col p-6 sm:p-8">
                    <div className="flex items-start gap-4">
                      <span
                        className={
                          i % 2 === 0
                            ? "grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-brand-50 text-brand"
                            : "grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-accent-50 text-accent-600"
                        }
                      >
                        <Icon name={program.icon} className="h-7 w-7" />
                      </span>
                      <div>
                        <h2 className="text-xl font-extrabold sm:text-2xl">{program.title}</h2>
                        <p className="font-semibold text-brand">{program.titleBn}</p>
                      </div>
                    </div>
                    <p className="mt-4 leading-7 text-muted">{program.description}</p>
                    <ul className="mt-4 flex flex-wrap gap-2" aria-label="Skills">
                      {program.skills.map((s) => (
                        <li key={s} className="rounded-full bg-navy-50 px-3 py-1 text-sm font-medium text-navy">
                          {s}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-auto pt-6">
                      {related.length > 0 ? (
                        <>
                          <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted">সংশ্লিষ্ট কোর্স</p>
                          <ul className="mt-3 divide-y divide-line rounded-2xl border border-line">
                            {related.map((c) => (
                              <li key={c.slug}>
                                <Link
                                  href={`/courses/${c.slug}`}
                                  className="group flex items-center justify-between gap-3 px-4 py-3 transition-colors hover:bg-surface"
                                >
                                  <span className="flex items-center gap-2 font-semibold text-navy group-hover:text-brand">
                                    <CheckCircle2 className="h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
                                    {c.title}
                                  </span>
                                  <span className="flex shrink-0 items-center gap-2">
                                    <span className="font-display font-extrabold text-brand">{formatBDT(c.offerPrice)}</span>
                                    <ArrowRight className="h-4 w-4 text-muted transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                                  </span>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </>
                      ) : (
                        <div className="flex flex-col gap-3 rounded-2xl border border-dashed border-accent/50 bg-accent-50 p-4 sm:flex-row sm:items-center sm:justify-between">
                          <p className="text-sm font-medium text-navy">ব্যাচ, বিষয় ও ফি সম্পর্কে জানতে আমাদের সাথে যোগাযোগ করুন।</p>
                          <ButtonLink
                            href={whatsappLink(`আসসালামু আলাইকুম, আমি "${program.title}" সম্পর্কে জানতে চাই।`)}
                            external
                            variant="accent"
                            size="sm"
                          >
                            <MessageCircle className="h-4 w-4" aria-hidden="true" />
                            জানতে চাই
                          </ButtonLink>
                        </div>
                      )}
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </section>

      {more.length > 0 && (
        <section className="section bg-surface" aria-labelledby="more-programs">
          <div className="container-page">
            <SectionHeading
              eyebrow="More Programs"
              title={<span id="more-programs">আরও যা শিখতে পারেন</span>}
              description="ডেটা সায়েন্স, কম্পিউটারের ভিত্তি এবং শিশুদের প্রোগ্রামিং।"
            />
            <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {more.map((c) => (
                <li key={c.slug}>
                  <CourseCard course={c} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <CTASection title="কোন প্রোগ্রাম আপনার জন্য সঠিক?" description="সিদ্ধান্ত নিতে দ্বিধা? আমাদের সাথে কথা বলুন — আপনার লক্ষ্য অনুযায়ী সঠিক কোর্স বেছে নিতে সাহায্য করব।" />
    </>
  );
}
