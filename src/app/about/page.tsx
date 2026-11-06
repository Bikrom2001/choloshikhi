import { CheckCircle2, Eye, Target } from "lucide-react";
import { CTASection } from "@/components/sections/CTASection";
import { Icon } from "@/components/ui/Icon";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SmartImage } from "@/components/ui/SmartImage";
import { audiences, coreValues, whyChooseUs } from "@/data/site-content";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "About Us",
  description:
    "CholoShikhi IT Institute সম্পর্কে জানুন — আমাদের লক্ষ্য, শেখানোর পদ্ধতি এবং বাংলাদেশের শিক্ষার্থীদের দক্ষ প্রফেশনাল হিসেবে গড়ে তোলার প্রতিশ্রুতি।",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About CholoShikhi"
        title="শেখা হোক সহজ, দক্ষতা হোক বাস্তব"
        description="আমরা বিশ্বাস করি, সঠিক গাইডলাইন আর হাতে-কলমে অনুশীলনের মাধ্যমে যে কেউ প্রযুক্তিতে দক্ষ হয়ে উঠতে পারে।"
        breadcrumbs={[{ label: "About Us" }]}
      />

      <section className="section">
        <div className="container-page grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-navy-50 shadow-lift">
              <SmartImage
                src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1400&q=80"
                alt="ক্লাসরুমে শিক্ষার্থীরা শিখছে"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
                fallbackLabel={siteConfig.name}
              />
            </div>
            <div className="absolute -bottom-6 right-6 rounded-2xl bg-accent px-6 py-4 text-white shadow-cta">
              <p className="font-display text-xl font-extrabold">{siteConfig.tagline}</p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <SectionHeading
              align="left"
              eyebrow="Who we are"
              title="CholoShikhi IT Institute — আপনার দক্ষতা গড়ার সঙ্গী"
            />
            <div className="mt-6 space-y-4 text-lg leading-8 text-muted">
              <p>
                CholoShikhi IT Institute বাংলাদেশের শিক্ষার্থী, ফ্রিল্যান্সার, চাকরিপ্রার্থী, নতুন শিক্ষার্থী ও প্রফেশনালদের জন্য
                আধুনিক ও বাস্তবমুখী IT প্রশিক্ষণ প্রদান করে।
              </p>
              <p>
                গ্রাফিক ডিজাইন, ওয়েব ডেভেলপমেন্ট, Python, ডেটা সায়েন্স, ডিজিটাল মার্কেটিং, কনটেন্ট ক্রিয়েশন থেকে শুরু করে
                শিশুদের প্রোগ্রামিং — প্রতিটি কোর্সে আমরা গুরুত্ব দিই বাস্তব প্রজেক্ট ও ক্যারিয়ার-উপযোগী দক্ষতায়।
              </p>
            </div>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {["প্র্যাকটিক্যাল ক্লাস", "প্রজেক্ট-ভিত্তিক শেখা", "ফ্রিল্যান্সিং গাইডলাইন", "ক্যারিয়ার সাপোর্ট"].map((item) => (
                <li key={item} className="flex items-center gap-2 font-semibold text-navy">
                  <CheckCircle2 className="h-5 w-5 text-brand" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="section bg-surface">
        <div className="container-page grid gap-6 md:grid-cols-2">
          <Reveal>
            <div className="card h-full p-8">
              <span className="grid h-13 w-13 place-items-center rounded-2xl bg-brand text-white">
                <Target className="h-6 w-6" aria-hidden="true" />
              </span>
              <h2 className="mt-5 text-2xl font-extrabold">আমাদের লক্ষ্য (Mission)</h2>
              <p className="mt-3 leading-8 text-muted">
                সহজ ভাষায়, হাতে-কলমে ও সাশ্রয়ী মূল্যে মানসম্মত IT শিক্ষা পৌঁছে দেওয়া — যাতে প্রত্যেক শিক্ষার্থী নিজের দক্ষতা দিয়ে
                ক্যারিয়ার গড়তে পারে।
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="card h-full p-8">
              <span className="grid h-13 w-13 place-items-center rounded-2xl bg-accent text-white">
                <Eye className="h-6 w-6" aria-hidden="true" />
              </span>
              <h2 className="mt-5 text-2xl font-extrabold">আমাদের স্বপ্ন (Vision)</h2>
              <p className="mt-3 leading-8 text-muted">
                বাংলাদেশে এমন একটি দক্ষ প্রজন্ম গড়ে তোলা, যারা প্রযুক্তি ব্যবহার করে দেশে ও বিদেশে আত্মবিশ্বাসের সাথে কাজ করবে।
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container-page">
          <SectionHeading eyebrow="Our Values" title="Learn • Build • Grow" description="আমাদের প্রতিটি কোর্স এই তিনটি মূলনীতির ওপর দাঁড়িয়ে।" />
          <ul className="mt-12 grid gap-6 md:grid-cols-3">
            {coreValues.map((v, i) => (
              <Reveal as="li" key={v.title} delay={i * 0.08}>
                <div className="card relative h-full overflow-hidden p-8 text-center">
                  <span className="absolute right-5 top-3 font-display text-7xl font-extrabold text-navy-50" aria-hidden="true">
                    0{i + 1}
                  </span>
                  <span className="relative mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-navy text-white">
                    <Icon name={v.icon} className="h-7 w-7" />
                  </span>
                  <h3 className="relative mt-5 text-2xl font-extrabold">{v.title}</h3>
                  <p className="relative mt-2 text-muted">{v.description}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="section bg-navy">
        <div className="container-page">
          <SectionHeading tone="dark" eyebrow="Who we serve" title="আমরা কাদের জন্য" />
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {audiences.map((a, i) => (
              <Reveal as="li" key={a.title} delay={i * 0.06}>
                <div className="h-full rounded-2xl border border-white/10 bg-white/5 p-6 transition-colors hover:bg-white/10">
                  <Icon name={a.icon} className="h-7 w-7 text-accent" />
                  <h3 className="mt-4 font-sans text-lg font-bold text-white">{a.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-navy-100">{a.description}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="container-page">
          <SectionHeading eyebrow="Our approach" title="আমাদের শেখানোর পদ্ধতি" />
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {whyChooseUs.map((item, i) => (
              <Reveal as="li" key={item.title} delay={(i % 3) * 0.06}>
                <div className="flex h-full gap-4 rounded-2xl border border-line p-6">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand">
                    <Icon name={item.icon} className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-sans text-base font-bold">{item.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-muted">{item.description}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <CTASection />
    </>
  );
}
