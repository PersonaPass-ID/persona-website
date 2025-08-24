"use client"

import { usePathname } from 'next/navigation'
import Link from 'next/link'

const authPaths = ['/login', '/signup', '/auth/signin', '/auth/signup']

export function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAuthPage = authPaths.includes(pathname)

  return (
    <>
      {!isAuthPage && (
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
                <Link href="/login" className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-primary-foreground bg-gradient-primary hover:shadow-glow-primary rounded-md transition-all">
                  Launch App
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>

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
      )}
        
      {/* Main Content - conditional padding based on whether navbar is shown */}
      <main className={isAuthPage ? "min-h-screen" : "pt-20"}>
        {children}
      </main>
    </>
  )
}