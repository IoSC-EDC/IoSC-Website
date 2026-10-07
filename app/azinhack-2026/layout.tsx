import type { Metadata } from 'next';
import '@fontsource/space-grotesk/400.css';
import '@fontsource/space-grotesk/500.css';
import '@fontsource/space-grotesk/700.css';
import '@fontsource/ibm-plex-mono/400.css';
import '@fontsource/ibm-plex-mono/500.css';
import './azinhack.css';

export const metadata: Metadata = {
  title: "AZINHACK ’26 — Ideas into reality",
  description: '24 hours. Open innovation. ₹1 lakh in prizes. Build at GGSIPU USAR, East Delhi Campus, on 21–22 October 2026. Organized by IoSC, powered by TinyFish.',
  icons: { icon: '/favicon.svg' },
};

export default function AzinhackLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
