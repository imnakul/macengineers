import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BlogArticle } from "@/components/blog/BlogArticle";
import { JsonLd } from "@/components/seo/JsonLd";
import { ActionLink } from "@/components/ui/ActionLink";
import { CtaBand } from "@/components/ui/CtaBand";
import { PageHero } from "@/components/ui/PageHero";
import { PlateFrame } from "@/components/ui/PlateFrame";
import { Reveal } from "@/components/ui/Reveal";
import { BLOG_POSTS, type BlogPostDetail } from "@/data/blog-posts";
import { COMPANY, QUOTE_HREF } from "@/data/site";
import { pageMetadata } from "@/lib/metadata";
import { blogPostingLd, breadcrumbLd } from "@/lib/structured-data";

/** All ten posts are known at build time, so every one is prerendered. */
export function generateStaticParams(): { slug: string }[] {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

function findPost(slug: string): BlogPostDetail | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}

/** "24 October 2025" — fixed locale, matching the site's en-IN convention elsewhere. */
function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(iso));
}

export async function generateMetadata({
  params,
}: PageProps<"/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = findPost(slug);

  if (!post) return { title: "Article not found | MAC Engineers" };

  return pageMetadata({
    title: `${post.title} | ${COMPANY.name} Blog`,
    description: post.metaDescription,
    path: `/${post.slug}`,
    type: "article",
  });
}

/**
 * A single blog post. Routes are flat (/{slug}) rather than nested under /blog/, to
 * match the URL shape the live WordPress site already uses for these same ten posts —
 * see the note on why in src/data/blog.ts and src/data/blog-posts.ts.
 */
export default async function BlogPostPage({
  params,
}: PageProps<"/[slug]">): Promise<React.JSX.Element> {
  const { slug } = await params;
  const post = findPost(slug);

  if (!post) notFound();

  const published = formatDate(post.datePublished);
  const modified = formatDate(post.dateModified);
  const wasUpdated = modified !== published;

  return (
    <>
      <PageHero
        eyebrow="Insights"
        headline={post.title}
        headingId="post-heading"
      >
        <div className="flex flex-col gap-6">
          <p className="font-mono text-[10px] tracking-tech text-ink-muted uppercase">
            Published {published}
            {wasUpdated ? ` · Updated ${modified}` : ""}
          </p>

          <Link
            href="/blog"
            className="inline-flex w-fit items-center gap-2 font-mono text-[10px] tracking-tech text-ink-muted uppercase transition-[color] duration-150 ease-ui hover:text-accent"
          >
            <span aria-hidden="true">&larr;</span>
            All insights
          </Link>
        </div>
      </PageHero>

      <section aria-labelledby="post-heading" className="px-5 pb-24 md:px-13 md:pb-36">
        <div className="mx-auto max-w-[1180px]">
          {post.image && post.alt ? (
            <Reveal distance={24} className="mb-14 max-w-[680px]">
              <PlateFrame
                src={post.image}
                alt={post.alt}
                caption={post.title}
                ratio="aspect-[16/9]"
                sizes="(min-width: 768px) 680px, 90vw"
                priority
              />
            </Reveal>
          ) : null}

          <Reveal delay={0.06}>
            <BlogArticle blocks={post.blocks} />
          </Reveal>
        </div>
      </section>

      <CtaBand
        eyebrow="Next step"
        heading="Have a project like this?"
        body="Tell us the equipment and the specification. We will come back with a drawing, a lead time and a price."
        headingId="post-cta-heading"
      >
        <ActionLink
          href={QUOTE_HREF}
          variant="solid"
          tone="inverse"
          withArrow
        >
          Get A Quote
        </ActionLink>
        <ActionLink href="/contact-us" variant="ghost" tone="inverse" className="font-mono">
          Contact Us
        </ActionLink>
      </CtaBand>

      <JsonLd
        data={[
          blogPostingLd(post),
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: post.title, path: `/${post.slug}` },
          ]),
        ]}
      />
    </>
  );
}
