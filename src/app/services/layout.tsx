import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services",
  description: "Engineering specialized AI solutions and high-performance digital environments tailored for international scale and measurable impact.",
  openGraph: {
    title: "Services | Mustafa Tawab",
    description: "Engineering specialized AI solutions and high-performance digital environments tailored for international scale and measurable impact.",
  },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
