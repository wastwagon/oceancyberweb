import { DefaultSeoProps } from "next-seo";

export const defaultSEO: DefaultSeoProps = {
  titleTemplate: "%s | OceanCyber",
  defaultTitle: "OceanCyber - Ghana's Premier Tech Partner",
  description:
    "Ghana's leading technology solutions provider. We deliver cutting-edge web design, mobile app development, IT consulting, and digital transformation services across 12+ industries.",
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
      content: "#0066CC",
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
      content: "5.6037;-0.1870",
    },
    {
      name: "ICBM",
      content: "5.6037, -0.1870",
    },
  ],
};
