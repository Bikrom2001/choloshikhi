"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { useRef, useState, type FormEvent } from "react";
import type { ContactFormValues, FormErrors, SubmitStatus } from "@/types";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Field, Input, Textarea } from "@/components/ui/FormControls";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { submitContactMessage } from "@/services/submissions";
import { hasErrors, validateContact } from "@/lib/validation";
import { whatsappLink } from "@/lib/whatsapp";

const empty: ContactFormValues = { name: "", phone: "", email: "", subject: "", message: "" };
const order: Array<keyof ContactFormValues> = ["name", "phone", "email", "subject", "message"];

export function ContactForm() {
  const [values, setValues] = useState(empty);
  const [errors, setErrors] = useState<FormErrors<ContactFormValues>>({});
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const formRef = useRef<HTMLFormElement>(null);

  const update = (key: keyof ContactFormValues, value: string) => {
    const next = { ...values, [key]: value };
    setValues(next);
    if (submitted) setErrors(validateContact(next));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    const result = validateContact(values);
    setErrors(result);
    if (hasErrors(result)) {
      const first = order.find((k) => result[k]);
      if (first) formRef.current?.querySelector<HTMLElement>(`#contact-${first}`)?.focus();
      return;
    }
    setStatus("submitting");
    try {
      const res = await submitContactMessage(values);
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  const message = `আসসালামু আলাইকুম,\nনাম: ${values.name}\nমোবাইল: ${values.phone}\nবিষয়: ${values.subject}\n\n${values.message}`;

  return (
    <AnimatePresence mode="wait">
      {status === "success" ? (
        <motion.div
          key="ok"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="card flex flex-col items-center p-8 text-center sm:p-10"
          role="status"
        >
          <span className="grid h-16 w-16 place-items-center rounded-full bg-green-50 text-green-600">
            <CheckCircle2 className="h-9 w-9" aria-hidden="true" />
          </span>
          <h3 className="mt-5 text-2xl font-extrabold">বার্তা প্রস্তুত!</h3>
          <p className="mt-3 max-w-md leading-7 text-muted">
            আপনার বার্তাটি সঠিকভাবে লেখা হয়েছে। এটি আমাদের কাছে পৌঁছাতে WhatsApp-এ পাঠান — আমরা দ্রুত উত্তর দেওয়ার চেষ্টা করব।
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={whatsappLink(message)} external size="lg" className="bg-[#25D366] hover:bg-[#1eb457]">
              <WhatsAppIcon className="h-5 w-5" />
              WhatsApp-এ পাঠান
            </ButtonLink>
            <Button
              variant="outline"
              size="lg"
              onClick={() => {
                setValues(empty);
                setErrors({});
                setSubmitted(false);
                setStatus("idle");
              }}
            >
              নতুন বার্তা
            </Button>
          </div>
          <p className="mt-6 text-xs text-muted">এই ফর্মটি এখনও কোনো সার্ভারের সাথে যুক্ত নয় — তথ্য কোথাও সংরক্ষিত হয়নি।</p>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          ref={formRef}
          noValidate
          onSubmit={onSubmit}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="card p-6 sm:p-8"
          aria-label="Contact form"
        >
          <h2 className="text-2xl font-extrabold">আমাদের বার্তা পাঠান</h2>
          <p className="mt-2 text-muted">আপনার প্রশ্ন লিখুন — আমাদের টিম উত্তর দেবে।</p>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <Field id="contact-name" label="আপনার নাম" required error={errors.name}>
              <Input id="contact-name" autoComplete="name" value={values.name} error={errors.name} onChange={(e) => update("name", e.target.value)} />
            </Field>
            <Field id="contact-phone" label="মোবাইল নম্বর" required error={errors.phone}>
              <Input
                id="contact-phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder="01XXXXXXXXX"
                value={values.phone}
                error={errors.phone}
                onChange={(e) => update("phone", e.target.value)}
              />
            </Field>
            <Field id="contact-email" label="ইমেইল" error={errors.email}>
              <Input id="contact-email" type="email" autoComplete="email" value={values.email} error={errors.email} onChange={(e) => update("email", e.target.value)} />
            </Field>
            <Field id="contact-subject" label="বিষয়" required error={errors.subject}>
              <Input id="contact-subject" placeholder="যেমন: কোর্স সম্পর্কে জানতে চাই" value={values.subject} error={errors.subject} onChange={(e) => update("subject", e.target.value)} />
            </Field>
            <Field id="contact-message" label="বার্তা" required error={errors.message} className="sm:col-span-2">
              <Textarea id="contact-message" value={values.message} error={errors.message} maxLength={1100} onChange={(e) => update("message", e.target.value)} />
            </Field>
          </div>
          {status === "error" && (
            <p role="alert" className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              দুঃখিত, কোনো সমস্যা হয়েছে। আবার চেষ্টা করুন।
            </p>
          )}
          <Button type="submit" size="lg" className="mt-6 w-full sm:w-auto" disabled={status === "submitting"}>
            {status === "submitting" ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" /> পাঠানো হচ্ছে…
              </>
            ) : (
              <>
                <Send className="h-4 w-4" aria-hidden="true" /> বার্তা পাঠান
              </>
            )}
          </Button>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
