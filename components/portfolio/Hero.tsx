import Image from "next/image";
import { portfolioConfig } from "@/config/portfolio";
import { Button } from "@/components/ui/Button";
import { SocialLinks } from "@/components/ui/SocialLinks";

export function Hero() {
  const { personal, primaryCta, secondaryCta } = portfolioConfig;

  return (
    <section id="top" className="bg-white pb-20 pt-16 md:pb-28 md:pt-24">
      <div className="mx-auto grid max-w-[1024px] items-center gap-12 px-6 md:grid-cols-[1.15fr_1fr] md:gap-16 md:px-8">
        <div>
          <p className="text-sm font-medium tracking-wide text-[#6e6e73] md:text-base">
            {personal.title}
          </p>
          <h1 className="mt-4 text-[2.75rem] font-semibold leading-[1.05] tracking-[-0.02em] text-[#1d1d1f] sm:text-6xl md:text-[4.25rem]">
            {personal.name}
          </h1>
          <p className="mt-6 max-w-xl text-2xl font-medium leading-snug tracking-tight text-[#1d1d1f] md:text-3xl">
            {personal.heroTagline}
          </p>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-[#6e6e73]">
            {personal.heroSupportingMessage}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Button href="#contact">{primaryCta}</Button>
            <Button href="#work" variant="secondary">
              {secondaryCta}
            </Button>
          </div>

          <SocialLinks className="mt-9" />
        </div>

        <div className="order-first md:order-last">
          <div className="relative mx-auto aspect-square w-full max-w-[360px] overflow-hidden rounded-3xl bg-[#f5f5f7] md:max-w-none">
            <Image
              src={personal.headshot}
              alt={personal.headshotAlt}
              fill
              sizes="(min-width: 768px) 420px, 90vw"
              loading="eager"
              fetchPriority="high"
              className="object-cover object-top"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
