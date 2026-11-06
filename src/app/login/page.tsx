import Link from "next/link";
import { GraduationCap } from "lucide-react";
import { LoginForm } from "@/components/forms/LoginForm";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";

export const metadata = {
  ...buildMetadata({
    title: "Student Login",
    description: "CholoShikhi IT Institute স্টুডেন্ট পোর্টাল লগইন।",
    path: "/login",
  }),
  robots: { index: false, follow: true },
};

export default function LoginPage() {
  return (
    <section className="bg-grid relative bg-surface">
      <div className="container-page grid min-h-[calc(100dvh-4.5rem)] items-center gap-10 py-14 lg:grid-cols-2">
        <div className="hidden lg:block">
          <span className="grid h-14 w-14 place-items-center rounded-2xl bg-navy text-white">
            <GraduationCap className="h-7 w-7" aria-hidden="true" />
          </span>
          <p className="mt-6 font-display text-4xl font-extrabold leading-tight text-navy">
            আপনার শেখার যাত্রা চালিয়ে যান
          </p>
          <p className="mt-4 max-w-md text-lg leading-8 text-muted">
            স্টুডেন্ট পোর্টাল থেকে কোর্স, ক্লাস ও অগ্রগতির তথ্য দেখতে পারবেন। পোর্টালটি শীঘ্রই চালু হবে।
          </p>
          <p className="mt-6 font-display text-xl font-bold text-brand">{siteConfig.tagline}</p>
        </div>
        <div className="card mx-auto w-full max-w-md p-7 sm:p-9">
          <h1 className="text-2xl font-extrabold sm:text-3xl">Student Login</h1>
          <p className="mt-2 text-muted">আপনার অ্যাকাউন্টে প্রবেশ করুন</p>
          <div className="mt-7">
            <LoginForm />
          </div>
          <p className="mt-6 text-center text-sm text-muted">
            এখনও ভর্তি হননি?{" "}
            <Link href="/admission" className="font-semibold text-brand hover:underline">
              ভর্তির আবেদন করুন
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
