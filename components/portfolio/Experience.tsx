import { portfolioConfig } from "@/config/portfolio";
import { Section } from "@/components/ui/Section";
import { Timeline, type TimelineEntry } from "@/components/ui/Timeline";

export function Experience() {
  const { experience } = portfolioConfig;

  const entries: TimelineEntry[] = experience.items.map((item) => ({
    id: `${item.company}-${item.period}`,
    period: item.period,
    title: item.role,
    subtitle: `${item.company} — ${item.location}`,
    body: (
      <>
        <p className="leading-relaxed text-[#6e6e73]">{item.summary}</p>
        <ul className="mt-4 space-y-2.5">
          {item.achievements.map((achievement) => (
            <li
              key={achievement}
              className="relative pl-5 leading-relaxed text-[#6e6e73]"
            >
              <span
                className="absolute left-0 top-[0.6em] h-1.5 w-1.5 rounded-full bg-[#d2d2d7]"
                aria-hidden="true"
              />
              {achievement}
            </li>
          ))}
        </ul>
      </>
    ),
  }));

  return (
    <Section id="experience" variant="alt" heading={experience.heading}>
      <Timeline entries={entries} />
    </Section>
  );
}
