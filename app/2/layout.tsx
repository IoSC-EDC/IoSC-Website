import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "IoSC — Medieval Design Concept",
  description: "A medieval illuminated-manuscript website concept for the Intel oneAPI Student Club at GGSIPU EDC.",
};

export default function MaterialLayout({ children }: { children: React.ReactNode }) {
  return children;
}
