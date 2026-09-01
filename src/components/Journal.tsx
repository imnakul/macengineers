import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { JOURNAL } from "@/data/site";

/**
 * Three latest posts, each a single link target covering the whole card. These are
 * photographs rather than renders, so they fill their frame edge to edge — the gridded
 * ground belongs to the drawn plates and would fight a photograph.
 */
export function Journal(): React.JSX.Element {
  return (
    <section
      aria-labelledby="journal-heading"
      className="bg-surface px-5 py-28 md:px-13 md:py-44"
    >
      <div className="mx-auto max-w-[1180px]">
        <Reveal>
          <SectionHeading
            id="journal-heading"
            eyebrow="Insights"
            title={JOURNAL.headline}
          />
        </Reveal>

        <ul className="mt-14 grid gap-4 md:grid-cols-3">
          {JOURNAL.posts.map((post, index) => (
            <li key={post.href}>
              <Reveal delay={index * 0.06} className="h-full">
                <Link
                  href={post.href}
                  rel="noopener noreferrer"
                  className="group relative flex h-full flex-col overflow-hidden rounded-card bg-canvas shadow-ring transition-[box-shadow] duration-150 ease-ui hover:shadow-ring-strong"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-surface-2">
                    <Image
                      src={post.image}
                      alt={post.alt}
                      fill
                      sizes="(min-width: 768px) 380px, 90vw"
                      className="object-cover transition-transform duration-500 ease-move group-hover:scale-[1.04]"
                    />
                  </div>

                  <div className="flex flex-1 flex-col gap-5 border-t border-hairline p-6">
                    <span
                      aria-hidden="true"
                      className="font-mono text-[10px] tracking-tech text-ink-muted tabular-nums"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="flex-1 text-[19px] leading-tight font-strong tracking-glide text-ink-strong">
                      {post.title}
                    </h3>
                    <span className="inline-flex items-center gap-2 font-mono text-[10px] tracking-tech text-ink-muted uppercase transition-[color] duration-150 ease-ui group-hover:text-accent">
                      Read more
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 16 16"
                        width="12"
                        height="12"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="square"
                        className="transition-transform duration-150 ease-ui group-hover:translate-x-[3px]"
                      >
                        <path d="M2 8h11M9 4l4 4-4 4" />
                      </svg>
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
  );
}
