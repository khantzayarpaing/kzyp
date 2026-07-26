"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { portfolioConfig } from "@/config/portfolio";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { navigation, primaryCta } = portfolioConfig;
  const { name, monogram } = portfolioConfig.personal;

  // Close the mobile menu on Escape so keyboard users are never trapped.
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const linkClasses =
    "rounded-md px-1 py-1 text-sm font-medium text-[#1d1d1f] transition-colors hover:text-[#0071e3] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0071e3] focus-visible:ring-offset-2";

  return (
    <header className="sticky top-0 z-50 border-b border-[#d2d2d7]/60 bg-white/72 backdrop-blur-xl backdrop-saturate-150">
      <div className="mx-auto flex h-14 max-w-[1024px] items-center justify-between px-6 md:h-16 md:px-8">
        <a
          href="#top"
          className="rounded-md text-base font-semibold tracking-tight text-[#1d1d1f] transition-colors hover:text-[#0071e3] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0071e3] focus-visible:ring-offset-2"
        >
          <span className="hidden sm:inline">{name}</span>
          <span className="sm:hidden">{monogram}</span>
        </a>

        <nav aria-label="Main" className="hidden items-center gap-8 md:flex">
          {navigation.map((item) => (
            <a key={item.href} href={item.href} className={linkClasses}>
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            className="rounded-full bg-[#0071e3] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#0077ed] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0071e3] focus-visible:ring-offset-2"
          >
            {primaryCta}
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          className="-mr-1 rounded-md p-1.5 text-[#1d1d1f] transition-colors hover:text-[#0071e3] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0071e3] focus-visible:ring-offset-2 md:hidden"
        >
          {isOpen ? (
            <X className="h-6 w-6" aria-hidden="true" />
          ) : (
            <Menu className="h-6 w-6" aria-hidden="true" />
          )}
        </button>
      </div>

      {isOpen && (
        <nav
          id="mobile-menu"
          aria-label="Mobile"
          className="border-t border-[#d2d2d7] bg-white px-6 pb-6 pt-2 md:hidden"
        >
          <ul className="flex flex-col">
            {navigation.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="block border-b border-[#d2d2d7]/60 py-3.5 text-base font-medium text-[#1d1d1f] transition-colors hover:text-[#0071e3] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0071e3]"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#contact"
            onClick={() => setIsOpen(false)}
            className="mt-5 block rounded-full bg-[#0071e3] py-3 text-center text-sm font-medium text-white transition-colors hover:bg-[#0077ed] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0071e3] focus-visible:ring-offset-2"
          >
            {primaryCta}
          </a>
        </nav>
      )}
    </header>
  );
}
