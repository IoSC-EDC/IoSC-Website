import type { Metadata } from "next";
import "./globals.css";
import AzinhackPosterModal from "./components/AzinhackPosterModal";

export const metadata: Metadata = {
  title: "IoSC — Intel oneAPI Student Club",
  description: "The Intel oneAPI Student Club, reimagined as a Windows XP desktop.",
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
