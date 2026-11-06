import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { defaultWhatsAppMessage, whatsappLink } from "@/lib/whatsapp";

/** Floating WhatsApp CTA. Number comes from NEXT_PUBLIC_WHATSAPP_NUMBER. */
export function WhatsAppFloat() {
  return (
    <a
      href={whatsappLink(defaultWhatsAppMessage)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp-এ আমাদের সাথে কথা বলুন"
      className="group fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full bg-[#25D366] p-3.5 text-white shadow-lift transition-transform hover:-translate-y-1 sm:bottom-6 sm:right-6"
    >
      <WhatsAppIcon className="h-6 w-6" />
      <span className="hidden max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold transition-all duration-300 group-hover:max-w-40 group-hover:pr-1 sm:inline">
        WhatsApp করুন
      </span>
    </a>
  );
}
