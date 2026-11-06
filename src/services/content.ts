/**
 * Content services for instructors, blog posts and testimonials.
 * Swap the static imports for API calls in the backend phase.
 */
import { instructors } from "@/data/instructors";
import { blogPosts } from "@/data/blog";
import { testimonials } from "@/data/testimonials";
import type { BlogPost, Instructor, Testimonial } from "@/types";

export async function getAllInstructors(): Promise<Instructor[]> {
  return instructors;
}

export async function getInstructorBySlug(slug: string): Promise<Instructor | undefined> {
  return instructors.find((i) => i.slug === slug);
}

export async function getInstructorsForCourse(courseSlug: string): Promise<Instructor[]> {
  return instructors.filter((i) => i.courseSlugs.includes(courseSlug));
}

export async function getAllPosts(): Promise<BlogPost[]> {
  return [...blogPosts].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export async function getPostBySlug(slug: string): Promise<BlogPost | undefined> {
  return blogPosts.find((p) => p.slug === slug);
}

export async function getRelatedPosts(post: BlogPost, limit = 3): Promise<BlogPost[]> {
  const sorted = await getAllPosts();
  const same = sorted.filter((p) => p.slug !== post.slug && p.category === post.category);
  const rest = sorted.filter((p) => p.slug !== post.slug && p.category !== post.category);
  return [...same, ...rest].slice(0, limit);
}

export async function getTestimonials(): Promise<Testimonial[]> {
  return testimonials;
}
