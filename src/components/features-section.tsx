"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface FeatureProps {
  title: string;
  description: string;
  index: number;
  accent?: string;
}

function Feature({ title, description, index, accent = "primary" }: FeatureProps) {
  // This component is no longer used in the new design
  // Keeping for backwards compatibility
  return null;
}

export function FeaturesSection() {
  const features = [
    {
      title: "Zero-Knowledge Proofs",
      description: "Prove your identity without revealing personal data. Advanced cryptographic protocols ensure maximum privacy while maintaining trust and verification.",
      icon: "🛡️",
      accent: "purple"
    },
    {
      title: "Self-Sovereign Identity", 
      description: "Own and control your digital identity completely. No central authority can access, modify, or revoke your credentials without your consent.",
      icon: "🔐",
      accent: "blue"
    },
    {
      title: "Blockchain Security",
      description: "Built on PersonaChain with immutable storage and cryptographic verification. Your credentials are tamper-proof and globally verifiable.",
      icon: "⚡",
      accent: "pink"
    },
    {
      title: "Instant Verification",
      description: "Generate and verify credentials in seconds. Our optimized infrastructure processes identity claims with lightning-fast performance.",
      icon: "🚀",
      accent: "green"
    },
    {
      title: "Privacy by Design",
      description: "Every feature built with privacy-first principles. Minimal data collection, encrypted storage, and user-controlled data sharing.",
      icon: "🔒",
      accent: "orange"
    },
    {
      title: "Web3 Native",
      description: "Seamlessly integrate with Web3 ecosystem. Compatible with major wallets, DeFi protocols, and decentralized applications.",
      icon: "🌐",
      accent: "cyan"
    }
  ];

  return (
    <section className="relative py-32 bg-black overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Gradient Mesh Background */}
        <div className="absolute inset-0 gradient-mesh opacity-30" />
        
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `linear-gradient(rgba(139, 92, 246, 0.3) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />

        {/* Floating Orbs */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl animate-float animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-pink-600/10 rounded-full blur-3xl animate-float animation-delay-4000" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center px-4 py-2 mb-6 rounded-full bg-white/5 backdrop-blur-xl border border-white/10"
          >
            <span className="text-sm text-white/80">✨ Core Features</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
          >
            <span className="block text-white">Why Choose</span>
            <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              PersonaPass?
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-white/60 max-w-4xl mx-auto leading-relaxed"
          >
            Experience the future of digital identity with cutting-edge Web3 technology, 
            zero-knowledge cryptography, and user-first design principles.
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="group relative"
            >
              {/* Glass Card */}
              <div className="relative h-full glass-card p-8 hover:bg-white/10 transition-all duration-500 hover:scale-105">
                {/* Glow Effect on Hover */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-blue-600/20 blur-xl -z-10 transform scale-110" />
                
                {/* Feature Icon */}
                <div className="relative mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  
                  {/* Animated Accent Dot */}
                  <div className={cn(
                    "absolute -top-2 -right-2 w-6 h-6 rounded-full animate-pulse",
                    feature.accent === "purple" && "bg-purple-500/60",
                    feature.accent === "blue" && "bg-blue-500/60", 
                    feature.accent === "pink" && "bg-pink-500/60",
                    feature.accent === "green" && "bg-green-500/60",
                    feature.accent === "orange" && "bg-orange-500/60",
                    feature.accent === "cyan" && "bg-cyan-500/60"
                  )}>
                    <div className="absolute inset-1 rounded-full bg-white/20 backdrop-blur-sm" />
                  </div>
                </div>

                {/* Feature Content */}
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-white group-hover:text-gradient transition-all duration-300">
                    {feature.title}
                  </h3>
                  
                  <p className="text-white/60 leading-relaxed text-base group-hover:text-white/80 transition-colors duration-300">
                    {feature.description}
                  </p>
                </div>

                {/* Bottom Accent Line */}
                <div className={cn(
                  "absolute bottom-0 left-8 right-8 h-0.5 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left",
                  feature.accent === "purple" && "bg-gradient-to-r from-purple-500 to-purple-600",
                  feature.accent === "blue" && "bg-gradient-to-r from-blue-500 to-blue-600",
                  feature.accent === "pink" && "bg-gradient-to-r from-pink-500 to-pink-600", 
                  feature.accent === "green" && "bg-gradient-to-r from-green-500 to-green-600",
                  feature.accent === "orange" && "bg-gradient-to-r from-orange-500 to-orange-600",
                  feature.accent === "cyan" && "bg-gradient-to-r from-cyan-500 to-cyan-600"
                )} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-20"
        >
          <p className="text-white/40 text-sm uppercase tracking-wider font-medium">
            Ready to experience the future?
          </p>
        </motion.div>
      </div>
    </section>
  );
}
