import React from "react";
import { AtlasShell } from "@/components/atlas/AtlasShell";

/** Corporate Atlas route group: the homepage and every inner page share this shell. */
export default function AtlasLayout({ children }: { children: React.ReactNode }): React.JSX.Element {
  return <AtlasShell>{children}</AtlasShell>;
}
