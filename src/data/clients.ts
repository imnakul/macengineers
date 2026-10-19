/**
 * Client logos for the homepage marquee.
 *
 * Files live on Cloudinary (Media Library folder website-images/clients), served by bare filename
 * through the site image loader — see src/lib/image-loader.ts. Each is trimmed to its ink box so
 * every logo starts from the same zero-padding baseline. `width`/`height` are the file's pixel size
 * and only feed the aspect ratio. MAC Engineers should confirm permission to show each company.
 */

const LOGO_DIR = "/images/clients";

/** Display height (px) a square logo would get. Wider marks get shorter so every logo carries similar visual mass. */
const BASE_HEIGHT = 60;
const MIN_HEIGHT = 22;
const MAX_HEIGHT = 50;

interface ClientSource {
  readonly name: string;
  readonly slug: string;
  readonly width: number;
  readonly height: number;
  /**
   * Optical correction for marks that read heavier or lighter than their box suggests
   * (solid fills shrink, thin type grows). Defaults to 1.
   */
  readonly weight?: number;
}

export interface ClientLogo {
  readonly name: string;
  readonly src: string;
  /** Rendered size in CSS px at desktop scale. */
  readonly displayWidth: number;
  readonly displayHeight: number;
}

/*
 * Order is deliberate (client request): every run of three is one headline brand, one
 * well-known brand, then one specialist name, so at any scroll position — even three logos
 * wide on a phone — a famous name is on screen. Keep that rhythm when adding clients.
 */
const CLIENT_SOURCES: readonly ClientSource[] = [
  { name: "Adani Cement", slug: "adani-cement", width: 121, height: 76, weight: 0.95 },
  { name: "UPL", slug: "upl", width: 245, height: 160 },
  { name: "KLJ Group", slug: "klj-group", width: 438, height: 139, weight: 1.12 },

  { name: "Hitachi", slug: "hitachi", width: 1002, height: 160, weight: 0.9 },
  { name: "Mapei", slug: "mapei", width: 690, height: 160 },
  { name: "Ion Exchange", slug: "ion-exchange", width: 278, height: 69, weight: 1.12 },

  { name: "Pidilite", slug: "pidilite", width: 288, height: 145 },
  { name: "Fosroc", slug: "fosroc", width: 602, height: 160 },
  { name: "Rubamin", slug: "rubamin", width: 727, height: 160 },

  { name: "Kohler", slug: "kohler", width: 755, height: 160, weight: 0.9 },
  { name: "Bostik", slug: "bostik", width: 419, height: 160 },
  { name: "MC-Bauchemie", slug: "mc-bauchemie", width: 255, height: 153, weight: 0.85 },

  { name: "Sika", slug: "sika", width: 185, height: 160, weight: 0.9 },
  { name: "FLSmidth", slug: "flsmidth", width: 619, height: 160, weight: 0.9 },
  { name: "Calumite", slug: "calumite", width: 244, height: 160 },

  { name: "PPG", slug: "ppg", width: 206, height: 160, weight: 0.8 },
  { name: "DCM Shriram", slug: "dcm-shriram", width: 288, height: 146, weight: 1.05 },
  { name: "Gravicon", slug: "gravicon", width: 586, height: 160, weight: 1.12 },

  { name: "Glenmark", slug: "glenmark", width: 287, height: 160 },
  { name: "Atul", slug: "atul", width: 274, height: 160 },
  { name: "Skylark", slug: "skylark", width: 166, height: 112 },
];

function toClientLogo({ name, slug, width, height, weight = 1 }: ClientSource): ClientLogo {
  const aspect = width / height;
  const displayHeight = Math.round(
    Math.min(MAX_HEIGHT, Math.max(MIN_HEIGHT, (BASE_HEIGHT / Math.sqrt(aspect)) * weight)),
  );
  return {
    name,
    src: `${LOGO_DIR}/${slug}.webp`,
    displayWidth: Math.round(displayHeight * aspect),
    displayHeight,
  };
}

export const CLIENT_LOGOS: readonly ClientLogo[] = CLIENT_SOURCES.map(toClientLogo);
