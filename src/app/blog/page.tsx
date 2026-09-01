import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ActionLink } from "@/components/ui/ActionLink";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { TechLabel } from "@/components/ui/TechLabel";
import { JsonLd } from "@/components/seo/JsonLd";
import { BLOG_PAGE } from "@/data/blog";
import { pageMetadata } from "@/lib/metadata";
import { blogListLd, breadcrumbLd } from "@/lib/structured-data";

export const metadata: Metadata = pageMetadata({
  title: BLOG_PAGE.metaTitle,
  description: BLOG_PAGE.metaDescription,
  path: "/blog",
});

/** Small arrow shared by both card styles on this page. */
function Arrow(): React.JSX.Element {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      width="12"
      height="12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="square"
      className="shrink-0 transition-transform duration-150 ease-ui group-hover:translate-x-[3px]"
    >
      <path d="M2 8h11M9 4l4 4-4 4" />
    </svg>
  );
}

/**
 * Blog index.
 *
 * Three posts have artwork in the repo and lead as cards; the remaining seven run as a
 * typographic index rather than as cards with grey placeholders. Every card links to the
 * published article — see the architecture note in src/data/blog.ts for why the articles
 * are not rebuilt here.
 */
export default function BlogPage(): React.JSX.Element {
  return (
    <>
      <PageHero
        eyebrow={BLOG_PAGE.hero.eyebrow}
        headline={BLOG_PAGE.hero.headline}
        subhead={BLOG_PAGE.hero.subhead}
        headingId="blog-page-heading"
      />

      <section aria-labelledby="featured-heading" className="px-5 pb-24 md:px-13 md:pb-36">
        <div className="mx-auto max-w-[1180px]">
          <h2 id="featured-heading" className="sr-only">
            Latest posts
          </h2>

          <ul className="grid gap-4 md:grid-cols-3">
            {BLOG_PAGE.featured.map((post, index) => (
              <li key={post.href}>
                <Reveal delay={index * 0.06} className="h-full">
                  <Link
                    href={post.href}
                    className="group relative flex h-full flex-col overflow-hidden rounded-card bg-canvas shadow-ring transition-[box-shadow] duration-150 ease-ui hover:shadow-ring-strong"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-surface-2">
                      {post.image && post.alt ? (
                        <Image
                          src={post.image}
                          alt={post.alt}
                          fill
                          sizes="(min-width: 768px) 380px, 90vw"
                          priority={index === 0}
                          className="object-cover transition-transform duration-500 ease-move group-hover:scale-[1.04]"
                        />
                      ) : null}
                    </div>

                    <div className="flex flex-1 flex-col gap-4 border-t border-hairline p-6">
                      <span
                        aria-hidden="true"
                        className="font-mono text-[10px] tracking-tech text-ink-muted tabular-nums"
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <h3 className="text-[19px] leading-tight font-strong tracking-glide text-ink-strong">
                        {post.title}
                      </h3>
                      <p className="flex-1 text-[14px] leading-[21px] font-regular tracking-glide text-ink-muted">
                        {post.excerpt}
                      </p>
                      <span className="inline-flex items-center gap-2 font-mono text-[10px] tracking-tech text-ink-muted uppercase transition-[color] duration-150 ease-ui group-hover:text-accent">
                        Read more
                        <Arrow />
                      </span>
                    </div>

                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-300 ease-move group-hover:scale-x-100"
                    />
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        aria-labelledby="more-heading"
        className="bg-surface px-5 py-24 md:px-13 md:py-36"
      >
        <div className="mx-auto max-w-[1180px]">
          <Reveal>
            <TechLabel>Archive</TechLabel>
          </Reveal>

          <Reveal delay={0.06}>
            <h2
              id="more-heading"
              className="mt-6 text-[30px] leading-[1.02] font-block tracking-display text-ink-strong sm:text-[38px] md:text-[46px]"
            >
              {BLOG_PAGE.moreHeading}
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <ul className="mt-12 flex flex-col">
              {BLOG_PAGE.more.map((post, index) => (
                <li key={post.href}>
                  <Link
                    href={post.href}
                    className="group grid items-baseline gap-x-6 gap-y-2 border-t border-hairline-strong py-6 transition-[background-color] duration-150 ease-ui last:border-b md:grid-cols-12"
                  >
                    <span
                      aria-hidden="true"
                      className="font-mono text-[10px] tracking-tech text-ink-muted tabular-nums md:col-span-1"
                    >
                      {String(index + 4).padStart(2, "0")}
                    </span>

                    <h3 className="text-[19px] leading-tight font-strong tracking-glide text-ink-strong transition-[color] duration-150 ease-ui group-hover:text-accent md:col-span-5 md:text-[20px]">
                      {post.title}
                    </h3>

                    <p className="text-[14px] leading-[21px] font-regular tracking-glide text-ink-muted md:col-span-5">
                      {post.excerpt}
                    </p>

                    <span className="inline-flex items-center gap-2 font-mono text-[10px] tracking-tech text-ink-muted uppercase transition-[color] duration-150 ease-ui group-hover:text-accent md:col-span-1 md:justify-end">
                      Read
                      <Arrow />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.14}>
            <div className="mt-12">
              <ActionLink href={BLOG_PAGE.archiveHref} variant="ghost" withArrow>
                {BLOG_PAGE.archiveLabel}
              </ActionLink>
            </div>
          </Reveal>
        </div>
      </section>

      <JsonLd
        data={[
          blogListLd(),
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
          ]),
        ]}
      />
    </>
  );
}
