/**
 * Central site configuration.
 * Real contact details are NOT hard-coded — set them in `.env.local`
 * (see `.env.example`). Until then, clearly marked placeholders are shown.
 */

const env = (value: string | undefined) => (value && value.trim() ? value.trim() : undefined);

export const siteConfig = {
  name: "CholoShikhi IT Institute",
  nameBn: "চলোশিখি IT Institute",
  shortName: "CholoShikhi",
  tagline: "Learn • Build • Grow",
  description:
    "CholoShikhi IT Institute — Bangladesh-এর শিক্ষার্থী, ফ্রিল্যান্সার ও চাকরিপ্রার্থীদের জন্য গ্রাফিক ডিজাইন, প্রোগ্রামিং, ডিজিটাল মার্কেটিং, ডেটা সায়েন্স ও AI বিষয়ে প্র্যাকটিক্যাল IT কোর্স।",
  url: env(process.env.NEXT_PUBLIC_SITE_URL) ?? "http://localhost:3000",
  locale: "bn_BD",

  /**
   * Official logo. Place the logo file at /public/brand/logo.png
   * (keep the original — do not edit or recolor it).
   * Until the file exists, a text wordmark is shown automatically.
   */
  logo: {
    src: "/brand/logo.jpg",
    width: 1254,
    height: 1254,
    alt: "CholoShikhi IT Institute logo",
  },

  contact: {
    phone: env(process.env.NEXT_PUBLIC_CONTACT_PHONE),
    email: env(process.env.NEXT_PUBLIC_CONTACT_EMAIL),
    address: env(process.env.NEXT_PUBLIC_OFFICE_ADDRESS),
    whatsappNumber: env(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER),
    mapEmbedUrl: env(process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL),
    officeHours: undefined as string | undefined,
  },

  /** Placeholder text shown wherever a real value has not been configured. */
  placeholders: {
    phone: "+880 1XXX-XXXXXX",
    email: "info@yourdomain.com",
    address: "অফিসের ঠিকানা এখানে যুক্ত করুন",
  },

  social: {
    facebook: env(process.env.NEXT_PUBLIC_FACEBOOK_URL) ?? "https://www.facebook.com/",
    youtube: env(process.env.NEXT_PUBLIC_YOUTUBE_URL) ?? "https://www.youtube.com/",
    linkedin: env(process.env.NEXT_PUBLIC_LINKEDIN_URL) ?? "https://www.linkedin.com/",
    instagram: env(process.env.NEXT_PUBLIC_INSTAGRAM_URL) ?? "https://www.instagram.com/",
  },
} as const;

export type SiteConfig = typeof siteConfig;
