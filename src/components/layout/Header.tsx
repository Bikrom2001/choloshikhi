"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, LogIn, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Logo } from "@/components/layout/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { mainNav } from "@/data/site-content";
import { cn } from "@/lib/utils";
import { defaultWhatsAppMessage, whatsappLink } from "@/lib/whatsapp";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname() ?? "/";
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on navigation
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock body scroll + close on Escape while the menu is open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b bg-white/90 backdrop-blur-md transition-shadow",
        scrolled ? "border-line shadow-soft" : "border-transparent",
      )}
    >
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-lg focus:bg-navy focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>

      <div className="container-page flex h-[4.5rem] items-center justify-between gap-4">
        <Logo priority />

        <nav aria-label="Main navigation" className="hidden lg:block">
          <ul className="flex items-center xl:gap-1">
            {mainNav.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative rounded-full px-2.5 py-2 text-[0.95rem] font-semibold transition-colors xl:px-4",
                      active ? "text-brand" : "text-navy hover:text-brand",
                    )}
                  >
                    {item.label}
                    {active && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-x-2.5 -bottom-0.5 h-0.5 rounded-full bg-brand xl:inset-x-4"
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="hidden items-center gap-1 lg:flex xl:gap-2">
          <ButtonLink href="/login" variant="ghost" size="md" className="px-3 xl:px-5">
            <LogIn className="h-4 w-4" aria-hidden="true" />
            Login
          </ButtonLink>
          <ButtonLink href="/admission" variant="accent" size="md" className="relative">
            <span className="absolute -right-0.5 -top-0.5 flex h-3 w-3" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex h-3 w-3 rounded-full border-2 border-white bg-accent" />
            </span>
            ভর্তি চলছে
          </ButtonLink>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="grid h-11 w-11 place-items-center rounded-xl border border-line text-navy transition-colors hover:bg-navy-50 lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 top-[4.5rem] z-40 bg-navy-950/40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              id="mobile-menu"
              className="absolute inset-x-0 top-full z-50 max-h-[calc(100dvh-4.5rem)] overflow-y-auto border-b border-line bg-white shadow-lift lg:hidden"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.22 }}
            >
              <nav aria-label="Mobile navigation" className="container-page py-4">
                <ul className="space-y-1">
                  {mainNav.map((item) => {
                    const active = isActive(pathname, item.href);
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          aria-current={active ? "page" : undefined}
                          className={cn(
                            "flex items-center justify-between rounded-xl px-4 py-3 text-base font-semibold",
                            active ? "bg-brand-50 text-brand" : "text-navy hover:bg-navy-50",
                          )}
                        >
                          {item.label}
                          <ArrowRight className="h-4 w-4 opacity-50" aria-hidden="true" />
                        </Link>
                      </li>
                    );
                  })}
                </ul>
                <div className="mt-4 grid gap-2 border-t border-line pt-4 sm:grid-cols-2">
                  <ButtonLink href="/admission" variant="accent" size="lg" className="w-full">
                    ভর্তি চলছে
                  </ButtonLink>
                  <ButtonLink href="/login" variant="outline" size="lg" className="w-full">
                    <LogIn className="h-4 w-4" aria-hidden="true" />
                    Login
                  </ButtonLink>
                  <a
                    href={whatsappLink(defaultWhatsAppMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-full py-3 text-sm font-semibold text-[#128C4B] sm:col-span-2"
                  >
                    <WhatsAppIcon className="h-5 w-5" />
                    WhatsApp-এ কথা বলুন
                  </a>
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
