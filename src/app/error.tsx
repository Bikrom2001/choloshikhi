"use client";

import { RotateCcw, TriangleAlert } from "lucide-react";
import { useEffect } from "react";
import { Button, ButtonLink } from "@/components/ui/Button";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="container-page flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <span className="grid h-16 w-16 place-items-center rounded-2xl bg-accent-50 text-accent-600">
        <TriangleAlert className="h-8 w-8" aria-hidden="true" />
      </span>
      <h1 className="mt-6 text-3xl font-extrabold">কিছু একটা সমস্যা হয়েছে</h1>
      <p className="mt-3 max-w-md text-muted">পেজটি লোড করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।</p>
      <div className="mt-8 flex gap-3">
        <Button onClick={reset}>
          <RotateCcw className="h-4 w-4" aria-hidden="true" /> আবার চেষ্টা করুন
        </Button>
        <ButtonLink href="/" variant="outline">
          হোমে যান
        </ButtonLink>
      </div>
    </section>
  );
}
