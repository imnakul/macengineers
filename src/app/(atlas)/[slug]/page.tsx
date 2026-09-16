import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AtlasArticle } from "@/components/atlas/AtlasArticle";
import { AtlasCtaBand } from "@/components/atlas/AtlasCtaBand";
import { AtlasPageHero } from "@/components/atlas/AtlasPageHero";
import { AtlasSectionHeading } from "@/components/atlas/AtlasSectionHeading";
import { JsonLd } from "@/components/seo/JsonLd";
import { RenderStage } from "@/components/ui/RenderStage";
import { BLOG_POSTS, type BlogPostDetail } from "@/data/blog-posts";
import { COMPANY, QUOTE_HREF } from "@/data/site";
import {
  buildArticleOutline,
  estimateReadingMinutes,
  findPostBySlug,
  formatPostDate,
  relatedPosts,
} from "@/lib/blog";
import { pageMetadata } from "@/lib/metadata";
import { blogPostingLd, breadcrumbLd } from "@/lib/structured-data";
import { PlateCta } from "@/variants/shared/PlateCta";
import { ArrowRightIcon } from "@/variants/shared/VariantIcons";
import { Reveal } from "@/variants/variant5/Reveal";

const EASE_CLASS = "ease-[cubic-bezier(0.33,0,0,1)]";

/** All posts are known at build time, so every one is prerendered. */
export function generateStaticParams(): { slug: string }[] {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = findPostBySlug(slug);

  if (!post) return { title: "Article not found | MAC Engineers" };

  return pageMetadata({
    title: `${post.title} | ${COMPANY.name} Blog`,
    description: post.metaDescription,
    path: `/${post.slug}`,
    type: "article",
  });
}

function MetaDivider(): React.JSX.Element {
  return <span aria-hidden="true" className="h-px w-3 bg-[#CBD5E1]" />;
}

/**
 * "On this page" contents list. Sticky beside the article on large screens; a native,
 * keyboard-accessible disclosure above it on smaller ones. Hidden for posts with fewer
 * than two headings, where a contents list adds nothing.
 */
function TableOfContents({ post }: { post: BlogPostDetail }): React.JSX.Element | null {
  const outline = buildArticleOutline(post.blocks);
  if (outline.length < 2) return null;

  const links = (
    <ol className="space-y-0.5 border-l border-[#E3E7ED]">
      {outline.map((heading) => (
        <li key={heading.id}>
          <a
            href={`#${heading.id}`}
            className={`-ml-px block border-l border-transparent py-1.5 text-[13px] leading-snug transition-colors duration-150 hover:border-[#1B5FC4] hover:text-[#1B5FC4] focus-visible:border-[#1B5FC4] focus-visible:text-[#1B5FC4] ${
              heading.level === 3 ? "pl-7 text-slate-500" : "pl-4 font-medium text-slate-700"
            }`}
          >
            {heading.text}
          </a>
        </li>
      ))}
    </ol>
  );

  return (
    <>
      <details className="group/toc rounded-[6px] border border-[#E3E7ED] bg-white lg:hidden">
        <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-[#0D1B2E] [&::-webkit-details-marker]:hidden">
          On this page
          <ArrowRightIcon className="h-3.5 w-3.5 rotate-90 text-[#1B5FC4] transition-transform duration-200 group-open/toc:-rotate-90" />
        </summary>
        <nav aria-label="On this page" className="px-5 pb-5">
          {links}
        </nav>
      </details>

      <nav aria-label="On this page" className="sticky top-28 hidden lg:block">
        <p className="mb-4 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">On this page</p>
        {links}
      </nav>
    </>
  );
}

function RelatedCard({ post }: { post: BlogPostDetail }): React.JSX.Element {
  return (
    <Link
      href={`/${post.slug}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-[6px] border border-[#E3E7ED] bg-white p-6 outline-none transition-colors duration-150 hover:border-[#1B5FC4]/45 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1B5FC4]"
    >
      <p className="flex flex-wrap items-center gap-x-2 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">
        <time dateTime={post.datePublished}>{formatPostDate(post.datePublished, "short")}</time>
        <MetaDivider />
        <span>{estimateReadingMinutes(post.blocks)} min read</span>
      </p>
      <h3 className="mt-4 font-display text-lg font-semibold leading-snug tracking-[-0.01em] text-[#0D1B2E] transition-colors duration-150 group-hover:text-[#1B5FC4]">
        {post.title}
      </h3>
      <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-slate-600">{post.metaDescription}</p>
      <span className="mt-auto inline-flex items-center gap-2 pt-5 text-[13px] font-semibold text-[#1B5FC4]">
        Read article
        <ArrowRightIcon className={`h-3.5 w-3.5 transition-transform duration-[167ms] group-hover:translate-x-0.5 ${EASE_CLASS}`} />
      </span>
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-[#1B5FC4] transition-transform duration-300 group-hover:scale-x-100 group-focus-visible:scale-x-100 ${EASE_CLASS}`}
      />
    </Link>
  );
}

/**
 * A single blog post in the Corporate Atlas style. Routes stay flat (/{slug}) to match
 * the URL shape the live WordPress site already uses for these posts.
 */
export default async function BlogPostPage({ params }: PageProps<"/[slug]">): Promise<React.JSX.Element> {
  const { slug } = await params;
  const post = findPostBySlug(slug);

  if (!post) notFound();

  const published = formatPostDate(post.datePublished);
  const modified = formatPostDate(post.dateModified);
  const wasUpdated = modified !== published;
  const minutes = estimateReadingMinutes(post.blocks);
  const related = relatedPosts(post.slug);

  return (
    <>
      <AtlasPageHero
        title={post.title}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Blog", href: "/blog" }, { label: post.title }]}
        headingId="post-heading"
      >
        <p className="flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
          <span>
            Published{" "}
            <time dateTime={post.datePublished} className="text-[#0D1B2E]">
              {published}
            </time>
          </span>
          {wasUpdated ? (
            <>
              <MetaDivider />
              <span>
                Updated{" "}
                <time dateTime={post.dateModified} className="text-[#0D1B2E]">
                  {modified}
                </time>
              </span>
            </>
          ) : null}
          <MetaDivider />
          <span>{minutes} min read</span>
        </p>
      </AtlasPageHero>

      <section aria-label="Article" className="py-12 md:py-20">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:gap-12 lg:px-8">
          <aside className="lg:col-span-3">
            <TableOfContents post={post} />
          </aside>

          <div className="min-w-0 lg:col-span-9">
            {post.image ? (
              <Reveal>
                <figure className="relative mb-12 aspect-[16/9] max-w-[820px] overflow-hidden rounded-[6px] border border-[#E3E7ED] bg-[#EEF1F4]">
                  <RenderStage
                    src={post.image}
                    alt={post.alt ?? ""}
                    fit={post.imageFit}
                    fetchPriority="high"
                    sizes="(max-width: 1024px) 100vw, 820px"
                  />
                </figure>
              </Reveal>
            ) : null}

            <AtlasArticle blocks={post.blocks} />

            <div className="mt-14 flex max-w-[680px] flex-col gap-4 border-t border-[#E3E7ED] pt-8 sm:flex-row sm:items-center sm:justify-between">
              <Link
                href="/blog"
                className="group inline-flex items-center gap-2 text-[13px] font-semibold text-[#1B5FC4] outline-none transition-colors duration-150 hover:text-[#0F3D87] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1B5FC4]"
              >
                <ArrowRightIcon className={`h-3.5 w-3.5 rotate-180 transition-transform duration-[167ms] group-hover:-translate-x-0.5 ${EASE_CLASS}`} />
                All insights
              </Link>
              <p className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
                {COMPANY.name} · Engineering team
              </p>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 ? (
        <section aria-labelledby="related-heading" className="border-t border-[#E3E7ED] bg-white py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <AtlasSectionHeading eyebrow="Keep reading" title="More insights" headingId="related-heading" />
            <ul className="grid gap-5 md:grid-cols-3">
              {related.map((relatedPost, index) => (
                <li key={relatedPost.slug}>
                  <Reveal delay={index * 80} className="h-full">
                    <RelatedCard post={relatedPost} />
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <AtlasCtaBand
        eyebrow="Next step"
        title="Have a project like this?"
        body="Tell us the equipment and the specification. We will come back with a drawing, a lead time and a price."
        headingId="post-cta-heading"
      >
        <PlateCta href={QUOTE_HREF} size="lg" className="w-full sm:w-auto">
          Request a Quote
        </PlateCta>
        <PlateCta href="/contact-us" variant="outline" size="lg" icon="none" className="w-full sm:w-auto">
          Contact Us
        </PlateCta>
      </AtlasCtaBand>

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
