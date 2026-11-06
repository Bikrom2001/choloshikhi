"use client";

import Link from "next/link";
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
          {/* Animated, highlighted announcement banner pill */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
            className="inline-block"
          >
            <Link
              href="/admission"
              className="group relative inline-flex items-center overflow-hidden rounded-full p-[2px] shadow-[0_4px_24px_-4px_rgba(247,148,29,0.38)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_6px_28px_-2px_rgba(247,148,29,0.52)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              aria-label="ভর্তি চলছে — সীমিত সময়ের অফার মূল্যে"
            >
              {/* Continuous rotating gradient highlight border */}
              <span
                className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,#F7941D,#2878E5,#102B5C,#F7941D)] animate-[spin_5s_linear_infinite]"
                aria-hidden="true"
              />

              {/* Inner container with prominent height and styling */}
              <span className="relative flex h-11 sm:h-12 items-center gap-2.5 rounded-full bg-white px-3.5 sm:px-4.5 py-1.5 backdrop-blur-md transition-colors group-hover:bg-white/95">
                {/* Live pulsing badge */}
                <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-accent to-accent-600 px-2.5 sm:px-3 py-1 text-xs font-bold text-white shadow-xs">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-80" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
                  </span>
                  <span>ভর্তি চলছে</span>
                </span>

                {/* Highlighted text */}
                <span className="text-xs sm:text-sm font-bold text-navy transition-colors group-hover:text-brand">
                  সীমিত সময়ের অফার মূল্যে
                </span>

                {/* Animated sparkle and arrow */}
                <span className="flex items-center text-accent transition-transform duration-300 group-hover:translate-x-1">
                  <Sparkles className="h-4 w-4 animate-pulse" aria-hidden="true" />
                  <ArrowRight className="ml-1 h-3.5 w-3.5 opacity-70 transition-opacity group-hover:opacity-100" aria-hidden="true" />
                </span>
              </span>
            </Link>
          </motion.div>

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
