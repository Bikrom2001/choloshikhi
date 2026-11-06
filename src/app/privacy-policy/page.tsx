import { LegalContent } from "@/components/legal/LegalContent";
import { PageHero } from "@/components/ui/PageHero";
import { privacyPolicy } from "@/data/legal";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description: "CholoShikhi IT Institute-এর গোপনীয়তা নীতি — ওয়েবসাইট ব্যবহারের সময় আপনার তথ্য কীভাবে ব্যবহার ও সুরক্ষিত রাখা হয়।",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero title={privacyPolicy.title} description="আপনার তথ্যের গোপনীয়তা আমাদের কাছে গুরুত্বপূর্ণ।" breadcrumbs={[{ label: "Privacy Policy" }]} />
      <div className="bg-surface">
        <LegalContent doc={privacyPolicy} />
      </div>
    </>
  );
}
