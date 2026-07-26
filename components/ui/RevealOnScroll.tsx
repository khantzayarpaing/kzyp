"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

interface RevealOnScrollProps {
  children: ReactNode;
  className?: string;
  delayMs?: number;
}

/**
 * Fades and slides its children up as they enter the viewport.
 * Under `prefers-reduced-motion` the content appears without the transition
 * (see the `motion-reduce:` utility and the reduced-motion rules in globals.css).
 */
export function RevealOnScroll({
  children,
  className = "",
  delayMs = 0,
}: RevealOnScrollProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );

    observer.observe(element);

    // A jump (anchor link, restored scroll position) can move content past the
    // viewport without the observer ever reporting an intersection, so reveal
    // anything already at or above the fold on the next frame.
    const frame = requestAnimationFrame(() => {
      if (element.getBoundingClientRect().top < window.innerHeight) {
        setIsVisible(true);
        observer.disconnect();
      }
    });

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delayMs}ms` }}
      className={`motion-safe:transition-all motion-safe:duration-700 motion-safe:ease-out ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 motion-safe:translate-y-6 motion-reduce:opacity-100"
      } ${className}`}
    >
      {children}
    </div>
  );
}
