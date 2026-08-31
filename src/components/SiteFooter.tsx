import Image from "next/image";
import Link from "next/link";
import { COMPANY, FOOTER } from "@/data/site";

const LINK_CLASS =
  "text-[14px] font-regular tracking-glide text-ink-muted transition-[color] duration-150 ease-ui hover:text-accent";

const CELL_CLASS = "flex flex-col bg-canvas p-7 md:p-8";

const CELL_HEADING_CLASS =
  "font-mono text-[10px] tracking-tech text-ink-muted uppercase";

/**
 * Footer, set as the titleblock of the drawing sheet: a ruled cell grid carrying the
 * identity, the index and the contact particulars, closed by a revision strip. The
 * rules come from a 1px gap over a hairline ground, which stays exact at every
 * breakpoint — every other section boundary on the page is made of whitespace and fill
 * changes alone.
 */
export function SiteFooter(): React.JSX.Element {
  return (
    <footer className="px-5 pt-20 pb-10 md:px-13 md:pt-28 md:pb-14">
      <div className="mx-auto max-w-[1180px]">
        <div className="grid gap-px overflow-hidden rounded-card bg-hairline-strong shadow-ring md:grid-cols-2 lg:grid-cols-4">
          <div className={`${CELL_CLASS} gap-6 lg:col-span-2`}>
            <div className="relative h-[32px] w-[112px]">
              <Image
                src={COMPANY.logo}
                alt={`${COMPANY.name} industrial equipment manufacturer logo`}
                fill
                sizes="112px"
                className="object-contain object-left"
              />
            </div>
            <p className="max-w-[440px] text-[14px] leading-[21px] font-regular tracking-glide text-ink-muted">
              {FOOTER.blurb}
            </p>
            <ul className="mt-auto flex flex-wrap gap-x-6 gap-y-3 pt-2">
              {FOOTER.social.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    rel="noopener noreferrer"
                    aria-label={`${COMPANY.name} on ${item.label}`}
                    className="font-mono text-[10px] tracking-tech text-ink-muted uppercase transition-[color] duration-150 ease-ui hover:text-accent"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Footer" className={CELL_CLASS}>
            <h2 className={CELL_HEADING_CLASS}>{FOOTER.quickLinksHeading}</h2>
            <ul className="mt-6 flex flex-col gap-3">
              {FOOTER.quickLinks.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className={LINK_CLASS}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className={CELL_CLASS}>
            <h2 className={CELL_HEADING_CLASS}>{FOOTER.contactHeading}</h2>
            <ul className="mt-6 flex flex-col gap-3">
              <li>
                <Link
                  href={`mailto:${COMPANY.email}`}
                  aria-label={`Email ${COMPANY.name} at ${COMPANY.email}`}
                  className={LINK_CLASS}
                >
                  {COMPANY.email}
                </Link>
              </li>
              <li>
                <Link
                  href={COMPANY.phoneHref}
                  aria-label={`Call ${COMPANY.name} on ${COMPANY.phone}`}
                  className={LINK_CLASS}
                >
                  {COMPANY.phone}
                </Link>
              </li>
              <li>
                <Link
                  href={COMPANY.whatsapp}
                  rel="noopener noreferrer"
                  aria-label={`Message ${COMPANY.name} on WhatsApp`}
                  className={LINK_CLASS}
                >
                  WhatsApp
                </Link>
              </li>
              <li className="pt-2">
                <address className="max-w-[280px] text-[13px] leading-5 font-regular tracking-glide text-ink-muted not-italic">
                  {COMPANY.address}
                </address>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 font-mono text-[10px] tracking-tech text-ink-muted uppercase sm:flex-row sm:items-center sm:justify-between">
          <p>{COMPANY.copyright}</p>
          <p className="flex items-center gap-2.5">
            <span aria-hidden="true" className="h-[7px] w-[7px] bg-accent" />
            {COMPANY.legalName}
          </p>
        </div>
      </div>
    </footer>
  );
}
