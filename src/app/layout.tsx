import type { Metadata } from "next";
import { Inter, Space_Mono, Orbitron, Audiowide } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceMono = Space_Mono({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-space-mono',
});

const orbitron = Orbitron({
  weight: ['400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  variable: '--font-orbitron',
});

const audiowide = Audiowide({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-audiowide',
});

export const metadata: Metadata = {
  title: "PERSONA | The Sovereign Internet Identity",
  description: "Your identity. Your data. Your control. Access the Web3 ecosystem with zero-knowledge proofs and decentralized identity.",
  keywords: "zero-knowledge, digital identity, privacy, blockchain, Web3, DID, verifiable credentials, PERSONA, sovereign identity",
  openGraph: {
    title: "PERSONA | The Sovereign Internet Identity",
    description: "Your identity. Your data. Your control. Access the Web3 ecosystem with zero-knowledge proofs.",
    url: "https://persona.xyz",
    siteName: "PERSONA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PERSONA | The Sovereign Internet Identity",
    description: "Your identity. Your data. Your control. Access the Web3 ecosystem with zero-knowledge proofs.",
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
      <body className={`${inter.variable} ${spaceMono.variable} ${orbitron.variable} ${audiowide.variable} antialiased midnight-bg`}>
        {/* Professional Web3 Navigation */}
        <nav className="fixed top-0 w-full z-50 backdrop-blur-xl bg-background/80 border-b border-border">
          <div className="container mx-auto px-4">
            <div className="flex h-16 items-center justify-between">
              {/* Logo */}
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="h-8 w-8 rounded-lg bg-gradient-primary flex items-center justify-center shadow-glow-primary">
                    <span className="text-sm font-bold text-primary-foreground">P</span>
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-space font-bold tracking-tight">PersonaPass</span>
                  <span className="text-xs text-muted-foreground font-medium">Digital Sovereignty</span>
                </div>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-1">
                <a href="/product" className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors">
                  Product
                </a>
                <a href="/solutions" className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors">
                  Solutions
                </a>
                <a href="/developers" className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors">
                  Developers
                </a>
                <a href="/network" className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors">
                  Network
                </a>
                <a href="/blog" className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors">
                  Resources
                </a>
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-3">
                <button className="hidden sm:flex items-center space-x-2 px-4 py-2 text-sm font-medium text-foreground bg-secondary hover:bg-secondary/80 rounded-md transition-colors border border-border">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Connect Wallet
                </button>
                <a href="/app" className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-primary-foreground bg-gradient-primary hover:shadow-glow-primary rounded-md transition-all">
                  Launch App
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>

                {/* Mobile Menu Button */}
                <button className="md:hidden p-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </nav>
        
        {/* Main Content with top padding for fixed nav */}
        <main className="pt-20">
          {children}
        </main>

        {/* Footer */}
        <footer className="border-t border-[var(--color-glass-border)] bg-[var(--color-deep-amethyst)]/50 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-6 py-16">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
              {/* Brand */}
              <div className="md:col-span-2">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-[var(--color-electric-blue)] to-[var(--color-radiant-magenta)] rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold text-lg">P</span>
                  </div>
                  <span className="text-2xl font-bold text-gradient">PERSONA</span>
                </div>
                <p className="text-[var(--color-slate-gray)] body-regular mb-6 max-w-md">
                  The sovereign internet identity. Your data. Your control. Access the Web3 ecosystem with zero-knowledge technology.
                </p>
                <div className="flex space-x-4">
                  <a href="https://github.com/PersonaPass-ID" className="text-[var(--color-slate-gray)] hover:text-[var(--color-electric-blue)] transition-colors">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </a>
                  <a href="https://discord.gg/personapass" className="text-[var(--color-slate-gray)] hover:text-[var(--color-electric-blue)] transition-colors">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                    </svg>
                  </a>
                </div>
              </div>

              {/* Product Links */}
              <div>
                <h5 className="font-semibold mb-6">Product</h5>
                <ul className="space-y-4">
                  <li><a href="/product/features" className="text-[var(--color-slate-gray)] hover:text-[var(--color-ghost-white)] transition-colors">Features</a></li>
                  <li><a href="/product/security" className="text-[var(--color-slate-gray)] hover:text-[var(--color-ghost-white)] transition-colors">Security</a></li>
                  <li><a href="/product/roadmap" className="text-[var(--color-slate-gray)] hover:text-[var(--color-ghost-white)] transition-colors">Roadmap</a></li>
                  <li><a href="/product/pricing" className="text-[var(--color-slate-gray)] hover:text-[var(--color-ghost-white)] transition-colors">Pricing</a></li>
                </ul>
              </div>

              {/* Solutions Links */}
              <div>
                <h5 className="font-semibold mb-6">Solutions</h5>
                <ul className="space-y-4">
                  <li><a href="/solutions/defi" className="text-[var(--color-slate-gray)] hover:text-[var(--color-ghost-white)] transition-colors">For DeFi</a></li>
                  <li><a href="/solutions/events" className="text-[var(--color-slate-gray)] hover:text-[var(--color-ghost-white)] transition-colors">For Events</a></li>
                  <li><a href="/solutions/daos" className="text-[var(--color-slate-gray)] hover:text-[var(--color-ghost-white)] transition-colors">For DAOs</a></li>
                  <li><a href="/solutions/enterprise" className="text-[var(--color-slate-gray)] hover:text-[var(--color-ghost-white)] transition-colors">Enterprise</a></li>
                </ul>
              </div>

              {/* Company Links */}
              <div>
                <h5 className="font-semibold mb-6">Company</h5>
                <ul className="space-y-4">
                  <li><a href="/about" className="text-[var(--color-slate-gray)] hover:text-[var(--color-ghost-white)] transition-colors">About</a></li>
                  <li><a href="/blog" className="text-[var(--color-slate-gray)] hover:text-[var(--color-ghost-white)] transition-colors">Blog</a></li>
                  <li><a href="/careers" className="text-[var(--color-slate-gray)] hover:text-[var(--color-ghost-white)] transition-colors">Careers</a></li>
                  <li><a href="/press" className="text-[var(--color-slate-gray)] hover:text-[var(--color-ghost-white)] transition-colors">Press</a></li>
                </ul>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-[var(--color-glass-border)] mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
              <p className="text-[var(--color-slate-gray)] body-small">
                © 2024 PERSONA. All rights reserved.
              </p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <a href="/privacy" className="text-[var(--color-slate-gray)] hover:text-[var(--color-ghost-white)] transition-colors body-small">Privacy</a>
                <a href="/terms" className="text-[var(--color-slate-gray)] hover:text-[var(--color-ghost-white)] transition-colors body-small">Terms</a>
                <a href="/cookies" className="text-[var(--color-slate-gray)] hover:text-[var(--color-ghost-white)] transition-colors body-small">Cookies</a>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}