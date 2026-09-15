import React from "react";
import Image from "next/image";
import Link from "next/link";
import { COMPANY, FOOTER, QUOTE_HREF } from "@/data/site";
import { MAC_COMPANY } from "@/variants/data/variantsData";

interface FooterLink {
  readonly label: string;
  readonly href: string;
}

const LINK_GROUPS: readonly { heading: string; links: readonly FooterLink[] }[] = [
  {
    heading: "Company",
    links: [
      { label: "About Us", href: "/about-us" },
      { label: "Careers", href: "/job-openings" },
      { label: "Blog", href: "/blog" },
      { label: "Contact Us", href: "/contact-us" },
    ],
  },
  {
    heading: "Solutions",
    links: [
      { label: "Product", href: "/product" },
      { label: "Service", href: "/service" },
      { label: "Get a Quote", href: QUOTE_HREF },
    ],
  },
];

/** Intrinsic size of the cropped logo artwork, so it renders at its true aspect ratio. */
const LOGO_WIDTH = 699;
const LOGO_HEIGHT = 256;

/** The source data still calls it Twitter; the visible label follows the platform's current name. */
function socialLabel(label: string): string {
  return label === "Twitter" ? "X" : label;
}

const CELL_CLASS = "bg-white p-6 sm:p-8";
const CELL_LABEL_CLASS = "font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500";
const LINK_CLASS =
  "text-[15px] text-[#334155] underline-offset-4 transition-colors duration-150 hover:text-[#1B5FC4] hover:underline focus-visible:text-[#1B5FC4] focus-visible:underline";

/**
 * Corporate Atlas footer, grounded as a full-width page surface. Hairline-ruled columns
 * organise the company, links and works address without turning the footer into a
 * floating card. A final strip holds legal, certification and social information.
 */
export function AtlasFooter(): React.JSX.Element {
  return (
    <footer className="border-t border-[#E3E7ED] bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 md:py-12 lg:px-8">
        <div className="grid grid-cols-2 gap-px bg-[#E3E7ED] lg:grid-cols-12">
          <div className={`${CELL_CLASS} col-span-2 lg:col-span-5`}>
            <Link href="/" aria-label="MAC Engineers home" className="inline-flex">
              <Image
                src={MAC_COMPANY.logo}
                alt="MAC Engineers"
                width={LOGO_WIDTH}
                height={LOGO_HEIGHT}
                sizes="120px"
                className="h-10 w-auto"
              />
            </Link>
            <p className="mt-6 max-w-sm font-display text-xl font-semibold leading-snug tracking-[-0.02em] text-[#0D1B2E] sm:text-2xl">
              {COMPANY.tagline}
            </p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-600">
              Custom process equipment built in Ankleshwar, Gujarat, and installed by our own crews across India.
            </p>
          </div>

          {LINK_GROUPS.map((group) => (
            <nav key={group.heading} aria-label={`${group.heading} links`} className={`${CELL_CLASS} lg:col-span-2`}>
              <h2 className={CELL_LABEL_CLASS}>{group.heading}</h2>
              <ul className="mt-5 space-y-3">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className={LINK_CLASS}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <address className={`${CELL_CLASS} col-span-2 not-italic lg:col-span-3`}>
            <h2 className={CELL_LABEL_CLASS}>Head office &amp; works</h2>
            <p className="mt-5 text-[15px] leading-relaxed text-[#334155]">{MAC_COMPANY.worksAddress}</p>
            <ul className="mt-6 space-y-3">
              <li>
                <a href={`mailto:${MAC_COMPANY.email}`} aria-label={`Email ${MAC_COMPANY.email}`} className={LINK_CLASS}>
                  {MAC_COMPANY.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${MAC_COMPANY.phone.replace(/\s/g, "")}`}
                  aria-label={`Call ${MAC_COMPANY.phoneDisplay}`}
                  className={LINK_CLASS}
                >
                  {MAC_COMPANY.phoneDisplay}
                </a>
              </li>
            </ul>
          </address>

          <div className="col-span-2 flex flex-col gap-4 bg-white px-6 py-5 sm:px-8 lg:col-span-12 lg:flex-row lg:items-center lg:justify-between">
            <p className="font-mono text-[11px] text-slate-500">
              © {new Date().getFullYear()} {COMPANY.legalName}. All rights reserved.
            </p>
            <p className="font-mono text-[11px] text-slate-500">
              {MAC_COMPANY.isoCert}
              <span aria-hidden="true" className="mx-2 text-slate-300">
                /
              </span>
              {MAC_COMPANY.hsePolicy}
            </p>
            <ul aria-label="MAC Engineers on social media" className="flex items-center gap-6">
              {FOOTER.social.map((profile) => (
                <li key={profile.href}>
                  <a
                    href={profile.href}
                    rel="noopener noreferrer"
                    aria-label={`MAC Engineers on ${socialLabel(profile.label)}`}
                    className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-600 transition-colors duration-150 hover:text-[#1B5FC4] focus-visible:text-[#1B5FC4]"
                  >
                    {socialLabel(profile.label)}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
