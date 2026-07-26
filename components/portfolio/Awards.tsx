import { Award } from "lucide-react";
import { portfolioConfig } from "@/config/portfolio";
import { Section } from "@/components/ui/Section";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

export function Awards() {
  const { awards } = portfolioConfig;

  return (
    <Section variant="dark" heading={awards.heading}>
      <ul className="divide-y divide-white/15 border-t border-white/15">
        {awards.items.map((award, index) => (
          <li key={`${award.result}-${award.category}`}>
            <RevealOnScroll delayMs={index * 50}>
              <div className="flex items-start gap-4 py-6">
                <Award
                  className="mt-0.5 h-5 w-5 shrink-0 text-white/60"
                  aria-hidden="true"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold tracking-tight text-white md:text-xl">
                    {award.result} — {award.category}
                  </h3>
                  <p className="mt-1 text-sm text-white/70">
                    {award.organization} · {award.year}
                  </p>
                </div>
              </div>
            </RevealOnScroll>
          </li>
        ))}
      </ul>
    </Section>
  );
}
