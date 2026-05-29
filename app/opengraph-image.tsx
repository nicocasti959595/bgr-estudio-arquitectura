import { ImageResponse } from "next/og";

export const alt = "BGR Arquitectura & Construcción";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Imagen que se muestra al compartir el sitio en WhatsApp, Instagram, etc.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#f5f3ef",
          padding: "72px 80px",
          fontFamily: "Georgia, serif",
        }}
      >
        {/* Top: eyebrow */}
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div style={{ width: 56, height: 3, backgroundColor: "#8a6f48" }} />
          <div
            style={{
              fontSize: 24,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: "#6b6359",
              fontFamily: "Arial, sans-serif",
            }}
          >
            Arquitectura · Construcción · CABA &amp; GBA
          </div>
        </div>

        {/* Center: title */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 96,
              fontWeight: 700,
              color: "#14110f",
              lineHeight: 1.05,
            }}
          >
            Si lo podés imaginar,
          </div>
          <div
            style={{
              fontSize: 96,
              fontStyle: "italic",
              color: "#8a6f48",
              lineHeight: 1.05,
            }}
          >
            lo podemos construir.
          </div>
        </div>

        {/* Bottom: brand + url */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              fontSize: 44,
              fontWeight: 700,
              letterSpacing: 4,
              color: "#14110f",
              fontFamily: "Arial, sans-serif",
            }}
          >
            BGR
          </div>
          <div
            style={{
              fontSize: 28,
              color: "#6b6359",
              fontFamily: "Arial, sans-serif",
            }}
          >
            bgr.com.ar
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
