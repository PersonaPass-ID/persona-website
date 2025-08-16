'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bars3Icon, XMarkIcon, ShieldCheckIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

const navLinks = [
  { href: '#features', label: 'Features' },
  { href: '#how-it-works', label: 'How It Works' },
  { href: '#ecosystem', label: 'Ecosystem' },
  { href: '#use-cases', label: 'Use Cases' },
  { href: '/docs', label: 'Docs' },
]

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-orange-200/30 shadow-lg shadow-orange-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <ShieldCheckIcon className="h-8 w-8 text-orange-500" />
              <span className="text-xl font-bold bg-gradient-to-r from-orange-500 via-yellow-500 to-blue-600 bg-clip-text text-transparent font-mono tracking-wider">
                PersonaPass
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-gray-700 hover:text-orange-600 transition-colors duration-200 font-medium font-mono relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-500 to-blue-500 transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <Link
                href="/login"
                className="text-gray-700 hover:text-orange-600 transition-colors duration-200 font-mono font-medium"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="bg-gradient-to-r from-orange-500 via-yellow-500 to-blue-600 text-white px-6 py-2 rounded-xl font-medium font-mono hover:from-orange-600 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-orange-500/30 transform hover:scale-105"
              >
                Get Started
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-gray-700 hover:text-orange-600 transition-colors duration-200"
            >
              {isOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white/95 backdrop-blur-md border-t border-orange-200/30"
            >
              <div className="px-4 py-6 space-y-4">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="block text-gray-700 hover:text-orange-600 transition-colors duration-200 font-medium font-mono"
                  >
                    {link.label}
                  </a>
                ))}
                <div className="pt-4 space-y-3">
                  <Link
                    href="/login"
                    className="block text-gray-700 hover:text-orange-600 transition-colors duration-200 font-mono font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/register"
                    className="block w-full text-center bg-gradient-to-r from-orange-500 via-yellow-500 to-blue-600 text-white px-6 py-3 rounded-xl font-medium font-mono hover:from-orange-600 hover:to-blue-700 transition-all duration-200 shadow-lg"
                    onClick={() => setIsOpen(false)}
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  )
}