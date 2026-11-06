import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "@/components/layout/Logo";
import { FacebookIcon, InstagramIcon, LinkedinIcon, YoutubeIcon } from "@/components/ui/BrandIcons";
import { siteConfig } from "@/config/site";
import { courses } from "@/data/courses";
import { footerQuickLinks, legalLinks } from "@/data/site-content";

const socials = [
  { label: "Facebook", href: siteConfig.social.facebook, Icon: FacebookIcon },
  { label: "YouTube", href: siteConfig.social.youtube, Icon: YoutubeIcon },
  { label: "LinkedIn", href: siteConfig.social.linkedin, Icon: LinkedinIcon },
  { label: "Instagram", href: siteConfig.social.instagram, Icon: InstagramIcon },
];

export function Footer() {
  const { contact, placeholders } = siteConfig;
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy-950 text-navy-100">
      <div className="container-page grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Logo variant="footer" />
          <p className="mt-5 font-display text-lg font-bold text-white">{siteConfig.tagline}</p>
          <p className="mt-3 max-w-sm text-sm leading-7 text-navy-200">
            আধুনিক প্রযুক্তি শিখুন, বাস্তব প্রজেক্ট তৈরি করুন এবং দক্ষ প্রফেশনাল হিসেবে নিজের ক্যারিয়ার গড়ুন।
          </p>
          <ul className="mt-6 flex gap-3" aria-label="Social media">
            {socials.map(({ label, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-brand"
                >
                  <Icon className="h-4.5 w-4.5" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-2">
          <h2 className="font-display text-base font-bold text-white">Quick Links</h2>
          <ul className="mt-5 space-y-3 text-sm">
            {footerQuickLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition-colors hover:text-accent">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <h2 className="font-display text-base font-bold text-white">Popular Courses</h2>
          <ul className="mt-5 space-y-3 text-sm">
            {courses.slice(0, 6).map((course) => (
              <li key={course.slug}>
                <Link href={`/courses/${course.slug}`} className="transition-colors hover:text-accent">
                  {course.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <h2 className="font-display text-base font-bold text-white">যোগাযোগ</h2>
          <ul className="mt-5 space-y-4 text-sm">
            <li className="flex gap-3">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
              {contact.phone ? (
                <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className="hover:text-accent">
                  {contact.phone}
                </a>
              ) : (
                <span>{placeholders.phone}</span>
              )}
            </li>
            <li className="flex gap-3">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
              {contact.email ? (
                <a href={`mailto:${contact.email}`} className="break-all hover:text-accent">
                  {contact.email}
                </a>
              ) : (
                <span>{placeholders.email}</span>
              )}
            </li>
            <li className="flex gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
              <span>{contact.address ?? placeholders.address}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col items-center justify-between gap-3 py-6 text-sm text-navy-300 sm:flex-row">
          <p>
            © {year} {siteConfig.name}. All rights reserved.
          </p>
          <ul className="flex gap-5">
            {legalLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
