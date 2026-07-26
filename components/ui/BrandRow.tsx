interface BrandRowProps {
  brands: string[];
  className?: string;
}

/**
 * Brand names rendered as tidy monochrome text chips.
 * Text is used deliberately — no third-party logo assets are bundled.
 */
export function BrandRow({ brands, className = "" }: BrandRowProps) {
  return (
    <ul
      className={`flex flex-wrap items-center justify-center gap-x-3 gap-y-3 ${className}`}
    >
      {brands.map((brand) => (
        <li
          key={brand}
          className="rounded-full border border-[#d2d2d7] bg-white px-5 py-2.5 text-sm font-medium tracking-tight text-[#6e6e73] md:text-base"
        >
          {brand}
        </li>
      ))}
    </ul>
  );
}
