import Image from "next/image";

type ServicePageHeroBannerProps = {
  image: string;
  alt?: string;
};

/** Full-bleed service artwork with readable scrims for overlaid hero copy. */
export function ServicePageHeroBanner({ image, alt = "" }: ServicePageHeroBannerProps) {
  return (
    <div className="pointer-events-none absolute inset-0 z-0">
      <Image
        src={image}
        alt={alt}
        fill
        className="object-cover object-center"
        sizes="100vw"
        priority
      />
      <div className="absolute inset-0 bg-sa-bg/25" />
      <div className="absolute inset-0 bg-gradient-to-b from-sa-bg/80 via-sa-bg/45 to-sa-bg/90" />
      <div className="absolute inset-0 bg-gradient-to-r from-sa-bg/70 via-transparent to-sa-bg/30" />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-sa-bg to-transparent" />
    </div>
  );
}
