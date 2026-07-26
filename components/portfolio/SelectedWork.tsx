import { portfolioConfig } from "@/config/portfolio";
import { Section } from "@/components/ui/Section";
import { FilterableGrid } from "@/components/portfolio/FilterableGrid";

export function SelectedWork() {
  const { work } = portfolioConfig;

  return (
    <Section id="work" heading={work.heading}>
      <FilterableGrid projects={work.items} />
    </Section>
  );
}
