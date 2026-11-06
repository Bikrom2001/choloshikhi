"use client";

import { Eye, EyeOff, Loader2, LogIn } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Field, Input } from "@/components/ui/FormControls";
import { Notice } from "@/components/ui/Feedback";
import { isValidBDPhone, isValidEmail } from "@/lib/validation";
import { wait } from "@/lib/utils";

/**
 * Student login UI (frontend only).
 * Authentication will be connected in the backend phase — for now the form
 * validates input and explains that the student portal is not yet available.
 */
export function LoginForm() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState<{ identifier?: string; password?: string }>({});
  const [state, setState] = useState<"idle" | "checking" | "unavailable">("idle");

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const next: typeof errors = {};
    if (!identifier.trim()) next.identifier = "ইমেইল বা মোবাইল নম্বর দিন।";
    else if (!isValidEmail(identifier) && !isValidBDPhone(identifier)) next.identifier = "সঠিক ইমেইল বা মোবাইল নম্বর দিন।";
    if (!password) next.password = "পাসওয়ার্ড দিন।";
    else if (password.length < 6) next.password = "পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে।";
    setErrors(next);
    if (Object.keys(next).length) return;
    setState("checking");
    await wait(700);
    setState("unavailable");
  };

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5" aria-label="Student login">
      <Field id="identifier" label="ইমেইল বা মোবাইল নম্বর" required error={errors.identifier}>
        <Input
          id="identifier"
          autoComplete="username"
          value={identifier}
          error={errors.identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          placeholder="you@example.com / 01XXXXXXXXX"
        />
      </Field>
      <Field id="password" label="পাসওয়ার্ড" required error={errors.password}>
        <div className="relative">
          <Input
            id="password"
            type={show ? "text" : "password"}
            autoComplete="current-password"
            value={password}
            error={errors.password}
            onChange={(e) => setPassword(e.target.value)}
            className="pr-12"
          />
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            aria-label={show ? "Hide password" : "Show password"}
            className="absolute right-3 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-lg text-muted hover:text-navy"
          >
            {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
      </Field>

      {state === "unavailable" && (
        <Notice>
          স্টুডেন্ট পোর্টাল শীঘ্রই চালু হবে। এই মুহূর্তে লগইন সুবিধা উপলব্ধ নয় — কোর্স বা ভর্তি সংক্রান্ত যেকোনো প্রয়োজনে আমাদের সাথে
          যোগাযোগ করুন।
        </Notice>
      )}

      <Button type="submit" size="lg" className="w-full" disabled={state === "checking"}>
        {state === "checking" ? (
          <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
        ) : (
          <LogIn className="h-4 w-4" aria-hidden="true" />
        )}
        Login
      </Button>
    </form>
  );
}
