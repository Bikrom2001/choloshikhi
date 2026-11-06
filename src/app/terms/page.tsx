import { LegalContent } from "@/components/legal/LegalContent";
import { PageHero } from "@/components/ui/PageHero";
import { termsAndConditions } from "@/data/legal";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Terms & Conditions",
  description: "CholoShikhi IT Institute-এর ওয়েবসাইট ব্যবহার ও কোর্সে ভর্তির শর্তাবলি।",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <>
      <PageHero title={termsAndConditions.title} description="ওয়েবসাইট ব্যবহার ও ভর্তির আগে শর্তাবলি পড়ে নিন।" breadcrumbs={[{ label: "Terms & Conditions" }]} />
      <div className="bg-surface">
        <LegalContent doc={termsAndConditions} />
      </div>
    </>
  );
}
