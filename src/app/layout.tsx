import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
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
      <body className={`${inter.variable} antialiased midnight-bg`}>
        {/* PERSONA Navigation - Midnight Dark + Neon */}
        <nav className="fixed top-0 w-full z-50 glass-nav">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              {/* Logo - Futuristic Design */}
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-[var(--color-neon-teal)] to-[var(--color-electric-purple)] rounded-xl flex items-center justify-center neon-glow">
                    <div className="w-8 h-8 bg-[var(--color-midnight-dark)] rounded-lg flex items-center justify-center">
                      <span className="tech-label text-xs text-[var(--color-neon-teal)]">P</span>
                    </div>
                  </div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-[var(--color-neon-teal)] rounded-full animate-neon-pulse"></div>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-neon display-hero">PERSONA</span>
                  <span className="tech-label text-xs text-[var(--color-slate-gray)]">Digital Sovereignty</span>
                </div>
              </div>
              
              {/* Primary Navigation - High-tech styling */}
              <div className="hidden lg:flex items-center space-x-8">
                <div className="relative group">
                  <a href="/product" className="flex items-center space-x-2 text-[var(--color-slate-gray)] hover:text-[var(--color-neon-teal)] transition-colors py-2 px-3 rounded-lg hover:bg-[var(--color-glass-light)]">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                    <span className="font-medium">Product</span>
                  </a>
                </div>
                <div className="relative group">
                  <a href="/solutions" className="flex items-center space-x-2 text-[var(--color-slate-gray)] hover:text-[var(--color-neon-teal)] transition-colors py-2 px-3 rounded-lg hover:bg-[var(--color-glass-light)]">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                    <span className="font-medium">Solutions</span>
                  </a>
                </div>
                <div className="relative group">
                  <a href="/developers" className="flex items-center space-x-2 text-[var(--color-slate-gray)] hover:text-[var(--color-neon-teal)] transition-colors py-2 px-3 rounded-lg hover:bg-[var(--color-glass-light)]">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                    <span className="font-medium">Developers</span>
                  </a>
                </div>
                <div className="relative group">
                  <a href="/network" className="flex items-center space-x-2 text-[var(--color-slate-gray)] hover:text-[var(--color-neon-teal)] transition-colors py-2 px-3 rounded-lg hover:bg-[var(--color-glass-light)]">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <span className="font-medium">Network</span>
                  </a>
                </div>
                <div className="relative group">
                  <a href="/blog" className="flex items-center space-x-2 text-[var(--color-slate-gray)] hover:text-[var(--color-neon-teal)] transition-colors py-2 px-3 rounded-lg hover:bg-[var(--color-glass-light)]">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    <span className="font-medium">Resources</span>
                  </a>
                </div>
              </div>
              
              {/* Action Buttons - Enhanced design */}
              <div className="flex items-center space-x-4">
                <button className="btn-glass flex items-center space-x-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span>Connect Wallet</span>
                </button>
                <button className="btn-primary flex items-center space-x-2">
                  <span>Launch App</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
              </div>

              {/* Mobile Menu Button */}
              <div className="lg:hidden">
                <button className="text-[var(--color-cloud-white)] p-2 hover:bg-[var(--color-glass-light)] rounded-lg">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                  <a href="#" className="text-[var(--color-slate-gray)] hover:text-[var(--color-electric-blue)] transition-colors">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/>
                    </svg>
                  </a>
                  <a href="#" className="text-[var(--color-slate-gray)] hover:text-[var(--color-electric-blue)] transition-colors">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.749.097.118.111.221.082.343-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.749-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24c6.624 0 11.99-5.367 11.99-11.987C24.007 5.367 18.641.001.012.001z.017 0z"/>
                    </svg>
                  </a>
                  <a href="#" className="text-[var(--color-slate-gray)] hover:text-[var(--color-electric-blue)] transition-colors">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
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