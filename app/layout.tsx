import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "IoSC — Intel oneAPI Student Club",
  description: "The Intel oneAPI Student Club, reimagined as a Windows XP desktop.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
