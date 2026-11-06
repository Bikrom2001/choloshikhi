import { ClipboardCheck, MessageCircle, PhoneCall, Rocket } from "lucide-react";
import { AdmissionForm } from "@/components/forms/AdmissionForm";
import { ButtonLink } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { PageHero } from "@/components/ui/PageHero";
import { getAllCourses } from "@/services/courses";
import { buildMetadata } from "@/lib/seo";
import { discountPercent, formatBDT } from "@/lib/utils";
import { defaultWhatsAppMessage, whatsappLink } from "@/lib/whatsapp";

export const metadata = buildMetadata({
  title: "Admission — ভর্তি চলছে",
  description: "CholoShikhi IT Institute-এ ভর্তির আবেদন করুন। পছন্দের কোর্স নির্বাচন করে ফর্ম পূরণ করুন এবং বিশেষ অফার মূল্যে ভর্তি নিশ্চিত করুন।",
  path: "/admission",
});

const steps = [
  { icon: ClipboardCheck, title: "ফর্ম পূরণ করুন", text: "আপনার তথ্য ও পছন্দের কোর্স নির্বাচন করুন।" },
  { icon: MessageCircle, title: "WhatsApp-এ পাঠান", text: "আবেদনের তথ্য এক ক্লিকে আমাদের কাছে পাঠান।" },
  { icon: PhoneCall, title: "আমরা যোগাযোগ করব", text: "আমাদের টিম ভর্তির পরবর্তী ধাপ জানাবে।" },
  { icon: Rocket, title: "শেখা শুরু করুন", text: "ভর্তি নিশ্চিত হলে শুরু হবে আপনার যাত্রা।" },
];

interface Props {
  searchParams: Promise<{ course?: string }>;
}

export default async function AdmissionPage({ searchParams }: Props) {
  const [{ course }, courses] = await Promise.all([searchParams, getAllCourses()]);

  return (
    <>
      <PageHero
        eyebrow="ভর্তি চলছে"
        title="আজই ভর্তি হন, শুরু করুন দক্ষতার যাত্রা"
        description="নিচের ফর্মটি পূরণ করুন। আবেদনের তথ্য WhatsApp-এ পাঠালে আমাদের টিম আপনার সাথে যোগাযোগ করবে।"
        breadcrumbs={[{ label: "Admission" }]}
      />

      <section className="section pt-12">
        <div className="container-page grid gap-8 lg:grid-cols-[1fr_24rem] lg:gap-10">
          <div>
            <AdmissionForm defaultCourse={course} />
          </div>

          <aside className="space-y-6">
            <div className="card p-6">
              <h2 className="text-lg font-extrabold">ভর্তির প্রক্রিয়া</h2>
              <ol className="mt-5 space-y-5">
                {steps.map((s, i) => (
                  <li key={s.title} className="flex gap-4">
                    <span className="relative grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand">
                      <s.icon className="h-5 w-5" aria-hidden="true" />
                      <span className="absolute -right-1.5 -top-1.5 grid h-5 w-5 place-items-center rounded-full bg-accent text-[0.65rem] font-bold text-white">
                        {i + 1}
                      </span>
                    </span>
                    <div>
                      <h3 className="font-sans text-base font-bold">{s.title}</h3>
                      <p className="text-sm text-muted">{s.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="card p-6">
              <h2 className="text-lg font-extrabold">কোর্স ফি (অফার মূল্য)</h2>
              <ul className="mt-4 divide-y divide-line">
                {courses.map((c) => (
                  <li key={c.slug} className="flex items-center justify-between gap-3 py-3 text-sm">
                    <span className="font-medium text-navy">{c.title}</span>
                    <span className="shrink-0 text-right">
                      <span className="block font-bold text-brand">{formatBDT(c.offerPrice)}</span>
                      <span className="text-xs text-muted">
                        <del>{formatBDT(c.regularPrice)}</del> · {discountPercent(c.regularPrice, c.offerPrice)}% off
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-[var(--radius-card)] bg-navy p-6 text-white">
              <h2 className="text-lg font-extrabold text-white">সাহায্য প্রয়োজন?</h2>
              <p className="mt-2 text-sm leading-6 text-navy-100">কোর্স নির্বাচন নিয়ে দ্বিধায় থাকলে সরাসরি আমাদের সাথে কথা বলুন।</p>
              <ButtonLink href={whatsappLink(defaultWhatsAppMessage)} external variant="white" className="mt-4 w-full">
                <WhatsAppIcon className="h-5 w-5 text-[#25D366]" />
                WhatsApp-এ কথা বলুন
              </ButtonLink>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
