import { BLOG_POSTS } from "@/data/blog-posts";
import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og-image";

export const runtime = "nodejs";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

/**
 * An image route does not automatically inherit generateStaticParams from its sibling
 * page.tsx — confirmed by a build that otherwise rendered every OG route statically
 * except this one and the job-posting equivalent, both server-rendered on demand
 * instead. Declaring it again here is what gets these prerendered at build time too.
 */
export function generateStaticParams(): { slug: string }[] {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}): ReturnType<typeof renderOgImage> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((item) => item.slug === slug);

  return renderOgImage({
    eyebrow: "Insights",
    title: post?.title ?? "MAC Engineers Blog",
    description: post?.metaDescription ?? "Industrial insights from MAC Engineers.",
    // Article renders are cut-outs; posts without one fall back to the homepage photo.
    picture: post?.image ? { src: post.image, kind: "render" } : undefined,
  });
}
