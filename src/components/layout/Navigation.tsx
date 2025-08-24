'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bars3Icon, XMarkIcon, ShieldCheckIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

const navLinks = [
  { href: '#features', label: 'PROTOCOL' },
  { href: '#how-it-works', label: 'ARCHITECTURE' },
  { href: '#ecosystem', label: 'ECOSYSTEM' },
  { href: '#use-cases', label: 'NETWORKS' },
  { href: '/docs', label: 'DOCS' },
]

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <ShieldCheckIcon className="h-8 w-8 text-blue-400" />
              </motion.div>
              <span className="text-xl font-black bg-gradient-to-r from-blue-400 via-purple-400 to-orange-400 bg-clip-text text-transparent font-mono tracking-wider">
                PERSONA
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  className="text-gray-300 hover:text-white transition-colors duration-300 font-medium font-mono relative group text-sm tracking-wider"
                  whileHover={{ scale: 1.05 }}
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 transition-all duration-300 group-hover:w-full"></span>
                </motion.a>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <Link
                href="/login"
                className="text-gray-300 hover:text-white transition-colors duration-300 font-mono font-medium text-sm tracking-wider"
              >
                ACCESS
              </Link>
              <Link href="/signup">
                <motion.button
                  className="bg-gradient-to-r from-blue-600 via-purple-600 to-orange-600 text-white px-6 py-2 rounded-xl font-medium font-mono text-sm tracking-wider border border-white/10 backdrop-blur-sm"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  INITIALIZE
                </motion.button>
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-gray-300 hover:text-white transition-colors duration-200"
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
              className="md:hidden bg-black/90 backdrop-blur-xl border-t border-white/10"
            >
              <div className="px-4 py-6 space-y-4">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="block text-gray-300 hover:text-white transition-colors duration-200 font-medium font-mono text-sm tracking-wider"
                  >
                    {link.label}
                  </a>
                ))}
                <div className="pt-4 space-y-3">
                  <Link
                    href="/login"
                    className="block text-gray-300 hover:text-white transition-colors duration-200 font-mono font-medium text-sm tracking-wider"
                    onClick={() => setIsOpen(false)}
                  >
                    ACCESS
                  </Link>
                  <Link href="/signup">
                    <motion.button
                      className="block w-full text-center bg-gradient-to-r from-blue-600 via-purple-600 to-orange-600 text-white px-6 py-3 rounded-xl font-medium font-mono text-sm tracking-wider"
                      onClick={() => setIsOpen(false)}
                      whileTap={{ scale: 0.95 }}
                    >
                      INITIALIZE
                    </motion.button>
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