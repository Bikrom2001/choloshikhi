import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import {
  FeaturedInstructorsSection,
  LearningProcessSection,
  PopularCoursesSection,
  StatsSection,
  WhyChooseSection,
} from "@/components/home/HomeSections";
import { TestimonialsCarousel } from "@/components/home/TestimonialsCarousel";
import { CTASection } from "@/components/sections/CTASection";
import { Accordion } from "@/components/ui/Accordion";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { homeFaqs } from "@/data/faqs";
import { learningSteps, stats, whyChooseUs } from "@/data/site-content";
import { getAllCourses } from "@/services/courses";
import { getAllInstructors, getTestimonials } from "@/services/content";
import { discountPercent } from "@/lib/utils";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...buildMetadata({
    title: `${siteConfig.name} — দক্ষতা শিখুন, নিজের ভবিষ্যৎ গড়ুন`,
    description: siteConfig.description,
    path: "/",
  }),
  title: { absolute: `${siteConfig.name} — দক্ষতা শিখুন, নিজের ভবিষ্যৎ গড়ুন` },
};

export default async function HomePage() {
  const [courses, instructors, testimonials] = await Promise.all([
    getAllCourses(),
    getAllInstructors(),
    getTestimonials(),
  ]);
  const maxDiscount = Math.max(...courses.map((c) => discountPercent(c.regularPrice, c.offerPrice)));
  const courseTitles = Object.fromEntries(courses.map((c) => [c.slug, c.title]));

  return (
    <>
      <Hero courseCount={courses.length} maxDiscount={maxDiscount} />
      <StatsSection stats={stats} />
      <PopularCoursesSection courses={courses} />
      <WhyChooseSection items={whyChooseUs} />
      <LearningProcessSection steps={learningSteps} />
      <FeaturedInstructorsSection instructors={instructors.slice(0, 4)} />

      <section className="section bg-surface" aria-labelledby="testimonials">
        <div className="container-page">
          <SectionHeading
            eyebrow="Student Success"
            title={<span id="testimonials">শিক্ষার্থীদের অভিজ্ঞতা</span>}
            description="শিক্ষার্থীদের প্রকৃত রিভিউ শীঘ্রই এখানে যুক্ত করা হবে। নিচের রিভিউগুলো নমুনা হিসেবে দেখানো হয়েছে।"
          />
          <div className="mt-12">
            <TestimonialsCarousel testimonials={testimonials} courseTitles={courseTitles} />
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="home-faq">
        <div className="container-page grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <SectionHeading
              align="left"
              eyebrow="FAQ"
              title={<span id="home-faq">সাধারণ জিজ্ঞাসা</span>}
              description="ভর্তি, কোর্স ও শেখা নিয়ে আপনার মনে প্রশ্ন? এখানে উত্তর খুঁজে নিন।"
            />
            <ButtonLink href="/faq" variant="outline" className="mt-8">
              সব প্রশ্ন দেখুন
            </ButtonLink>
          </div>
          <Accordion items={homeFaqs} />
        </div>
      </section>

      <CTASection />
    </>
  );
}
