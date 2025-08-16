'use client'

import { motion } from 'framer-motion'
import { 
  ExclamationTriangleIcon,
  EyeSlashIcon,
  LockOpenIcon,
  ServerStackIcon,
  ShieldCheckIcon,
  UserIcon,
  FingerPrintIcon,
  CubeTransparentIcon
} from '@heroicons/react/24/outline'

const problems = [
  {
    icon: EyeSlashIcon,
    title: 'Identity Theft & Data Breaches',
    description: 'Personal data is constantly harvested, sold, and compromised by centralized platforms.'
  },
  {
    icon: LockOpenIcon,
    title: 'Loss of Privacy Control',
    description: 'Users have no control over how their personal information is collected, stored, or used.'
  },
  {
    icon: ServerStackIcon,
    title: 'Centralized Dependencies',
    description: 'Identity verification relies on centralized authorities that can fail, censor, or restrict access.'
  },
  {
    icon: ExclamationTriangleIcon,
    title: 'Fragmented Identity Management',
    description: 'Multiple accounts, passwords, and verification processes across different platforms.'
  }
]

const solutions = [
  {
    icon: ShieldCheckIcon,
    title: 'Self-Sovereign Identity',
    description: 'You own and control your digital identity completely. No third parties can access or monetize your data.'
  },
  {
    icon: FingerPrintIcon,
    title: 'Zero-Knowledge Privacy',
    description: 'Prove your identity without revealing personal information using advanced cryptographic techniques.'
  },
  {
    icon: CubeTransparentIcon,
    title: 'Decentralized Infrastructure',
    description: 'Built on blockchain technology that eliminates single points of failure and censorship.'
  },
  {
    icon: UserIcon,
    title: 'Universal Identity',
    description: 'One secure identity that works across all platforms, applications, and services globally.'
  }
]

export default function ProblemSolutionSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-black via-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Problem Section */}
        <div className="mb-24">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold text-white mb-6"
            >
              The Digital Identity
              <span className="block bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                Crisis
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-xl text-gray-300 max-w-3xl mx-auto"
            >
              Traditional identity systems are fundamentally broken. They compromise your privacy, 
              security, and autonomy while putting your personal data at constant risk.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {problems.map((problem, index) => (
              <motion.div
                key={problem.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-900/50 backdrop-blur-sm border border-red-900/30 rounded-2xl p-8 hover:border-red-800/50 transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 mr-4">
                    <problem.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">
                    {problem.title}
                  </h3>
                </div>
                <p className="text-gray-400 leading-relaxed">
                  {problem.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Transition */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center my-20"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 mb-6">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-white mb-4">
            Introducing PersonaPass
          </h3>
          <p className="text-gray-300 max-w-2xl mx-auto">
            The revolutionary solution that puts you back in control of your digital identity
          </p>
        </motion.div>

        {/* Solution Section */}
        <div>
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold text-white mb-6"
            >
              Our Revolutionary
              <span className="block bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Solution
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-xl text-gray-300 max-w-3xl mx-auto"
            >
              PersonaPass transforms digital identity with blockchain technology, zero-knowledge proofs, 
              and user-sovereign control. Experience true digital freedom.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {solutions.map((solution, index) => (
              <motion.div
                key={solution.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group bg-gray-900/50 backdrop-blur-sm border border-cyan-900/30 rounded-2xl p-8 hover:border-cyan-800/50 transition-all duration-300 hover:transform hover:scale-105"
              >
                <div className="flex items-center mb-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-600 mr-4">
                    <solution.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-300">
                    {solution.title}
                  </h3>
                </div>
                <p className="text-gray-400 leading-relaxed">
                  {solution.description}
                </p>
              </motion.div>
            ))}
          </div>
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
            Join the Revolution
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  )
}