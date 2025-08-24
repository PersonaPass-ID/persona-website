'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { ArrowRight, Shield, Zap, Globe, Eye, Fingerprint, Key, Cpu, Database, Network } from 'lucide-react'
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

      {/* Interactive Light Cursor */}
      <motion.div
        className="fixed w-96 h-96 rounded-full pointer-events-none z-10 mix-blend-screen"
        style={{
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, rgba(147, 51, 234, 0.1) 50%, transparent 70%)',
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
        }}
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
      />

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
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onHoverStart={() => {}}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
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
              className="group px-12 py-6 bg-black/30 backdrop-blur-xl border border-white/20 rounded-2xl font-bold text-xl font-mono hover:border-white/40 transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
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

      {/* Terminal Section */}
      <section className="relative py-32 px-4 sm:px-6 lg:px-8 z-20">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="bg-black/40 backdrop-blur-xl border border-green-500/30 rounded-2xl p-8 font-mono"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-3 h-3 bg-red-500 rounded-full" />
              <div className="w-3 h-3 bg-yellow-500 rounded-full" />
              <div className="w-3 h-3 bg-green-500 rounded-full" />
              <span className="ml-4 text-gray-400">persona-protocol v2.1.0</span>
            </div>
            <div className="text-green-400 space-y-2">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                $ persona init --network mainnet
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1 }}
              >
                ✓ Blockchain connection established
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.5 }}
              >
                ✓ Zero-knowledge circuit compiled
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 2 }}
              >
                ✓ Identity verification ready
              </motion.div>
              <motion.div
                className="text-blue-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 2.5 }}
              >
                → Your sovereign identity is now active
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-20 px-4 sm:px-6 lg:px-8 z-20">
        <div className="max-w-7xl mx-auto border-t border-white/10 pt-20">
          <div className="text-center">
            <motion.div
              className="text-4xl font-black font-mono mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              PERSONA
            </motion.div>
            <p className="text-gray-400 mb-8">
              The sovereign internet identity. Your data. Your control. Access the Web3 ecosystem with zero-knowledge technology.
            </p>
            <div className="flex justify-center space-x-8 text-sm text-gray-500">
              <span>© 2024 PERSONA. All rights reserved.</span>
              <span>Privacy</span>
              <span>Terms</span>
              <span>Cookies</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}