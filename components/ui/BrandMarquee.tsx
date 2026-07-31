import Image from "next/image";
import type { Brand } from "@/config/portfolio";

interface BrandMarqueeProps {
  brands: Brand[];
  className?: string;
}

function BrandItem({ brand }: { brand: Brand }) {
  if (brand.logo) {
    return (
      <li className="shrink-0">
        <Image
          src={brand.logo}
          alt={brand.name}
          width={120}
          height={40}
          className="h-8 w-auto object-contain opacity-60 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0 md:h-9"
        />
      </li>
    );
  }

  return (
    <li className="shrink-0 rounded-full border border-[#d2d2d7] bg-white px-5 py-2.5 text-sm font-medium tracking-tight whitespace-nowrap text-[#6e6e73] md:text-base">
      {brand.name}
    </li>
  );
}

/**
 * Continuously scrolling "worked with" row.
 *
 * The list is rendered twice and the track translated by exactly -50%, so the
 * second copy lands where the first began and the loop is seamless. The copy is
 * hidden from assistive tech to avoid announcing every brand twice.
 *
 * Under `prefers-reduced-motion` the animation is suppressed (see globals.css)
 * and the row falls back to a centred, wrapping list.
 */
export function BrandMarquee({ brands, className = "" }: BrandMarqueeProps) {
  return (
    <div
      className={`marquee relative overflow-hidden ${className}`}
      // Fade the row into the section background at both edges.
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
      }}
    >
      {/*
        No gap on the track: each copy carries its own trailing gap as padding
        so both halves are exactly equal in width. A gap between the copies
        would make -50% land half a gap short and the loop would visibly jump.
      */}
      <div className="marquee-track flex w-max">
        <ul className="flex shrink-0 items-center gap-3 pe-3">
          {brands.map((brand) => (
            <BrandItem key={brand.name} brand={brand} />
          ))}
        </ul>
        <ul aria-hidden="true" className="flex shrink-0 items-center gap-3 pe-3">
          {brands.map((brand) => (
            <BrandItem key={`${brand.name}-duplicate`} brand={brand} />
          ))}
        </ul>
      </div>
    </div>
  );
}
