import { portfolioConfig } from "@/config/portfolio";
import { Section } from "@/components/ui/Section";
import { SkillBar } from "@/components/ui/SkillBar";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

export function SkillsAndTools() {
  const { skills } = portfolioConfig;

  return (
    <Section heading={skills.heading}>
      <div className="grid gap-14 md:grid-cols-2 md:gap-16">
        <RevealOnScroll className="space-y-7">
          {skills.items.map((skill) => (
            <SkillBar
              key={skill.name}
              name={skill.name}
              proficiency={skill.proficiency}
            />
          ))}
        </RevealOnScroll>

        <RevealOnScroll delayMs={80}>
          <h3 className="text-sm font-medium tracking-wide text-[#6e6e73]">
            {skills.stackHeading}
          </h3>
          <ul className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-2">
            {skills.stack.map((tool) => (
              <li
                key={tool}
                className="rounded-xl border border-[#d2d2d7] bg-[#f5f5f7] px-4 py-3 text-sm font-medium text-[#1d1d1f]"
              >
                {tool}
              </li>
            ))}
          </ul>
        </RevealOnScroll>
      </div>
    </Section>
  );
}
