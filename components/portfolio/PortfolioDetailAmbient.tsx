/** Light, subtle background for case study pages (matches portfolio list). */
export function PortfolioDetailAmbient() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      <div className="absolute inset-0 bg-gradient-to-b from-slate-100/90 via-white to-slate-50" />
      <div className="absolute -right-24 top-0 h-80 w-80 rounded-full bg-ocean-200/25 blur-3xl" />
      <div className="absolute -left-20 bottom-1/3 h-72 w-72 rounded-full bg-cyan-200/20 blur-3xl" />
      <div
        className="absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(148, 163, 184, 0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(148, 163, 184, 0.2) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
    </div>
  );
}
