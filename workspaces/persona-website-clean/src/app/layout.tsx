import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Providers } from '@/components/providers/wagmi-provider'

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "Persona | Zero-Knowledge Identity Protocol",
  description: "Revolutionary digital identity with privacy-first technology. Own your credentials, control your data, trust the protocol.",
  keywords: "zero-knowledge, digital identity, privacy, blockchain, Web3, credentials",
  openGraph: {
    title: "Persona | Zero-Knowledge Identity Protocol",
    description: "Revolutionary digital identity with privacy-first technology.",
    url: "https://personapass.xyz",
    siteName: "Persona",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Persona | Zero-Knowledge Identity Protocol",
    description: "Revolutionary digital identity with privacy-first technology.",
  },
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} antialiased`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
