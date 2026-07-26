import { portfolioConfig } from "@/config/portfolio";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

export function Expertise() {
  const { services } = portfolioConfig;

  return (
    <Section id="expertise" variant="alt" heading={services.heading}>
      <ul className="grid gap-5 md:grid-cols-2 md:gap-6">
        {services.items.map((service, index) => (
          <li key={service.id} className="h-full">
            <RevealOnScroll delayMs={index * 60} className="h-full">
              <Card className="h-full">
                <h3 className="text-xl font-semibold tracking-tight text-[#1d1d1f]">
                  {service.title}
                </h3>
                <p className="mt-3 leading-relaxed text-[#6e6e73]">
                  {service.description}
                </p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {service.tools.map((tool) => (
                    <li
                      key={tool}
                      className="rounded-full border border-[#d2d2d7] px-3 py-1 text-xs font-medium text-[#6e6e73]"
                    >
                      {tool}
                    </li>
                  ))}
                </ul>
              </Card>
            </RevealOnScroll>
          </li>
        ))}
      </ul>
    </Section>
  );
}
