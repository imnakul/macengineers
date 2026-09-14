import type { Metadata } from "next";
import { Variant5Page } from "@/variants/variant5/Variant5Page";

export const metadata: Metadata = {
  title: "MAC Engineers — Industrial Equipment Manufacturing & Site Services | Ankleshwar, Gujarat",
  description:
    "MAC Engineers manufactures custom storage tanks, liquid mixers, HSD dispersers, silos & conveyors, and executes piping, erection, insulation & shutdown services pan-India. ISO 9001:2015 certified, zero-accident HSE culture. Variant 5: Corporate Atlas.",
  openGraph: {
    title: "MAC Engineers — Manufacturing × Site Services",
    description:
      "Custom process equipment built in Ankleshwar and certified field crews deployed pan-India. Two disciplines, one accountable partner.",
    type: "website",
  },
};

export default function Variant5Route(): React.JSX.Element {
  return <Variant5Page />;
}
