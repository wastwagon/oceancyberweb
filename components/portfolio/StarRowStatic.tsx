import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function StarRowStatic({ n, className }: { n: number; className?: string }) {
  return (
    <div
      className={cn("flex items-center gap-0.5", className)}
      aria-label={`${n} out of 5 stars`}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={cn(
            "h-4 w-4 sm:h-5 sm:w-5",
            i < n
              ? "fill-amber-400 text-amber-400"
              : "fill-slate-200 text-slate-200",
          )}
          aria-hidden
        />
      ))}
    </div>
  );
}
