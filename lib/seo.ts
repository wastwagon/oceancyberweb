import { DefaultSeoProps } from "next-seo";
import { googleBusinessProfile } from "@/lib/startup-agency/google-business";

export const defaultSEO: DefaultSeoProps = {
  titleTemplate: "%s | OceanCyber",
  defaultTitle: "Best web design company in Accra and Ghana | OceanCyber",
  description:
    `Best web design company in Accra and Ghana for websites, mobile apps, and cybersecurity. ${googleBusinessProfile.teamSize} people, founded in ${googleBusinessProfile.foundedYear}, rated ${googleBusinessProfile.rating} from ${googleBusinessProfile.reviewCount} Google reviews.`,
  openGraph: {
    type: "website",
    locale: "en_GH",
    url: "https://oceancyber.net",
    siteName: "OceanCyber",
    images: [
      {
        url: "https://oceancyber.net/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "OceanCyber Technology Solutions",
      },
    ],
  },
  twitter: {
    handle: "@oceancyber",
    site: "@oceancyber",
    cardType: "summary_large_image",
  },
  additionalMetaTags: [
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1",
    },
    {
      name: "theme-color",
      content: "#0c0c10",
    },
    {
      name: "geo.region",
      content: "GH",
    },
    {
      name: "geo.placename",
      content: "Accra",
    },
    {
      name: "geo.position",
      content: `${googleBusinessProfile.geo.latitude};${googleBusinessProfile.geo.longitude}`,
    },
    {
      name: "ICBM",
      content: `${googleBusinessProfile.geo.latitude}, ${googleBusinessProfile.geo.longitude}`,
    },
  ],
};
