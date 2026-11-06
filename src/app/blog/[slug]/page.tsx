import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, CheckCircle2, Clock, UserRound } from "lucide-react";
import { BlogCard } from "@/components/blog/BlogCard";
import { CourseCard } from "@/components/course/CourseCard";
import { CTASection } from "@/components/sections/CTASection";
import { SmartImage } from "@/components/ui/SmartImage";
import { getAllPosts, getPostBySlug, getRelatedPosts } from "@/services/content";
import { getCoursesBySlugs } from "@/services/courses";
import { buildMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/utils";
import type { BlogBlock } from "@/types";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Article not found" };
  return buildMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    image: post.coverImage,
    type: "article",
  });
}

function Block({ block }: { block: BlogBlock }) {
  switch (block.type) {
    case "heading":
      return <h2>{block.text}</h2>;
    case "paragraph":
      return <p>{block.text}</p>;
    case "quote":
      return <blockquote>{block.text}</blockquote>;
    case "list":
      return (
        <ul>
          {block.items.map((item) => (
            <li key={item} className="flex gap-3">
              <CheckCircle2 className="mt-1.5 h-5 w-5 shrink-0 text-brand" aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
  }
}

export default async function BlogDetailsPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const [related, relatedCourses] = await Promise.all([
    getRelatedPosts(post, 3),
    getCoursesBySlugs(post.relatedCourseSlugs ?? []),
  ]);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: post.coverImage,
    datePublished: post.publishedAt,
    author: { "@type": "Organization", name: post.author },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <article>
        <header className="bg-surface">
          <div className="container-page max-w-4xl pb-10 pt-10 sm:pt-14">
            <nav aria-label="Breadcrumb" className="text-sm text-muted">
              <Link href="/blog" className="inline-flex items-center gap-1.5 font-semibold text-brand hover:underline">
                <ArrowLeft className="h-4 w-4" aria-hidden="true" /> সব আর্টিকেল
              </Link>
            </nav>
            <span className="mt-6 inline-block rounded-full bg-accent-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-accent-700">
              {post.category}
            </span>
            <h1 className="mt-4 font-sans text-3xl font-extrabold leading-tight sm:text-4xl lg:text-[2.75rem]">{post.title}</h1>
            <p className="mt-4 text-lg leading-8 text-muted">{post.excerpt}</p>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
              <span className="inline-flex items-center gap-1.5">
                <UserRound className="h-4 w-4" aria-hidden="true" /> {post.author}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays className="h-4 w-4" aria-hidden="true" />
                <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4" aria-hidden="true" /> {post.readingMinutes} মিনিট পড়া
              </span>
            </div>
          </div>
        </header>

        <div className="container-page max-w-4xl">
          <div className="relative -mt-2 aspect-[16/8] overflow-hidden rounded-[1.75rem] bg-navy-50 shadow-lift">
            <SmartImage src={post.coverImage} alt={post.title} fill priority sizes="(min-width: 1024px) 56rem, 100vw" className="object-cover" fallbackLabel={post.category} />
          </div>
          <div className="prose-cs mx-auto max-w-3xl py-12">
            {post.content.map((block, i) => (
              <Block key={i} block={block} />
            ))}
          </div>
          <ul className="mx-auto flex max-w-3xl flex-wrap gap-2 border-t border-line pt-6" aria-label="Tags">
            {post.tags.map((tag) => (
              <li key={tag} className="rounded-full bg-navy-50 px-3 py-1 text-sm font-medium text-navy">
                #{tag}
              </li>
            ))}
          </ul>
        </div>
      </article>

      {relatedCourses.length > 0 && (
        <section className="section pb-0" aria-labelledby="post-courses">
          <div className="container-page">
            <h2 id="post-courses" className="text-2xl font-extrabold sm:text-3xl">
              এই বিষয়ে কোর্স
            </h2>
            <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedCourses.map((c) => (
                <li key={c.slug}>
                  <CourseCard course={c} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="section" aria-labelledby="related-posts">
        <div className="container-page">
          <h2 id="related-posts" className="text-2xl font-extrabold sm:text-3xl">
            আরও পড়ুন
          </h2>
          <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <li key={p.slug}>
                <BlogCard post={p} />
              </li>
            ))}
          </ul>
        </div>
      </section>
      <CTASection />
    </>
  );
}
