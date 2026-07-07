import { googleBusinessProfile } from "@/lib/startup-agency/google-business";

const site =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://oceancyber.net";

/** Full street address used in image IPTC / EXIF metadata. */
export const imageGeoAddress = {
  street: "232 Nii Kwashiefio Avenue",
  locality: googleBusinessProfile.address.locality,
  region: "Greater Accra",
  country: googleBusinessProfile.address.country,
  countryCode: googleBusinessProfile.address.countryCode,
} as const;

export const imageGeoCoordinates = googleBusinessProfile.geo;

export function absoluteSiteImageUrl(path: string): string {
  if (path.startsWith("http")) return path;
  return `${site}${path.startsWith("/") ? path : `/${path}`}`;
}

/** schema.org Place for image contentLocation — ties visuals to Accra studio. */
export function imageContentLocation() {
  return {
    "@type": "Place" as const,
    name: `${googleBusinessProfile.shortName} — ${imageGeoAddress.locality}`,
    address: {
      "@type": "PostalAddress" as const,
      streetAddress: imageGeoAddress.street,
      addressLocality: imageGeoAddress.locality,
      addressRegion: imageGeoAddress.region,
      addressCountry: imageGeoAddress.countryCode,
    },
    geo: {
      "@type": "GeoCoordinates" as const,
      latitude: imageGeoCoordinates.latitude,
      longitude: imageGeoCoordinates.longitude,
    },
  };
}

/** schema.org ImageObject with geographic content location for local SEO signals. */
export function geoTaggedImageObject(
  imagePath: string,
  options: { name: string; description?: string; caption?: string },
) {
  return {
    "@type": "ImageObject" as const,
    url: absoluteSiteImageUrl(imagePath),
    name: options.name,
    ...(options.description ? { description: options.description } : {}),
    ...(options.caption ? { caption: options.caption } : {}),
    contentLocation: imageContentLocation(),
  };
}
