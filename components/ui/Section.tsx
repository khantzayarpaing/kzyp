import type { ReactNode } from "react";

export type SectionVariant = "light" | "alt" | "dark";

interface SectionProps {
  id?: string;
  variant?: SectionVariant;
  className?: string;
  containerClassName?: string;
  /** Section heading rendered as an <h2>. Omit for sections that supply their own. */
  heading?: string;
  eyebrow?: string;
  description?: string;
  children: ReactNode;
}

const variantClasses: Record<SectionVariant, string> = {
  light: "bg-white text-[#1d1d1f]",
  alt: "bg-[#f5f5f7] text-[#1d1d1f]",
  dark: "bg-black text-white",
};

export function Section({
  id,
  variant = "light",
  className = "",
  containerClassName = "",
  heading,
  eyebrow,
  description,
  children,
}: SectionProps) {
  const isDark = variant === "dark";

  return (
    <section
      id={id}
      className={`scroll-mt-20 py-20 md:py-28 ${variantClasses[variant]} ${className}`}
    >
      <div
        className={`mx-auto w-full max-w-[1024px] px-6 md:px-8 ${containerClassName}`}
      >
        {(eyebrow || heading || description) && (
          <div className="mb-12 md:mb-16">
            {eyebrow && (
              <p
                className={`mb-3 text-sm font-medium tracking-wide ${
                  isDark ? "text-white/70" : "text-[#6e6e73]"
                }`}
              >
                {eyebrow}
              </p>
            )}
            {heading && (
              <h2 className="text-3xl font-semibold tracking-tight md:text-5xl md:leading-[1.08]">
                {heading}
              </h2>
            )}
            {description && (
              <p
                className={`mt-4 max-w-2xl text-lg leading-relaxed ${
                  isDark ? "text-white/80" : "text-[#6e6e73]"
                }`}
              >
                {description}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
