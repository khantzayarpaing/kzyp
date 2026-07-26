import { portfolioConfig } from "@/config/portfolio";

export function Footer() {
  const { personal, footer } = portfolioConfig;
  const { email, linkedin, location } = personal.contact;
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[#d2d2d7] bg-white py-12 md:py-16">
      <div className="mx-auto max-w-[1024px] px-6 md:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-base font-semibold tracking-tight text-[#1d1d1f]">
              {personal.name}
            </p>
            <p className="mt-1 text-sm text-[#6e6e73]">{personal.title}</p>
            <p className="mt-3 max-w-sm text-sm text-[#6e6e73]">
              {footer.tagline}
            </p>
          </div>

          <ul className="space-y-2 text-sm text-[#6e6e73]">
            <li>
              <a
                href={`mailto:${email}`}
                className="rounded-md transition-colors hover:text-[#0071e3] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0071e3] focus-visible:ring-offset-2"
              >
                {email}
              </a>
            </li>
            <li>
              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md transition-colors hover:text-[#0071e3] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0071e3] focus-visible:ring-offset-2"
              >
                LinkedIn
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
            <li>{location}</li>
          </ul>
        </div>

        <p className="mt-10 border-t border-[#d2d2d7] pt-6 text-sm text-[#6e6e73]">
          © {year} {personal.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
