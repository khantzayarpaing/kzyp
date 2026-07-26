import { portfolioConfig } from "@/config/portfolio";
import { Section } from "@/components/ui/Section";
import { BrandRow } from "@/components/ui/BrandRow";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

export function TrustedBy() {
  const { brands } = portfolioConfig;

  return (
    <Section variant="alt" className="py-16 md:py-20">
      <RevealOnScroll>
        <h2 className="text-center text-sm font-medium tracking-wide text-[#6e6e73] md:text-base">
          {brands.heading}
        </h2>
        <BrandRow brands={brands.items} className="mt-8" />
      </RevealOnScroll>
    </Section>
  );
}
