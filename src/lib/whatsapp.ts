import { siteConfig } from "@/config/site";

/**
 * Builds a WhatsApp click-to-chat link.
 * If NEXT_PUBLIC_WHATSAPP_NUMBER is not configured, the link opens WhatsApp's
 * contact picker with the message prefilled (still a valid, working link).
 */
export function whatsappLink(message?: string): string {
  const number = siteConfig.contact.whatsappNumber?.replace(/\D/g, "") ?? "";
  const base = `https://wa.me/${number}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export const isWhatsAppConfigured = Boolean(siteConfig.contact.whatsappNumber);

export const defaultWhatsAppMessage =
  "আসসালামু আলাইকুম, আমি CholoShikhi IT Institute-এর কোর্স সম্পর্কে জানতে চাই।";
