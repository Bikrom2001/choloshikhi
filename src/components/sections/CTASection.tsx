import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { Reveal } from "@/components/ui/Reveal";
import { defaultWhatsAppMessage, whatsappLink } from "@/lib/whatsapp";

interface CTASectionProps {
  title?: string;
  description?: string;
  buttonLabel?: string;
  buttonHref?: string;
}

/** Final admission CTA used on the homepage and inner pages. */
export function CTASection({
  title = "আপনার সফল ক্যারিয়ার শুরু হোক আজ থেকেই!",
  description = "পছন্দের কোর্সে ভর্তি হয়ে আজই শুরু করুন আপনার দক্ষতা অর্জনের যাত্রা। যেকোনো প্রশ্নে আমরা আছি আপনার পাশে।",
  buttonLabel = "ভর্তি হতে চাই",
  buttonHref = "/admission",
}: CTASectionProps) {
  return (
    <section className="section" aria-labelledby="cta-heading">
      <div className="container-page">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-navy via-navy-700 to-brand-700 px-6 py-14 text-center sm:px-12 sm:py-16">
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.08]"
              style={{
                backgroundImage: "radial-gradient(#fff 1px, transparent 1px)",
                backgroundSize: "22px 22px",
              }}
              aria-hidden="true"
            />
            <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-accent/30 blur-3xl" aria-hidden="true" />
            <div className="relative mx-auto max-w-2xl">
              <h2 id="cta-heading" className="text-3xl font-extrabold leading-tight text-white sm:text-4xl">
                {title}
              </h2>
              <p className="mt-4 text-lg leading-8 text-navy-100">{description}</p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <ButtonLink href={buttonHref} variant="accent" size="lg">
                  {buttonLabel}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </ButtonLink>
                <ButtonLink href={whatsappLink(defaultWhatsAppMessage)} external variant="white" size="lg">
                  <WhatsAppIcon className="h-5 w-5 text-[#25D366]" />
                  WhatsApp-এ জানুন
                </ButtonLink>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
