import type { Testimonial } from "@/types";

/**
 * SAMPLE TESTIMONIALS — replace with real, consented student reviews.
 * While `isSample` is true the UI shows a "নমুনা রিভিউ" (sample) label.
 */
export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Student Name",
    role: "Sample review · Graphic Design",
    courseSlug: "ai-master-graphic-design",
    quote: "প্র্যাকটিক্যাল প্রজেক্ট করে শেখার কারণে ডিজাইনের প্রতিটি টুল খুব সহজে বুঝতে পেরেছি। এখন নিজের পোর্টফোলিও তৈরি করছি।",
    rating: 5,
    isSample: true,
  },
  {
    id: "t2",
    name: "Student Name",
    role: "Sample review · MERN Stack",
    courseSlug: "ai-integrated-mern-stack-development",
    quote: "JavaScript নিয়ে ভয় ছিল, কিন্তু ধাপে ধাপে শেখানোর কারণে এখন নিজেই ফুল-স্ট্যাক প্রজেক্ট বানাতে পারি।",
    rating: 5,
    isSample: true,
  },
  {
    id: "t3",
    name: "Student Name",
    role: "Sample review · Digital Marketing",
    courseSlug: "digital-marketing-with-freelancing",
    quote: "ফেসবুক মার্কেটিং আর SEO-এর বাস্তব উদাহরণগুলো খুব কাজে লেগেছে। মার্কেটপ্লেসে প্রোফাইল সাজানোর গাইডলাইনও পেয়েছি।",
    rating: 5,
    isSample: true,
  },
  {
    id: "t4",
    name: "Guardian Name",
    role: "Sample review · Programming for Kids",
    courseSlug: "programming-for-kids",
    quote: "আমার সন্তান এখন গেম খেলার পাশাপাশি নিজেই ছোট গেম বানাতে আগ্রহী। শেখানোর পদ্ধতি সত্যিই শিশু-বান্ধব।",
    rating: 5,
    isSample: true,
  },
  {
    id: "t5",
    name: "Student Name",
    role: "Sample review · Data Science",
    courseSlug: "python-data-science-machine-learning",
    quote: "রিয়েল ডেটাসেট নিয়ে কাজ করার সুযোগ পেয়েছি, যা থিওরির চেয়ে অনেক বেশি শিখিয়েছে।",
    rating: 4,
    isSample: true,
  },
];
