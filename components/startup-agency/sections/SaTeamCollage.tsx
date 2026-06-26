import Image from "next/image";
import Link from "next/link";
import { aboutTeamPreview } from "@/lib/startup-agency/content";

export function SaTeamCollage() {
  return (
    <div className="relative lg:min-h-[480px]">
      <div className="grid grid-cols-2 gap-3 md:gap-4">
        {aboutTeamPreview.map((member, index) => (
          <div
            key={member.name}
            className={`group relative overflow-hidden rounded-3xl border border-sa-border bg-sa-surface ${
              index === 0 ? "col-span-2 aspect-[21/9]" : "aspect-square"
            }`}
          >
            <Image
              src={member.image}
              alt={member.name}
              fill
              className="object-cover object-top transition duration-700 group-hover:scale-105"
              sizes={index === 0 ? "(max-width: 1024px) 100vw, 50vw" : "(max-width: 1024px) 50vw, 25vw"}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-sa-bg/90 via-sa-bg/20 to-transparent opacity-80 transition group-hover:opacity-100" />
            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
              <p className="font-heading text-sm font-bold text-white md:text-base">{member.name}</p>
              <p className="text-[10px] font-bold uppercase tracking-widest text-sa-primary md:text-xs">
                {member.role}
              </p>
            </div>
          </div>
        ))}
      </div>
      <Link
        href="/team"
        className="mt-4 inline-flex text-xs font-bold uppercase tracking-widest text-sa-primary transition hover:text-white"
      >
        Meet the full team →
      </Link>
    </div>
  );
}
