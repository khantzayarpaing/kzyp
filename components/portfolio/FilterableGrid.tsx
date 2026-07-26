"use client";

import { useMemo, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import {
  projectCategories,
  type ProjectCategory,
  type ProjectItem,
} from "@/config/portfolio";

type Filter = "All" | ProjectCategory;

interface FilterableGridProps {
  projects: ProjectItem[];
}

export function FilterableGrid({ projects }: FilterableGridProps) {
  const [activeFilter, setActiveFilter] = useState<Filter>("All");

  const filters: Filter[] = ["All", ...projectCategories];

  const visibleProjects = useMemo(
    () =>
      activeFilter === "All"
        ? projects
        : projects.filter((project) =>
            project.categories.includes(activeFilter),
          ),
    [projects, activeFilter],
  );

  return (
    <div>
      <div
        role="group"
        aria-label="Filter projects by category"
        className="flex flex-wrap gap-2"
      >
        {filters.map((filter) => {
          const isActive = filter === activeFilter;
          return (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              aria-pressed={isActive}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0071e3] focus-visible:ring-offset-2 ${
                isActive
                  ? "border-[#1d1d1f] bg-[#1d1d1f] text-white"
                  : "border-[#d2d2d7] bg-white text-[#1d1d1f] hover:border-[#1d1d1f]"
              }`}
            >
              {filter}
            </button>
          );
        })}
      </div>

      <ul className="mt-10 grid gap-5 md:grid-cols-2 md:gap-6">
        {visibleProjects.map((project) => (
          <li key={project.id} className="h-full">
            <article className="flex h-full flex-col rounded-2xl border border-[#d2d2d7] bg-white p-6 transition-colors hover:border-[#1d1d1f] md:p-8">
              <p className="text-sm font-medium text-[#6e6e73]">
                {project.brand} · {project.period}
              </p>
              <h3 className="mt-2 text-xl font-semibold leading-snug tracking-tight text-[#1d1d1f]">
                {project.title}
              </h3>
              <p className="mt-3 flex-1 leading-relaxed text-[#6e6e73]">
                {project.role}
              </p>

              <ul className="mt-5 flex flex-wrap gap-2">
                {project.categories.map((category) => (
                  <li
                    key={category}
                    className="rounded-full bg-[#f5f5f7] px-3 py-1 text-xs font-medium text-[#6e6e73]"
                  >
                    {category}
                  </li>
                ))}
              </ul>

              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-1 self-start rounded-md text-sm font-medium text-[#0071e3] transition-colors hover:text-[#0077ed] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0071e3] focus-visible:ring-offset-2"
                >
                  View project
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              )}
            </article>
          </li>
        ))}
      </ul>

      <p aria-live="polite" className="mt-6 text-sm text-[#6e6e73]">
        Showing {visibleProjects.length} of {projects.length} projects
      </p>
    </div>
  );
}
