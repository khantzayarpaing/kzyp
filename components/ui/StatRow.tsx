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
      {/* Reversed so each value reads above its label while `dt` stays first in the DOM. */}
      {stats.map((stat) => (
        <div key={stat.label} className="flex flex-col-reverse">
          <dt
            className={`mt-2 text-sm leading-snug ${
              isDark ? "text-white/70" : "text-[#6e6e73]"
            }`}
          >
            {stat.label}
          </dt>
          <dd
            className={`text-3xl font-semibold tracking-tight md:text-4xl ${
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
