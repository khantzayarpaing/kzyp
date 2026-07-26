import Image from "next/image";
import { portfolioConfig } from "@/config/portfolio";
import { Section } from "@/components/ui/Section";
import { StatRow } from "@/components/ui/StatRow";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

export function About() {
  const { personal, about } = portfolioConfig;

  return (
    <Section id="about" heading={about.heading}>
      <div className="grid gap-10 md:grid-cols-[1fr_240px] md:gap-14">
        <RevealOnScroll className="space-y-5">
          {personal.aboutParagraphs.map((paragraph) => (
            <p
              key={paragraph.slice(0, 32)}
              className="text-lg leading-relaxed text-[#6e6e73]"
            >
              {paragraph}
            </p>
          ))}
        </RevealOnScroll>

        <RevealOnScroll delayMs={80} className="order-first md:order-last">
          <div className="relative mx-auto aspect-square w-40 overflow-hidden rounded-full bg-[#f5f5f7] md:w-full">
            <Image
              src={personal.headshot}
              alt={personal.headshotAlt}
              fill
              sizes="(min-width: 768px) 240px, 160px"
              className="object-cover object-top"
            />
          </div>
        </RevealOnScroll>
      </div>

      <RevealOnScroll delayMs={120}>
        <StatRow
          stats={personal.stats}
          className="mt-14 border-t border-[#d2d2d7] pt-10 md:mt-16"
        />
      </RevealOnScroll>
    </Section>
  );
}
