import { InstructorCard } from "@/components/instructor/InstructorCard";
import { CTASection } from "@/components/sections/CTASection";
import { Notice } from "@/components/ui/Feedback";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { getAllInstructors } from "@/services/content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Our Instructors",
  description: "CholoShikhi IT Institute-এর ডিজাইন, ওয়েব ডেভেলপমেন্ট, Python, ডেটা সায়েন্স, ডিজিটাল মার্কেটিং ও কিডস প্রোগ্রামিং ইনস্ট্রাক্টরদের সাথে পরিচিত হোন।",
  path: "/instructors",
});

export default async function InstructorsPage() {
  const instructors = await getAllInstructors();
  const hasPlaceholders = instructors.some((i) => i.isPlaceholder);

  return (
    <>
      <PageHero
        eyebrow="Our Instructors"
        title="যাদের কাছে শিখবেন"
        description="প্রতিটি বিষয়ে নিবেদিত মেন্টর — যারা হাতে-কলমে, ধাপে ধাপে আপনাকে দক্ষ করে তুলবেন।"
        breadcrumbs={[{ label: "Instructors" }]}
      />
      <section className="section">
        <div className="container-page">
          {hasPlaceholders && (
            <Notice className="mb-8">
              ইনস্ট্রাক্টরদের নাম, ছবি ও বিস্তারিত প্রোফাইল শীঘ্রই প্রকাশ করা হবে। বর্তমানে বিষয়ভিত্তিক প্রোফাইল দেখানো হচ্ছে।
            </Notice>
          )}
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {instructors.map((instructor, i) => (
              <Reveal as="li" key={instructor.slug} delay={(i % 3) * 0.06}>
                <InstructorCard instructor={instructor} />
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
      <CTASection title="অভিজ্ঞ মেন্টরদের সাথে শেখা শুরু করুন" />
    </>
  );
}
