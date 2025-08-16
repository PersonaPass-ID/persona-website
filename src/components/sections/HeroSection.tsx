'use client'

import { motion } from 'framer-motion'
import { ShieldCheckIcon, FingerPrintIcon, LockClosedIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

export default function HeroSection() {
  return (
    <div className="relative z-10 text-center px-4 py-20">
      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="inline-flex items-center px-4 py-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 backdrop-blur-sm mb-8"
      >
        <ShieldCheckIcon className="h-4 w-4 text-cyan-400 mr-2" />
        <span className="text-sm text-cyan-300 font-medium">
          The World's Most Secure Digital Identity Platform
        </span>
      </motion.div>

      {/* Main Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
      >
        <span className="block text-white">Your Digital Identity,</span>
        <span className="block bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          Truly Sovereign
        </span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed"
      >
        Experience the future of digital identity with PersonaPass. Built on blockchain technology 
        with decentralized identifiers, verifiable credentials, and zero-knowledge proofs for 
        ultimate privacy and security.
      </motion.p>

      {/* Feature Pills */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="flex flex-wrap justify-center gap-4 mb-12"
      >
        <div className="flex items-center px-4 py-2 bg-gray-800/50 rounded-full border border-gray-700">
          <FingerPrintIcon className="h-4 w-4 text-cyan-400 mr-2" />
          <span className="text-sm text-gray-300">Decentralized IDs</span>
        </div>
        <div className="flex items-center px-4 py-2 bg-gray-800/50 rounded-full border border-gray-700">
          <LockClosedIcon className="h-4 w-4 text-purple-400 mr-2" />
          <span className="text-sm text-gray-300">Zero-Knowledge Proofs</span>
        </div>
        <div className="flex items-center px-4 py-2 bg-gray-800/50 rounded-full border border-gray-700">
          <ShieldCheckIcon className="h-4 w-4 text-pink-400 mr-2" />
          <span className="text-sm text-gray-300">Verifiable Credentials</span>
        </div>
      </motion.div>

      {/* CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="flex flex-col sm:flex-row gap-4 justify-center items-center"
      >
        <Link
          href="/register"
          className="group relative overflow-hidden bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-cyan-600 hover:to-purple-700 transition-all duration-300 shadow-2xl hover:shadow-cyan-500/25"
        >
          <span className="relative z-10">Create Your Identity</span>
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
        </Link>
        
        <Link
          href="#how-it-works"
          className="group border-2 border-gray-600 text-gray-300 px-8 py-4 rounded-xl font-semibold text-lg hover:border-cyan-400 hover:text-cyan-400 transition-all duration-300"
        >
          <span className="flex items-center">
            See How It Works
            <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </Link>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.0 }}
        className="grid grid-cols-3 gap-8 max-w-md mx-auto mt-16 pt-16 border-t border-gray-800"
      >
        <div className="text-center">
          <div className="text-2xl md:text-3xl font-bold text-cyan-400">99.9%</div>
          <div className="text-sm text-gray-400 mt-1">Uptime</div>
        </div>
        <div className="text-center">
          <div className="text-2xl md:text-3xl font-bold text-purple-400">256-bit</div>
          <div className="text-sm text-gray-400 mt-1">Encryption</div>
        </div>
        <div className="text-center">
          <div className="text-2xl md:text-3xl font-bold text-pink-400">100%</div>
          <div className="text-sm text-gray-400 mt-1">Private</div>
        </div>
      </motion.div>
    </div>
  )
}