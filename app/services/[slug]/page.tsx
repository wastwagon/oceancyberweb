import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GeoServicePageView } from "@/components/seo/GeoServicePageView";
import { getGooglePlaceStats } from "@/lib/google-places-stats";
import { withCanonical } from "@/lib/seo/canonical";
import {
  geoServicePages,
  geoServicePageWithStats,
  getGeoServicePage,
} from "@/lib/seo/geo-service-pages";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return geoServicePages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const base = getGeoServicePage(params.slug);
  if (!base) return { title: "Page not found" };
  const stats = await getGooglePlaceStats();
  const page = geoServicePageWithStats(base, stats);
  return withCanonical(
    {
      title: page.title,
      description: page.description,
      openGraph: {
        title: page.title,
        description: page.description,
        type: "website",
        url: page.path,
        images: [{ url: page.image, alt: page.h1 }],
      },
    },
    page.path,
  );
}

export default async function GeoServiceSlugPage({ params }: Props) {
  const base = getGeoServicePage(params.slug);
  if (!base) notFound();
  const stats = await getGooglePlaceStats();
  const page = geoServicePageWithStats(base, stats);
  return <GeoServicePageView page={page} />;
}
