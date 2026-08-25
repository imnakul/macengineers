import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { JOURNAL } from "@/data/site";

/** Three latest posts, each a single link target covering the whole card. */
export function Journal(): React.JSX.Element {
  return (
    <section
      aria-labelledby="journal-heading"
      className="bg-surface px-5 py-24 md:px-13 md:py-32"
    >
      <div className="mx-auto max-w-[1180px]">
        <Reveal>
          <SectionHeading eyebrow="Insights" title={JOURNAL.headline} />
        </Reveal>

        <ul className="mt-14 grid gap-4 md:grid-cols-3">
          {JOURNAL.posts.map((post, index) => (
            <li key={post.href}>
              <Reveal delay={index * 0.05} className="h-full">
                <Link
                  href={post.href}
                  rel="noopener noreferrer"
                  className="group flex h-full flex-col overflow-hidden rounded-chip bg-canvas shadow-ring transition-[background-color] duration-150 ease-ui hover:bg-surface-2"
                >
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={post.image}
                      alt={post.alt}
                      fill
                      sizes="(min-width: 768px) 380px, 90vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-between gap-5 p-5">
                    <h3 className="text-[20px] leading-tight font-strong tracking-glide text-ink-strong">
                      {post.title}
                    </h3>
                    <span className="text-[14px] font-mid tracking-glide text-ink-muted transition-[color] duration-150 ease-ui group-hover:text-ink-strong">
                      Read more
                    </span>
                  </div>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
