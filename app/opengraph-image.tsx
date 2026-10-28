import { ImageResponse } from "next/og";
import {
  OG_IMAGE_ALT,
  OG_IMAGE_HEADLINE,
  OG_IMAGE_SUBLINE,
} from "@/lib/marketing/agency-positioning";

export const runtime = "edge";

export const alt = OG_IMAGE_ALT;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #0c0c10 0%, #14141c 45%, #0c0c10 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "14px",
              background: "#bbf340",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#0c0c10",
              fontSize: "28px",
              fontWeight: 800,
            }}
          >
            OC
          </div>
          <div style={{ color: "#ffffff", fontSize: "32px", fontWeight: 700 }}>
            OceanCyber
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div
            style={{
              color: "#ffffff",
              fontSize: "52px",
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              maxWidth: "900px",
            }}
          >
            {OG_IMAGE_HEADLINE}
          </div>
          <div style={{ color: "#9ca3af", fontSize: "28px", maxWidth: "820px" }}>
            {OG_IMAGE_SUBLINE}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "#bbf340",
            fontSize: "22px",
            fontWeight: 600,
          }}
        >
          <span>Accra, Ghana</span>
          <span>oceancyber.net</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
