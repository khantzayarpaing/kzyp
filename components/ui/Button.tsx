import type { ReactNode } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export type ButtonVariant = "primary" | "secondary" | "onDark" | "ghostOnDark";

interface BaseProps {
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
  /** Shows a trailing chevron — used on the secondary/text style. */
  withChevron?: boolean;
}

interface ButtonAsButton extends BaseProps {
  href?: undefined;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
}

interface ButtonAsLink extends BaseProps {
  href: string;
  type?: never;
  onClick?: () => void;
  disabled?: never;
}

type ButtonProps = ButtonAsButton | ButtonAsLink;

const baseStyles =
  "inline-flex items-center justify-center gap-1 rounded-full px-6 py-3 text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 md:text-base";

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-[#0071e3] text-white hover:bg-[#0077ed] focus-visible:ring-[#0071e3] focus-visible:ring-offset-white",
  secondary:
    "text-[#0071e3] hover:bg-[#0071e3]/8 focus-visible:ring-[#0071e3] focus-visible:ring-offset-white",
  onDark:
    "bg-white text-black hover:bg-white/90 focus-visible:ring-white focus-visible:ring-offset-black",
  ghostOnDark:
    "text-white hover:bg-white/10 focus-visible:ring-white focus-visible:ring-offset-black",
};

export function Button(props: ButtonProps) {
  const {
    children,
    variant = "primary",
    className = "",
    withChevron = variant === "secondary" || variant === "ghostOnDark",
  } = props;

  const classes = `${baseStyles} ${variantStyles[variant]} ${className}`;

  const content = (
    <>
      <span>{children}</span>
      {withChevron && <ChevronRight className="h-4 w-4" aria-hidden="true" />}
    </>
  );

  if (props.href !== undefined) {
    return (
      <Link href={props.href} onClick={props.onClick} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={props.type ?? "button"}
      onClick={props.onClick}
      disabled={props.disabled}
      className={classes}
    >
      {content}
    </button>
  );
}
