"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface NavItem {
  name: string;
  href: string;
  dropdown?: { name: string; href: string; description?: string }[];
}

const navigation: NavItem[] = [
  {
    name: "PersonaChain",
    href: "/personachain",
    dropdown: [
      { 
        name: "DID Staking", 
        href: "/personachain#staking", 
        description: "Stake PERSONA tokens for verified identity" 
      },
      { 
        name: "Identity Marketplace", 
        href: "/personachain#marketplace", 
        description: "Verify identities and earn rewards" 
      },
      { 
        name: "Governance", 
        href: "/personachain#governance", 
        description: "Vote on identity standards" 
      },
    ],
  },
  {
    name: "Features",
    href: "/features",
    dropdown: [
      { 
        name: "Identity Verification", 
        href: "/features/identity", 
        description: "GitHub-based digital identity" 
      },
      { 
        name: "Zero-Knowledge Proofs", 
        href: "/features/zk", 
        description: "Privacy-preserving verification" 
      },
      { 
        name: "GitHub Integration", 
        href: "/features/github", 
        description: "Developer credential issuance" 
      },
    ],
  },
  {
    name: "Developers",
    href: "/developers",
    dropdown: [
      { 
        name: "API Documentation", 
        href: "/docs", 
        description: "Complete REST API reference" 
      },
      { 
        name: "SDKs", 
        href: "/sdks", 
        description: "JavaScript/TypeScript libraries" 
      },
      { 
        name: "Examples", 
        href: "/examples", 
        description: "Code samples and tutorials" 
      },
    ],
  },
  {
    name: "Pricing",
    href: "/pricing",
  },
  {
    name: "About",
    href: "/about",
  },
];

interface NavbarProps {
  className?: string;
}

export function Navbar({ className }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/95 backdrop-blur-xl border-b border-neutral-200/60 shadow-sm"
          : "bg-white/80 backdrop-blur-md",
        className
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-shrink-0"
          >
            <Link href="/" className="flex items-center">
              <div className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                PersonaPass
              </div>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => item.dropdown && setActiveDropdown(item.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center space-x-1 text-neutral-600 hover:text-neutral-900 transition-colors duration-200 font-medium px-3 py-2 rounded-md hover:bg-neutral-50",
                    activeDropdown === item.name && "text-neutral-900 bg-neutral-50"
                  )}
                >
                  <span>{item.name}</span>
                  {item.dropdown && (
                    <span
                      className={cn(
                        "ml-1 text-xs transition-transform duration-200",
                        activeDropdown === item.name && "rotate-180"
                      )}
                    >
                      ▼
                    </span>
                  )}
                </Link>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {item.dropdown && activeDropdown === item.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.15, ease: "easeOut" }}
                      className="absolute top-full left-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-neutral-200/80 overflow-hidden"
                    >
                      <div className="p-2">
                        {item.dropdown.map((dropdownItem) => (
                          <Link
                            key={dropdownItem.name}
                            href={dropdownItem.href}
                            className="block p-4 rounded-lg hover:bg-neutral-50 transition-colors duration-150 group"
                          >
                            <div className="font-semibold text-neutral-900 group-hover:text-primary-600 transition-colors duration-150">
                              {dropdownItem.name}
                            </div>
                            {dropdownItem.description && (
                              <div className="text-sm text-neutral-500 mt-1">
                                {dropdownItem.description}
                              </div>
                            )}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <Button variant="ghost" asChild>
              <Link href="/auth/github">Sign In</Link>
            </Button>
            <Button asChild>
              <Link href="/auth/github">Get Started</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-neutral-600 hover:text-neutral-900 transition-colors duration-200 p-2"
            >
              <div className={cn("w-6 h-0.5 bg-current transition-all duration-200", isMobileMenuOpen && "rotate-45 translate-y-1.5")} />
              <div className={cn("w-6 h-0.5 bg-current my-1 transition-all duration-200", isMobileMenuOpen && "opacity-0")} />
              <div className={cn("w-6 h-0.5 bg-current transition-all duration-200", isMobileMenuOpen && "-rotate-45 -translate-y-1.5")} />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="md:hidden border-t border-neutral-200/50 bg-white/95 backdrop-blur-xl"
            >
              <div className="px-2 pt-2 pb-4 space-y-1">
                {navigation.map((item) => (
                  <div key={item.name}>
                    <Link
                      href={item.href}
                      className="block px-4 py-3 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 rounded-lg font-medium transition-all duration-150"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                    {item.dropdown?.map((dropdownItem) => (
                      <Link
                        key={dropdownItem.name}
                        href={dropdownItem.href}
                        className="block px-8 py-2 text-sm text-neutral-500 hover:text-neutral-700 hover:bg-neutral-50 rounded-lg transition-all duration-150"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {dropdownItem.name}
                      </Link>
                    ))}
                  </div>
                ))}
                
                {/* Mobile CTA Buttons */}
                <div className="border-t border-neutral-200/50 pt-4 mt-4 space-y-2">
                  <Button variant="ghost" asChild className="w-full justify-start">
                    <Link href="/auth/github" onClick={() => setIsMobileMenuOpen(false)}>
                      Sign In
                    </Link>
                  </Button>
                  <Button asChild className="w-full">
                    <Link href="/auth/github" onClick={() => setIsMobileMenuOpen(false)}>
                      Get Started
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}