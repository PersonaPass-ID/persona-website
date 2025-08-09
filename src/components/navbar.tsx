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
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled
          ? "bg-black/70 backdrop-blur-xl border-b border-white/10 shadow-2xl"
          : "bg-black/30 backdrop-blur-lg border-b border-white/5",
        className
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-shrink-0 relative group"
          >
            <Link href="/" className="flex items-center">
              {/* Logo Icon */}
              <div className="relative mr-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">P</span>
                </div>
                
                {/* Glow Effect */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 opacity-0 group-hover:opacity-50 blur-lg transition-opacity duration-300 -z-10" />
              </div>
              
              {/* Logo Text */}
              <div className="text-2xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
                PersonaPass
              </div>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-2">
            {navigation.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => item.dropdown && setActiveDropdown(item.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <motion.div
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center space-x-1 text-white/70 hover:text-white transition-all duration-300 font-medium px-4 py-3 rounded-xl hover:bg-white/10 backdrop-blur-sm",
                      activeDropdown === item.name && "text-white bg-white/10"
                    )}
                  >
                    <span>{item.name}</span>
                    {item.dropdown && (
                      <motion.span
                        className="ml-1 text-xs"
                        animate={{ 
                          rotate: activeDropdown === item.name ? 180 : 0 
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        ▼
                      </motion.span>
                    )}
                  </Link>
                </motion.div>

                {/* Enhanced Dropdown Menu */}
                <AnimatePresence>
                  {item.dropdown && activeDropdown === item.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute top-full left-0 mt-4 w-80 bg-black/80 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden shadow-2xl"
                    >
                      <div className="p-2">
                        {item.dropdown.map((dropdownItem, index) => (
                          <motion.div
                            key={dropdownItem.name}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                          >
                            <Link
                              href={dropdownItem.href}
                              className="block p-4 rounded-xl hover:bg-white/10 transition-all duration-300 group relative overflow-hidden"
                            >
                              {/* Hover Gradient Effect */}
                              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                              
                              <div className="relative">
                                <div className="font-semibold text-white group-hover:text-gradient transition-all duration-300">
                                  {dropdownItem.name}
                                </div>
                                {dropdownItem.description && (
                                  <div className="text-sm text-white/50 mt-1 group-hover:text-white/70 transition-colors duration-300">
                                    {dropdownItem.description}
                                  </div>
                                )}
                              </div>
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                      
                      {/* Bottom Glow */}
                      <div className="h-1 bg-gradient-to-r from-purple-500/50 to-blue-500/50" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Enhanced CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                variant="ghost" 
                asChild
                className="text-white/70 hover:text-white hover:bg-white/10 backdrop-blur-sm rounded-xl font-medium"
              >
                <Link href="/login">Sign In</Link>
              </Button>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative group"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl blur opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
              <Button
                asChild
                className="relative bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl font-semibold px-6 shadow-lg"
              >
                <Link href="/get-started">Get Started</Link>
              </Button>
            </motion.div>
          </div>

          {/* Enhanced Mobile Menu Button */}
          <div className="lg:hidden">
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white/70 hover:text-white transition-all duration-300 p-3 rounded-xl hover:bg-white/10 backdrop-blur-sm"
              whileTap={{ scale: 0.95 }}
            >
              <div className="relative w-6 h-6">
                <motion.div
                  className="absolute w-6 h-0.5 bg-current transition-all duration-300"
                  animate={{
                    rotate: isMobileMenuOpen ? 45 : 0,
                    y: isMobileMenuOpen ? 8 : 0,
                  }}
                />
                <motion.div
                  className="absolute w-6 h-0.5 bg-current top-2"
                  animate={{
                    opacity: isMobileMenuOpen ? 0 : 1,
                  }}
                />
                <motion.div
                  className="absolute w-6 h-0.5 bg-current top-4"
                  animate={{
                    rotate: isMobileMenuOpen ? -45 : 0,
                    y: isMobileMenuOpen ? -8 : 0,
                  }}
                />
              </div>
            </motion.button>
          </div>
        </div>

        {/* Enhanced Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="lg:hidden border-t border-white/10 bg-black/90 backdrop-blur-xl"
            >
              <div className="px-4 pt-6 pb-8 space-y-2">
                {navigation.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      className="block px-4 py-4 text-white/70 hover:text-white hover:bg-white/10 rounded-xl font-medium transition-all duration-300"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                    {item.dropdown?.map((dropdownItem, dropIndex) => (
                      <motion.div
                        key={dropdownItem.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: (index * 0.1) + (dropIndex * 0.05) }}
                      >
                        <Link
                          href={dropdownItem.href}
                          className="block px-8 py-3 text-sm text-white/50 hover:text-white/80 hover:bg-white/5 rounded-lg transition-all duration-300"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {dropdownItem.name}
                        </Link>
                      </motion.div>
                    ))}
                  </motion.div>
                ))}
                
                {/* Enhanced Mobile CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="border-t border-white/10 pt-6 mt-6 space-y-3"
                >
                  <Button 
                    variant="ghost" 
                    asChild 
                    className="w-full justify-start text-white/70 hover:text-white hover:bg-white/10 rounded-xl"
                  >
                    <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                      Sign In
                    </Link>
                  </Button>
                  <Button 
                    asChild 
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-xl"
                  >
                    <Link href="/get-started" onClick={() => setIsMobileMenuOpen(false)}>
                      Get Started
                    </Link>
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navbar Bottom Glow Effect */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </motion.nav>
  );
}