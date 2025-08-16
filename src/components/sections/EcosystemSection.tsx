'use client'

import { motion } from 'framer-motion'
import { 
  CubeTransparentIcon,
  FingerPrintIcon,
  ShieldCheckIcon,
  LockClosedIcon,
  ServerStackIcon,
  DevicePhoneMobileIcon,
  GlobeAltIcon,
  DocumentCheckIcon
} from '@heroicons/react/24/outline'

const ecosystemComponents = [
  {
    icon: CubeTransparentIcon,
    title: 'PersonaChain',
    category: 'Blockchain Infrastructure',
    description: 'Our custom Cosmos SDK blockchain provides the secure, decentralized foundation for all identity operations.',
    features: [
      'Cosmos SDK based',
      'Proof-of-Stake consensus',
      'High throughput',
      'Enterprise security'
    ],
    color: 'from-blue-400 to-cyan-500'
  },
  {
    icon: FingerPrintIcon,
    title: 'Decentralized Identifiers',
    category: 'Identity Layer',
    description: 'Unique, cryptographically verifiable identifiers that you own and control completely.',
    features: [
      'W3C DID standard',
      'Self-sovereign control',
      'Cryptographic security',
      'Global uniqueness'
    ],
    color: 'from-purple-400 to-indigo-500'
  },
  {
    icon: ShieldCheckIcon,
    title: 'Verifiable Credentials',
    category: 'Credential System',
    description: 'Digital credentials that are cryptographically secure, instantly verifiable, and privacy-preserving.',
    features: [
      'W3C VC standard',
      'Instant verification',
      'Tamper-proof',
      'Selective disclosure'
    ],
    color: 'from-green-400 to-emerald-500'
  },
  {
    icon: LockClosedIcon,
    title: 'Zero-Knowledge Proofs',
    category: 'Privacy Technology',
    description: 'Prove claims about your identity without revealing any underlying personal information.',
    features: [
      'Mathematical privacy',
      'Selective disclosure',
      'Credential minimization',
      'Identity protection'
    ],
    color: 'from-pink-400 to-purple-500'
  },
  {
    icon: ServerStackIcon,
    title: 'Identity Wallet',
    category: 'User Interface',
    description: 'Secure digital wallet for storing and managing your DIDs, credentials, and keys.',
    features: [
      'Secure key storage',
      'Credential management',
      'Multi-device sync',
      'Backup & recovery'
    ],
    color: 'from-orange-400 to-red-500'
  },
  {
    icon: DevicePhoneMobileIcon,
    title: 'Mobile SDK',
    category: 'Developer Tools',
    description: 'Complete SDK for integrating PersonaPass identity into any mobile or web application.',
    features: [
      'Cross-platform',
      'Easy integration',
      'Comprehensive APIs',
      'Developer support'
    ],
    color: 'from-teal-400 to-cyan-500'
  },
  {
    icon: GlobeAltIcon,
    title: 'Global Network',
    category: 'Infrastructure',
    description: 'Worldwide network of validators and nodes ensuring 24/7 availability and resilience.',
    features: [
      '99.9% uptime',
      'Global distribution',
      'Automatic scaling',
      'Fault tolerance'
    ],
    color: 'from-yellow-400 to-orange-500'
  },
  {
    icon: DocumentCheckIcon,
    title: 'Compliance Suite',
    category: 'Enterprise Features',
    description: 'Built-in compliance with global regulations including GDPR, KYC, and industry standards.',
    features: [
      'GDPR compliant',
      'KYC/AML support',
      'Audit trails',
      'Regulatory reporting'
    ],
    color: 'from-indigo-400 to-purple-500'
  }
]

export default function EcosystemSection() {
  return (
    <section id="ecosystem" className="py-24 bg-gradient-to-b from-black to-gray-900">
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
            The PersonaPass
            <span className="block bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Ecosystem
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            A complete ecosystem of interconnected technologies working together to provide 
            the world's most secure and private digital identity platform.
          </motion.p>
        </div>

        {/* Ecosystem Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {ecosystemComponents.map((component, index) => (
            <motion.div
              key={component.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative"
            >
              {/* Card */}
              <div className="relative h-full bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 hover:border-gray-700 transition-all duration-300 hover:transform hover:scale-105">
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${component.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`}></div>
                
                {/* Icon */}
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${component.color} mb-4`}>
                  <component.icon className="h-6 w-6 text-white" />
                </div>

                {/* Category */}
                <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                  {component.category}
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-300">
                  {component.title}
                </h3>

                {/* Description */}
                <p className="text-gray-400 text-sm leading-relaxed mb-4">
                  {component.description}
                </p>

                {/* Features */}
                <ul className="space-y-1">
                  {component.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-xs text-gray-500">
                      <div className="w-1 h-1 bg-cyan-400 rounded-full mr-2 flex-shrink-0"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Architecture Diagram */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              How It All Works Together
            </h3>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Each component of the PersonaPass ecosystem is designed to work seamlessly with the others, 
              creating a unified, secure, and user-friendly digital identity experience.
            </p>
          </div>

          {/* Simple Flow Diagram */}
          <div className="relative">
            <div className="flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-8">
              {/* User */}
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <DevicePhoneMobileIcon className="h-10 w-10 text-white" />
                </div>
                <div className="text-white font-semibold">User</div>
                <div className="text-gray-400 text-sm">Mobile/Web App</div>
              </div>

              {/* Arrow */}
              <div className="hidden md:block">
                <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>

              {/* PersonaPass */}
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <ShieldCheckIcon className="h-10 w-10 text-white" />
                </div>
                <div className="text-white font-semibold">PersonaPass</div>
                <div className="text-gray-400 text-sm">Identity Platform</div>
              </div>

              {/* Arrow */}
              <div className="hidden md:block">
                <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>

              {/* PersonaChain */}
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <CubeTransparentIcon className="h-10 w-10 text-white" />
                </div>
                <div className="text-white font-semibold">PersonaChain</div>
                <div className="text-gray-400 text-sm">Blockchain Network</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <a
            href="/docs"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold rounded-xl hover:from-cyan-600 hover:to-purple-700 transition-all duration-300 shadow-xl hover:shadow-cyan-500/25"
          >
            Explore Technical Documentation
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  )
}