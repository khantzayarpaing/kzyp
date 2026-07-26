import { portfolioConfig } from "@/config/portfolio";
import { Button } from "@/components/ui/Button";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

export function ClosingCta() {
  const { closingCta, primaryCta, personal } = portfolioConfig;

  return (
    <section className="bg-black py-24 text-white md:py-32">
      <div className="mx-auto max-w-[1024px] px-6 text-center md:px-8">
        <RevealOnScroll>
          <h2 className="mx-auto max-w-3xl text-3xl font-semibold leading-tight tracking-tight md:text-5xl md:leading-[1.1]">
            {closingCta.heading}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-white/70">
            {closingCta.supportingMessage}
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Button href="#contact" variant="onDark">
              {primaryCta}
            </Button>
            <Button
              href={`mailto:${personal.contact.email}`}
              variant="ghostOnDark"
            >
              {personal.contact.email}
            </Button>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
