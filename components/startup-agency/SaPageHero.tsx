import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { SaSectionHeader } from "@/components/startup-agency/SaSectionHeader";

type SaPageHeroProps = {
  eyebrow?: ReactNode;
  title: ReactNode;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
  children?: ReactNode;
};

/** Standard page hero — studio-grade H1 + lead paragraph alignment */
export function SaPageHero({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className,
  children,
}: SaPageHeroProps) {
  return (
    <div className={cn(className)}>
      {eyebrow ? (
        typeof eyebrow === "string" ? (
          <SaSectionHeader
            as="h1"
            align={align}
            size="page"
            eyebrow={eyebrow}
            title={title}
            subtitle={subtitle}
            subtitleVariant="lead"
          />
        ) : (
          <div
            className={cn(
              "sa-section-head",
              align === "center" ? "sa-section-head--center" : "sa-section-head--left",
            )}
          >
            <div className="sa-eyebrow">{eyebrow}</div>
            <h1 className="sa-title-lg">{title}</h1>
            {subtitle ? <p className="sa-lead">{subtitle}</p> : null}
          </div>
        )
      ) : (
        <SaSectionHeader
          as="h1"
          align={align}
          size="page"
          title={title}
          subtitle={subtitle}
          subtitleVariant="lead"
        />
      )}
      {children}
    </div>
  );
}
