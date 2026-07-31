import type { CSSProperties } from "react";
import { portfolioConfig } from "@/config/portfolio";
import { toolLogos } from "@/components/ui/icons/tool-logos";
import { ToolLogo, ToolMonogram } from "@/components/ui/icons/ToolLogo";
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
                key={tool.name}
                style={
                  tool.logo
                    ? ({
                        "--brand": toolLogos[tool.logo].hex,
                      } as CSSProperties)
                    : undefined
                }
                className="group flex items-center gap-2.5 rounded-xl border border-[#d2d2d7] bg-[#f5f5f7] px-3.5 py-3 text-sm font-medium text-[#1d1d1f] transition-colors hover:border-[#1d1d1f]/20"
              >
                {tool.logo ? (
                  <ToolLogo
                    id={tool.logo}
                    className="h-[18px] w-[18px] shrink-0 text-[#6e6e73] transition-colors group-hover:text-(--brand)"
                  />
                ) : (
                  <ToolMonogram
                    name={tool.name}
                    className="h-[18px] w-[18px] shrink-0 text-[#6e6e73]"
                  />
                )}
                <span className="truncate">{tool.name}</span>
              </li>
            ))}
          </ul>
        </RevealOnScroll>
      </div>
    </Section>
  );
}
