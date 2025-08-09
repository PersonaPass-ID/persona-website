"use client";

import React from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Fingerprint, Lock, Sparkles, ChevronDown } from "lucide-react";

export function HeroSectionV2() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, 50]);
  const y2 = useTransform(scrollY, [0, 300], [0, -50]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Gradient Mesh */}
        <div className="absolute inset-0 opacity-50">
          <div className="absolute top-0 -left-4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
          <div className="absolute top-0 -right-4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
          <div className="absolute -bottom-8 left-20 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
        </div>

        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />

        {/* Floating Particles */}
        <motion.div style={{ y: y1 }} className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${10 + Math.random() * 20}s`,
              }}
            />
          ))}
        </motion.div>
      </div>

      {/* Main Content */}
      <motion.div 
        style={{ opacity }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center px-4 py-2 mb-8 rounded-full bg-white/5 backdrop-blur-xl border border-white/10"
        >
          <Sparkles className="w-4 h-4 mr-2 text-purple-400" />
          <span className="text-sm text-white/80">Building the Future of Digital Identity</span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6"
        >
          <span className="block text-white">Your Identity</span>
          <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
            Finally Yours
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl md:text-2xl text-white/60 mb-12 max-w-3xl mx-auto"
        >
          PersonaPass revolutionizes digital identity with zero-knowledge proofs, 
          giving you complete control over your personal data while maintaining 
          ultimate privacy and security.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
        >
          <Button
            asChild
            size="lg"
            className="group relative px-8 py-6 text-lg font-semibold overflow-hidden rounded-2xl"
          >
            <Link href="/get-started">
              <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 transition-transform group-hover:scale-105" />
              <span className="relative z-10 flex items-center text-white">
                Get Started
                <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            size="lg"
            className="px-8 py-6 text-lg font-semibold bg-white/5 backdrop-blur-xl border-white/20 text-white hover:bg-white/10 rounded-2xl"
          >
            <Link href="/personachain">
              Explore PersonaChain
            </Link>
          </Button>
        </motion.div>

        {/* Feature Icons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-3 gap-8 max-w-2xl mx-auto"
        >
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500/20 to-purple-600/20 backdrop-blur-xl border border-purple-500/20 flex items-center justify-center mb-3">
              <Shield className="w-8 h-8 text-purple-400" />
            </div>
            <span className="text-sm text-white/60">Zero-Knowledge</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-600/20 backdrop-blur-xl border border-blue-500/20 flex items-center justify-center mb-3">
              <Fingerprint className="w-8 h-8 text-blue-400" />
            </div>
            <span className="text-sm text-white/60">Self-Sovereign</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500/20 to-pink-600/20 backdrop-blur-xl border border-pink-500/20 flex items-center justify-center mb-3">
              <Lock className="w-8 h-8 text-pink-400" />
            </div>
            <span className="text-sm text-white/60">Fully Encrypted</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center text-white/40"
        >
          <span className="text-sm mb-2">Scroll to explore</span>
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </section>
  );
}