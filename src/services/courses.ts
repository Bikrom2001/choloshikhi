/**
 * Course service — the single place pages read course data from.
 * Today it returns static data; in the backend phase, replace the bodies
 * with API/database calls (keep the same signatures and return types).
 */
import { courses, courseCategories } from "@/data/courses";
import type { Course, CourseCategory, CourseCategoryId } from "@/types";

export async function getAllCourses(): Promise<Course[]> {
  return courses;
}

export async function getCourseBySlug(slug: string): Promise<Course | undefined> {
  return courses.find((c) => c.slug === slug);
}

export async function getPopularCourses(limit?: number): Promise<Course[]> {
  const popular = courses.filter((c) => c.isPopular);
  const list = popular.length ? popular : courses;
  return typeof limit === "number" ? list.slice(0, limit) : list;
}

export async function getRelatedCourses(course: Course, limit = 3): Promise<Course[]> {
  const sameCategory = courses.filter((c) => c.slug !== course.slug && c.category === course.category);
  const others = courses.filter((c) => c.slug !== course.slug && c.category !== course.category);
  return [...sameCategory, ...others].slice(0, limit);
}

export async function getCoursesBySlugs(slugs: string[]): Promise<Course[]> {
  return courses.filter((c) => slugs.includes(c.slug));
}

export async function getCourseCategories(): Promise<CourseCategory[]> {
  return courseCategories;
}

export function getCategoryLabel(id: CourseCategoryId): string {
  return courseCategories.find((c) => c.id === id)?.label ?? id;
}

/** Synchronous list for client components (e.g. form selects). */
export function getCourseOptions(): Array<{ value: string; label: string }> {
  return courses.map((c) => ({ value: c.slug, label: c.title }));
}
