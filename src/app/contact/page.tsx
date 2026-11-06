import { Mail, MapPin, Phone } from "lucide-react";
import type { ReactNode } from "react";
import { ContactForm } from "@/components/forms/ContactForm";
import { ButtonLink } from "@/components/ui/Button";
import { FacebookIcon, WhatsAppIcon } from "@/components/ui/BrandIcons";
import { PageHero } from "@/components/ui/PageHero";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo";
import { defaultWhatsAppMessage, whatsappLink } from "@/lib/whatsapp";

export const metadata = buildMetadata({
  title: "Contact Us",
  description: "CholoShikhi IT Institute-এর সাথে যোগাযোগ করুন — ফোন, ইমেইল, WhatsApp বা কন্টাক্ট ফর্মের মাধ্যমে।",
  path: "/contact",
});

function InfoCard({ icon, title, children }: { icon: ReactNode; title: string; children: ReactNode }) {
  return (
    <div className="card flex gap-4 p-5">
      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-brand-50 text-brand">{icon}</span>
      <div className="min-w-0">
        <h2 className="font-sans text-base font-bold">{title}</h2>
        <div className="mt-1 break-words text-muted">{children}</div>
      </div>
    </div>
  );
}

export default function ContactPage() {
  const { contact, placeholders, social } = siteConfig;

  return (
    <>
      <PageHero
        eyebrow="Contact Us"
        title="আমাদের সাথে যোগাযোগ করুন"
        description="কোর্স, ভর্তি বা যেকোনো প্রশ্নে আমরা আছি আপনার পাশে।"
        breadcrumbs={[{ label: "Contact" }]}
      />

      <section className="section pt-12">
        <div className="container-page grid gap-8 lg:grid-cols-[22rem_1fr] lg:gap-10">
          <div className="space-y-4">
            <InfoCard icon={<Phone className="h-5 w-5" aria-hidden="true" />} title="ফোন">
              {contact.phone ? (
                <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className="hover:text-brand">
                  {contact.phone}
                </a>
              ) : (
                placeholders.phone
              )}
            </InfoCard>
            <InfoCard icon={<Mail className="h-5 w-5" aria-hidden="true" />} title="অফিসিয়াল ইমেইল">
              {contact.email ? (
                <a href={`mailto:${contact.email}`} className="hover:text-brand">
                  {contact.email}
                </a>
              ) : (
                placeholders.email
              )}
            </InfoCard>
            <InfoCard icon={<MapPin className="h-5 w-5" aria-hidden="true" />} title="অফিসের ঠিকানা">
              {contact.address ?? placeholders.address}
            </InfoCard>

            <div className="rounded-[var(--radius-card)] bg-[#25D366] p-6 text-white">
              <WhatsAppIcon className="h-8 w-8" />
              <h2 className="mt-3 text-xl font-extrabold text-white">WhatsApp-এ দ্রুত উত্তর পান</h2>
              <p className="mt-1 text-sm text-white/90">কোর্স ও ভর্তি সংক্রান্ত প্রশ্ন সরাসরি WhatsApp-এ করুন।</p>
              <ButtonLink href={whatsappLink(defaultWhatsAppMessage)} external variant="white" className="mt-4 w-full">
                WhatsApp-এ মেসেজ দিন
              </ButtonLink>
            </div>

            <a
              href={social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="card flex items-center gap-4 p-5 transition-colors hover:border-brand-200"
            >
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#1877F2] text-white">
                <FacebookIcon className="h-6 w-6" />
              </span>
              <span>
                <span className="block font-bold text-navy">Facebook Page</span>
                <span className="text-sm text-muted">আপডেট ও অফার পেতে ফলো করুন</span>
              </span>
            </a>
          </div>

          <div className="space-y-8">
            <ContactForm />

            <section aria-labelledby="map-heading" className="card overflow-hidden">
              <h2 id="map-heading" className="sr-only">
                Office location map
              </h2>
              {contact.mapEmbedUrl ? (
                <iframe
                  src={contact.mapEmbedUrl}
                  title={`${siteConfig.name} location`}
                  className="h-80 w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              ) : (
                <div className="bg-grid relative flex h-80 flex-col items-center justify-center gap-3 bg-surface px-6 text-center">
                  <span className="grid h-14 w-14 place-items-center rounded-full bg-accent text-white shadow-cta">
                    <MapPin className="h-7 w-7" aria-hidden="true" />
                  </span>
                  <p className="font-display text-lg font-bold text-navy">Google Map</p>
                  <p className="max-w-sm text-sm text-muted">
                    অফিসের ঠিকানা যুক্ত হলে এখানে Google Map দেখা যাবে।
                  </p>
                </div>
              )}
            </section>
          </div>
        </div>
      </section>
    </>
  );
}
