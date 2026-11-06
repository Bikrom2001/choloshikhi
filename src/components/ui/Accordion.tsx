"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useId, useState } from "react";
import type { FAQItem } from "@/types";
import { cn } from "@/lib/utils";

interface AccordionProps {
  items: FAQItem[];
  /** Index opened by default; -1 for none */
  defaultOpen?: number;
  /** Allow several panels open at once */
  multiple?: boolean;
  className?: string;
}

export function Accordion({ items, defaultOpen = 0, multiple = false, className }: AccordionProps) {
  const baseId = useId();
  const [open, setOpen] = useState<number[]>(defaultOpen >= 0 ? [defaultOpen] : []);

  const toggle = (index: number) => {
    setOpen((prev) => {
      const isOpen = prev.includes(index);
      if (isOpen) return prev.filter((i) => i !== index);
      return multiple ? [...prev, index] : [index];
    });
  };

  return (
    <div className={cn("space-y-3", className)}>
      {items.map((item, index) => {
        const isOpen = open.includes(index);
        const buttonId = `${baseId}-btn-${index}`;
        const panelId = `${baseId}-panel-${index}`;
        return (
          <div
            key={item.question}
            className={cn(
              "overflow-hidden rounded-2xl border bg-white transition-colors",
              isOpen ? "border-brand-200 shadow-soft" : "border-line hover:border-navy-200",
            )}
          >
            <h3 className="text-base">
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(index)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-sans text-[1.02rem] font-semibold text-navy sm:px-6"
              >
                <span>{item.question}</span>
                <span
                  className={cn(
                    "grid h-8 w-8 shrink-0 place-items-center rounded-full transition-all duration-300",
                    isOpen ? "rotate-180 bg-brand text-white" : "bg-navy-50 text-navy",
                  )}
                >
                  <ChevronDown className="h-4 w-4" aria-hidden="true" />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.28, ease: "easeOut" }}
                >
                  <p className="px-5 pb-5 leading-7 text-muted sm:px-6">{item.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
