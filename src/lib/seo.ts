import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

interface PageMetaInput {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
}

/** Consistent per-page metadata (title, description, canonical, Open Graph, Twitter). */
export function buildMetadata({ title, description, path, image, type = "website" }: PageMetaInput): Metadata {
  const images = image ? [{ url: image, width: 1200, height: 630, alt: title }] : undefined;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | ${siteConfig.name}`,
      description,
      url: path,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type,
      images,
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title: `${title} | ${siteConfig.name}`,
      description,
      images: image ? [image] : undefined,
    },
  };
}
