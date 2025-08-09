"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface StepProps {
  number: number;
  title: string;
  description: string;
  index: number;
  accent?: string;
}

function Step({ number, title, description, index, accent = "primary" }: StepProps) {
  // This component is no longer used in the new design
  // Keeping for backwards compatibility
  return null;
}

export function HowItWorksSection() {
  const steps = [
    {
      title: "Connect Wallet",
      description: "Connect your preferred Web3 wallet (MetaMask, Keplr, or WalletConnect) to begin your identity journey with PersonaPass.",
      icon: "🔗",
      accent: "purple",
      gradient: "from-purple-500 to-purple-600"
    },
    {
      title: "Create Identity",
      description: "Generate your unique decentralized identity (DID) with cryptographic keys stored securely on your device.",
      icon: "🆔", 
      accent: "blue",
      gradient: "from-blue-500 to-blue-600"
    },
    {
      title: "Verify Credentials",
      description: "Add verifiable credentials from trusted sources using zero-knowledge proofs to maintain privacy.",
      icon: "✅",
      accent: "green", 
      gradient: "from-green-500 to-green-600"
    },
    {
      title: "Share Privately",
      description: "Share only what's necessary with applications while keeping your personal data completely private and secure.",
      icon: "🛡️",
      accent: "pink",
      gradient: "from-pink-500 to-pink-600"
    }
  ];

  return (
    <section className="relative py-32 bg-black overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Animated Grid */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(rgba(139, 92, 246, 0.4) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(139, 92, 246, 0.4) 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        />

        {/* Flowing Gradients */}
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl animate-float animation-delay-2000" />
        <div className="absolute top-3/4 left-1/3 w-72 h-72 bg-pink-600/20 rounded-full blur-3xl animate-float animation-delay-4000" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center px-4 py-2 mb-8 rounded-full bg-white/5 backdrop-blur-xl border border-white/10"
          >
            <span className="text-sm text-white/80">⚡ Simple Process</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8"
          >
            <span className="block text-white">How It</span>
            <span className="block bg-gradient-to-r from-purple-400 via-blue-400 to-pink-400 bg-clip-text text-transparent">
              Works
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-white/60 max-w-4xl mx-auto leading-relaxed"
          >
            Your journey to self-sovereign identity starts here. 
            Four simple steps to complete digital freedom.
          </motion.p>
        </div>

        {/* Steps Container */}
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 transform -translate-y-1/2">
            <div className="w-full h-full bg-gradient-to-r from-purple-500/20 via-blue-500/20 via-green-500/20 to-pink-500/20 rounded-full" />
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ y: -12, transition: { duration: 0.3 } }}
                className="relative text-center group"
              >
                {/* Step Number Circle */}
                <div className="relative mb-8">
                  {/* Main Circle */}
                  <div className={cn(
                    "relative w-20 h-20 mx-auto rounded-full flex items-center justify-center text-white font-bold text-lg backdrop-blur-xl border border-white/20",
                    "bg-gradient-to-br", step.gradient,
                    "group-hover:scale-110 transition-all duration-500"
                  )}>
                    <span className="relative z-10">{index + 1}</span>
                    
                    {/* Glow Effect */}
                    <div className={cn(
                      "absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10",
                      "bg-gradient-to-br", step.gradient
                    )} />
                  </div>

                  {/* Floating Icon */}
                  <motion.div
                    animate={{ 
                      y: [0, -5, 0],
                      rotate: [0, 5, 0]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.5
                    }}
                    className="absolute -top-2 -right-2 w-12 h-12 rounded-xl bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-2xl"
                  >
                    {step.icon}
                  </motion.div>
                </div>

                {/* Step Content */}
                <motion.div 
                  className="space-y-4"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 + 0.3 }}
                >
                  <h3 className="text-2xl font-bold text-white group-hover:text-gradient transition-all duration-300">
                    {step.title}
                  </h3>
                  
                  <p className="text-white/60 leading-relaxed group-hover:text-white/80 transition-colors duration-300 max-w-xs mx-auto">
                    {step.description}
                  </p>
                </motion.div>

                {/* Progress Indicator */}
                <div className="mt-8">
                  <div className="w-full bg-white/10 rounded-full h-1 mx-auto max-w-32">
                    <motion.div
                      className={cn("h-full rounded-full bg-gradient-to-r", step.gradient)}
                      initial={{ width: "0%" }}
                      whileInView={{ width: "100%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: index * 0.2 + 0.5 }}
                    />
                  </div>
                </div>

                {/* Connection Dot (Desktop) */}
                {index < 3 && (
                  <div className="hidden lg:block absolute top-1/2 -right-6 transform -translate-y-1/2">
                    <motion.div
                      className="w-3 h-3 rounded-full bg-white/20"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 1, 0.5]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.5
                      }}
                    />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="text-center mt-24"
        >
          <div className="inline-flex items-center space-x-4 px-6 py-3 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-white/60 text-sm">
              Ready to start your identity transformation?
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
