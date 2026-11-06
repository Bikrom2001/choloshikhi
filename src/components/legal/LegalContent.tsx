import type { LegalDocument } from "@/types";
import { formatDate } from "@/lib/utils";

/** Renders a legal document with an on-page table of contents. */
export function LegalContent({ doc }: { doc: LegalDocument }) {
  const anchor = (i: number) => `section-${i + 1}`;
  return (
    <div className="container-page grid gap-10 py-14 lg:grid-cols-[16rem_1fr] lg:py-20">
      <aside className="lg:sticky lg:top-28 lg:self-start">
        <nav aria-label="On this page" className="card p-5">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted">এই পেজে</p>
          <ol className="mt-3 space-y-2 text-sm">
            {doc.sections.map((s, i) => (
              <li key={s.heading}>
                <a href={`#${anchor(i)}`} className="text-navy hover:text-brand">
                  {i + 1}. {s.heading}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </aside>
      <article className="card p-6 sm:p-10">
        <p className="text-sm text-muted">
          সর্বশেষ হালনাগাদ: <time dateTime={doc.lastUpdated}>{formatDate(doc.lastUpdated)}</time>
        </p>
        <p className="mt-4 text-lg leading-8 text-ink">{doc.intro}</p>
        {doc.sections.map((s, i) => (
          <section key={s.heading} id={anchor(i)} className="scroll-mt-28 border-t border-line pt-8 mt-8">
            <h2 className="text-xl font-bold sm:text-2xl">
              {i + 1}. {s.heading}
            </h2>
            {s.paragraphs?.map((p) => (
              <p key={p} className="mt-3 leading-8 text-ink/90">
                {p}
              </p>
            ))}
            {s.list && (
              <ul className="mt-3 space-y-2">
                {s.list.map((item) => (
                  <li key={item} className="flex gap-3 leading-7 text-ink/90">
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </article>
    </div>
  );
}
