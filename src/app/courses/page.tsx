import { CourseExplorer } from "@/components/course/CourseExplorer";
import { CTASection } from "@/components/sections/CTASection";
import { PageHero } from "@/components/ui/PageHero";
import { getAllCourses, getCourseCategories } from "@/services/courses";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "All Courses",
  description:
    "AI Master Graphic Design, MERN Stack, Python, Data Science, Digital Marketing, Content Creation ও Programming for Kids — CholoShikhi-এর সব কোর্স ও অফার মূল্য দেখুন।",
  path: "/courses",
});

interface CoursesPageProps {
  searchParams: Promise<{ category?: string; q?: string }>;
}

export default async function CoursesPage({ searchParams }: CoursesPageProps) {
  const [{ category, q }, courses, categories] = await Promise.all([
    searchParams,
    getAllCourses(),
    getCourseCategories(),
  ]);

  return (
    <>
      <PageHero
        eyebrow="All Courses"
        title="আপনার পছন্দের কোর্সটি বেছে নিন"
        description="ক্যারিয়ারের লক্ষ্য অনুযায়ী কোর্স খুঁজুন, ক্যাটাগরি দিয়ে ফিল্টার করুন এবং বিশেষ অফার মূল্যে ভর্তি হন।"
        breadcrumbs={[{ label: "Courses" }]}
      />
      <section className="section pt-10 sm:pt-12">
        <div className="container-page">
          <CourseExplorer courses={courses} categories={categories} initialCategory={category} initialQuery={q ?? ""} />
        </div>
      </section>
      <CTASection />
    </>
  );
}
