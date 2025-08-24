'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { ArrowRight, Shield, Zap, Globe, Eye, Fingerprint, Key, Cpu, Database, Network, Lock, Users, Rocket, Star, CheckCircle, ArrowUpRight, Code, Download, Play, Pause, Volume2, Settings, Search, Filter, BarChart3, TrendingUp, Layers, GitBranch, Smartphone, Monitor, Tablet, Wifi, CloudLightning, Gamepad2 } from 'lucide-react'
import Navigation from '@/components/layout/Navigation'
import Link from 'next/link'

export default function HomePage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const heroRef = useRef(null)
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 1000], [0, -500])
  const y2 = useTransform(scrollY, [0, 1000], [0, -200])

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', updateMousePosition)
    return () => window.removeEventListener('mousemove', updateMousePosition)
  }, [])

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Navigation */}
      <Navigation />
      
      {/* Animated Grid Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/20 via-purple-900/20 to-orange-900/20" />
      </div>

      {/* Floating Particles */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {Array.from({ length: 50 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>


      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 z-20">
        <div className="max-w-7xl mx-auto text-center">
          {/* 3D Floating Logo */}
          <motion.div
            className="mb-8"
            style={{ y: y1 }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <div className="relative inline-block">
              <motion.div
                className="text-8xl md:text-9xl font-black bg-gradient-to-r from-blue-400 via-purple-400 to-orange-400 bg-clip-text text-transparent"
                animate={{
                  rotateX: [0, 5, 0, -5, 0],
                  rotateY: [0, -10, 0, 10, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{
                  textShadow: '0 0 40px rgba(59, 130, 246, 0.3), 0 0 80px rgba(147, 51, 234, 0.2)',
                  perspective: '1000px',
                  transformStyle: 'preserve-3d',
                }}
              >
                PERSONA
              </motion.div>
              <motion.div
                className="absolute inset-0 text-8xl md:text-9xl font-black text-white/10 -z-10"
                animate={{
                  x: [2, -2, 2],
                  y: [2, -2, 2],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                PERSONA
              </motion.div>
            </div>
          </motion.div>

          {/* Glitch Effect Subtitle */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <motion.h1
              className="text-2xl md:text-4xl font-mono font-bold text-gray-300 mb-4"
              animate={{
                textShadow: [
                  '2px 2px #ff00c1, -2px -2px #00ff41',
                  '2px 2px #00ff41, -2px -2px #ff00c1',
                  '2px 2px #ff00c1, -2px -2px #00ff41',
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            >
              DIGITAL_SOVEREIGNTY.EXE
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl text-gray-400 max-w-4xl mx-auto leading-relaxed font-light"
              animate={{
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
              }}
            >
              The most advanced decentralized identity protocol on the blockchain. 
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 font-medium">
                Zero-knowledge • Self-sovereign • Quantum-resistant
              </span>
            </motion.p>
          </motion.div>

          {/* Holographic CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Link href="/signup">
              <motion.button
                className="group relative px-12 py-6 bg-gradient-to-r from-blue-600 via-purple-600 to-orange-600 rounded-2xl font-bold text-xl font-mono overflow-hidden"
                whileHover={{ scale: 1.02, y: -3 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                onHoverStart={() => {}}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-orange-400 opacity-0 group-hover:opacity-100"
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  style={{
                    backgroundSize: '200% 200%',
                  }}
                />
                <div className="relative z-10 flex items-center space-x-3">
                  <span>INITIALIZE_IDENTITY</span>
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="w-6 h-6" />
                  </motion.div>
                </div>
                <div className="absolute inset-0 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10" />
              </motion.button>
            </Link>

            <motion.button
              className="group px-12 py-6 bg-black/30 backdrop-blur-xl border border-white/20 rounded-2xl font-bold text-xl font-mono hover:border-white/40 transition-all duration-500"
              whileHover={{ scale: 1.02, y: -3 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <div className="flex items-center space-x-3">
                <span>VIEW_PROTOCOL</span>
                <Eye className="w-6 h-6" />
              </div>
            </motion.button>
          </motion.div>

          {/* Stats Dashboard */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
            style={{ y: y2 }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            {[
              { value: "1M+", label: "IDENTITIES_SECURED", icon: Shield },
              { value: "99.9%", label: "UPTIME_GUARANTEE", icon: Zap },
              { value: "∞", label: "PRIVACY_LEVEL", icon: Eye },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="relative p-8 bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl"
                whileHover={{ scale: 1.05, y: -5 }}
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(59, 130, 246, 0.1)',
                    '0 0 40px rgba(147, 51, 234, 0.2)',
                    '0 0 20px rgba(59, 130, 246, 0.1)',
                  ],
                }}
                transition={{
                  boxShadow: { duration: 3, repeat: Infinity },
                  scale: { duration: 0.3 },
                  y: { duration: 0.3 },
                }}
              >
                <div className="text-center">
                  <stat.icon className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                  <motion.div
                    className="text-4xl font-black font-mono text-white mb-2"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-gray-400 font-mono text-sm tracking-widest">
                    {stat.label}
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 rounded-2xl" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Showcase */}
      <section className="relative py-32 px-4 sm:px-6 lg:px-8 z-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-6xl font-black mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
              NEXT-GEN ARCHITECTURE
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto font-mono">
              Built with quantum-resistant cryptography and zero-knowledge protocols
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Fingerprint,
                title: "BIOMETRIC_ZERO_KNOWLEDGE",
                description: "Prove your identity without revealing biometric data using advanced ZK-SNARK protocols",
                color: "from-blue-500 to-cyan-500",
              },
              {
                icon: Database,
                title: "DECENTRALIZED_STORAGE",
                description: "Your identity data is sharded across the blockchain with quantum encryption",
                color: "from-purple-500 to-pink-500",
              },
              {
                icon: Network,
                title: "CROSS_CHAIN_BRIDGE",
                description: "Seamless identity verification across Ethereum, Cosmos, and Solana ecosystems",
                color: "from-orange-500 to-red-500",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="group relative p-8 bg-black/30 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, y: -10 }}
              >
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                />
                <div className="relative z-10">
                  <feature.icon className="w-16 h-16 text-white mb-6" />
                  <h3 className="text-2xl font-black font-mono mb-4 text-white">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
                <motion.div
                  className="absolute -top-10 -right-10 w-20 h-20 rounded-full bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl"
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: index * 0.5,
                  }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="relative py-32 px-4 sm:px-6 lg:px-8 z-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-6xl font-black mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
              REVOLUTIONARY PROTOCOL
            </h2>
            <p className="text-xl text-gray-400 max-w-4xl mx-auto font-mono leading-relaxed">
              PersonaPass operates on a groundbreaking three-layer architecture that combines blockchain security, 
              zero-knowledge privacy, and biometric authentication into the world's most advanced digital identity system.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
            {[
              {
                step: "01",
                title: "BIOMETRIC_ENROLLMENT",
                description: "Your unique biometric patterns are processed locally on your device using advanced neural networks. We never store your actual biometric data - only mathematical proofs of authenticity.",
                icon: Fingerprint,
                color: "from-blue-500 to-cyan-400",
              },
              {
                step: "02",
                title: "ZERO_KNOWLEDGE_PROOF",
                description: "Our ZK-SNARK circuits generate cryptographic proofs that verify your identity without revealing any personal information. You prove you are you, without showing who you are.",
                icon: Shield,
                color: "from-purple-500 to-pink-400",
              },
              {
                step: "03",
                title: "BLOCKCHAIN_VERIFICATION",
                description: "Your identity proofs are validated across our distributed PersonaChain network, ensuring global recognition while maintaining complete privacy and user sovereignty.",
                icon: Database,
                color: "from-orange-500 to-red-400",
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                className="relative p-8 bg-black/30 backdrop-blur-xl border border-white/10 rounded-3xl"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.3 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div className="absolute top-4 right-4">
                  <span className={`text-2xl font-black font-mono bg-gradient-to-r ${step.color} bg-clip-text text-transparent`}>
                    {step.step}
                  </span>
                </div>
                <step.icon className="w-16 h-16 text-white mb-6" />
                <h3 className="text-2xl font-black font-mono mb-4 text-white">
                  {step.title}
                </h3>
                <p className="text-gray-300 leading-relaxed text-lg">
                  {step.description}
                </p>
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 rounded-3xl`}
                  whileHover={{ opacity: 0.05 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            ))}
          </div>

          {/* Visual Process Flow */}
          <motion.div
            className="relative"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <div className="flex justify-center items-center space-x-8">
              <motion.div className="w-4 h-4 bg-blue-500 rounded-full" animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 2, repeat: Infinity }} />
              <div className="w-20 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500" />
              <motion.div className="w-4 h-4 bg-purple-500 rounded-full" animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 2, repeat: Infinity, delay: 0.7 }} />
              <div className="w-20 h-0.5 bg-gradient-to-r from-purple-500 to-orange-500" />
              <motion.div className="w-4 h-4 bg-orange-500 rounded-full" animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 2, repeat: Infinity, delay: 1.4 }} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Security & Privacy Section */}
      <section className="relative py-32 px-4 sm:px-6 lg:px-8 z-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl font-black mb-8 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                MILITARY-GRADE SECURITY
              </h2>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                PersonaPass employs the same cryptographic standards used by intelligence agencies and financial institutions. 
                Your identity is protected by quantum-resistant algorithms that remain secure even against future computing threats.
              </p>
              <div className="space-y-4">
                {[
                  "AES-256 encryption with rotating keys",
                  "Post-quantum cryptographic signatures",
                  "Hardware security module integration",
                  "Zero-knowledge proof verification",
                  "Distributed consensus mechanisms",
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center space-x-4"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <CheckCircle className="w-6 h-6 text-green-400" />
                    <span className="text-gray-300 text-lg">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="relative p-8 bg-black/20 backdrop-blur-xl border border-white/10 rounded-3xl">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-600/10 rounded-3xl" />
                <Lock className="w-20 h-20 text-blue-400 mb-6" />
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { label: "ATTACK VECTORS BLOCKED", value: "99.999%" },
                    { label: "ENCRYPTION STRENGTH", value: "256-bit" },
                    { label: "QUANTUM RESISTANCE", value: "ACTIVE" },
                    { label: "THREAT DETECTION", value: "REAL-TIME" },
                  ].map((stat, index) => (
                    <motion.div
                      key={index}
                      className="text-center"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.2 }}
                      viewport={{ once: true }}
                    >
                      <div className="text-2xl font-black font-mono text-blue-400 mb-1">
                        {stat.value}
                      </div>
                      <div className="text-xs text-gray-400 font-mono tracking-wider">
                        {stat.label}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="relative py-32 px-4 sm:px-6 lg:px-8 z-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-6xl font-black mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
              ENDLESS POSSIBILITIES
            </h2>
            <p className="text-xl text-gray-400 max-w-4xl mx-auto font-mono leading-relaxed">
              From decentralized finance to metaverse gaming, PersonaPass is your universal passport to the Web3 ecosystem. 
              One identity, infinite access, complete privacy.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                category: "DEFI_PROTOCOLS",
                title: "Decentralized Finance",
                description: "Access lending, borrowing, and trading platforms across all blockchains with verified identity while maintaining complete privacy.",
                icon: TrendingUp,
                color: "from-green-500 to-emerald-400",
                examples: ["Uniswap", "Aave", "Compound", "MakerDAO"]
              },
              {
                category: "METAVERSE_GAMING",
                title: "Virtual Worlds",
                description: "Seamlessly move between virtual worlds and games while maintaining your reputation, assets, and achievements.",
                icon: Gamepad2,
                color: "from-purple-500 to-violet-400",
                examples: ["Sandbox", "Decentraland", "Axie Infinity", "Horizon"]
              },
              {
                category: "SOCIAL_NETWORKS",
                title: "Web3 Social",
                description: "Build genuine connections on decentralized social platforms with verified human identity and spam-free interactions.",
                icon: Users,
                color: "from-blue-500 to-cyan-400",
                examples: ["Lens Protocol", "Farcaster", "Mirror", "Friend.tech"]
              },
              {
                category: "ENTERPRISE_AUTH",
                title: "Corporate Access",
                description: "Replace traditional corporate authentication systems with passwordless, biometric-verified access to sensitive systems.",
                icon: Shield,
                color: "from-orange-500 to-red-400",
                examples: ["SSO Systems", "VPN Access", "Database Auth", "API Keys"]
              },
              {
                category: "IOT_DEVICES",
                title: "Smart Devices",
                description: "Securely authenticate with IoT devices, smart homes, and connected vehicles using biometric verification.",
                icon: Smartphone,
                color: "from-teal-500 to-cyan-400",
                examples: ["Smart Homes", "Connected Cars", "Wearables", "Industrial IoT"]
              },
              {
                category: "GOVERNMENT_ID",
                title: "Digital Citizenship",
                description: "Future-proof government services with blockchain-verified digital citizenship and voting systems.",
                icon: Globe,
                color: "from-indigo-500 to-purple-400",
                examples: ["Digital Voting", "Tax Systems", "Healthcare", "Benefits"]
              },
            ].map((useCase, index) => (
              <motion.div
                key={index}
                className="group relative p-8 bg-black/30 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${useCase.color} opacity-0 group-hover:opacity-5`}
                  transition={{ duration: 0.3 }}
                />
                <div className="relative z-10">
                  <useCase.icon className="w-12 h-12 text-white mb-4" />
                  <div className="text-sm font-mono text-gray-400 mb-2 tracking-widest">
                    {useCase.category}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">
                    {useCase.title}
                  </h3>
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {useCase.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {useCase.examples.map((example, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs font-mono text-gray-300"
                      >
                        {example}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Specifications */}
      <section className="relative py-32 px-4 sm:px-6 lg:px-8 z-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-6xl font-black mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
              TECHNICAL EXCELLENCE
            </h2>
            <p className="text-xl text-gray-400 max-w-4xl mx-auto font-mono leading-relaxed">
              Built on cutting-edge technology stack with enterprise-grade infrastructure capable of handling global scale operations.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Performance Metrics */}
            <motion.div
              className="p-8 bg-black/20 backdrop-blur-xl border border-white/10 rounded-3xl"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-black mb-8 text-white flex items-center">
                <BarChart3 className="w-8 h-8 text-blue-400 mr-4" />
                PERFORMANCE METRICS
              </h3>
              <div className="space-y-6">
                {[
                  { metric: "Transaction Speed", value: "50,000 TPS", description: "Lightning-fast identity verification" },
                  { metric: "Global Latency", value: "<50ms", description: "Worldwide response time" },
                  { metric: "Uptime Guarantee", value: "99.99%", description: "Enterprise SLA compliance" },
                  { metric: "Proof Generation", value: "<2 seconds", description: "ZK proof creation time" },
                  { metric: "Network Nodes", value: "10,000+", description: "Distributed validation network" },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex justify-between items-center p-4 bg-black/20 rounded-xl border border-white/5"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div>
                      <div className="text-white font-semibold">{item.metric}</div>
                      <div className="text-gray-400 text-sm">{item.description}</div>
                    </div>
                    <div className="text-2xl font-black font-mono text-blue-400">
                      {item.value}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Technology Stack */}
            <motion.div
              className="p-8 bg-black/20 backdrop-blur-xl border border-white/10 rounded-3xl"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-black mb-8 text-white flex items-center">
                <Code className="w-8 h-8 text-purple-400 mr-4" />
                TECHNOLOGY STACK
              </h3>
              <div className="space-y-8">
                {[
                  {
                    category: "Blockchain Layer",
                    technologies: ["Cosmos SDK", "Tendermint", "IBC Protocol", "CosmWasm"],
                    color: "text-blue-400"
                  },
                  {
                    category: "Cryptography",
                    technologies: ["ZK-SNARKs", "Bulletproofs", "Ed25519", "BLS Signatures"],
                    color: "text-purple-400"
                  },
                  {
                    category: "Infrastructure",
                    technologies: ["AWS Global", "Kubernetes", "Redis Cluster", "PostgreSQL"],
                    color: "text-green-400"
                  },
                  {
                    category: "Security",
                    technologies: ["HSM Integration", "TEE Support", "Multi-sig", "Threshold Crypto"],
                    color: "text-orange-400"
                  },
                ].map((stack, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <h4 className={`text-lg font-bold mb-3 ${stack.color}`}>
                      {stack.category}
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      {stack.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-2 bg-white/5 backdrop-blur-sm rounded-lg text-sm font-mono text-gray-300 border border-white/10"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section className="relative py-32 px-4 sm:px-6 lg:px-8 z-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-6xl font-black mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
              FUTURE ROADMAP
            </h2>
            <p className="text-xl text-gray-400 max-w-4xl mx-auto font-mono leading-relaxed">
              Our ambitious roadmap extends PersonaPass capabilities into every corner of the digital universe, 
              establishing it as the universal identity protocol for Web3 and beyond.
            </p>
          </motion.div>

          <div className="relative">
            {/* Vertical Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-0.5 h-full w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-orange-500" />
            
            <div className="space-y-20">
              {[
                {
                  phase: "Q1 2024",
                  title: "MAINNET GENESIS",
                  status: "COMPLETED",
                  achievements: [
                    "PersonaChain mainnet launch",
                    "Mobile app v1.0 release",
                    "1M+ identity registrations",
                    "Top 5 DeFi integrations"
                  ],
                  color: "from-green-500 to-emerald-400",
                  position: "left"
                },
                {
                  phase: "Q2 2024",
                  title: "ECOSYSTEM EXPANSION",
                  status: "IN PROGRESS",
                  achievements: [
                    "Cross-chain bridge deployment",
                    "Enterprise API launch",
                    "Government pilot programs",
                    "Advanced biometric features"
                  ],
                  color: "from-blue-500 to-cyan-400",
                  position: "right"
                },
                {
                  phase: "Q3 2024",
                  title: "GLOBAL SCALING",
                  status: "UPCOMING",
                  achievements: [
                    "Multi-region deployment",
                    "100+ protocol integrations",
                    "Quantum-resistant upgrade",
                    "AI-powered fraud detection"
                  ],
                  color: "from-purple-500 to-violet-400",
                  position: "left"
                },
                {
                  phase: "Q4 2024",
                  title: "METAVERSE READY",
                  status: "PLANNED",
                  achievements: [
                    "VR/AR identity integration",
                    "Holographic verification",
                    "Neural interface support",
                    "Interplanetary protocols"
                  ],
                  color: "from-orange-500 to-red-400",
                  position: "right"
                },
              ].map((milestone, index) => (
                <motion.div
                  key={index}
                  className={`flex items-center ${milestone.position === 'left' ? 'flex-row' : 'flex-row-reverse'}`}
                  initial={{ opacity: 0, x: milestone.position === 'left' ? -100 : 100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className={`w-5/12 ${milestone.position === 'left' ? 'text-right pr-8' : 'text-left pl-8'}`}>
                    <motion.div
                      className="p-8 bg-black/30 backdrop-blur-xl border border-white/10 rounded-3xl"
                      whileHover={{ scale: 1.02, y: -5 }}
                    >
                      <div className={`inline-block px-4 py-2 rounded-full text-xs font-mono font-bold mb-4 bg-gradient-to-r ${milestone.color}`}>
                        {milestone.status}
                      </div>
                      <div className="text-sm font-mono text-gray-400 mb-2">
                        {milestone.phase}
                      </div>
                      <h3 className="text-2xl font-black text-white mb-6">
                        {milestone.title}
                      </h3>
                      <div className="space-y-3">
                        {milestone.achievements.map((achievement, idx) => (
                          <div key={idx} className="flex items-center space-x-3">
                            <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                            <span className="text-gray-300">{achievement}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                  
                  {/* Timeline Node */}
                  <motion.div
                    className="w-6 h-6 bg-white rounded-full border-4 border-black flex-shrink-0 z-10"
                    animate={{
                      boxShadow: [
                        '0 0 0 0 rgba(255, 255, 255, 0.4)',
                        '0 0 0 20px rgba(255, 255, 255, 0)',
                        '0 0 0 0 rgba(255, 255, 255, 0)',
                      ],
                    }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                  />
                  
                  <div className="w-5/12" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 px-4 sm:px-6 lg:px-8 z-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-6xl font-black mb-8 bg-gradient-to-r from-blue-400 via-purple-400 to-orange-400 bg-clip-text text-transparent">
              JOIN THE REVOLUTION
            </h2>
            <p className="text-2xl text-gray-300 mb-12 leading-relaxed">
              Don't just use the internet. Own it. Control it. Secure it.
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 font-bold">
                Your digital sovereignty starts now.
              </span>
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link href="/signup">
                <motion.button
                  className="group relative px-16 py-8 bg-gradient-to-r from-blue-600 via-purple-600 to-orange-600 rounded-2xl font-bold text-2xl font-mono overflow-hidden"
                  whileHover={{ scale: 1.02, y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-orange-400 opacity-0 group-hover:opacity-100"
                    animate={{
                      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    style={{
                      backgroundSize: '200% 200%',
                    }}
                  />
                  <div className="relative z-10 flex items-center space-x-4">
                    <span>CREATE IDENTITY</span>
                    <motion.div
                      animate={{ x: [0, 8, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Rocket className="w-8 h-8" />
                    </motion.div>
                  </div>
                  <div className="absolute inset-0 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10" />
                </motion.button>
              </Link>
              
              <motion.button
                className="group px-16 py-8 bg-black/30 backdrop-blur-xl border border-white/20 rounded-2xl font-bold text-2xl font-mono hover:border-white/40 transition-all duration-500"
                whileHover={{ scale: 1.02, y: -3 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <div className="flex items-center space-x-4">
                  <span>LEARN MORE</span>
                  <ArrowUpRight className="w-8 h-8" />
                </div>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-20 px-4 sm:px-6 lg:px-8 z-20">
        <div className="max-w-7xl mx-auto border-t border-white/10 pt-20">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            {/* Company Info */}
            <div className="col-span-1">
              <motion.div
                className="text-3xl font-black font-mono mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                PERSONA
              </motion.div>
              <p className="text-gray-400 mb-6 leading-relaxed">
                The world's first quantum-resistant, biometric-verified, blockchain-based digital identity protocol.
              </p>
              <div className="flex space-x-4">
                {["Twitter", "Discord", "GitHub", "Telegram"].map((platform, index) => (
                  <motion.button
                    key={platform}
                    className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/20 transition-all duration-300"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="text-xs font-mono text-gray-400">{platform[0]}</span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Product Links */}
            <div>
              <h3 className="text-xl font-bold text-white mb-6 font-mono">PRODUCT</h3>
              <div className="space-y-4">
                {["Download App", "API Docs", "SDK", "Integrations", "Status"].map((link) => (
                  <div key={link}>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 font-mono">
                      {link}
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* Developers */}
            <div>
              <h3 className="text-xl font-bold text-white mb-6 font-mono">DEVELOPERS</h3>
              <div className="space-y-4">
                {["Documentation", "GitHub", "Testnet", "Bug Bounty", "Support"].map((link) => (
                  <div key={link}>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 font-mono">
                      {link}
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-xl font-bold text-white mb-6 font-mono">COMPANY</h3>
              <div className="space-y-4">
                {["About", "Blog", "Careers", "Press", "Legal"].map((link) => (
                  <div key={link}>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 font-mono">
                      {link}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 font-mono">
            <div className="flex space-x-8 mb-4 md:mb-0">
              <span>© 2024 PERSONA PROTOCOL. All rights reserved.</span>
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-green-400">● MAINNET LIVE</span>
              <span>v2.1.0</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}