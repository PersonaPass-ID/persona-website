"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function CTASection() {
  return (
    <section className="relative py-32 bg-black overflow-hidden">
      {/* Epic Background Effects */}
      <div className="absolute inset-0">
        {/* Gradient Mesh */}
        <div className="absolute inset-0 gradient-mesh opacity-40" />
        
        {/* Animated Grid */}
        <div 
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: `linear-gradient(rgba(139, 92, 246, 0.6) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(139, 92, 246, 0.6) 1px, transparent 1px)`,
            backgroundSize: "100px 100px",
          }}
        />

        {/* Floating Energy Orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-20 left-20 w-80 h-80 bg-purple-600/30 rounded-full blur-3xl"
        />
        
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute bottom-20 right-20 w-96 h-96 bg-blue-600/30 rounded-full blur-3xl"
        />
        
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.25, 0.5, 0.25],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-pink-600/30 rounded-full blur-3xl"
        />

        {/* Radial Spotlight Effect */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/20" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center px-6 py-3 mb-8 rounded-full bg-white/5 backdrop-blur-xl border border-white/10"
          >
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-3" />
            <span className="text-sm text-white/80">🚀 Join the Revolution</span>
          </motion.div>

          {/* Main Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8">
              <span className="block text-white">Ready to Own Your</span>
              <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                Digital Identity?
              </span>
            </h2>
            
            <p className="text-xl md:text-2xl text-white/60 mb-16 max-w-4xl mx-auto leading-relaxed">
              Join the revolution of self-sovereign identity. Take control of your digital life 
              with zero-knowledge proofs, decentralized storage, and Web3-native security.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-20"
          >
            {/* Primary CTA */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-2xl blur-lg opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
              <Button
                asChild
                size="lg"
                className="relative px-10 py-6 text-lg font-semibold bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-2xl shadow-2xl border-0"
              >
                <Link href="/get-started">
                  <span className="flex items-center">
                    Start Your Journey
                    <motion.span
                      className="ml-2"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </span>
                </Link>
              </Button>
            </motion.div>
            
            {/* Secondary CTA */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group"
            >
              <Button
                asChild
                variant="outline"
                size="lg"
                className="px-10 py-6 text-lg font-semibold bg-white/5 backdrop-blur-xl border-2 border-white/20 text-white hover:bg-white/10 hover:border-white/30 rounded-2xl transition-all duration-300"
              >
                <Link href="/personachain">
                  Explore PersonaChain
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          >
            {[
              { value: "100K+", label: "Identities Created", icon: "👤" },
              { value: "99.9%", label: "Uptime Guarantee", icon: "⚡" },
              { value: "Zero", label: "Data Breaches", icon: "🛡️" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="group glass-card p-8 hover:bg-white/10 transition-all duration-300"
              >
                <div className="text-4xl mb-4">{stat.icon}</div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-2 group-hover:text-gradient transition-all duration-300">
                  {stat.value}
                </div>
                <div className="text-white/60 group-hover:text-white/80 transition-colors duration-300">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Bottom Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-20 flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8"
          >
            <div className="flex items-center space-x-3 text-white/40">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span className="text-sm">Open Source</span>
            </div>
            <div className="flex items-center space-x-3 text-white/40">
              <div className="w-2 h-2 bg-blue-500 rounded-full" />
              <span className="text-sm">Audited Smart Contracts</span>
            </div>
            <div className="flex items-center space-x-3 text-white/40">
              <div className="w-2 h-2 bg-purple-500 rounded-full" />
              <span className="text-sm">W3C Compliant</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Glow Effect */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full h-32 bg-gradient-to-t from-purple-600/10 to-transparent blur-3xl" />
    </section>
  );
}
