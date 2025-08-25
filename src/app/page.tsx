'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { ArrowRight, Shield, Zap, Globe, Eye, Fingerprint, Key, Cpu, Database, Network, Lock, Users, Rocket, Star, CheckCircle, ArrowUpRight, Code, Download, Play, Pause, Volume2, Settings, Search, Filter, BarChart3, TrendingUp, Layers, GitBranch, Smartphone, Monitor, Tablet, Wifi, CloudLightning, Gamepad2 } from 'lucide-react'
import Navigation from '@/components/layout/Navigation'
import Link from 'next/link'

export default function HomePage() {
  const heroRef = useRef(null)
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 1000], [0, -500])
  const y2 = useTransform(scrollY, [0, 1000], [0, -200])

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
              True digital self-sovereignty. Own your identity completely. 
              No intermediaries. No surveillance. No compromise.
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 font-medium">
                Self-Sovereign • Decentralized • Interoperable
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
              { value: "SOVEREIGN", label: "IDENTITY_CONTROL", icon: Shield },
              { value: "ZERO_TRUST", label: "ARCHITECTURE", icon: Zap },
              { value: "UNIVERSAL", label: "PORTABILITY", icon: Eye },
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

      {/* Spacer Section for Better Visual Separation */}
      <div className="py-24"></div>

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
              PRIVACY-FIRST IDENTITY
            </h2>
            <p className="text-xl text-gray-400 max-w-4xl mx-auto font-mono leading-relaxed">
              PersonaPass gives you complete control over your digital identity. No tracking, no data mining, no surveillance. 
              Your identity works everywhere while keeping your personal information private and secure.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
            {[
              {
                step: "01",
                title: "SECURE_REGISTRATION",
                description: "Create your private identity without revealing personal information. Your authentication data is encrypted and you maintain full control over what information you share.",
                icon: Fingerprint,
                color: "from-blue-500 to-cyan-400",
              },
              {
                step: "02",
                title: "PRIVATE_VERIFICATION",
                description: "Verify your identity without surveillance. Two-factor authentication ensures only you can access your identity while keeping your activities private from third parties.",
                icon: Shield,
                color: "from-purple-500 to-pink-400",
              },
              {
                step: "03",
                title: "UNIVERSAL_IDENTITY",
                description: "Get a portable identity that works across platforms and services. Your decentralized identifier belongs to you and can't be taken away or controlled by any single company.",
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
                BUILT FOR PRIVACY
              </h2>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                PersonaPass is designed from the ground up to protect your privacy and give you control. 
                No tracking, no data collection, no surveillance. Your identity data stays private and secure.
              </p>
              <div className="space-y-4">
                {[
                  "Zero tracking - we don't monitor your activity",
                  "Encrypted authentication with industry standards",
                  "Decentralized identity that you own and control",
                  "No personal data collection or profiling",
                  "Works across platforms without data sharing",
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
                    { label: "DATA TRACKING", value: "NONE" },
                    { label: "IDENTITY CONTROL", value: "YOU" },
                    { label: "PRIVACY LEVEL", value: "MAX" },
                    { label: "CROSS-PLATFORM", value: "YES" },
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
              DIGITAL IDENTITY USE CASES
            </h2>
            <p className="text-xl text-gray-400 max-w-4xl mx-auto font-mono leading-relaxed">
              PersonaPass provides secure digital identity management with blockchain-based DIDs, enabling 
              authenticated access to Web3 applications while maintaining user privacy and security.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                category: "WEB3_AUTHENTICATION",
                title: "Blockchain Identity",
                description: "Use your PersonaPass DID to authenticate with Web3 applications and prove your identity on blockchain networks without revealing personal information.",
                icon: TrendingUp,
                color: "from-green-500 to-emerald-400",
                examples: ["DID Verification", "Wallet Linking", "Chain Auth", "Identity Proofs"]
              },
              {
                category: "SECURE_APPLICATIONS",
                title: "Enterprise Apps",
                description: "Integrate PersonaPass TOTP authentication into your applications for secure user verification with Google Authenticator support.",
                icon: Gamepad2,
                color: "from-purple-500 to-violet-400",
                examples: ["API Access", "Admin Panels", "User Portals", "Mobile Apps"]
              },
              {
                category: "PLATFORM_INTEGRATION",
                title: "API Integration",
                description: "Use PersonaPass APIs to add secure authentication to your platform with TOTP verification and DID management capabilities.",
                icon: Users,
                color: "from-blue-500 to-cyan-400",
                examples: ["REST APIs", "Lambda Functions", "Express.js", "Next.js"]
              },
              {
                category: "DEVELOPMENT_TOOLS",
                title: "Developer APIs",
                description: "Build on PersonaPass infrastructure using our authentication APIs, TOTP setup endpoints, and blockchain identity services.",
                icon: Shield,
                color: "from-orange-500 to-red-400",
                examples: ["Auth APIs", "TOTP Setup", "DID Creation", "JWT Tokens"]
              },
              {
                category: "PERSONACHAIN_NETWORK",
                title: "Blockchain Network",
                description: "PersonaChain runs on Cosmos SDK at 44.220.177.56 providing the blockchain infrastructure for decentralized identity management.",
                icon: Smartphone,
                color: "from-teal-500 to-cyan-400",
                examples: ["Cosmos SDK", "Tendermint", "RPC Endpoints", "Block Explorer"]
              },
              {
                category: "INFRASTRUCTURE_STACK",
                title: "Cloud Infrastructure",
                description: "PersonaPass runs on production AWS infrastructure with Terraform IaC, Lambda functions, and Supabase PostgreSQL database.",
                icon: Globe,
                color: "from-indigo-500 to-purple-400",
                examples: ["AWS Lambda", "Supabase", "Terraform", "Vercel"]
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
              TECHNOLOGY STACK
            </h2>
            <p className="text-xl text-gray-400 max-w-4xl mx-auto font-mono leading-relaxed">
              PersonaPass is built with modern production technologies including Next.js frontend, 
              Express.js backend, AWS Lambda serverless functions, and PersonaChain blockchain infrastructure.
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
                DEVELOPMENT STATUS
              </h3>
              <div className="space-y-6">
                {[
                  { metric: "Frontend", value: "Next.js 15", description: "React-based web application" },
                  { metric: "Backend", value: "Express.js", description: "Node.js API server on port 3001" },
                  { metric: "Database", value: "Supabase", description: "PostgreSQL with RLS policies" },
                  { metric: "Blockchain", value: "PersonaChain", description: "Cosmos SDK at 44.220.177.56" },
                  { metric: "Deployment", value: "AWS + Vercel", description: "Production cloud infrastructure" },
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
                    category: "Frontend Stack",
                    technologies: ["Next.js 15", "React 18", "Framer Motion", "Tailwind CSS"],
                    color: "text-blue-400"
                  },
                  {
                    category: "Backend APIs",
                    technologies: ["Express.js", "Node.js", "AWS Lambda", "JWT Auth"],
                    color: "text-purple-400"
                  },
                  {
                    category: "Database & Storage",
                    technologies: ["Supabase", "PostgreSQL", "RLS Policies", "Encrypted Secrets"],
                    color: "text-green-400"
                  },
                  {
                    category: "Infrastructure",
                    technologies: ["AWS EC2", "Terraform", "Vercel", "PersonaChain"],
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
              DEVELOPMENT ROADMAP
            </h2>
            <p className="text-xl text-gray-400 max-w-4xl mx-auto font-mono leading-relaxed">
              PersonaPass development roadmap showing our current progress and planned features. 
              We're currently in beta development phase with core authentication and DID generation working.
            </p>
          </motion.div>

          <div className="relative">
            {/* Vertical Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-0.5 h-full w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-orange-500" />
            
            <div className="space-y-20">
              {[
                {
                  phase: "Q3 2025",
                  title: "CORE DEVELOPMENT",
                  status: "COMPLETED",
                  achievements: [
                    "Email/password authentication system",
                    "Google Authenticator TOTP integration",
                    "Basic DID generation (did:persona:hash)",
                    "Supabase database setup with RLS"
                  ],
                  color: "from-green-500 to-emerald-400",
                  position: "left"
                },
                {
                  phase: "Q4 2025",
                  title: "BETA PLATFORM",
                  status: "IN PROGRESS",
                  achievements: [
                    "PersonaChain blockchain deployment",
                    "Next.js frontend with signup/login",
                    "AWS Lambda authentication functions",
                    "Production Terraform infrastructure"
                  ],
                  color: "from-blue-500 to-cyan-400",
                  position: "right"
                },
                {
                  phase: "Q1 2026",
                  title: "PUBLIC LAUNCH",
                  status: "PLANNED",
                  achievements: [
                    "Complete PersonaChain integration",
                    "DID/VC standards compliance",
                    "API documentation and SDKs",
                    "Third-party platform integrations"
                  ],
                  color: "from-purple-500 to-violet-400",
                  position: "left"
                },
                {
                  phase: "Q2 2026",
                  title: "ECOSYSTEM GROWTH",
                  status: "FUTURE",
                  achievements: [
                    "Developer API marketplace",
                    "Cross-chain identity verification",
                    "Advanced credential management",
                    "Enterprise partnership program"
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
              TRY PERSONAPASS BETA
            </h2>
            <p className="text-2xl text-gray-300 mb-12 leading-relaxed">
              Experience secure digital identity with blockchain-based DIDs.
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 font-bold">
                Email + TOTP authentication. Simple. Secure. Decentralized.
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
                Secure digital identity platform with email/TOTP authentication, blockchain-based DIDs, and AWS infrastructure.
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