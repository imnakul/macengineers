import type { Metadata } from "next";
import Link from "next/link";
import { AtlasCtaBand } from "@/components/atlas/AtlasCtaBand";
import { AtlasPageHero } from "@/components/atlas/AtlasPageHero";
import { AtlasSectionHeading } from "@/components/atlas/AtlasSectionHeading";
import { JsonLd } from "@/components/seo/JsonLd";
import { RenderStage } from "@/components/ui/RenderStage";
import { BLOG_PAGE, type BlogPost } from "@/data/blog";
import { QUOTE_HREF } from "@/data/site";
import { estimateReadingMinutes, findPostByHref, formatPostDate } from "@/lib/blog";
import { pageMetadata } from "@/lib/metadata";
import { blogListLd, breadcrumbLd } from "@/lib/structured-data";
import { PlateCta } from "@/variants/shared/PlateCta";
import { ArrowRightIcon } from "@/variants/shared/VariantIcons";
import { Reveal } from "@/variants/variant5/Reveal";

export const metadata: Metadata = pageMetadata({
  title: BLOG_PAGE.metaTitle,
  description: BLOG_PAGE.metaDescription,
  path: "/blog",
});

const EASE_CLASS = "ease-[cubic-bezier(0.33,0,0,1)]";

interface PostFacts {
  readonly isoDate: string;
  readonly date: string;
  readonly minutes: number;
}

/** Publish date and reading time come from the full article, joined by the index entry's href. */
function factsFor(post: BlogPost): PostFacts | null {
  const detail = findPostByHref(post.href);
  if (!detail) return null;
  return {
    isoDate: detail.datePublished,
    date: formatPostDate(detail.datePublished, "short"),
    minutes: estimateReadingMinutes(detail.blocks),
  };
}

function PostMeta({ facts, className = "" }: { facts: PostFacts | null; className?: string }): React.JSX.Element | null {
  if (!facts) return null;
  return (
    <p
      className={`flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500 ${className}`}
    >
      <time dateTime={facts.isoDate}>{facts.date}</time>
      <span aria-hidden="true" className="h-px w-3 bg-[#CBD5E1]" />
      <span>{facts.minutes} min read</span>
    </p>
  );
}

function ReadMore({ className = "" }: { className?: string }): React.JSX.Element {
  return (
    <span className={`inline-flex items-center gap-2 text-[13px] font-semibold text-[#1B5FC4] ${className}`}>
      Read article
      <ArrowRightIcon className={`h-3.5 w-3.5 transition-transform duration-[167ms] group-hover:translate-x-0.5 ${EASE_CLASS}`} />
    </span>
  );
}

/** Steel "machining pass" along a card's bottom edge on hover and keyboard focus. */
function SweepLine(): React.JSX.Element {
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-[#1B5FC4] transition-transform duration-300 group-hover:scale-x-100 group-focus-visible:scale-x-100 ${EASE_CLASS}`}
    />
  );
}

const CARD_CLASS =
  "group relative flex h-full overflow-hidden rounded-[6px] border border-[#E3E7ED] bg-white outline-none transition-colors duration-150 hover:border-[#1B5FC4]/45 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1B5FC4]";

function FeaturedLeadCard({ post }: { post: BlogPost }): React.JSX.Element {
  return (
    <Link href={post.href} className={`${CARD_CLASS} flex-col`}>
      <span className="relative block aspect-[16/10] overflow-hidden bg-[#EEF1F4]">
        {post.image ? (
          <RenderStage
            src={post.image}
            alt={post.alt ?? ""}
            fit={post.imageFit}
            fetchPriority="high"
            sizes="(max-width: 1024px) 100vw, 58vw"
            imageClassName={`transition-transform duration-700 group-hover:scale-[1.04] ${EASE_CLASS}`}
          />
        ) : null}
      </span>
      <span className="flex flex-1 flex-col p-6 sm:p-8">
        <PostMeta facts={factsFor(post)} />
        <h3 className="mt-4 font-display text-2xl font-semibold leading-snug tracking-[-0.02em] text-[#0D1B2E] transition-colors duration-150 group-hover:text-[#1B5FC4] lg:text-[28px]">
          {post.title}
        </h3>
        <p className="mt-3 text-[15px] leading-relaxed text-slate-600">{post.excerpt}</p>
        <ReadMore className="mt-auto pt-6" />
      </span>
      <SweepLine />
    </Link>
  );
}

function FeaturedSideCard({ post }: { post: BlogPost }): React.JSX.Element {
  return (
    <Link href={post.href} className={`${CARD_CLASS} flex-col sm:flex-row`}>
      <span className="relative block aspect-[16/10] overflow-hidden bg-[#EEF1F4] sm:aspect-auto sm:min-h-[11rem] sm:w-2/5 sm:shrink-0">
        {post.image ? (
          <RenderStage
            src={post.image}
            alt={post.alt ?? ""}
            fit={post.imageFit}
            compact
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 40vw, 18vw"
            imageClassName={`transition-transform duration-700 group-hover:scale-[1.04] ${EASE_CLASS}`}
          />
        ) : null}
      </span>
      <span className="flex flex-1 flex-col p-5 sm:p-6">
        <PostMeta facts={factsFor(post)} />
        <h3 className="mt-3 font-display text-lg font-semibold leading-snug tracking-[-0.01em] text-[#0D1B2E] transition-colors duration-150 group-hover:text-[#1B5FC4]">
          {post.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-600">{post.excerpt}</p>
        <ReadMore className="mt-auto pt-4" />
      </span>
      <SweepLine />
    </Link>
  );
}

function ArchiveRow({ post }: { post: BlogPost }): React.JSX.Element {
  return (
    <Link
      href={post.href}
      className="group relative grid gap-x-8 gap-y-2 border-b border-[#E3E7ED] py-6 outline-none transition-colors duration-150 hover:bg-[#F8FAFD] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B5FC4] md:grid-cols-12 md:items-baseline md:px-3"
    >
      <PostMeta facts={factsFor(post)} className="md:col-span-2" />
      <h3 className="font-display text-lg font-semibold leading-snug text-[#0D1B2E] transition-colors duration-150 group-hover:text-[#1B5FC4] md:col-span-5">
        {post.title}
      </h3>
      <p className="line-clamp-2 text-sm leading-relaxed text-slate-600 md:col-span-4">{post.excerpt}</p>
      <span aria-hidden="true" className="hidden justify-end text-[#1B5FC4] md:col-span-1 md:flex">
        <ArrowRightIcon className={`h-4 w-4 transition-transform duration-[167ms] group-hover:translate-x-0.5 ${EASE_CLASS}`} />
      </span>
      <SweepLine />
    </Link>
  );
}

/**
 * Blog index in the Corporate Atlas style: a lead article with two companions, then the
 * archive as a dated editorial index. Every entry links to its detail page at `/{slug}`.
 */
export default function BlogPage(): React.JSX.Element {
  const [lead, ...companions] = BLOG_PAGE.featured;
  const totalPosts = BLOG_PAGE.featured.length + BLOG_PAGE.more.length;

  return (
    <>
      <AtlasPageHero
        title={BLOG_PAGE.hero.headline}
        description={BLOG_PAGE.hero.subhead}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Blog" }]}
        headingId="blog-page-heading"
      >
        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
          <span className="text-[#1B5FC4]">{String(totalPosts).padStart(2, "0")}</span> articles from the engineering team
        </p>
      </AtlasPageHero>

      <section aria-labelledby="featured-heading" className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AtlasSectionHeading index="01" eyebrow="Latest" title="Featured articles" headingId="featured-heading" />

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
            {lead ? (
              <Reveal className="h-full lg:col-span-7">
                <FeaturedLeadCard post={lead} />
              </Reveal>
            ) : null}
            <ul className="grid gap-5 lg:col-span-5 lg:grid-rows-2">
              {companions.map((post, index) => (
                <li key={post.href}>
                  <Reveal delay={(index + 1) * 90} className="h-full">
                    <FeaturedSideCard post={post} />
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section aria-labelledby="archive-heading" className="border-t border-[#E3E7ED] bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AtlasSectionHeading index="02" eyebrow="Archive" title={BLOG_PAGE.moreHeading} headingId="archive-heading" />

          <Reveal>
            <ol className="border-t border-[#E3E7ED]">
              {BLOG_PAGE.more.map((post) => (
                <li key={post.href}>
                  <ArchiveRow post={post} />
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      <AtlasCtaBand
        eyebrow="Next step"
        title="Talk to an engineer."
        body="Reading about a problem you already have on site? Send us the equipment and the duty — we come back with a drawing, a lead time and a price."
        headingId="blog-cta-heading"
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
