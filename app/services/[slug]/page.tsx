import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GeoServicePageView } from "@/components/seo/GeoServicePageView";
import {
  geoServicePages,
  geoServicePageMetadata,
  getGeoServicePage,
} from "@/lib/seo/geo-service-pages";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return geoServicePages.map((page) => ({ slug: page.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  return geoServicePageMetadata(params.slug);
}

export default function GeoServiceSlugPage({ params }: Props) {
  const page = getGeoServicePage(params.slug);
  if (!page) notFound();
  return <GeoServicePageView page={page} />;
}
