import React from "react";
import { preconnect } from "react-dom";
import { AtlasShell } from "@/components/atlas/AtlasShell";

/** Corporate Atlas route group: the homepage and every inner page share this shell. */
export default function AtlasLayout({ children }: { children: React.ReactNode }): React.JSX.Element {
  // Page images come from Cloudinary (src/lib/image-loader.ts); opening the connection early
  // saves the DNS/TLS round trip before the hero image.
  preconnect("https://res.cloudinary.com");
  return <AtlasShell>{children}</AtlasShell>;
}
