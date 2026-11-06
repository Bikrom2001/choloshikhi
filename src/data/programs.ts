import type { FeatureItem } from "@/types";

/**
 * Learning areas — taken from the subject icons on the official logo.
 * `courseSlugs` links each area to courses in the official catalog.
 * Areas with no catalog course yet show a "contact us" call-to-action
 * instead of an invented course — add slugs here once courses launch.
 */
export interface Program {
  id: string;
  title: string;
  titleBn: string;
  icon: string;
  description: string;
  skills: string[];
  courseSlugs: string[];
}

export const programs: Program[] = [
  {
    id: "web-development",
    title: "Web Development",
    titleBn: "ওয়েব ডেভেলপমেন্ট",
    icon: "code",
    description: "HTML, CSS, JavaScript থেকে শুরু করে React, Node.js ও Django দিয়ে আধুনিক ওয়েবসাইট তৈরি।",
    skills: ["HTML & CSS", "JavaScript", "React", "Node.js", "Python Django"],
    courseSlugs: ["ai-integrated-mern-stack-development", "python-programming-with-django"],
  },
  {
    id: "design",
    title: "Design",
    titleBn: "ডিজাইন",
    icon: "palette",
    description: "কালার, টাইপোগ্রাফি ও লেআউটের মূলনীতি শিখে প্রফেশনাল ভিজ্যুয়াল ডিজাইন।",
    skills: ["Design Principles", "Branding", "Social Media Design", "AI Design Tools"],
    courseSlugs: ["ai-master-graphic-design"],
  },
  {
    id: "web-app-making",
    title: "Web App Making",
    titleBn: "ওয়েব অ্যাপ তৈরি",
    icon: "app",
    description: "ডেটাবেস, অথেনটিকেশন ও API সহ সম্পূর্ণ ফুল-স্ট্যাক ওয়েব অ্যাপ্লিকেশন তৈরি ও ডিপ্লয়।",
    skills: ["Full-Stack Apps", "REST API", "Database", "Authentication", "Deployment"],
    courseSlugs: ["ai-integrated-mern-stack-development", "python-programming-with-django"],
  },
  {
    id: "marketing",
    title: "Marketing",
    titleBn: "ডিজিটাল মার্কেটিং",
    icon: "megaphone",
    description: "সোশ্যাল মিডিয়া, SEO ও বিজ্ঞাপনের মাধ্যমে ব্যবসা বড় করার কৌশল এবং ফ্রিল্যান্সিং।",
    skills: ["Facebook Marketing", "SEO", "Google Ads", "Content Strategy", "Freelancing"],
    courseSlugs: ["digital-marketing-with-freelancing"],
  },
  {
    id: "graphics",
    title: "Graphics",
    titleBn: "গ্রাফিক্স",
    icon: "pen",
    description: "Photoshop ও Illustrator দিয়ে লোগো, ব্যানার, পোস্টার ও প্রিন্ট ডিজাইন।",
    skills: ["Photoshop", "Illustrator", "Logo Design", "Print Design"],
    courseSlugs: ["ai-master-graphic-design"],
  },
  {
    id: "video-editing",
    title: "Video Editing",
    titleBn: "ভিডিও এডিটিং",
    icon: "video",
    description: "YouTube, Facebook ও শর্ট-ফর্ম কনটেন্টের জন্য ভিডিও এডিটিং, থাম্বনেইল ও AI টুলের ব্যবহার।",
    skills: ["Video Editing", "Short-form Video", "Thumbnails", "AI Voiceover"],
    courseSlugs: ["content-creation-with-ai"],
  },
  {
    id: "academic",
    title: "SSC & HSC Academic",
    titleBn: "SSC ও HSC একাডেমিক",
    icon: "book",
    description: "SSC ও HSC শিক্ষার্থীদের জন্য একাডেমিক সহায়তা। বিষয়, ব্যাচ ও ফি সম্পর্কে জানতে যোগাযোগ করুন।",
    skills: ["SSC", "HSC", "ICT"],
    courseSlugs: [],
  },
  {
    id: "linux",
    title: "Linux",
    titleBn: "লিনাক্স",
    icon: "terminal",
    description: "Linux অপারেটিং সিস্টেম ও কমান্ড লাইনের ব্যবহার। বিস্তারিত তথ্যের জন্য যোগাযোগ করুন।",
    skills: ["Linux Basics", "Command Line", "File System"],
    courseSlugs: [],
  },
];

/** Catalog courses that sit outside the logo's eight areas. */
export const additionalProgramSlugs = [
  "python-data-science-machine-learning",
  "computer-fundamental-with-ai",
  "programming-for-kids",
];

/* ----------------------------- Career support ----------------------------- */

export const careerServices: FeatureItem[] = [
  {
    title: "CV ও প্রোফাইল তৈরি",
    description: "আপনার দক্ষতা ও প্রজেক্ট সঠিকভাবে তুলে ধরে প্রফেশনাল CV ও LinkedIn প্রোফাইল সাজানোর গাইডলাইন।",
    icon: "clipboard",
  },
  {
    title: "পোর্টফোলিও বিল্ডিং",
    description: "কোর্সের প্রজেক্টগুলো দিয়ে GitHub, Behance বা নিজের ওয়েবসাইটে শক্তিশালী পোর্টফোলিও তৈরি।",
    icon: "layers",
  },
  {
    title: "ইন্টারভিউ প্রস্তুতি",
    description: "সাধারণ ইন্টারভিউ প্রশ্ন, টেকনিক্যাল আলোচনা ও নিজেকে উপস্থাপনের প্রস্তুতি।",
    icon: "target",
  },
  {
    title: "ফ্রিল্যান্সিং গাইডলাইন",
    description: "মার্কেটপ্লেস প্রোফাইল, প্রপোজাল লেখা, সার্ভিসের মূল্য নির্ধারণ ও ক্লায়েন্টের সাথে যোগাযোগ।",
    icon: "globe",
  },
  {
    title: "ক্যারিয়ার রোডম্যাপ",
    description: "আপনার আগ্রহ ও লক্ষ্য অনুযায়ী কোন দক্ষতা কোন ক্রমে শিখবেন — তার পরিষ্কার পরিকল্পনা।",
    icon: "trending",
  },
  {
    title: "AI টুলের পেশাগত ব্যবহার",
    description: "কাজের গতি ও মান বাড়াতে দায়িত্বশীলভাবে AI টুল ব্যবহারের ব্যবহারিক কৌশল।",
    icon: "sparkles",
  },
];

export const freelancingSteps: FeatureItem[] = [
  { title: "দক্ষতা অর্জন", description: "একটি নির্দিষ্ট স্কিলে প্র্যাকটিক্যাল দক্ষতা গড়ে তুলুন।", icon: "graduation" },
  { title: "পোর্টফোলিও", description: "বাস্তব প্রজেক্ট দিয়ে নিজের কাজের নমুনা তৈরি করুন।", icon: "layers" },
  { title: "প্রোফাইল সেটআপ", description: "মার্কেটপ্লেসে প্রফেশনাল প্রোফাইল ও সার্ভিস সাজান।", icon: "monitor" },
  { title: "প্রপোজাল ও যোগাযোগ", description: "ক্লায়েন্টের প্রয়োজন বুঝে কার্যকর প্রপোজাল পাঠান।", icon: "megaphone" },
  { title: "ধারাবাহিক উন্নতি", description: "প্রতিটি কাজ থেকে শিখুন এবং দক্ষতা আপডেট রাখুন।", icon: "rocket" },
];

/** Typical roles each course prepares learners to pursue (not a job guarantee). */
export const careerPaths: Array<{ courseSlug: string; roles: string[] }> = [
  { courseSlug: "ai-master-graphic-design", roles: ["Graphic Designer", "Brand Designer", "Social Media Designer"] },
  { courseSlug: "ai-integrated-mern-stack-development", roles: ["Frontend Developer", "MERN Stack Developer", "Web Developer"] },
  { courseSlug: "python-programming-with-django", roles: ["Python Developer", "Backend Developer", "Django Developer"] },
  { courseSlug: "python-data-science-machine-learning", roles: ["Data Analyst", "Junior Data Scientist", "ML Enthusiast"] },
  { courseSlug: "digital-marketing-with-freelancing", roles: ["Digital Marketer", "SEO Specialist", "Social Media Manager"] },
  { courseSlug: "content-creation-with-ai", roles: ["Content Creator", "Video Editor", "Social Media Manager"] },
  { courseSlug: "computer-fundamental-with-ai", roles: ["Office Assistant", "Data Entry Operator", "Computer Operator"] },
];

export const careerFaqs = [
  {
    question: "কোর্স শেষে কি চাকরির নিশ্চয়তা দেওয়া হয়?",
    answer:
      "না, আমরা চাকরি বা আয়ের নিশ্চয়তা দিই না। তবে CV, পোর্টফোলিও, ইন্টারভিউ ও ফ্রিল্যান্সিংয়ের জন্য প্রয়োজনীয় দিকনির্দেশনা দিয়ে আপনাকে প্রস্তুত হতে সাহায্য করি। সাফল্য নির্ভর করে আপনার প্রচেষ্টা ও অনুশীলনের ওপর।",
  },
  {
    question: "ক্যারিয়ার সাপোর্ট কি সব কোর্সে পাওয়া যায়?",
    answer: "ক্যারিয়ার ডেভেলপমেন্ট সাপোর্ট আমাদের কোর্সগুলোর অংশ। নির্দিষ্ট কোর্সে কী কী সাপোর্ট থাকবে তা ভর্তির সময় জানিয়ে দেওয়া হবে।",
  },
  {
    question: "নতুনরা কি ফ্রিল্যান্সিং শুরু করতে পারবে?",
    answer: "হ্যাঁ, তবে আগে একটি স্কিলে ভালো দক্ষতা ও পোর্টফোলিও তৈরি করা জরুরি। কোর্সের ভেতরেই এই প্রস্তুতির গাইডলাইন দেওয়া হয়।",
  },
];
