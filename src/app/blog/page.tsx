import { BlogExplorer } from "@/components/blog/BlogExplorer";
import { PageHero } from "@/components/ui/PageHero";
import { blogCategories } from "@/data/blog";
import { getAllPosts } from "@/services/content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Blog",
  description: "ক্যারিয়ার, ফ্রিল্যান্সিং, প্রোগ্রামিং, ডিজাইন ও AI নিয়ে CholoShikhi ব্লগের আর্টিকেল ও গাইডলাইন পড়ুন।",
  path: "/blog",
});

export default async function BlogPage() {
  const posts = await getAllPosts();
  return (
    <>
      <PageHero
        eyebrow="CholoShikhi Blog"
        title="শিখুন, জানুন, এগিয়ে যান"
        description="ক্যারিয়ার গাইডলাইন, ফ্রিল্যান্সিং টিপস ও প্রযুক্তি নিয়ে সহজ ভাষায় লেখা আর্টিকেল।"
        breadcrumbs={[{ label: "Blog" }]}
      />
      <section className="section pt-10 sm:pt-12">
        <div className="container-page">
          <BlogExplorer posts={posts} categories={blogCategories} />
        </div>
      </section>
    </>
  );
}
