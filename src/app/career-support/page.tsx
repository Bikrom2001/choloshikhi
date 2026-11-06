import Link from "next/link";
import { ArrowRight, BriefcaseBusiness } from "lucide-react";
import { CTASection } from "@/components/sections/CTASection";
import { Accordion } from "@/components/ui/Accordion";
import { Notice } from "@/components/ui/Feedback";
import { Icon } from "@/components/ui/Icon";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SmartImage } from "@/components/ui/SmartImage";
import { careerFaqs, careerPaths, careerServices, freelancingSteps } from "@/data/programs";
import { getAllCourses } from "@/services/courses";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Career & Freelancing Support",
  description:
    "CV, পোর্টফোলিও, ইন্টারভিউ প্রস্তুতি ও ফ্রিল্যান্সিং গাইডলাইন — CholoShikhi IT Institute-এর ক্যারিয়ার ডেভেলপমেন্ট সাপোর্ট সম্পর্কে জানুন।",
  path: "/career-support",
});

export default async function CareerSupportPage() {
  const courses = await getAllCourses();
  const titleOf = new Map(courses.map((c) => [c.slug, c.title]));

  return (
    <>
      <PageHero
        eyebrow="Career & Freelancing"
        title="শেখা থেকে ক্যারিয়ার — পুরো পথে পাশে আছি"
        description="দক্ষতা অর্জনের পাশাপাশি CV, পোর্টফোলিও, ইন্টারভিউ ও ফ্রিল্যান্সিংয়ের জন্য প্রয়োজনীয় দিকনির্দেশনা।"
        breadcrumbs={[{ label: "Career Support" }]}
      />

      <section className="section">
        <div className="container-page grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <SectionHeading
              align="left"
              eyebrow="Career Development"
              title="শুধু কোর্স নয়, ক্যারিয়ারের প্রস্তুতি"
              description="একজন শিক্ষার্থী কোর্স শেষে যেন আত্মবিশ্বাসের সাথে চাকরি বা ফ্রিল্যান্সিংয়ের পথে এগোতে পারে — সেই লক্ষ্যেই আমাদের ক্যারিয়ার ডেভেলপমেন্ট সাপোর্ট।"
            />
            <Notice className="mt-6">
              আমরা চাকরি বা আয়ের নিশ্চয়তা দিই না — আমরা দিই সঠিক দিকনির্দেশনা ও প্রস্তুতি। সাফল্য নির্ভর করে আপনার প্রচেষ্টা ও অনুশীলনের ওপর।
            </Notice>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-navy-50 shadow-lift">
              <SmartImage
                src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1400&q=80"
                alt="ল্যাপটপে একসাথে কাজ করছেন তরুণ প্রফেশনালরা"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
                fallbackLabel="Career Support"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section bg-surface" aria-labelledby="services">
        <div className="container-page">
          <SectionHeading eyebrow="What you get" title={<span id="services">ক্যারিয়ার সাপোর্টে যা থাকছে</span>} />
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {careerServices.map((s, i) => (
              <Reveal as="li" key={s.title} delay={(i % 3) * 0.06}>
                <div className="group card h-full p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lift sm:p-7">
                  <span className="grid h-13 w-13 place-items-center rounded-2xl bg-brand-50 text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                    <Icon name={s.icon} className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 font-sans text-lg font-bold">{s.title}</h3>
                  <p className="mt-2 leading-7 text-muted">{s.description}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="section bg-navy" aria-labelledby="freelancing">
        <div className="container-page">
          <SectionHeading
            tone="dark"
            eyebrow="Freelancing Roadmap"
            title={<span id="freelancing">ফ্রিল্যান্সিং শুরুর ৫টি ধাপ</span>}
            description="নতুনদের জন্য বাস্তবসম্মত একটি পথনির্দেশ।"
          />
          <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {freelancingSteps.map((step, i) => (
              <Reveal as="li" key={step.title} delay={i * 0.07}>
                <div className="h-full rounded-2xl border border-white/10 bg-white/5 p-6">
                  <div className="flex items-center justify-between">
                    <Icon name={step.icon} className="h-7 w-7 text-accent" />
                    <span className="font-display text-3xl font-extrabold text-white/15">0{i + 1}</span>
                  </div>
                  <h3 className="mt-4 font-sans text-lg font-bold text-white">{step.title}</h3>
                  <p className="mt-1.5 text-sm leading-6 text-navy-100">{step.description}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="section" aria-labelledby="career-paths">
        <div className="container-page">
          <SectionHeading
            eyebrow="Career Paths"
            title={<span id="career-paths">কোন কোর্স থেকে কোন ক্যারিয়ার</span>}
            description="প্রতিটি কোর্সের দক্ষতা যে ধরনের পেশায় কাজে লাগে তার কিছু উদাহরণ।"
          />
          <ul className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {careerPaths.map((path, i) => (
              <Reveal as="li" key={path.courseSlug} delay={(i % 3) * 0.06}>
                <Link
                  href={`/courses/${path.courseSlug}`}
                  className="group card flex h-full flex-col p-6 transition-all hover:-translate-y-1 hover:border-brand-200 hover:shadow-lift"
                >
                  <span className="flex items-center gap-2 text-sm font-semibold text-muted">
                    <BriefcaseBusiness className="h-4 w-4 text-accent" aria-hidden="true" />
                    কোর্স
                  </span>
                  <h3 className="mt-2 font-sans text-lg font-bold group-hover:text-brand">{titleOf.get(path.courseSlug)}</h3>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {path.roles.map((r) => (
                      <li key={r} className="rounded-full bg-brand-50 px-3 py-1 text-sm font-semibold text-brand-700">
                        {r}
                      </li>
                    ))}
                  </ul>
                  <span className="mt-auto inline-flex items-center gap-1 pt-5 text-sm font-bold text-brand">
                    কোর্স দেখুন <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="section bg-surface" aria-labelledby="career-faq">
        <div className="container-page max-w-3xl">
          <SectionHeading eyebrow="FAQ" title={<span id="career-faq">ক্যারিয়ার সাপোর্ট নিয়ে প্রশ্ন</span>} />
          <Accordion items={careerFaqs} className="mt-10" />
        </div>
      </section>

      <CTASection />
    </>
  );
}
