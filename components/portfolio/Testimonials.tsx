import { portfolioConfig } from "@/config/portfolio";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

/**
 * Renders nothing until real, attributable quotes are added to
 * `portfolioConfig.testimonials.items`. Quotes are never fabricated, and
 * reference contact details are never published.
 */
export function Testimonials() {
  const { testimonials } = portfolioConfig;

  if (testimonials.items.length === 0) {
    return null;
  }

  return (
    <Section variant="alt" heading={testimonials.heading}>
      <ul className="grid gap-5 md:grid-cols-2 md:gap-6">
        {testimonials.items.map((testimonial, index) => (
          <li key={testimonial.author} className="h-full">
            <RevealOnScroll delayMs={index * 60} className="h-full">
              <Card className="h-full">
                <blockquote className="text-lg leading-relaxed text-[#1d1d1f]">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
                <footer className="mt-5 text-sm text-[#6e6e73]">
                  <span className="font-medium text-[#1d1d1f]">
                    {testimonial.author}
                  </span>
                  {" · "}
                  {testimonial.role}
                </footer>
              </Card>
            </RevealOnScroll>
          </li>
        ))}
      </ul>
    </Section>
  );
}
