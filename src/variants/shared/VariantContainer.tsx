import React from "react";

export function VariantContainer({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div data-mac-variant-root="true" className={className}>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            body:has([data-mac-variant-root="true"]) > header,
            body:has([data-mac-variant-root="true"]) > footer,
            body:has([data-mac-variant-root="true"]) > a[href="#main"] {
              display: none !important;
            }
          `,
        }}
      />
      {children}
    </div>
  );
}
