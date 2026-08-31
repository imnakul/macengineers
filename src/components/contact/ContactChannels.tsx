import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { CONTACT_PAGE } from "@/data/contact";
import { COMPANY } from "@/data/site";

/** Google Maps search link built from the published address — no third-party embed. */
const DIRECTIONS_HREF = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  COMPANY.address,
)}`;

const VALUE_CLASS =
  "text-[16px] leading-[24px] font-block tracking-glide text-ink-strong";

/**
 * The non-form ways to reach the company, as a ruled cell block.
 *
 * The works address links out to Google Maps rather than embedding a map iframe: an
 * embed loads third-party tracking on a page whose whole job is collecting a person's
 * contact details, and it costs a large amount of weight for something a single tap
 * handles better on a phone.
 */
export function ContactChannels(): React.JSX.Element {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-mono text-[10px] tracking-tech text-ink-muted uppercase">
        {CONTACT_PAGE.channelsHeading}
      </h2>

      <ul className="grid gap-px overflow-hidden rounded-card bg-hairline-strong shadow-ring sm:grid-cols-2 lg:grid-cols-1">
        {CONTACT_PAGE.channels.map((channel, index) => (
          <li key={channel.label}>
            <Reveal delay={index * 0.05}>
              <div className="flex h-full flex-col gap-2 bg-canvas p-6">
                <span className="font-mono text-[10px] tracking-tech text-ink-muted uppercase">
                  {channel.label}
                </span>
                {channel.href ? (
                  <Link
                    href={channel.href}
                    aria-label={`${channel.label}: ${channel.value}`}
                    className={`${VALUE_CLASS} transition-[color] duration-150 ease-ui hover:text-accent`}
                  >
                    {channel.value}
                  </Link>
                ) : (
                  <span className={VALUE_CLASS}>{channel.value}</span>
                )}
              </div>
            </Reveal>
          </li>
        ))}
      </ul>

      <Reveal delay={0.2}>
        <Link
          href={DIRECTIONS_HREF}
          rel="noopener noreferrer"
          target="_blank"
          aria-label={`Open directions to ${COMPANY.name} in Google Maps, opens in a new tab`}
          className="group inline-flex items-center gap-2 font-mono text-[11px] tracking-tech text-ink-strong uppercase transition-[color] duration-150 ease-ui hover:text-accent"
        >
          Get directions
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
        </Link>
      </Reveal>
    </div>
  );
}
