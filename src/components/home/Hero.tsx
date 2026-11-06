"use client";

import { motion } from "framer-motion";
import { ArrowRight, BadgePercent, CheckCircle2, PlayCircle, Sparkles } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { SmartImage } from "@/components/ui/SmartImage";
import { siteConfig } from "@/config/site";

interface HeroProps {
  courseCount: number;
  maxDiscount: number;
}

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero({ courseCount, maxDiscount }: HeroProps) {
  const highlights = ["বিগিনার-ফ্রেন্ডলি", "প্রজেক্ট-ভিত্তিক শেখা", "ফ্রিল্যান্সিং গাইডলাইন"];

  return (
    <section className="relative overflow-hidden bg-surface">
      <div className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top_left,black_30%,transparent_75%)]" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-40 top-10 h-[28rem] w-[28rem] rounded-full bg-brand/10 blur-3xl" aria-hidden="true" />

      <div className="container-page relative grid items-center gap-12 py-14 sm:py-20 lg:grid-cols-[1.05fr_1fr] lg:gap-10 lg:py-24">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
            className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-white px-3.5 py-1.5 text-sm font-semibold text-navy shadow-soft"
          >
            <Sparkles className="h-4 w-4 text-accent" aria-hidden="true" />
            ভর্তি চলছে — সীমিত সময়ের অফার মূল্যে
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08, ease }}
            className="mt-6 text-4xl font-extrabold leading-[1.2] sm:text-5xl lg:text-[3.6rem] lg:leading-[1.15]"
          >
            দক্ষতা শিখুন, <span className="relative whitespace-nowrap text-brand">
              নিজের ভবিষ্যৎ
              <svg className="absolute -bottom-2 left-0 h-3 w-full text-accent" viewBox="0 0 200 12" preserveAspectRatio="none" aria-hidden="true">
                <path d="M2 9c40-6 120-8 196-3" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" />
              </svg>
            </span>{" "}
            গড়ুন!
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.16, ease }}
            className="mt-6 max-w-xl text-lg leading-8 text-muted"
          >
            আপনার ক্যারিয়ার গড়ার যাত্রা শুরু হোক চলোশিখি IT Institute-এর সাথে। শিখুন আধুনিক প্রযুক্তি, তৈরি করুন বাস্তব
            প্রজেক্ট এবং হয়ে উঠুন দক্ষ প্রফেশনাল।
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.24, ease }}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <ButtonLink href="/courses" variant="primary" size="lg">
              Explore Courses
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </ButtonLink>
            <ButtonLink href="/admission" variant="outline" size="lg">
              <PlayCircle className="h-5 w-5 text-accent" aria-hidden="true" />
              Start Learning
            </ButtonLink>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.36 }}
            className="mt-8 flex flex-wrap gap-x-6 gap-y-3"
          >
            {highlights.map((h) => (
              <li key={h} className="flex items-center gap-2 text-sm font-semibold text-navy">
                <CheckCircle2 className="h-5 w-5 text-brand" aria-hidden="true" />
                {h}
              </li>
            ))}
          </motion.ul>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1, ease }}
          className="relative mx-auto w-full max-w-xl lg:max-w-none"
        >
          <div className="absolute -inset-3 rotate-2 rounded-[2.25rem] bg-gradient-to-br from-brand/20 to-accent/20" aria-hidden="true" />
          <div className="relative aspect-[5/4] overflow-hidden rounded-[2rem] border-4 border-white bg-navy-100 shadow-lift">
            <SmartImage
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1400&q=80"
              alt="শিক্ষার্থীরা ল্যাপটপে একসাথে শিখছে"
              fill
              priority
              sizes="(min-width: 1024px) 45vw, 90vw"
              className="object-cover"
              fallbackLabel={siteConfig.tagline}
            />
          </div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease }}
            className="absolute -left-2 bottom-8 flex items-center gap-3 rounded-2xl bg-white p-3.5 pr-5 shadow-lift sm:-left-8"
          >
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent text-white">
              <BadgePercent className="h-6 w-6" aria-hidden="true" />
            </span>
            <span>
              <span className="block font-display text-xl font-extrabold text-navy">{maxDiscount}% পর্যন্ত</span>
              <span className="block text-xs font-medium text-muted">কোর্স ফি-তে ছাড়</span>
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.62, ease }}
            className="absolute -right-2 top-8 rounded-2xl bg-navy px-5 py-4 text-white shadow-lift sm:-right-6"
          >
            <span className="block font-display text-3xl font-extrabold">{courseCount}</span>
            <span className="block text-xs font-medium text-navy-100">প্রফেশনাল কোর্স</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
