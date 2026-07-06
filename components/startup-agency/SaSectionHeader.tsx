import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SaSectionHeaderProps = {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: string;
  align?: "left" | "center";
  /** `page` for H1 heroes; `section` for H2 blocks; `display` for rare uppercase labels */
  size?: "section" | "page" | "display";
  /** Hero intros use `lead` (16–17px); section intros use `subtitle` (14–15px) */
  subtitleVariant?: "lead" | "subtitle";
  as?: "h1" | "h2";
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
};

const titleClassBySize = {
  section: "sa-title",
  page: "sa-title-lg",
  display: "sa-title-display",
} as const;

export function SaSectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "center",
  size = "section",
  subtitleVariant = "subtitle",
  as,
  className,
  titleClassName,
  subtitleClassName,
}: SaSectionHeaderProps) {
  const centered = align === "center";
  const Heading = as ?? (size === "page" ? "h1" : "h2");
  const subtitleClass =
    subtitleVariant === "lead" ? "sa-lead" : "sa-subtitle";

  return (
    <header
      className={cn(
        "sa-section-head",
        centered && "sa-section-head--center",
        !centered && "sa-section-head--left",
        className,
      )}
    >
      {eyebrow ? <p className="sa-eyebrow">{eyebrow}</p> : null}
      <Heading className={cn(titleClassBySize[size], titleClassName)}>{title}</Heading>
      {subtitle ? (
        <p className={cn(subtitleClass, subtitleClassName)}>{subtitle}</p>
      ) : null}
    </header>
  );
}
