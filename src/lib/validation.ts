import type { AdmissionFormValues, ContactFormValues, FormErrors } from "@/types";

/**
 * Bangladesh mobile number validation.
 * Accepts: 01XXXXXXXXX, +8801XXXXXXXXX, 8801XXXXXXXXX (spaces/dashes allowed).
 * Valid operator prefixes: 013–019.
 */
export const BD_PHONE_REGEX = /^(?:\+?88)?01[3-9]\d{8}$/;

export function normalizePhone(value: string): string {
  return value.replace(/[\s-]/g, "");
}

export function isValidBDPhone(value: string): boolean {
  return BD_PHONE_REGEX.test(normalizePhone(value));
}

/** Converts any valid BD number to the 8801XXXXXXXXX format. */
export function toInternationalBDPhone(value: string): string {
  const digits = normalizePhone(value).replace(/^\+/, "");
  return digits.startsWith("88") ? digits : `88${digits}`;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function isValidEmail(value: string): boolean {
  return EMAIL_REGEX.test(value.trim());
}

export function validateAdmission(values: AdmissionFormValues): FormErrors<AdmissionFormValues> {
  const errors: FormErrors<AdmissionFormValues> = {};
  const name = values.fullName.trim();

  if (!name) errors.fullName = "আপনার পূর্ণ নাম লিখুন।";
  else if (name.length < 3) errors.fullName = "নাম কমপক্ষে ৩ অক্ষরের হতে হবে।";
  else if (name.length > 80) errors.fullName = "নাম ৮০ অক্ষরের বেশি হতে পারবে না।";

  if (!values.phone.trim()) errors.phone = "মোবাইল নম্বর দিন।";
  else if (!isValidBDPhone(values.phone))
    errors.phone = "সঠিক বাংলাদেশি মোবাইল নম্বর দিন (যেমন: 01XXXXXXXXX)।";

  if (!values.email.trim()) errors.email = "ইমেইল ঠিকানা দিন।";
  else if (!isValidEmail(values.email)) errors.email = "সঠিক ইমেইল ঠিকানা দিন।";

  if (!values.courseSlug) errors.courseSlug = "একটি কোর্স নির্বাচন করুন।";
  if (!values.educationLevel) errors.educationLevel = "শিক্ষাগত যোগ্যতা নির্বাচন করুন।";
  if (!values.district) errors.district = "আপনার জেলা নির্বাচন করুন।";

  if (values.message.length > 500) errors.message = "বার্তা ৫০০ অক্ষরের মধ্যে রাখুন।";

  return errors;
}

export function validateContact(values: ContactFormValues): FormErrors<ContactFormValues> {
  const errors: FormErrors<ContactFormValues> = {};

  if (!values.name.trim()) errors.name = "আপনার নাম লিখুন।";
  else if (values.name.trim().length < 3) errors.name = "নাম কমপক্ষে ৩ অক্ষরের হতে হবে।";

  if (!values.phone.trim()) errors.phone = "মোবাইল নম্বর দিন।";
  else if (!isValidBDPhone(values.phone)) errors.phone = "সঠিক বাংলাদেশি মোবাইল নম্বর দিন।";

  if (values.email.trim() && !isValidEmail(values.email)) errors.email = "সঠিক ইমেইল ঠিকানা দিন।";

  if (!values.subject.trim()) errors.subject = "বিষয় লিখুন।";

  if (!values.message.trim()) errors.message = "আপনার বার্তা লিখুন।";
  else if (values.message.trim().length < 10) errors.message = "বার্তা কমপক্ষে ১০ অক্ষরের হতে হবে।";
  else if (values.message.length > 1000) errors.message = "বার্তা ১০০০ অক্ষরের মধ্যে রাখুন।";

  return errors;
}

export function hasErrors<T>(errors: FormErrors<T>): boolean {
  return Object.values(errors).some(Boolean);
}
