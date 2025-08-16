'use client'

import { motion } from 'framer-motion'
import { 
  UserPlusIcon, 
  FingerPrintIcon, 
  ShieldCheckIcon, 
  CheckBadgeIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline'

const steps = [
  {
    step: '01',
    icon: UserPlusIcon,
    title: 'Create Your Identity',
    description: 'Sign up with email and secure your account with Google Authenticator. Your journey to digital sovereignty begins here.',
    details: [
      'Email/password registration',
      'Mandatory Google Authenticator TOTP',
      'Secure key generation',
      'Blockchain wallet creation'
    ]
  },
  {
    step: '02',
    icon: FingerPrintIcon,
    title: 'Generate Your DID',
    description: 'PersonaPass creates your unique Decentralized Identifier on PersonaChain, giving you complete control over your digital identity.',
    details: [
      'Unique DID generation',
      'Cryptographic key pairs',
      'Blockchain registration',
      'Identity document creation'
    ]
  },
  {
    step: '03',
    icon: ShieldCheckIcon,
    title: 'Collect Credentials',
    description: 'Receive verifiable credentials from trusted issuers. Store them securely in your digital wallet with zero-knowledge encryption.',
    details: [
      'Receive verified credentials',
      'Secure wallet storage',
      'Zero-knowledge encryption',
      'Credential metadata management'
    ]
  },
  {
    step: '04',
    icon: CheckBadgeIcon,
    title: 'Verify Anywhere',
    description: 'Present your credentials instantly while maintaining complete privacy. Prove what you need without revealing what you don\'t.',
    details: [
      'Instant verification',
      'Selective disclosure',
      'Zero-knowledge proofs',
      'Global acceptance'
    ]
  }
]

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-24 bg-gradient-to-b from-gray-900 to-black">
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
            How PersonaPass
            <span className="block bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Works
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            Transform your digital identity in four simple steps. Experience the power of 
            blockchain-based identity that puts you in complete control.
          </motion.p>
        </div>

        {/* Steps */}
        <div className="space-y-16">
          {steps.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12`}
            >
              {/* Content */}
              <div className="flex-1 space-y-6">
                <div className="flex items-center space-x-4">
                  <span className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                    {step.step}
                  </span>
                  <div className="h-px flex-1 bg-gradient-to-r from-cyan-400/50 to-purple-400/50"></div>
                </div>
                
                <h3 className="text-2xl md:text-3xl font-bold text-white">
                  {step.title}
                </h3>
                
                <p className="text-lg text-gray-300 leading-relaxed">
                  {step.description}
                </p>

                <ul className="space-y-2">
                  {step.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="flex items-center text-gray-400">
                      <ArrowRightIcon className="h-4 w-4 text-cyan-400 mr-3 flex-shrink-0" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Visual */}
              <div className="flex-1 flex justify-center">
                <div className="relative">
                  {/* Background Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-600/20 rounded-3xl blur-xl"></div>
                  
                  {/* Card */}
                  <div className="relative bg-gray-900/80 backdrop-blur-sm border border-gray-700 rounded-3xl p-12 hover:border-gray-600 transition-all duration-300">
                    <div className="text-center">
                      <div className="inline-flex p-6 rounded-2xl bg-gradient-to-br from-cyan-500 to-purple-600 mb-6">
                        <step.icon className="h-12 w-12 text-white" />
                      </div>
                      <div className="text-6xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                        {step.step}
                      </div>
                    </div>
                  </div>
                </div>
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
          className="text-center mt-20"
        >
          <a
            href="/register"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold rounded-xl hover:from-cyan-600 hover:to-purple-700 transition-all duration-300 shadow-xl hover:shadow-cyan-500/25"
          >
            Start Your Journey
            <ArrowRightIcon className="w-5 h-5 ml-2" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}