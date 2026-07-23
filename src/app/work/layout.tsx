import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work",
  description:
    "A high-integrity repository of production architectures and specialized software deployments.",
  openGraph: {
    title: "Work | Mustafa Tawab",
    description:
      "A high-integrity repository of production architectures and specialized software deployments.",
  },
};

export default function WorkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
