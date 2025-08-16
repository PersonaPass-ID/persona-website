'use client'

import { motion } from 'framer-motion'
import { 
  ShieldCheckIcon, 
  FingerPrintIcon, 
  LockClosedIcon, 
  CubeTransparentIcon,
  DevicePhoneMobileIcon,
  GlobeAltIcon,
  ClockIcon,
  UserGroupIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline'

const features = [
  {
    icon: FingerPrintIcon,
    title: 'Decentralized Identifiers (DIDs)',
    description: 'Create and control your own unique digital identity without relying on centralized authorities. Your identity, your control.',
    color: 'from-cyan-400 to-blue-500'
  },
  {
    icon: ShieldCheckIcon,
    title: 'Verifiable Credentials',
    description: 'Issue, hold, and verify digital credentials that are cryptographically secure and instantly verifiable worldwide.',
    color: 'from-green-400 to-emerald-500'
  },
  {
    icon: LockClosedIcon,
    title: 'Zero-Knowledge Proofs',
    description: 'Prove your identity and credentials without revealing any personal information. Ultimate privacy protection.',
    color: 'from-purple-400 to-indigo-500'
  },
  {
    icon: CubeTransparentIcon,
    title: 'Blockchain Security',
    description: 'Built on PersonaChain using Cosmos SDK for enterprise-grade security and global accessibility.',
    color: 'from-orange-400 to-red-500'
  },
  {
    icon: DevicePhoneMobileIcon,
    title: 'Multi-Factor Authentication',
    description: 'Enhanced security with email/password plus mandatory Google Authenticator TOTP for bulletproof protection.',
    color: 'from-pink-400 to-rose-500'
  },
  {
    icon: GlobeAltIcon,
    title: 'Global Interoperability',
    description: 'Works seamlessly across platforms, applications, and countries. One identity for the entire digital world.',
    color: 'from-teal-400 to-cyan-500'
  },
  {
    icon: ClockIcon,
    title: 'Instant Verification',
    description: 'Verify credentials in milliseconds without compromising security or privacy. Fast, secure, reliable.',
    color: 'from-yellow-400 to-orange-500'
  },
  {
    icon: UserGroupIcon,
    title: 'Enterprise Ready',
    description: 'Designed for organizations of all sizes with compliance, scalability, and enterprise security features.',
    color: 'from-indigo-400 to-purple-500'
  },
  {
    icon: ArrowPathIcon,
    title: 'Self-Sovereign Identity',
    description: 'You own and control your digital identity completely. No third parties, no data harvesting, just you.',
    color: 'from-emerald-400 to-teal-500'
  }
]

export default function FeaturesSection() {
  return (
    <section id="features" className="py-24 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-white mb-6"
          >
            Revolutionary Digital Identity
            <span className="block bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Features
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            Experience the next generation of digital identity with cutting-edge blockchain technology, 
            zero-knowledge cryptography, and user-sovereign control.
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative"
            >
              {/* Card */}
              <div className="relative h-full bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 hover:border-gray-700 transition-all duration-300 hover:transform hover:scale-105">
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`}></div>
                
                {/* Icon */}
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.color} mb-6`}>
                  <feature.icon className="h-6 w-6 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <a
            href="/register"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold rounded-xl hover:from-cyan-600 hover:to-purple-700 transition-all duration-300 shadow-xl hover:shadow-cyan-500/25"
          >
            Experience These Features
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  )
}