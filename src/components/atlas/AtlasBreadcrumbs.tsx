import React from "react";
import Link from "next/link";

export interface AtlasBreadcrumbItem {
  readonly label: string;
  /** Omit on the last item — it is the current page. */
  readonly href?: string;
}

/** Mono breadcrumb trail with right-chevron separators. The final crumb is marked as the current page. */
export function AtlasBreadcrumbs({ items }: { items: readonly AtlasBreadcrumbItem[] }): React.JSX.Element {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
        {items.map((item, index) => (
          <li key={`${item.label}-${index}`} className="flex min-w-0 items-center gap-2">
            {index > 0 ? (
              <svg aria-hidden="true" viewBox="0 0 12 12" fill="none" className="h-3 w-3 shrink-0 text-slate-400">
                <path
                  d="m4.5 2.5 3.5 3.5-3.5 3.5"
                  stroke="currentColor"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : null}
            {item.href ? (
              <Link href={item.href} className="transition-colors duration-150 hover:text-[#1B5FC4]">
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="max-w-[32ch] truncate text-[#0D1B2E]">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
