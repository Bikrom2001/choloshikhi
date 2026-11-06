import { MessageCircleQuestion } from "lucide-react";
import { Accordion } from "@/components/ui/Accordion";
import { ButtonLink } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { PageHero } from "@/components/ui/PageHero";
import { faqGroups } from "@/data/faqs";
import { buildMetadata } from "@/lib/seo";
import { defaultWhatsAppMessage, whatsappLink } from "@/lib/whatsapp";

export const metadata = buildMetadata({
  title: "FAQ — সাধারণ জিজ্ঞাসা",
  description: "CholoShikhi IT Institute-এর ভর্তি, কোর্স ফি, ক্লাস ও ক্যারিয়ার সাপোর্ট নিয়ে প্রায়শই জিজ্ঞাসিত প্রশ্নের উত্তর।",
  path: "/faq",
});

export default function FAQPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqGroups.flatMap((g) =>
      g.items.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    ),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <PageHero
        eyebrow="FAQ"
        title="প্রায়শই জিজ্ঞাসিত প্রশ্ন"
        description="ভর্তি, কোর্স, পেমেন্ট ও ক্যারিয়ার সাপোর্ট নিয়ে সাধারণ প্রশ্নের উত্তর এখানে।"
        breadcrumbs={[{ label: "FAQ" }]}
      />
      <section className="section pt-12">
        <div className="container-page grid gap-10 lg:grid-cols-[16rem_1fr]">
          <nav aria-label="FAQ categories" className="lg:sticky lg:top-28 lg:self-start">
            <ul className="flex gap-2 overflow-x-auto pb-1 lg:flex-col">
              {faqGroups.map((g) => (
                <li key={g.id} className="shrink-0">
                  <a
                    href={`#${g.id}`}
                    className="block rounded-xl border border-line bg-white px-4 py-2.5 text-sm font-semibold text-navy transition-colors hover:border-brand hover:text-brand"
                  >
                    {g.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="space-y-12">
            {faqGroups.map((group) => (
              <section key={group.id} id={group.id} className="scroll-mt-28" aria-labelledby={`${group.id}-title`}>
                <h2 id={`${group.id}-title`} className="mb-5 text-2xl font-extrabold">
                  {group.title}
                </h2>
                <Accordion items={group.items} defaultOpen={-1} multiple />
              </section>
            ))}

            <div className="card flex flex-col items-start gap-5 p-8 sm:flex-row sm:items-center">
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-accent-50 text-accent-600">
                <MessageCircleQuestion className="h-7 w-7" aria-hidden="true" />
              </span>
              <div className="flex-1">
                <h2 className="text-xl font-extrabold">আপনার প্রশ্নের উত্তর পাননি?</h2>
                <p className="mt-1 text-muted">আমাদের সাথে সরাসরি যোগাযোগ করুন — আমরা সাহায্য করতে প্রস্তুত।</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <ButtonLink href="/contact" variant="primary">
                  যোগাযোগ করুন
                </ButtonLink>
                <ButtonLink href={whatsappLink(defaultWhatsAppMessage)} external variant="outline">
                  <WhatsAppIcon className="h-4 w-4 text-[#25D366]" /> WhatsApp
                </ButtonLink>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
