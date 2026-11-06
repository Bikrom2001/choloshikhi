/**
 * Form submission service.
 *
 * FRONTEND-ONLY PHASE: nothing is sent to a server. These functions simulate
 * a short network delay and return `{ ok: true, mode: "local" }` so the UI can
 * show its loading and success states. The UI never claims the data was saved.
 *
 * BACKEND PHASE: replace the bodies with `fetch("/api/admissions", ...)` etc.
 * and return `mode: "remote"` with the server's reference ID.
 */
import type { AdmissionFormValues, ContactFormValues, SubmissionResult } from "@/types";
import { wait } from "@/lib/utils";

function localReference(prefix: string): string {
  const stamp = Date.now().toString(36).toUpperCase().slice(-6);
  return `${prefix}-${stamp}`;
}

export async function submitAdmission(values: AdmissionFormValues): Promise<SubmissionResult> {
  void values;
  await wait(900);
  return { ok: true, mode: "local", reference: localReference("CS") };
}

export async function submitContactMessage(values: ContactFormValues): Promise<SubmissionResult> {
  void values;
  await wait(800);
  return { ok: true, mode: "local" };
}
