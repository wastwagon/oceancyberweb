import { DefaultSeoProps } from "next-seo";

export const defaultSEO: DefaultSeoProps = {
  titleTemplate: "%s | OceanCyber",
  defaultTitle: "OceanCyber | Web, mobile, and cybersecurity in Ghana",
  description:
    "OceanCyber designs and builds websites, mobile apps, and secure digital products for businesses in Accra and across Africa.",
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
      content: "5.6037;-0.1870",
    },
    {
      name: "ICBM",
      content: "5.6037, -0.1870",
    },
  ],
};
