"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Loader2, RotateCcw, Send } from "lucide-react";
import { useMemo, useRef, useState, type FormEvent } from "react";
import type { AdmissionFormValues, FormErrors, SubmitStatus } from "@/types";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Field, Input, Select, Textarea } from "@/components/ui/FormControls";
import { Notice } from "@/components/ui/Feedback";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { districts, educationLevels } from "@/data/site-content";
import { getCourseOptions } from "@/services/courses";
import { submitAdmission } from "@/services/submissions";
import { courses } from "@/data/courses";
import { formatBDT } from "@/lib/utils";
import { hasErrors, validateAdmission } from "@/lib/validation";
import { whatsappLink } from "@/lib/whatsapp";

const emptyValues: AdmissionFormValues = {
  fullName: "",
  phone: "",
  email: "",
  courseSlug: "",
  educationLevel: "",
  district: "",
  message: "",
};

const fieldOrder: Array<keyof AdmissionFormValues> = [
  "fullName",
  "phone",
  "email",
  "courseSlug",
  "educationLevel",
  "district",
  "message",
];

export function AdmissionForm({ defaultCourse = "" }: { defaultCourse?: string }) {
  const courseOptions = useMemo(() => getCourseOptions(), []);
  const validDefault = courseOptions.some((c) => c.value === defaultCourse) ? defaultCourse : "";
  const [values, setValues] = useState<AdmissionFormValues>({ ...emptyValues, courseSlug: validDefault });
  const [errors, setErrors] = useState<FormErrors<AdmissionFormValues>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof AdmissionFormValues, boolean>>>({});
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [reference, setReference] = useState<string>();
  const formRef = useRef<HTMLFormElement>(null);

  const selectedCourse = courses.find((c) => c.slug === values.courseSlug);

  const update = <K extends keyof AdmissionFormValues>(key: K, value: AdmissionFormValues[K]) => {
    const next = { ...values, [key]: value };
    setValues(next);
    if (touched[key]) setErrors(validateAdmission(next));
  };

  const blur = (key: keyof AdmissionFormValues) => {
    setTouched((t) => ({ ...t, [key]: true }));
    setErrors(validateAdmission(values));
  };

  const visibleError = (key: keyof AdmissionFormValues) => (touched[key] ? errors[key] : undefined);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const result = validateAdmission(values);
    setErrors(result);
    setTouched(Object.fromEntries(fieldOrder.map((k) => [k, true])));
    if (hasErrors(result)) {
      const first = fieldOrder.find((k) => result[k]);
      if (first) formRef.current?.querySelector<HTMLElement>(`#${first}`)?.focus();
      return;
    }
    setStatus("submitting");
    try {
      const res = await submitAdmission(values);
      if (!res.ok) throw new Error(res.error);
      setReference(res.reference);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const reset = () => {
    setValues({ ...emptyValues, courseSlug: validDefault });
    setErrors({});
    setTouched({});
    setStatus("idle");
  };

  const summaryMessage = [
    "আসসালামু আলাইকুম, আমি CholoShikhi IT Institute-এ ভর্তি হতে চাই।",
    "",
    `নাম: ${values.fullName}`,
    `মোবাইল: ${values.phone}`,
    `ইমেইল: ${values.email}`,
    `কোর্স: ${selectedCourse?.title ?? values.courseSlug}`,
    `শিক্ষাগত যোগ্যতা: ${values.educationLevel}`,
    `জেলা: ${values.district}`,
    values.message ? `বার্তা: ${values.message}` : "",
    reference ? `রেফারেন্স: ${reference}` : "",
  ]
    .filter((line, i) => line || i === 1)
    .join("\n");

  return (
    <AnimatePresence mode="wait">
      {status === "success" ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="card p-6 text-center sm:p-10"
          role="status"
          aria-live="polite"
        >
          <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-green-50 text-green-600">
            <CheckCircle2 className="h-9 w-9" aria-hidden="true" />
          </span>
          <h2 className="mt-5 text-2xl font-extrabold sm:text-3xl">ধন্যবাদ, {values.fullName.split(" ")[0]}!</h2>
          <p className="mx-auto mt-3 max-w-lg leading-7 text-muted">
            আপনার আবেদনের তথ্য সঠিকভাবে পূরণ হয়েছে। ভর্তি নিশ্চিত করতে নিচের বাটনে ক্লিক করে তথ্যগুলো WhatsApp-এ
            আমাদের কাছে পাঠিয়ে দিন।
          </p>

          <dl className="mx-auto mt-6 grid max-w-lg gap-3 rounded-2xl bg-surface p-5 text-left text-sm sm:grid-cols-2">
            <div>
              <dt className="text-muted">কোর্স</dt>
              <dd className="font-semibold text-navy">{selectedCourse?.title}</dd>
            </div>
            <div>
              <dt className="text-muted">অফার মূল্য</dt>
              <dd className="font-semibold text-brand">{selectedCourse && formatBDT(selectedCourse.offerPrice)}</dd>
            </div>
            <div>
              <dt className="text-muted">মোবাইল</dt>
              <dd className="font-semibold text-navy">{values.phone}</dd>
            </div>
            <div>
              <dt className="text-muted">রেফারেন্স</dt>
              <dd className="font-semibold text-navy">{reference}</dd>
            </div>
          </dl>

          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink href={whatsappLink(summaryMessage)} external variant="primary" size="lg" className="bg-[#25D366] hover:bg-[#1eb457]">
              <WhatsAppIcon className="h-5 w-5" />
              WhatsApp-এ পাঠান
            </ButtonLink>
            <Button variant="outline" size="lg" onClick={reset}>
              <RotateCcw className="h-4 w-4" aria-hidden="true" />
              নতুন আবেদন
            </Button>
          </div>
          <Notice className="mx-auto mt-7 max-w-lg text-left">
            এই ওয়েবসাইটের ফর্মটি এখনও কোনো সার্ভারের সাথে যুক্ত নয়, তাই তথ্য স্বয়ংক্রিয়ভাবে আমাদের কাছে পৌঁছায় না।
            WhatsApp-এ পাঠালে বা সরাসরি যোগাযোগ করলে আমাদের টিম আপনার সাথে যোগাযোগ করবে।
          </Notice>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          ref={formRef}
          onSubmit={onSubmit}
          noValidate
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="card p-6 sm:p-8"
          aria-label="Admission form"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <Field id="fullName" label="শিক্ষার্থীর পূর্ণ নাম" required error={visibleError("fullName")} className="sm:col-span-2">
              <Input
                id="fullName"
                autoComplete="name"
                placeholder="যেমন: Rahim Ahmed"
                value={values.fullName}
                error={visibleError("fullName")}
                onChange={(e) => update("fullName", e.target.value)}
                onBlur={() => blur("fullName")}
              />
            </Field>

            <Field id="phone" label="মোবাইল নম্বর" required error={visibleError("phone")} hint="বাংলাদেশি নম্বর, যেমন: 01XXXXXXXXX">
              <Input
                id="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder="01XXXXXXXXX"
                value={values.phone}
                error={visibleError("phone")}
                hint="বাংলাদেশি নম্বর, যেমন: 01XXXXXXXXX"
                onChange={(e) => update("phone", e.target.value)}
                onBlur={() => blur("phone")}
              />
            </Field>

            <Field id="email" label="ইমেইল ঠিকানা" required error={visibleError("email")}>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={values.email}
                error={visibleError("email")}
                onChange={(e) => update("email", e.target.value)}
                onBlur={() => blur("email")}
              />
            </Field>

            <Field id="courseSlug" label="কোর্স নির্বাচন করুন" required error={visibleError("courseSlug")} className="sm:col-span-2">
              <Select
                id="courseSlug"
                placeholder="— কোর্স নির্বাচন করুন —"
                options={courseOptions}
                value={values.courseSlug}
                error={visibleError("courseSlug")}
                onChange={(e) => update("courseSlug", e.target.value)}
                onBlur={() => blur("courseSlug")}
              />
            </Field>

            {selectedCourse && (
              <div className="flex items-center justify-between gap-4 rounded-2xl border border-brand-100 bg-brand-50 px-4 py-3 sm:col-span-2">
                <span className="text-sm font-medium text-navy">{selectedCourse.title}</span>
                <span className="text-right">
                  <span className="block font-display text-lg font-extrabold text-brand">{formatBDT(selectedCourse.offerPrice)}</span>
                  <del className="text-xs text-muted">{formatBDT(selectedCourse.regularPrice)}</del>
                </span>
              </div>
            )}

            <Field id="educationLevel" label="শিক্ষাগত যোগ্যতা" required error={visibleError("educationLevel")}>
              <Select
                id="educationLevel"
                placeholder="— নির্বাচন করুন —"
                options={educationLevels.map((l) => ({ value: l, label: l }))}
                value={values.educationLevel}
                error={visibleError("educationLevel")}
                onChange={(e) => update("educationLevel", e.target.value)}
                onBlur={() => blur("educationLevel")}
              />
            </Field>

            <Field id="district" label="জেলা" required error={visibleError("district")}>
              <Select
                id="district"
                placeholder="— জেলা নির্বাচন করুন —"
                options={districts.map((d) => ({ value: d, label: d }))}
                value={values.district}
                error={visibleError("district")}
                onChange={(e) => update("district", e.target.value)}
                onBlur={() => blur("district")}
              />
            </Field>

            <Field id="message" label="বার্তা" error={visibleError("message")} hint={`${values.message.length}/500`} className="sm:col-span-2">
              <Textarea
                id="message"
                placeholder="কোনো প্রশ্ন বা বিশেষ তথ্য থাকলে লিখুন…"
                value={values.message}
                maxLength={600}
                error={visibleError("message")}
                hint={`${values.message.length}/500`}
                onChange={(e) => update("message", e.target.value)}
                onBlur={() => blur("message")}
              />
            </Field>
          </div>

          {status === "error" && (
            <p role="alert" className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              দুঃখিত, কোনো সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন অথবা WhatsApp-এ যোগাযোগ করুন।
            </p>
          )}

          <Button type="submit" variant="accent" size="lg" className="mt-7 w-full" disabled={status === "submitting"}>
            {status === "submitting" ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
                যাচাই করা হচ্ছে…
              </>
            ) : (
              <>
                <Send className="h-4 w-4" aria-hidden="true" />
                আবেদন করুন
              </>
            )}
          </Button>
          <p className="mt-3 text-center text-xs text-muted">
            আবেদন করার মাধ্যমে আপনি আমাদের Terms & Conditions ও Privacy Policy-তে সম্মত হচ্ছেন।
          </p>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
