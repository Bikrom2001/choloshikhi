import type { Instructor } from "@/types";

/**
 * INSTRUCTOR PROFILES — PLACEHOLDERS
 * ─────────────────────────────────────────────────────────────
 * Instructor names have not been officially provided, so each profile uses
 * a role-based title and `isPlaceholder: true` (the UI shows a small
 * "profile coming soon" note). Replace `name`, `bio`, `photo` and `social`
 * with real details and set `isPlaceholder` to false.
 */
export const instructors: Instructor[] = [
  {
    id: "i1",
    slug: "graphic-design-mentor",
    name: "Graphic Design Mentor",
    role: "Lead Instructor, Design & Content",
    specialization: "Graphic Design · AI Design Tools · Content Creation",
    bio: "ব্র্যান্ডিং, সোশ্যাল মিডিয়া ডিজাইন ও AI-চালিত ক্রিয়েটিভ ওয়ার্কফ্লো নিয়ে কাজ করেন। শিক্ষার্থীদের বাস্তব প্রজেক্ট ও পোর্টফোলিও তৈরিতে সরাসরি গাইড করেন।",
    expertise: ["Adobe Photoshop", "Adobe Illustrator", "Brand Identity", "AI Image Tools", "Video Editing"],
    courseSlugs: ["ai-master-graphic-design", "content-creation-with-ai"],
    social: {},
    isPlaceholder: true,
  },
  {
    id: "i2",
    slug: "web-development-mentor",
    name: "Web Development Mentor",
    role: "Lead Instructor, Web Development",
    specialization: "MERN Stack · JavaScript · AI Integration",
    bio: "আধুনিক JavaScript, React ও Node.js দিয়ে প্রোডাকশন-লেভেলের ওয়েব অ্যাপ্লিকেশন তৈরিতে অভিজ্ঞ। শিক্ষার্থীদের কোড রিভিউ ও প্রজেক্ট-ভিত্তিক শেখায় গুরুত্ব দেন।",
    expertise: ["JavaScript", "React", "Node.js", "MongoDB", "REST APIs"],
    courseSlugs: ["ai-integrated-mern-stack-development"],
    social: {},
    isPlaceholder: true,
  },
  {
    id: "i3",
    slug: "python-mentor",
    name: "Python & Data Science Mentor",
    role: "Lead Instructor, Python & Data Science",
    specialization: "Python · Django · Machine Learning",
    bio: "Python দিয়ে ব্যাকএন্ড ডেভেলপমেন্ট, ডেটা অ্যানালাইসিস ও মেশিন লার্নিং নিয়ে কাজ করেন। জটিল বিষয় সহজ উদাহরণে বুঝিয়ে দেওয়াই তাঁর শেখানোর মূল লক্ষ্য।",
    expertise: ["Python", "Django", "Pandas", "Scikit-learn", "SQL"],
    courseSlugs: ["python-programming-with-django", "python-data-science-machine-learning"],
    social: {},
    isPlaceholder: true,
  },
  {
    id: "i4",
    slug: "digital-marketing-mentor",
    name: "Digital Marketing Mentor",
    role: "Lead Instructor, Digital Marketing",
    specialization: "Social Media Marketing · SEO · Freelancing",
    bio: "সোশ্যাল মিডিয়া মার্কেটিং, বিজ্ঞাপন ক্যাম্পেইন ও SEO নিয়ে কাজের অভিজ্ঞতা রয়েছে। ফ্রিল্যান্সিং মার্কেটপ্লেসে শুরু করার ব্যবহারিক গাইডলাইন দেন।",
    expertise: ["Meta Ads", "SEO", "Google Analytics", "Content Strategy", "Freelancing"],
    courseSlugs: ["digital-marketing-with-freelancing"],
    social: {},
    isPlaceholder: true,
  },
  {
    id: "i5",
    slug: "computer-fundamentals-mentor",
    name: "Computer Fundamentals Mentor",
    role: "Instructor, Computer Fundamentals",
    specialization: "Office Applications · Digital Literacy · AI Tools",
    bio: "নতুনদের কম্পিউটার শেখানোয় বিশেষ আগ্রহী। অফিস অ্যাপ্লিকেশন, ইন্টারনেট ও দৈনন্দিন কাজে AI ব্যবহারের ব্যবহারিক দক্ষতা শেখান।",
    expertise: ["Microsoft Office", "Google Workspace", "Typing", "AI Assistants", "Cyber Safety"],
    courseSlugs: ["computer-fundamental-with-ai"],
    social: {},
    isPlaceholder: true,
  },
  {
    id: "i6",
    slug: "kids-programming-mentor",
    name: "Kids Programming Mentor",
    role: "Instructor, Programming for Kids",
    specialization: "Scratch · Logic Building · Creative Coding",
    bio: "শিশুদের জন্য খেলাধুলার ছলে প্রোগ্রামিং শেখানোর পদ্ধতিতে বিশ্বাসী। গেম ও অ্যানিমেশন প্রজেক্টের মাধ্যমে শিশুদের সৃজনশীলতা ও লজিক গড়ে তোলেন।",
    expertise: ["Scratch", "Game Design", "Logical Thinking", "Python for Kids"],
    courseSlugs: ["programming-for-kids"],
    social: {},
    isPlaceholder: true,
  },
];
