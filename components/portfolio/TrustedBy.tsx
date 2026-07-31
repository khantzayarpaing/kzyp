import { portfolioConfig } from "@/config/portfolio";
import { Section } from "@/components/ui/Section";
import { BrandMarquee } from "@/components/ui/BrandMarquee";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

export function TrustedBy() {
  const { brands } = portfolioConfig;

  return (
    <Section
      variant="alt"
      className="py-16 md:py-20"
      // The marquee runs edge to edge; the heading keeps the normal container.
      containerClassName="max-w-none px-0"
    >
      <RevealOnScroll>
        <h2 className="mx-auto max-w-[1024px] px-6 text-center text-sm font-medium tracking-wide text-[#6e6e73] md:px-8 md:text-base">
          {brands.heading}
        </h2>
        <BrandMarquee brands={brands.items} className="mt-8" />
      </RevealOnScroll>
    </Section>
  );
}
