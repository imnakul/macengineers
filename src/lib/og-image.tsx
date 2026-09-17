import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { cloudinaryUrl } from "./image-loader";

/**
 * Shared OG card template.
 *
 * `ImageResponse` does not inherit the site's `next/font` setup (Satori renders separately from
 * the HTML document), so the site's faces are loaded from local TTF files. Fonts and the mark are
 * read once at module scope, since crawlers and social previewers can hit these routes repeatedly.
 */
const ASSETS_DIR = join(process.cwd(), "src/lib/og-assets");

const archivoBold = readFileSync(join(ASSETS_DIR, "Archivo-Bold.ttf"));
const archivoSemiBold = readFileSync(join(ASSETS_DIR, "Archivo-SemiBold.ttf"));
const geistMonoMedium = readFileSync(join(ASSETS_DIR, "GeistMono-Medium.ttf"));

const markDataUri = `data:image/png;base64,${readFileSync(join(ASSETS_DIR, "mark.png")).toString("base64")}`;

export const OG_SIZE = { width: 1200, height: 630 } as const;
export const OG_CONTENT_TYPE = "image/png" as const;

/** Where the page's picture sits on the card. */
export interface OgPicture {
  /** Image path as used by the site, e.g. `/images/hero/hero-factory-dof-extended.jpg` (served from Cloudinary). */
  src: string;
  /**
   * `photo`: a full-bleed photograph covering the right side.
   * `render`: a transparent cut-out standing on the studio stage used across the site.
   */
  kind: "photo" | "render";
}

interface OgImageOptions {
  /** Small mono label above the title, e.g. "Industrial Insights". */
  eyebrow: string;
  title: string;
  description: string;
  picture?: OgPicture;
}

/** The homepage hero photo, the default picture for any card that does not name its own. */
export const OG_DEFAULT_PICTURE: OgPicture = { src: "/images/hero/hero-factory-dof-extended.jpg", kind: "photo" };

const INK = "#0D1B2E";
const STEEL = "#1B5FC4";
const MUTED = "#475569";

/**
 * Fetches a picture from Cloudinary, sized for the card. Satori only decodes PNG and JPEG, so the
 * format is forced: PNG keeps a cut-out's transparency, JPEG keeps a photo small. The cards are
 * prerendered at build time, so this runs once per card, not per visitor. Returns null, and the card
 * renders without a picture, if the image cannot be fetched, rather than failing the build.
 */
async function fetchPicture({ src, kind }: OgPicture): Promise<string | null> {
  const format = kind === "photo" ? ["f_jpg", "q_auto", "w_1200"] : ["f_png", "w_900"];
  const url = cloudinaryUrl(src, [...format, "c_limit"]);
  if (!url) {
    console.error(`[og-image] CLOUDINARY_CLOUD_NAME is not set; rendering ${src} card without its picture.`);
    return null;
  }
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const mime = kind === "photo" ? "image/jpeg" : "image/png";
    return `data:${mime};base64,${Buffer.from(await response.arrayBuffer()).toString("base64")}`;
  } catch (cause) {
    console.error(`[og-image] Could not fetch ${url}`, cause);
    return null;
  }
}

/** Trims to a safe on-card length rather than letting Satori overflow the frame. */
function clip(text: string, max: number): string {
  if (text.length <= max) return text;
  return `${text.slice(0, max - 1).replace(/[\s.,;:·—-]+$/, "")}…`;
}

/**
 * Renders the card every page's Open Graph / Twitter image shares, in the homepage hero's language:
 * copy on white at the left, the page's picture on the right, joined by an eased white falloff.
 */
export async function renderOgImage({
  eyebrow,
  title,
  description,
  picture = OG_DEFAULT_PICTURE,
}: OgImageOptions): Promise<ImageResponse> {
  const pictureUri = await fetchPicture(picture);
  const isPhoto = picture.kind === "photo";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          backgroundColor: "#FFFFFF",
          fontFamily: "Archivo",
        }}
      >
        {pictureUri ? (
          isPhoto ? (
            // eslint-disable-next-line @next/next/no-img-element -- Satori requires a plain <img>
            <img
              src={pictureUri}
              alt=""
              width={780}
              height={630}
              style={{ position: "absolute", top: 0, right: 0, width: 780, height: 630, objectFit: "cover", objectPosition: "right" }}
            />
          ) : (
            <div
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                width: 640,
                height: 630,
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "center",
                padding: "56px 32px 64px",
                backgroundImage: "radial-gradient(circle at 50% 38%, #FFFFFF 0%, #F4F7FA 45%, #E3E9F0 100%)",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- Satori requires a plain <img> */}
              <img src={pictureUri} alt="" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
            </div>
          )
        ) : null}

        {/* Eased white falloff from the copy into the picture. */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 1200,
            height: 630,
            display: "flex",
            backgroundImage: isPhoto
              ? "linear-gradient(90deg, #FFFFFF 0%, #FFFFFF 38%, rgba(255,255,255,0.9) 44%, rgba(255,255,255,0.6) 50%, rgba(255,255,255,0.25) 56%, rgba(255,255,255,0) 62%)"
              : "linear-gradient(90deg, #FFFFFF 0%, #FFFFFF 44%, rgba(255,255,255,0.7) 50%, rgba(255,255,255,0) 56%)",
          }}
        />

        {/* Faint drafting grid behind the copy. */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 640,
            height: 630,
            display: "flex",
            opacity: 0.55,
            backgroundImage:
              "linear-gradient(to right, rgba(27,95,196,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(27,95,196,0.08) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            width: 620,
            height: 630,
            padding: "60px 0 56px 72px",
          }}
        >
          {/* Brand row */}
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            {/* eslint-disable-next-line @next/next/no-img-element -- Satori requires a plain <img> */}
            <img src={markDataUri} width={44} height={44} alt="" />
            <div style={{ fontFamily: "Archivo", fontWeight: 700, fontSize: 26, letterSpacing: -0.5, color: INK }}>
              MAC Engineers
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", flex: 1, justifyContent: "center", gap: 22 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 10, height: 10, backgroundColor: STEEL }} />
              <div
                style={{
                  fontFamily: "Geist Mono",
                  fontSize: 20,
                  letterSpacing: 4,
                  textTransform: "uppercase",
                  color: STEEL,
                }}
              >
                {clip(eyebrow, 36)}
              </div>
            </div>
            <div
              style={{
                fontFamily: "Archivo",
                fontWeight: 700,
                fontSize: 56,
                lineHeight: 1.04,
                letterSpacing: -1.8,
                color: INK,
              }}
            >
              {clip(title, 80)}
            </div>
            <div style={{ fontFamily: "Archivo", fontWeight: 600, fontSize: 23, lineHeight: 1.45, color: MUTED }}>
              {clip(description, 130)}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              fontFamily: "Geist Mono",
              fontSize: 19,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: "#64748B",
            }}
          >
            macengineers.in · Ankleshwar, Gujarat
          </div>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        { name: "Archivo", data: archivoBold, weight: 700, style: "normal" },
        { name: "Archivo", data: archivoSemiBold, weight: 600, style: "normal" },
        { name: "Geist Mono", data: geistMonoMedium, weight: 500, style: "normal" },
      ],
    },
  );
}
