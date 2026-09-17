import { JOBS } from "@/data/jobs";
import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og-image";

export const runtime = "nodejs";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

/**
 * An image route does not automatically inherit generateStaticParams from its sibling
 * page.tsx — confirmed by a build that otherwise rendered every OG route statically
 * except this one and the blog post equivalent, both server-rendered on demand instead.
 * Declaring it again here is what gets these prerendered at build time too.
 */
export function generateStaticParams(): { slug: string }[] {
  return JOBS.map((job) => ({ slug: job.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}): ReturnType<typeof renderOgImage> {
  const { slug } = await params;
  const job = JOBS.find((item) => item.slug === slug);

  return renderOgImage({
    eyebrow: job?.category ?? "Careers",
    title: job?.title ?? "Careers at MAC Engineers",
    description: job?.teaser ?? "Current openings at MAC Engineers, Ankleshwar.",
    picture: { src: "/images/hero/header-careers-team.png", kind: "render" },
  });
}
