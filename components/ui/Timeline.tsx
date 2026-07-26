import type { ReactNode } from "react";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

export interface TimelineEntry {
  id: string;
  title: string;
  subtitle?: string;
  meta?: string;
  period?: string;
  body?: ReactNode;
}

interface TimelineProps {
  entries: TimelineEntry[];
  className?: string;
}

export function Timeline({ entries, className = "" }: TimelineProps) {
  return (
    <ol className={`relative space-y-12 ${className}`}>
      {entries.map((entry, index) => (
        <li key={entry.id} className="relative pl-8 md:pl-10">
          <span
            className="absolute left-0 top-2 h-2.5 w-2.5 rounded-full bg-[#0071e3]"
            aria-hidden="true"
          />
          {index < entries.length - 1 && (
            <span
              className="absolute left-[4.5px] top-6 h-[calc(100%+1.5rem)] w-px bg-[#d2d2d7]"
              aria-hidden="true"
            />
          )}
          <RevealOnScroll delayMs={index * 60}>
            {entry.period && (
              <p className="text-sm font-medium text-[#6e6e73]">{entry.period}</p>
            )}
            <h3 className="mt-1 text-xl font-semibold tracking-tight text-[#1d1d1f] md:text-2xl">
              {entry.title}
            </h3>
            {entry.subtitle && (
              <p className="mt-1 text-base font-medium text-[#1d1d1f]">
                {entry.subtitle}
              </p>
            )}
            {entry.meta && (
              <p className="mt-1 text-sm text-[#6e6e73]">{entry.meta}</p>
            )}
            {entry.body && <div className="mt-4">{entry.body}</div>}
          </RevealOnScroll>
        </li>
      ))}
    </ol>
  );
}
