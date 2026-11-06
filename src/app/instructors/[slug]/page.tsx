import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BookOpen, Briefcase, Globe } from "lucide-react";
import { CourseCard } from "@/components/course/CourseCard";
import { CTASection } from "@/components/sections/CTASection";
import { Avatar } from "@/components/ui/Avatar";
import { FacebookIcon, LinkedinIcon, YoutubeIcon } from "@/components/ui/BrandIcons";
import { Notice, SampleBadge } from "@/components/ui/Feedback";
import { PageHero } from "@/components/ui/PageHero";
import { getAllInstructors, getInstructorBySlug } from "@/services/content";
import { getCoursesBySlugs } from "@/services/courses";
import { buildMetadata } from "@/lib/seo";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const instructors = await getAllInstructors();
  return instructors.map((i) => ({ slug: i.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const instructor = await getInstructorBySlug(slug);
  if (!instructor) return { title: "Instructor not found" };
  return buildMetadata({
    title: `${instructor.name} — ${instructor.role}`,
    description: instructor.bio,
    path: `/instructors/${instructor.slug}`,
  });
}

export default async function InstructorProfilePage({ params }: Props) {
  const { slug } = await params;
  const instructor = await getInstructorBySlug(slug);
  if (!instructor) notFound();
  const courses = await getCoursesBySlugs(instructor.courseSlugs);

  const socials = [
    { href: instructor.social.facebook, label: "Facebook", Icon: FacebookIcon },
    { href: instructor.social.linkedin, label: "LinkedIn", Icon: LinkedinIcon },
    { href: instructor.social.youtube, label: "YouTube", Icon: YoutubeIcon },
    { href: instructor.social.website, label: "Website", Icon: Globe },
  ].filter((s): s is typeof s & { href: string } => Boolean(s.href));

  return (
    <>
      <PageHero
        eyebrow={instructor.role}
        title={instructor.name}
        description={instructor.specialization}
        breadcrumbs={[{ label: "Instructors", href: "/instructors" }, { label: instructor.name }]}
      />

      <section className="section pt-12">
        <div className="container-page grid gap-8 lg:grid-cols-[22rem_1fr]">
          <aside className="card self-start p-8 text-center lg:sticky lg:top-24">
            <Avatar name={instructor.name} src={instructor.photo} size="xl" className="mx-auto ring-navy-50" />
            <h2 className="mt-5 text-2xl font-extrabold">{instructor.name}</h2>
            <p className="mt-1 font-semibold text-brand">{instructor.role}</p>
            {instructor.isPlaceholder && <SampleBadge className="mt-3">Profile coming soon</SampleBadge>}
            <dl className="mt-6 grid grid-cols-2 gap-3 text-left">
              <div className="rounded-2xl bg-surface p-4">
                <dt className="flex items-center gap-1.5 text-xs text-muted">
                  <BookOpen className="h-3.5 w-3.5" aria-hidden="true" /> কোর্স
                </dt>
                <dd className="mt-1 font-display text-2xl font-extrabold text-navy">{courses.length}</dd>
              </div>
              <div className="rounded-2xl bg-surface p-4">
                <dt className="flex items-center gap-1.5 text-xs text-muted">
                  <Briefcase className="h-3.5 w-3.5" aria-hidden="true" /> দক্ষতা
                </dt>
                <dd className="mt-1 font-display text-2xl font-extrabold text-navy">{instructor.expertise.length}</dd>
              </div>
            </dl>
            {socials.length > 0 && (
              <ul className="mt-6 flex justify-center gap-3">
                {socials.map(({ href, label, Icon }) => (
                  <li key={label}>
                    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="grid h-10 w-10 place-items-center rounded-full bg-navy-50 text-navy hover:bg-brand hover:text-white">
                      <Icon className="h-4 w-4" />
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </aside>

          <div className="space-y-8">
            {instructor.isPlaceholder && (
              <Notice>এই প্রোফাইলটি শীঘ্রই ইনস্ট্রাক্টরের নাম, ছবি ও বিস্তারিত তথ্য দিয়ে হালনাগাদ করা হবে।</Notice>
            )}
            <section className="card p-6 sm:p-8">
              <h2 className="text-xl font-extrabold sm:text-2xl">পরিচিতি</h2>
              <p className="mt-4 text-[1.05rem] leading-8 text-ink/90">{instructor.bio}</p>
            </section>
            <section className="card p-6 sm:p-8">
              <h2 className="text-xl font-extrabold sm:text-2xl">দক্ষতার ক্ষেত্র</h2>
              <ul className="mt-5 flex flex-wrap gap-2">
                {instructor.expertise.map((skill) => (
                  <li key={skill} className="rounded-full border border-brand-100 bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700">
                    {skill}
                  </li>
                ))}
              </ul>
            </section>
            <section>
              <h2 className="text-xl font-extrabold sm:text-2xl">যে কোর্সগুলো পড়ান</h2>
              <ul className="mt-5 grid gap-6 sm:grid-cols-2">
                {courses.map((course) => (
                  <li key={course.slug}>
                    <CourseCard course={course} />
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </section>
      <CTASection />
    </>
  );
}
