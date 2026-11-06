import type { FeatureItem, NavItem, Stat } from "@/types";

/* ----------------------------- Navigation ----------------------------- */

export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Programs", href: "/programs" },
  { label: "Courses", href: "/courses" },
  { label: "Instructors", href: "/instructors" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export const footerQuickLinks: NavItem[] = [
  { label: "About Us", href: "/about" },
  { label: "Programs", href: "/programs" },
  { label: "All Courses", href: "/courses" },
  { label: "Career Support", href: "/career-support" },
  { label: "Instructors", href: "/instructors" },
  { label: "Admission", href: "/admission" },
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export const legalLinks: NavItem[] = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms" },
];

/* ----------------------------- Statistics ----------------------------- */

export const stats: Stat[] = [
  {
    label: "প্রফেশনাল কোর্স",
    value: "১০+",
    description: "ডিজাইন, প্রোগ্রামিং, মার্কেটিং ও AI",
    isPlaceholder: false,
  },
  {
    label: "পর্যন্ত ছাড়",
    value: "৫০%",
    description: "চলমান অফার মূল্যে ভর্তি",
    isPlaceholder: false,
  },
  {
    label: "শিক্ষার্থী",
    value: "১০০০+",
    description: "সফলভাবে প্রশিক্ষণ সম্পন্ন করেছে",
    isPlaceholder: false,
  },
  {
    label: "লাইভ প্রজেক্ট",
    value: "১০০+",
    description: "হাতে-কলমে প্র্যাকটিক্যাল কাজ",
    isPlaceholder: false,
  },
];

/* ----------------------------- Why choose us ----------------------------- */

export const whyChooseUs: FeatureItem[] = [
  {
    title: "ইন্ডাস্ট্রি-ফোকাসড কারিকুলাম",
    description: "বর্তমান চাকরির বাজার ও ফ্রিল্যান্সিং মার্কেটের চাহিদা অনুযায়ী সাজানো কোর্স কনটেন্ট।",
    icon: "target",
  },
  {
    title: "প্র্যাকটিক্যাল প্রজেক্ট-ভিত্তিক শেখা",
    description: "শুধু থিওরি নয় — প্রতিটি মডিউলে বাস্তব প্রজেক্ট করে হাতে-কলমে শেখা।",
    icon: "layers",
  },
  {
    title: "অভিজ্ঞ ইনস্ট্রাক্টর",
    description: "নিজ নিজ বিষয়ে অভিজ্ঞ মেন্টরদের সরাসরি গাইডলাইন ও ফিডব্যাক।",
    icon: "graduation",
  },
  {
    title: "ক্যারিয়ার ডেভেলপমেন্ট সাপোর্ট",
    description: "CV, পোর্টফোলিও ও ইন্টারভিউ প্রস্তুতিতে প্রয়োজনীয় দিকনির্দেশনা।",
    icon: "briefcase",
  },
  {
    title: "ফ্রিল্যান্সিং গাইডলাইন",
    description: "মার্কেটপ্লেসে প্রোফাইল তৈরি থেকে ক্লায়েন্টের সাথে কাজ করা পর্যন্ত ব্যবহারিক পরামর্শ।",
    icon: "globe",
  },
  {
    title: "বিগিনার-ফ্রেন্ডলি শেখা",
    description: "একদম শুরু থেকে ধাপে ধাপে সহজ ভাষায় শেখানো — আগে অভিজ্ঞতা না থাকলেও চলবে।",
    icon: "sparkles",
  },
];

/* ----------------------------- Learning process ----------------------------- */

export const learningSteps: FeatureItem[] = [
  { title: "Choose Your Course", description: "আপনার লক্ষ্য ও আগ্রহ অনুযায়ী সঠিক কোর্সটি বেছে নিন।", icon: "search" },
  { title: "Enroll in the Course", description: "অনলাইনে ফর্ম পূরণ করুন অথবা WhatsApp-এ যোগাযোগ করে ভর্তি নিশ্চিত করুন।", icon: "clipboard" },
  { title: "Learn from Experts", description: "অভিজ্ঞ ইনস্ট্রাক্টরদের কাছ থেকে ধাপে ধাপে শিখুন।", icon: "graduation" },
  { title: "Build Real Projects", description: "বাস্তব প্রজেক্ট তৈরি করে নিজের পোর্টফোলিও সাজান।", icon: "code" },
  { title: "Grow Your Career", description: "চাকরি, ফ্রিল্যান্সিং বা নিজের ব্যবসায় দক্ষতা কাজে লাগান।", icon: "rocket" },
];

/* ----------------------------- About page ----------------------------- */

export const coreValues: FeatureItem[] = [
  { title: "Learn", description: "সহজ ভাষায়, ধাপে ধাপে আধুনিক প্রযুক্তি শেখা।", icon: "book" },
  { title: "Build", description: "বাস্তব প্রজেক্ট তৈরি করে দক্ষতাকে কাজে রূপ দেওয়া।", icon: "code" },
  { title: "Grow", description: "ক্যারিয়ার, ফ্রিল্যান্সিং ও উদ্যোক্তা হিসেবে এগিয়ে যাওয়া।", icon: "trending" },
];

export const audiences: FeatureItem[] = [
  { title: "শিক্ষার্থী", description: "পড়াশোনার পাশাপাশি ভবিষ্যতের জন্য প্রয়োজনীয় IT দক্ষতা।", icon: "graduation" },
  { title: "ফ্রিল্যান্সার", description: "আন্তর্জাতিক মার্কেটপ্লেসে কাজ পাওয়ার মতো দক্ষতা।", icon: "globe" },
  { title: "চাকরিপ্রার্থী", description: "চাকরির বাজারে নিজেকে এগিয়ে রাখার প্র্যাকটিক্যাল স্কিল।", icon: "briefcase" },
  { title: "নতুনরা", description: "একদম শূন্য থেকে আত্মবিশ্বাসের সাথে শুরু।", icon: "sparkles" },
  { title: "প্রফেশনাল", description: "কাজের দক্ষতা বাড়াতে AI ও আধুনিক টুলের ব্যবহার।", icon: "monitor" },
];

/* ----------------------------- Form options ----------------------------- */

export const educationLevels = [
  "SSC / সমমান (চলমান)",
  "SSC / সমমান",
  "HSC / সমমান (চলমান)",
  "HSC / সমমান",
  "Diploma",
  "Bachelor's (চলমান)",
  "Bachelor's",
  "Master's",
  "Other",
];

export const districts = [
  "Bagerhat", "Bandarban", "Barguna", "Barishal", "Bhola", "Bogura", "Brahmanbaria", "Chandpur",
  "Chapai Nawabganj", "Chattogram", "Chuadanga", "Cox's Bazar", "Cumilla", "Dhaka", "Dinajpur",
  "Faridpur", "Feni", "Gaibandha", "Gazipur", "Gopalganj", "Habiganj", "Jamalpur", "Jashore",
  "Jhalokathi", "Jhenaidah", "Joypurhat", "Khagrachhari", "Khulna", "Kishoreganj", "Kurigram",
  "Kushtia", "Lakshmipur", "Lalmonirhat", "Madaripur", "Magura", "Manikganj", "Meherpur",
  "Moulvibazar", "Munshiganj", "Mymensingh", "Naogaon", "Narail", "Narayanganj", "Narsingdi",
  "Natore", "Netrokona", "Nilphamari", "Noakhali", "Pabna", "Panchagarh", "Patuakhali", "Pirojpur",
  "Rajbari", "Rajshahi", "Rangamati", "Rangpur", "Satkhira", "Shariatpur", "Sherpur", "Sirajganj",
  "Sunamganj", "Sylhet", "Tangail", "Thakurgaon",
];
