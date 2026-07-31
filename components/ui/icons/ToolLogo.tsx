import { toolLogos, type ToolLogoId } from "@/components/ui/icons/tool-logos";

interface ToolLogoProps {
  id: ToolLogoId;
  className?: string;
}

/**
 * Renders a brand mark monochrome, letting the parent tint it on hover via
 * `currentColor`. Decorative: the tool name is always rendered alongside it.
 */
export function ToolLogo({ id, className = "" }: ToolLogoProps) {
  const logo = toolLogos[id];

  return (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path d={logo.path} />
    </svg>
  );
}

/** Fallback tile mark for tools with no licensed logo available. */
export function ToolMonogram({
  name,
  className = "",
}: {
  name: string;
  className?: string;
}) {
  const initials = name
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  return (
    <span
      aria-hidden="true"
      className={`inline-flex items-center justify-center rounded-md bg-current/10 text-[0.7rem] font-semibold tracking-tight ${className}`}
    >
      {initials}
    </span>
  );
}
