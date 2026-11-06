/**
 * Shared domain types.
 * These mirror the shape a future backend/API should return, so the UI
 * can switch from static data to real data without changing components.
 */

export type CourseCategoryId =
  | "design"
  | "programming"
  | "marketing"
  | "data-ai"
  | "fundamentals"
  | "kids"
  | "content";

export interface CourseCategory {
  id: CourseCategoryId;
  label: string;
}

export interface CurriculumModule {
  title: string;
  topics: string[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  /** Short Bangla/English summary used on cards */
  shortDescription: string;
  overview: string;
  category: CourseCategoryId;
  /** Prices in BDT. Never change without official confirmation. */
  regularPrice: number;
  offerPrice: number;
  /** Only set when officially confirmed. `null` = not announced. */
  duration: string | null;
  thumbnail: string;
  level: string;
  tags: string[];
  whatYouWillLearn: string[];
  curriculum: CurriculumModule[];
  learningOutcomes: string[];
  requirements: string[];
  whoShouldEnroll: string[];
  features: string[];
  /** Instructor slug; `null` until an instructor is officially assigned */
  instructorSlug: string | null;
  faqs: FAQItem[];
  isPopular?: boolean;
}

export interface SocialLinks {
  facebook?: string;
  linkedin?: string;
  youtube?: string;
  website?: string;
}

export interface Instructor {
  id: string;
  slug: string;
  name: string;
  role: string;
  specialization: string;
  bio: string;
  expertise: string[];
  /** Course slugs this instructor teaches */
  courseSlugs: string[];
  /** Optional photo. Initials avatar is shown when missing. */
  photo?: string;
  social: SocialLinks;
  /** True while the profile contains sample data that must be replaced. */
  isPlaceholder: boolean;
}

export type BlogBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "list"; items: string[] }
  | { type: "quote"; text: string };

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  coverImage: string;
  author: string;
  publishedAt: string; // ISO date
  readingMinutes: number;
  tags: string[];
  content: BlogBlock[];
  relatedCourseSlugs?: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  courseSlug: string;
  quote: string;
  rating: number;
  /** Sample testimonials are labelled as such in the UI. */
  isSample: boolean;
}

export interface Stat {
  label: string;
  value: string;
  description: string;
  /** Placeholder values must be replaced with verified numbers. */
  isPlaceholder: boolean;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface FeatureItem {
  title: string;
  description: string;
  icon: string; // key into the icon map in components/ui/Icon.tsx
}

export interface LegalSection {
  heading: string;
  paragraphs?: string[];
  list?: string[];
}

export interface LegalDocument {
  title: string;
  lastUpdated: string;
  intro: string;
  sections: LegalSection[];
}

/* ----------------------------- Forms ----------------------------- */

export interface AdmissionFormValues {
  fullName: string;
  phone: string;
  email: string;
  courseSlug: string;
  educationLevel: string;
  district: string;
  message: string;
}

export interface ContactFormValues {
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
}

export type FormErrors<T> = Partial<Record<keyof T, string>>;

export type SubmitStatus = "idle" | "submitting" | "success" | "error";

/** Result returned by the service layer (static now, API later). */
export interface SubmissionResult {
  ok: boolean;
  /** "local" = not sent to any server (frontend-only phase) */
  mode: "local" | "remote";
  reference?: string;
  error?: string;
}
