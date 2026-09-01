import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";

/**
 * Shared OG card template.
 *
 * `ImageResponse` does not inherit the site's `next/font` setup — that loading path is
 * built for the HTML document, not for Satori's separate rendering engine — so the same
 * three faces used across the site (Archivo for display, IBM Plex Mono for the technical
 * register) are loaded here from local TTF files instead. Read once at module scope
 * rather than per-request, since these routes can be hit repeatedly by crawlers and
 * social previewers.
 */
const ASSETS_DIR = join(process.cwd(), "src/lib/og-assets");

const archivoBold = readFileSync(join(ASSETS_DIR, "Archivo-Bold.ttf"));
const archivoSemiBold = readFileSync(join(ASSETS_DIR, "Archivo-SemiBold.ttf"));
const plexMonoMedium = readFileSync(join(ASSETS_DIR, "PlexMono-Medium.ttf"));

const markPng = readFileSync(join(ASSETS_DIR, "mark.png"));
const markDataUri = `data:image/png;base64,${markPng.toString("base64")}`;

export const OG_SIZE = { width: 1200, height: 630 } as const;
export const OG_CONTENT_TYPE = "image/png" as const;

interface OgImageOptions {
  /** Small mono label above the title, e.g. "Industrial Insights". */
  eyebrow: string;
  title: string;
  description: string;
}

/** Trims to a safe on-card length rather than letting Satori overflow the frame. */
function clip(text: string, max: number): string {
  if (text.length <= max) return text;
  return `${text.slice(0, max - 1).trimEnd()}…`;
}

/**
 * Renders the branded card every page's Open Graph / Twitter image shares. Dark band,
 * drafting grid, registration ticks and the real wrench mark — the same visual language
 * as the site's own CtaBand, so a shared link looks like it came from the same place
 * someone lands on.
 */
export function renderOgImage({ eyebrow, title, description }: OgImageOptions): ImageResponse {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#171715",
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.07) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          padding: "72px",
          position: "relative",
          fontFamily: "Archivo",
        }}
      >
        {/*
          Registration ticks, matching CornerTicks.tsx. Written as four fully concrete
          style objects rather than one computed from a shared shape — Satori's style
          processor expects every declared property to be a real value; a property
          explicitly set to `undefined` (to mean "not this side") throws inside Satori
          instead of being treated as absent, unlike a real browser's style object.
        */}
        <div
          style={{
            position: "absolute",
            top: 40,
            left: 40,
            width: 28,
            height: 28,
            borderTop: "3px solid #f4631f",
            borderLeft: "3px solid #f4631f",
            opacity: 0.7,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 40,
            right: 40,
            width: 28,
            height: 28,
            borderTop: "3px solid #f4631f",
            borderRight: "3px solid #f4631f",
            opacity: 0.7,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 40,
            left: 40,
            width: 28,
            height: 28,
            borderBottom: "3px solid #f4631f",
            borderLeft: "3px solid #f4631f",
            opacity: 0.7,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 40,
            right: 40,
            width: 28,
            height: 28,
            borderBottom: "3px solid #f4631f",
            borderRight: "3px solid #f4631f",
            opacity: 0.7,
          }}
        />

        {/* Eyebrow */}
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 14, height: 14, backgroundColor: "#f4631f" }} />
          <div
            style={{
              fontFamily: "Plex Mono",
              fontSize: 26,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.55)",
            }}
          >
            {clip(eyebrow, 40)}
          </div>
        </div>

        {/* Title + description, vertically centred in the remaining space */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            justifyContent: "center",
            maxWidth: 820,
            gap: 28,
          }}
        >
          <div
            style={{
              fontFamily: "Archivo",
              fontWeight: 700,
              fontSize: 64,
              lineHeight: 1.05,
              letterSpacing: -2,
              color: "#ffffff",
            }}
          >
            {clip(title, 90)}
          </div>
          <div
            style={{
              fontFamily: "Archivo",
              fontWeight: 600,
              fontSize: 28,
              lineHeight: 1.45,
              color: "rgba(255,255,255,0.7)",
            }}
          >
            {clip(description, 150)}
          </div>
        </div>

        {/* Footer: domain left, mark right */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              fontFamily: "Plex Mono",
              fontSize: 24,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.45)",
            }}
          >
            macengineers.in
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element -- Satori requires a plain <img>, not next/image */}
          <img src={markDataUri} width={120} height={120} alt="" />
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        { name: "Archivo", data: archivoBold, weight: 700, style: "normal" },
        { name: "Archivo", data: archivoSemiBold, weight: 600, style: "normal" },
        { name: "Plex Mono", data: plexMonoMedium, weight: 500, style: "normal" },
      ],
    },
  );
}
