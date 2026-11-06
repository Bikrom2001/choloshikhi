# CholoShikhi IT Institute — Frontend Website

**Learn • Build • Grow**

This is the multi-page frontend for CholoShikhi IT Institute, built with **Next.js (App Router), React, TypeScript, Tailwind CSS v4, Lucide React and Framer Motion**.

This phase is **frontend only**. There is no backend, database, authentication, payment gateway or API. All content comes from static TypeScript data files through a small service layer, so a backend can be connected later without rewriting the UI.

---

## Quick start

Requirements: **Node.js 18.18+** (Node 20 or 22 recommended) and npm.

```bash
npm install                 # install dependencies
cp .env.example .env.local  # then fill in your real values (optional)
npm run dev                 # start dev server → http://localhost:3000
```

| Command             | What it does                              |
| ------------------- | ----------------------------------------- |
| `npm run dev`       | Development server with hot reload        |
| `npm run build`     | Production build (also type-checks)       |
| `npm run start`     | Serve the production build                |
| `npm run typecheck` | TypeScript check only (`tsc --noEmit`)    |

### Before launch, add your official details

1. **Logo:** the official logo is already included at `public/brand/logo.jpg`. It is also the browser tab icon (`src/app/icon.jpg`) and the social share image (`src/app/opengraph-image.jpg`). To replace it, swap these files.
2. **Contact info and links:** set them in `.env.local`. See `.env.example` for phone, email, address, WhatsApp number, Google Maps embed URL, social links and site URL.
3. **Placeholders to replace:** these are clearly marked in the code and on the site.
   - `src/data/site-content.ts`: student and project statistics, shown as `XXX+` with an "Editable" badge
   - `src/data/instructors.ts`: instructor names, photos, bios and social links (`isPlaceholder: true`)
   - `src/data/testimonials.ts`: sample reviews, labelled "নমুনা রিভিউ" (`isSample: true`)
   - `src/data/legal.ts`: Privacy Policy and Terms. These are general templates; have them reviewed.
4. **Images:** course and blog photos load from Unsplash, which is allowed in `next.config.ts`. For production, put your own photos in `public/images/` and update the paths in the data files. If an image fails to load, a branded placeholder is shown instead.

### Deploying

- **Vercel (recommended):** import the repo, add the `NEXT_PUBLIC_*` variables in Project Settings, and deploy.
- **Any Node host:** run `npm run build`, then `npm run start` (PM2 or Docker works fine).
- Set `NEXT_PUBLIC_SITE_URL` to the live domain so canonical URLs, Open Graph tags and the sitemap are correct.

---

## Pages

| Route                  | Page                                                          |
| ---------------------- | ------------------------------------------------------------- |
| `/`                    | Home                                                          |
| `/about`               | About Us                                                      |
| `/programs`            | Programs: the 8 learning areas from the logo, linked to courses |
| `/career-support`      | Career & Freelancing Support (CV, portfolio, interview, roadmap) |
| `/courses`             | All Courses (search, category filter, sort; URL-synced)       |
| `/courses/[slug]`      | Course details × 8 (statically generated)                     |
| `/instructors`         | Instructors                                                   |
| `/instructors/[slug]`  | Instructor profile × 6                                        |
| `/admission`           | Admission form (`?course=slug` preselects a course)           |
| `/contact`             | Contact form, info cards, WhatsApp, Facebook, map placeholder |
| `/blog`                | Blog list (category filter and search)                        |
| `/blog/[slug]`         | Blog article × 6                                              |
| `/faq`                 | FAQ (grouped accordions)                                      |
| `/privacy-policy`      | Privacy Policy                                                |
| `/terms`               | Terms & Conditions                                            |
| `/login`               | Student login UI (portal "coming soon"; no auth yet)          |
| `/sitemap.xml`, `/robots.txt` | Generated SEO files                                    |
| 404 / error / loading  | Custom not-found, error boundary and skeleton loading UI      |

## Features

- **Official course catalog** with exact BDT prices, struck-through regular prices, highlighted offer prices and computed discount badges. Duration is shown only for AI Master Graphic Design (3 Months).
- **Course explorer:** live search across title, description and tags; category chips with counts; sort by price or discount; empty state with reset; shareable URLs (`/courses?category=design&q=logo`).
- **Admission form:** validates in the browser, including Bangladesh mobile numbers (`01XXXXXXXXX`, `+8801…`, `8801…`, operator prefixes 013–019). It shows inline errors, moves focus to the first error, and has a loading state. The success screen shows a summary and a **"WhatsApp-এ পাঠান"** button that pre-fills the whole application. It states clearly that the data was **not** saved to a server.
- **Contact form** with validation and the same honest success and WhatsApp hand-off.
- **WhatsApp CTA:** floating button, header, CTA sections and course pages. The number is set by `NEXT_PUBLIC_WHATSAPP_NUMBER`. If it's empty, the link opens WhatsApp's contact picker, so it is never broken.
- Accessible FAQ accordion, an auto-playing testimonial carousel (pauses on hover/focus, arrow-key support) and an animated mobile menu (Escape closes it, body scroll is locked).
- Framer Motion reveal animations that respect `prefers-reduced-motion`.
- **SEO:** per-page titles, descriptions, canonical URLs, Open Graph and Twitter tags; JSON-LD for the Organization, Course, BlogPosting and FAQPage; sitemap and robots; semantic HTML with one `h1` per page; skip link; ARIA labels.
- **Fonts:** Hind Siliguri for Bangla and Plus Jakarta Sans for English headings, loaded through `next/font`.

## Folder structure

```
src/
├── app/                      # Routes (App Router)
│   ├── layout.tsx            # Root layout: fonts, metadata, header/footer
│   ├── globals.css           # Tailwind v4 + brand theme tokens
│   ├── page.tsx              # Home
│   ├── about/  admission/  contact/  faq/  login/  privacy-policy/  terms/
│   ├── courses/  courses/[slug]/
│   ├── instructors/  instructors/[slug]/
│   ├── blog/  blog/[slug]/
│   ├── not-found.tsx  error.tsx  loading.tsx  sitemap.ts  robots.ts
├── components/
│   ├── layout/               # Header (mobile nav), Footer, Logo, WhatsAppFloat
│   ├── ui/                   # Button, SectionHeading, PageHero, Accordion, FormControls,
│   │                         # SmartImage, Avatar, Reveal, Feedback, BrandIcons, Icon
│   ├── home/                 # Hero, HomeSections, TestimonialsCarousel
│   ├── course/               # CourseCard, CourseExplorer, PriceTag
│   ├── instructor/  blog/  forms/  legal/  sections/
├── data/                     # Static content: courses, instructors, blog, faqs,
│                             # testimonials, legal, site-content (nav, stats, options)
├── services/                 # Data access layer: swap for API calls later
│   ├── courses.ts  content.ts  submissions.ts
├── lib/                      # utils (formatBDT, discount…), validation, whatsapp, seo
├── config/site.ts            # Brand, contact (env-driven), social links, logo path
└── types/index.ts            # Shared TypeScript interfaces
```

**Brand colors** are Tailwind tokens defined in `globals.css`: `navy` (#102B5C), `brand` (#2878E5), `accent` (#F7941D) and `surface` (#F5F8FC), each with tints.

**Editing content:** to change a price, course, post or FAQ, edit the matching file in `src/data/`. Every page updates automatically.

---

## Backend integration (next phase)

The UI never imports data files directly for page content. It goes through `src/services/*`, whose functions are already `async` and return the shared types. To integrate a backend:

1. **Database and ORM:** PostgreSQL with Prisma. Model `Course`, `CourseModule`, `Instructor`, `BlogPost`, `Testimonial`, `FAQ`, `Admission` and `ContactMessage` to mirror `src/types/index.ts`.
2. **Read APIs:** reimplement `getAllCourses`, `getCourseBySlug` and the other service functions with Prisma queries in Server Components, keeping the signatures. Add `export const revalidate = 300` (ISR) or `revalidateTag` after admin edits.
3. **Form submissions:** replace the bodies in `src/services/submissions.ts` with Server Actions or `POST /api/admissions` and `/api/contact`. Re-run `validateAdmission` / `validateContact` from `src/lib/validation.ts` **on the server** (or port them to Zod and share one schema). Return `{ ok, mode: "remote", reference }`, and the existing success UI will work as is. Update the success copy at the same time, since it currently says nothing was saved.
4. **Spam protection:** add rate limiting (e.g. Upstash) and a honeypot field or Cloudflare Turnstile on the public forms.
5. **Authentication:** Auth.js (NextAuth) or Clerk for admins and students. Protect `/admin/*` with middleware plus role checks, and wire up the existing `/login` UI.
6. **Admin dashboard:** `/admin` with CRUD for courses and pricing, instructors, blog, testimonials and site content, plus an admissions table with search, status (`NEW → CONTACTED → ENROLLED / REJECTED`) and a detail view.
7. **Notifications:** email (Resend) or SMS (a Bangladeshi SMS gateway) to staff when a new admission arrives.
8. **Media:** move images to Cloudinary or S3 and add the host to `next.config.ts` `images.remotePatterns`.
9. **Payments (later):** SSLCommerz or bKash/Nagad with webhook verification on the server.
10. **Monitoring and analytics:** Sentry for errors; GA4 or Plausible with conversion events on "Enroll Now" and form submits.

---

## Notes on content accuracy

- SSC & HSC Academic and Linux appear on the Programs page (from the logo) with a "contact us" button, because they are not in the official course catalog yet. Add courses in `src/data/courses.ts` and link them in `src/data/programs.ts`.
- Prices and course names match the official catalog exactly. Don't change them without confirmation.
- No confirmed instructor names, class schedules, certificates or durations (other than the 3-month graphic design course) were invented. These areas use clearly marked placeholders or say "will be announced at admission".
- The curriculum modules are an indicative outline and say so on each course page. Edit them to match your official syllabus.
