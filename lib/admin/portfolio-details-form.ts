import type { DesignArtifact } from "@/lib/data/case-study-design";
import type { PortfolioDetailsV1 } from "@/lib/types/portfolio-details-v1";
import type { PortfolioProjectType } from "@/lib/types/portfolio-project-type";

export type ProjectDetailsFormState = {
  projectType: PortfolioProjectType;
  designArtifacts: DesignArtifact[];
  detailsJson: string;
};

const EMPTY_ARTIFACT = (): DesignArtifact => ({
  phase: "01",
  title: "",
  description: "",
  image: "",
  imageAlt: "",
});

export function isPortfolioDetailsV1(value: unknown): value is PortfolioDetailsV1 {
  return (
    typeof value === "object" &&
    value !== null &&
    "v" in value &&
    (value as { v?: number }).v === 1
  );
}

export function parseProjectDetailsForm(details: unknown): ProjectDetailsFormState {
  if (isPortfolioDetailsV1(details)) {
    return {
      projectType: details.projectType ?? "hybrid",
      designArtifacts:
        details.designArtifacts && details.designArtifacts.length > 0
          ? details.designArtifacts
          : [EMPTY_ARTIFACT()],
      detailsJson: JSON.stringify(details, null, 2),
    };
  }

  return {
    projectType: "hybrid",
    designArtifacts: [EMPTY_ARTIFACT()],
    detailsJson:
      details && typeof details === "object"
        ? JSON.stringify(details, null, 2)
        : "",
  };
}

export function mergeDetailsFromForm(
  existing: unknown,
  form: Pick<ProjectDetailsFormState, "projectType" | "designArtifacts">,
  imageFallback: string,
): PortfolioDetailsV1 {
  const base = isPortfolioDetailsV1(existing)
    ? existing
    : ({
        v: 1 as const,
        gradient: "from-ocean-500 to-cyan-500",
        year: new Date().getFullYear().toString(),
        client: "",
        rating: 5,
        image: imageFallback,
      } satisfies PortfolioDetailsV1);

  const artifacts = form.designArtifacts
    .map((a) => ({
      ...a,
      phase: a.phase.trim(),
      title: a.title.trim(),
      description: a.description.trim(),
      image: a.image.trim(),
      imageAlt: a.imageAlt.trim() || a.title.trim(),
    }))
    .filter((a) => a.title && a.image);

  return {
    ...base,
    projectType: form.projectType,
    designArtifacts: artifacts.length > 0 ? artifacts : undefined,
  };
}

export function createEmptyDesignArtifact(phaseIndex: number): DesignArtifact {
  return {
    ...EMPTY_ARTIFACT(),
    phase: String(phaseIndex + 1).padStart(2, "0"),
  };
}
