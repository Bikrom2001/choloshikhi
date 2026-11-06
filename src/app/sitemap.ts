import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { getAllCourses } from "@/services/courses";
import { getAllInstructors, getAllPosts } from "@/services/content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url.replace(/\/$/, "");
  const [courses, instructors, posts] = await Promise.all([getAllCourses(), getAllInstructors(), getAllPosts()]);

  const staticRoutes = ["", "/about", "/programs", "/career-support", "/courses", "/instructors", "/admission", "/contact", "/blog", "/faq", "/privacy-policy", "/terms"];

  return [
    ...staticRoutes.map((path) => ({
      url: `${base}${path}`,
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.7,
    })),
    ...courses.map((c) => ({ url: `${base}/courses/${c.slug}`, changeFrequency: "weekly" as const, priority: 0.9 })),
    ...instructors.map((i) => ({ url: `${base}/instructors/${i.slug}`, changeFrequency: "monthly" as const, priority: 0.5 })),
    ...posts.map((p) => ({ url: `${base}/blog/${p.slug}`, lastModified: p.publishedAt, changeFrequency: "monthly" as const, priority: 0.6 })),
  ];
}
