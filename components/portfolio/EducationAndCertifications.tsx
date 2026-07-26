import { portfolioConfig } from "@/config/portfolio";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Timeline, type TimelineEntry } from "@/components/ui/Timeline";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

export function EducationAndCertifications() {
  const { education } = portfolioConfig;

  const entries: TimelineEntry[] = education.items.map((item) => ({
    id: item.institution,
    period: item.period || undefined,
    title: item.qualification,
    subtitle: item.institution,
    body: item.details ? (
      <p className="leading-relaxed text-[#6e6e73]">{item.details}</p>
    ) : undefined,
  }));

  return (
    <Section heading={education.heading}>
      <div className="grid gap-14 md:grid-cols-2 md:gap-16">
        <div>
          <h3 className="mb-8 text-sm font-medium tracking-wide text-[#6e6e73]">
            {education.educationHeading}
          </h3>
          <Timeline entries={entries} />
        </div>

        <div>
          <h3 className="mb-8 text-sm font-medium tracking-wide text-[#6e6e73]">
            {education.certificationsHeading}
          </h3>
          <ul className="space-y-4">
            {education.certifications.map((certification, index) => (
              <li key={certification.name}>
                <RevealOnScroll delayMs={index * 50}>
                  <Card tone="alt" className="p-5 md:p-6">
                    <h4 className="font-semibold tracking-tight text-[#1d1d1f]">
                      {certification.name}
                    </h4>
                    <p className="mt-1 text-sm text-[#6e6e73]">
                      {certification.issuer} · {certification.year}
                    </p>
                  </Card>
                </RevealOnScroll>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
