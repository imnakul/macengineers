import Image from "next/image";
import Link from "next/link";
import { COMPANY, FOOTER } from "@/data/site";

const LINK_CLASS =
  "text-[14px] font-regular tracking-glide text-ink-muted transition-[color] duration-150 ease-ui hover:text-ink-strong";

/**
 * Footer. Left-aligned columns and the page's only horizontal rule — every other
 * section boundary is made of whitespace and fill changes alone.
 */
export function SiteFooter(): React.JSX.Element {
  return (
    <footer className="px-5 pb-16 md:px-13">
      <div className="mx-auto max-w-[1180px]">
        <div className="grid gap-12 border-t border-hairline pt-16 md:grid-cols-3 md:gap-8">
          <div className="flex flex-col gap-6">
            <div className="relative h-[32px] w-[112px]">
              <Image
                src={COMPANY.logo}
                alt={`${COMPANY.name} industrial equipment manufacturer logo`}
                fill
                sizes="112px"
                className="object-contain object-left"
              />
            </div>
            <p className="max-w-[420px] text-[14px] leading-5 font-regular tracking-glide text-ink-muted">
              {FOOTER.blurb}
            </p>
            <ul className="flex flex-wrap gap-4">
              {FOOTER.social.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    rel="noopener noreferrer"
                    aria-label={`${COMPANY.name} on ${item.label}`}
                    className={LINK_CLASS}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Footer">
            <h2 className="text-[14px] font-strong tracking-glide text-ink-strong">
              {FOOTER.quickLinksHeading}
            </h2>
            <ul className="mt-5 flex flex-col gap-3">
              {FOOTER.quickLinks.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className={LINK_CLASS}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-[14px] font-strong tracking-glide text-ink-strong">
              {FOOTER.contactHeading}
            </h2>
            <ul className="mt-5 flex flex-col gap-3">
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
                <address className="max-w-[300px] text-[14px] leading-5 font-regular tracking-glide text-ink-muted not-italic">
                  {COMPANY.address}
                </address>
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
            </ul>
          </div>
        </div>

        <p className="mt-16 text-[12px] font-regular tracking-glide text-ink-muted">
          {COMPANY.copyright}
        </p>
      </div>
    </footer>
  );
}
