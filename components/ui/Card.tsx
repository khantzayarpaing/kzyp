import type { ReactNode } from "react";

type CardTone = "light" | "alt" | "dark";

interface CardProps {
  tone?: CardTone;
  className?: string;
  children: ReactNode;
}

const toneClasses: Record<CardTone, string> = {
  light: "bg-white border-[#d2d2d7]",
  alt: "bg-[#f5f5f7] border-[#d2d2d7]/70",
  dark: "bg-white/5 border-white/15 text-white",
};

export function Card({ tone = "light", className = "", children }: CardProps) {
  return (
    <div
      className={`rounded-2xl border p-6 md:p-8 ${toneClasses[tone]} ${className}`}
    >
      {children}
    </div>
  );
}
