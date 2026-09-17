import type { ImageLoaderProps } from "next/image";

/**
 * Site-wide `next/image` loader (wired in next.config.ts). Deliberately not a "use client" module:
 * the homepage also calls it on the server through `getImageProps` to preload the hero.
 *
 * Page images live only on Cloudinary. Code refers to them by their old public path
 * (`/images/<folder>/<file>`), which keeps the Media Library folders readable in the source. The
 * account uses dynamic folders, so a file's public ID is its bare filename:
 * `/images/hero/hero-turnkey-grounded.png` →
 * `https://res.cloudinary.com/<cloud>/image/upload/f_auto,c_limit,w_<w>,q_auto/hero-turnkey-grounded.png`.
 *
 * `f_auto` serves AVIF/WebP where the browser accepts it, `c_limit` never upscales, and `w_` follows
 * the width Next picks from `sizes`, so every screen gets a right-sized file.
 *
 * Anything else (the logo under /public/brand) is served as the original local file: with a custom
 * loader the built-in optimizer is not available. The `w` query only keeps each srcset entry distinct.
 */
const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_PREFIX = "/images/";
let warnedMissingCloud = false;

/** True for paths that are served from Cloudinary. */
export function isCloudinaryPath(src: string): boolean {
  return src.startsWith(CLOUDINARY_PREFIX);
}

/**
 * Cloudinary delivery URL for a `/images/...` path with the given transformations, or null when the
 * cloud name is not configured.
 */
export function cloudinaryUrl(src: string, transformations: readonly string[]): string | null {
  if (!CLOUD_NAME) return null;
  const publicId = encodeURIComponent(src.slice(src.lastIndexOf("/") + 1));
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${transformations.join(",")}/${publicId}`;
}

export default function cloudinaryLoader({ src, width, quality }: ImageLoaderProps): string {
  if (isCloudinaryPath(src)) {
    const url = cloudinaryUrl(src, ["f_auto", "c_limit", `w_${width}`, quality ? `q_${quality}` : "q_auto"]);
    if (url) return url;
    // Without a cloud name there is no copy of these images to serve; say so once, not per image.
    if (!warnedMissingCloud) {
      warnedMissingCloud = true;
      console.error("[image-loader] CLOUDINARY_CLOUD_NAME is not set, so /images/* cannot load.");
    }
  }
  return `${src}?w=${width}`;
}
