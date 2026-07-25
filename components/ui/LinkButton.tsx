import Link from "next/link";
import { type ComponentProps, type ReactNode } from "react";

type LinkVariant = "primary" | "secondary";

interface LinkButtonProps extends ComponentProps<typeof Link> {
  variant?: LinkVariant;
  children: ReactNode;
}

const variantClasses: Record<LinkVariant, string> = {
  primary:
    "bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-600",
  secondary:
    "border border-blue-600 text-blue-700 hover:bg-blue-50 focus-visible:ring-blue-600",
};

export function LinkButton({
  href,
  variant = "primary",
  className = "",
  children,
  ...props
}: LinkButtonProps) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center rounded-lg px-5 py-2.5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
}
