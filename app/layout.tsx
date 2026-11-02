import type { Metadata, Viewport } from "next";
import "./globals.css";
import AzinhackPosterModal from "./components/AzinhackPosterModal";

export const metadata: Metadata = {
  title: "IoSC — Intel oneAPI Student Club",
  description: "The Intel oneAPI Student Club, reimagined as a Windows XP desktop.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        {children}
        <AzinhackPosterModal />
      </body>
    </html>
  );
}
