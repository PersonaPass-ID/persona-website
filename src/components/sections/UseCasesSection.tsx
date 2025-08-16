'use client'

import { motion } from 'framer-motion'
import { 
  AcademicCapIcon,
  BriefcaseIcon,
  HeartIcon,
  BuildingOfficeIcon,
  ShoppingBagIcon,
  GlobeAltIcon,
  CreditCardIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline'

const useCases = [
  {
    icon: AcademicCapIcon,
    title: 'Digital Education',
    category: 'Academic Credentials',
    description: 'Instantly verify degrees, certifications, and course completions without contacting institutions.',
    benefits: [
      'Instant diploma verification',
      'Secure transcript sharing',
      'Professional certification proof',
      'Reduced fraud & forgery'
    ],
    color: 'from-blue-400 to-indigo-500'
  },
  {
    icon: BriefcaseIcon,
    title: 'Employment Verification',
    category: 'Professional Identity',
    description: 'Streamline hiring with verifiable work history, skills, and background checks.',
    benefits: [
      'Instant background checks',
      'Verified work experience',
      'Skills authentication',
      'Faster hiring process'
    ],
    color: 'from-purple-400 to-pink-500'
  },
  {
    icon: HeartIcon,
    title: 'Healthcare Records',
    category: 'Medical Identity',
    description: 'Securely share medical credentials, vaccination status, and health records while maintaining privacy.',
    benefits: [
      'Secure health data sharing',
      'Vaccination verification',
      'Medical license validation',
      'HIPAA compliance'
    ],
    color: 'from-green-400 to-emerald-500'
  },
  {
    icon: BuildingOfficeIcon,
    title: 'Government Services',
    category: 'Civic Identity',
    description: 'Access government services with digital citizenship proofs while protecting personal data.',
    benefits: [
      'Digital citizenship proof',
      'Secure voting systems',
      'Benefits eligibility',
      'Identity document replacement'
    ],
    color: 'from-red-400 to-orange-500'
  },
  {
    icon: ShoppingBagIcon,
    title: 'E-Commerce Trust',
    category: 'Digital Commerce',
    description: 'Build trust in online marketplaces with verified seller and buyer identities.',
    benefits: [
      'Verified seller reputation',
      'Trusted buyer profiles',
      'Fraud prevention',
      'Secure transactions'
    ],
    color: 'from-yellow-400 to-orange-500'
  },
  {
    icon: CreditCardIcon,
    title: 'Financial Services',
    category: 'FinTech',
    description: 'Streamline KYC/AML processes with pre-verified identity credentials and compliance.',
    benefits: [
      'Instant KYC verification',
      'AML compliance',
      'Credit history proof',
      'Regulatory compliance'
    ],
    color: 'from-teal-400 to-cyan-500'
  },
  {
    icon: GlobeAltIcon,
    title: 'Travel & Immigration',
    category: 'Global Mobility',
    description: 'Simplify border crossings and travel with digital passports and visa credentials.',
    benefits: [
      'Digital passport verification',
      'Visa status proof',
      'Travel history records',
      'Border security enhancement'
    ],
    color: 'from-indigo-400 to-purple-500'
  },
  {
    icon: UserGroupIcon,
    title: 'Social Platforms',
    category: 'Digital Communities',
    description: 'Create trusted online communities with verified member identities and reputation systems.',
    benefits: [
      'Verified user profiles',
      'Reputation systems',
      'Community trust',
      'Reduced fake accounts'
    ],
    color: 'from-pink-400 to-rose-500'
  }
]

export default function UseCasesSection() {
  return (
    <section id="use-cases" className="py-24 bg-gradient-to-b from-gray-900 to-black">
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
            Real-World
            <span className="block bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Use Cases
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            PersonaPass transforms every aspect of digital interaction across industries, 
            providing secure, private, and instant identity verification.
          </motion.p>
        </div>

        {/* Use Cases Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {useCases.map((useCase, index) => (
            <motion.div
              key={useCase.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative"
            >
              {/* Card */}
              <div className="relative h-full bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 hover:border-gray-700 transition-all duration-300 hover:transform hover:scale-105">
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${useCase.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`}></div>
                
                {/* Icon */}
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${useCase.color} mb-4`}>
                  <useCase.icon className="h-6 w-6 text-white" />
                </div>

                {/* Category */}
                <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                  {useCase.category}
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-300">
                  {useCase.title}
                </h3>

                {/* Description */}
                <p className="text-gray-400 text-sm leading-relaxed mb-4">
                  {useCase.description}
                </p>

                {/* Benefits */}
                <ul className="space-y-2">
                  {useCase.benefits.map((benefit, benefitIndex) => (
                    <li key={benefitIndex} className="flex items-center text-xs text-gray-500">
                      <div className="w-1 h-1 bg-cyan-400 rounded-full mr-2 flex-shrink-0"></div>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Industry Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-2">
              $15B
            </div>
            <div className="text-gray-400 text-sm">Identity Fraud Losses</div>
            <div className="text-gray-500 text-xs">Prevented Annually</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-2">
              90%
            </div>
            <div className="text-gray-400 text-sm">Faster Verification</div>
            <div className="text-gray-500 text-xs">Than Traditional Methods</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
              100+
            </div>
            <div className="text-gray-400 text-sm">Industries Supported</div>
            <div className="text-gray-500 text-xs">Across Global Markets</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent mb-2">
              24/7
            </div>
            <div className="text-gray-400 text-sm">Global Availability</div>
            <div className="text-gray-500 text-xs">Worldwide Coverage</div>
          </div>
        </motion.div>

        {/* Use Case Spotlight */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-20 bg-gradient-to-r from-gray-900/50 to-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-3xl p-8 md:p-12"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to Transform Your Industry?
            </h3>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Join the organizations already using PersonaPass to revolutionize their identity verification processes 
              and enhance user trust while protecting privacy.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/register"
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold rounded-xl hover:from-cyan-600 hover:to-purple-700 transition-all duration-300 shadow-xl hover:shadow-cyan-500/25"
            >
              Get Started Today
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-gray-600 text-gray-300 font-semibold rounded-xl hover:border-cyan-400 hover:text-cyan-400 transition-all duration-300"
            >
              Contact Sales
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}