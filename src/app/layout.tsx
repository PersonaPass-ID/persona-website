import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "PersonaPass | The Most Secure Digital Identity Platform",
  description: "Create verifiable credentials, prove your identity with zero-knowledge technology, and maintain complete control over your personal data on the blockchain.",
  keywords: "zero-knowledge, digital identity, privacy, blockchain, Web3, credentials, PersonaPass",
  openGraph: {
    title: "PersonaPass | The Most Secure Digital Identity Platform",
    description: "Create verifiable credentials, prove your identity with zero-knowledge technology.",
    url: "https://personapass.xyz",
    siteName: "PersonaPass",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PersonaPass | The Most Secure Digital Identity Platform",
    description: "Create verifiable credentials, prove your identity with zero-knowledge technology.",
  },
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased bg-slate-900 text-white`}>
        {/* Simple Navigation */}
        <nav className="sticky top-0 z-50 border-b border-slate-700 bg-slate-900/95 backdrop-blur">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  P
                </div>
                <span className="text-xl font-bold">PersonaPass</span>
              </div>
              
              <div className="hidden md:flex items-center space-x-8">
                <a href="#features" className="text-slate-300 hover:text-white transition-colors">Features</a>
                <a href="#security" className="text-slate-300 hover:text-white transition-colors">Security</a>
                <a href="#status" className="text-slate-300 hover:text-white transition-colors">Network</a>
              </div>
              
              <div className="flex items-center space-x-4">
                <button className="text-slate-300 hover:text-white transition-colors">
                  Connect Wallet
                </button>
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg transition-all duration-200">
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </nav>
        
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}