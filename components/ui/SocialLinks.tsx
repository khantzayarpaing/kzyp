import { Mail } from "lucide-react";
import { portfolioConfig } from "@/config/portfolio";
import { LinkedInIcon } from "@/components/ui/icons/LinkedInIcon";

interface SocialLinksProps {
  tone?: "light" | "dark";
  className?: string;
}

export function SocialLinks({ tone = "light", className = "" }: SocialLinksProps) {
  const { email, linkedin } = portfolioConfig.personal.contact;

  const itemClasses =
    tone === "dark"
      ? "border-white/20 text-white hover:border-white/50 hover:bg-white/10 focus-visible:ring-white focus-visible:ring-offset-black"
      : "border-[#d2d2d7] text-[#1d1d1f] hover:border-[#0071e3] hover:text-[#0071e3] focus-visible:ring-[#0071e3] focus-visible:ring-offset-white";

  const base = `inline-flex h-11 w-11 items-center justify-center rounded-full border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${itemClasses}`;

  return (
    <ul className={`flex items-center gap-3 ${className}`}>
      <li>
        <a
          href={linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className={base}
          aria-label="LinkedIn profile (opens in a new tab)"
        >
          <LinkedInIcon className="h-[18px] w-[18px]" />
        </a>
      </li>
      <li>
        <a href={`mailto:${email}`} className={base} aria-label={`Email ${email}`}>
          <Mail className="h-5 w-5" aria-hidden="true" />
        </a>
      </li>
    </ul>
  );
}
