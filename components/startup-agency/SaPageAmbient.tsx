"use client";

/**
 * A reusable ambient background component that provides a subtle grid and glow
 * consistent with the premium "Startup Agency" design system.
 */
export function SaPageAmbient() {
  return (
    <div
      className="pointer-events-none absolute inset-0 opacity-[0.15]"
      aria-hidden
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(187, 243, 64, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(187, 243, 64, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(ellipse 100% 70% at 50% 0%, black 0%, transparent 75%)",
        }}
      />
      <div className="absolute left-1/2 top-0 h-[min(480px,55vh)] w-[min(100%,1000px)] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(187,243,64,0.08)_0%,transparent_72%)] blur-[96px]" />
    </div>
  );
}
