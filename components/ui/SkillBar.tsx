"use client";

import { useEffect, useRef, useState } from "react";

interface SkillBarProps {
  name: string;
  proficiency: number;
}

export function SkillBar({ name, proficiency }: SkillBarProps) {
  const [width, setWidth] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }

    // The fill transition is suppressed under prefers-reduced-motion, so the
    // bar simply snaps to its value when it scrolls into view.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setWidth(proficiency);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(element);

    // Fill immediately if the bar is already at or above the fold (e.g. after
    // an anchor jump), which the observer would otherwise never report.
    const frame = requestAnimationFrame(() => {
      if (element.getBoundingClientRect().top < window.innerHeight) {
        setWidth(proficiency);
        observer.disconnect();
      }
    });

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [proficiency]);

  return (
    <div ref={ref} className="space-y-2.5">
      <div className="flex items-baseline justify-between text-sm">
        <span className="font-medium text-[#1d1d1f]">{name}</span>
        <span className="text-[#6e6e73]">{proficiency}%</span>
      </div>
      <div
        className="h-1.5 w-full overflow-hidden rounded-full bg-[#d2d2d7]"
        role="meter"
        aria-label={name}
        aria-valuenow={proficiency}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          style={{ width: `${width}%` }}
          className="h-full rounded-full bg-[#0071e3] motion-safe:transition-[width] motion-safe:duration-1000 motion-safe:ease-out"
        />
      </div>
    </div>
  );
}
