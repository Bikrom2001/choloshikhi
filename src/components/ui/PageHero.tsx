import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";

interface Crumb {
  label: string;
  href?: string;
}

interface PageHeroProps {
  title: ReactNode;
  description?: ReactNode;
  eyebrow?: string;
  breadcrumbs: Crumb[];
  children?: ReactNode;
}

/** Shared inner-page hero with breadcrumbs (navy brand band). */
export function PageHero({ title, description, eyebrow, breadcrumbs, children }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-navy text-white">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-brand/30 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -bottom-32 left-10 h-72 w-72 rounded-full bg-accent/20 blur-3xl" aria-hidden="true" />

      <div className="container-page relative py-14 sm:py-20">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1.5 text-sm text-navy-200">
            <li>
              <Link href="/" className="hover:text-white">
                Home
              </Link>
            </li>
            {breadcrumbs.map((crumb) => (
              <li key={crumb.label} className="flex items-center gap-1.5">
                <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
                {crumb.href ? (
                  <Link href={crumb.href} className="hover:text-white">
                    {crumb.label}
                  </Link>
                ) : (
                  <span aria-current="page" className="line-clamp-1 text-white">
                    {crumb.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>

        <div className="mt-6 max-w-3xl">
          {eyebrow && (
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.16em] text-accent">{eyebrow}</p>
          )}
          <h1 className="text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl">{title}</h1>
          {description && <p className="mt-4 text-base leading-7 text-navy-100 sm:text-lg">{description}</p>}
        </div>
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}
