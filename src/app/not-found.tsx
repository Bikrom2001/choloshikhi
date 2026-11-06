import { ArrowLeft, Compass } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="bg-grid bg-surface">
      <div className="container-page flex min-h-[70vh] flex-col items-center justify-center py-20 text-center">
        <span className="grid h-16 w-16 place-items-center rounded-2xl bg-navy text-white">
          <Compass className="h-8 w-8" aria-hidden="true" />
        </span>
        <p className="mt-6 font-display text-7xl font-extrabold text-brand">404</p>
        <h1 className="mt-2 text-3xl font-extrabold">পেজটি খুঁজে পাওয়া যায়নি</h1>
        <p className="mt-3 max-w-md text-muted">আপনি যে পেজটি খুঁজছেন সেটি সরানো হয়েছে অথবা ঠিকানাটি ভুল।</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/" variant="primary">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> হোমে ফিরে যান
          </ButtonLink>
          <ButtonLink href="/courses" variant="outline">
            কোর্স দেখুন
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
