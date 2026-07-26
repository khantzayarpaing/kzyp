import type { Stat } from "@/config/portfolio";

interface StatRowProps {
  stats: Stat[];
  tone?: "light" | "dark";
  className?: string;
}

export function StatRow({ stats, tone = "light", className = "" }: StatRowProps) {
  const isDark = tone === "dark";

  return (
    <dl
      className={`grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-4 ${className}`}
    >
      {/*
        Reversed so each value reads above its label while `dt` stays first in
        the DOM. `justify-end` is main-axis end under column-reverse, i.e. the
        top — without it the pair sits at the bottom of the grid row and a label
        that wraps to two lines drags its value out of line with the others.
      */}
      {stats.map((stat) => (
        <div key={stat.label} className="flex flex-col-reverse justify-end">
          <dt
            className={`mt-2 text-sm leading-snug ${
              isDark ? "text-white/70" : "text-[#6e6e73]"
            }`}
          >
            {stat.label}
          </dt>
          <dd
            // Holds at 3xl through the four-up md columns, where 4xl would wrap
            // a longer value like "THB 2M+" onto a second line.
            className={`text-3xl font-semibold tracking-tight lg:text-4xl ${
              isDark ? "text-white" : "text-[#1d1d1f]"
            }`}
          >
            {stat.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
