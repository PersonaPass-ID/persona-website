"use client";

import React from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Fingerprint, Lock, Sparkles, ChevronDown, Zap, Globe, Users } from "lucide-react";

export function HeroSectionV2() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 150]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);
  const y3 = useTransform(scrollY, [0, 500], [0, 75]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0.3]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.95]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Epic Animated Background */}
      <div className="absolute inset-0">
        {/* Dynamic Gradient Mesh */}
        <div className="absolute inset-0 gradient-mesh opacity-60" />
        
        {/* Advanced Floating Orbs */}
        <motion.div 
          style={{ y: y1 }} 
          className="absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2"
        >
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.7, 0.3],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="w-96 h-96 bg-purple-600/40 rounded-full blur-3xl"
          />
        </motion.div>

        <motion.div 
          style={{ y: y2 }} 
          className="absolute top-1/3 right-1/4 transform translate-x-1/2 -translate-y-1/2"
        >
          <motion.div
            animate={{
              scale: [1.2, 0.8, 1.2],
              opacity: [0.4, 0.8, 0.4],
              rotate: [360, 180, 0]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
            className="w-80 h-80 bg-blue-600/40 rounded-full blur-3xl"
          />
        </motion.div>

        <motion.div 
          style={{ y: y3 }} 
          className="absolute bottom-1/4 left-1/3 transform -translate-x-1/2 translate-y-1/2"
        >
          <motion.div
            animate={{
              scale: [0.9, 1.4, 0.9],
              opacity: [0.2, 0.6, 0.2],
              rotate: [0, -180, -360]
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 4
            }}
            className="w-72 h-72 bg-pink-600/40 rounded-full blur-3xl"
          />
        </motion.div>

        {/* Enhanced Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: `linear-gradient(rgba(139, 92, 246, 0.6) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(139, 92, 246, 0.6) 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        />

        {/* Energy Particles */}
        <motion.div style={{ y: y1 }} className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 4 + 2}px`,
                height: `${Math.random() * 4 + 2}px`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0, 1, 0],
                scale: [0, 1, 0]
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                delay: Math.random() * 10,
                ease: "easeInOut"
              }}
            >
              <div className={cn(
                "w-full h-full rounded-full",
                Math.random() > 0.66 ? "bg-purple-400/60" :
                Math.random() > 0.33 ? "bg-blue-400/60" : "bg-pink-400/60"
              )} />
            </motion.div>
          ))}
        </motion.div>

        {/* Radial Spotlight */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/30" />
      </div>

      {/* Enhanced Main Content */}
      <motion.div 
        style={{ opacity, scale }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        {/* Enhanced Badge */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
          className="inline-flex items-center px-6 py-3 mb-12 rounded-full glass-card group cursor-pointer hover:bg-white/10 transition-all duration-500"
          whileHover={{ scale: 1.05 }}
        >
          <motion.div
            animate={{ rotate: [0, 180, 360] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="mr-3"
          >
            <Sparkles className="w-5 h-5 text-purple-400" />
          </motion.div>
          <span className="text-sm font-medium text-white/90">✨ The Future of Digital Identity is Here</span>
          <div className="ml-3 w-2 h-2 bg-green-400 rounded-full animate-pulse" />
        </motion.div>

        {/* Award-Winning Heading */}
        <motion.div className="mb-8">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold leading-tight"
          >
            <motion.span 
              className="block text-white mb-2"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Your Identity,
            </motion.span>
            <motion.span 
              className="block bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent relative"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Finally Yours
              {/* Animated underline */}
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.2, delay: 1 }}
                className="absolute bottom-2 left-0 h-1 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full"
              />
            </motion.span>
          </motion.h1>
        </motion.div>

        {/* Enhanced Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-xl md:text-2xl lg:text-3xl text-white/70 mb-16 max-w-4xl mx-auto leading-relaxed"
        >
          Experience the revolution of{" "}
          <span className="text-purple-300 font-semibold">zero-knowledge proofs</span>{" "}
          and{" "}
          <span className="text-blue-300 font-semibold">self-sovereign identity</span>.
          <br className="hidden sm:block" />
          Complete privacy. Total control. Infinite possibilities.
        </motion.p>

        {/* Epic CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-6 justify-center mb-20"
        >
          {/* Primary CTA */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-2xl blur-xl opacity-70 group-hover:opacity-100 transition-opacity duration-500 animate-gradient bg-gradient-size-200" />
            <Button
              asChild
              size="lg"
              className="relative px-12 py-8 text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-2xl shadow-2xl border-0 overflow-hidden group"
            >
              <Link href="/get-started">
                <span className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                <span className="relative z-10 flex items-center">
                  Start Your Journey
                  <motion.span
                    className="ml-3"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <ArrowRight className="w-6 h-6" />
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
              className="px-12 py-8 text-xl font-bold glass-card hover:bg-white/15 hover:border-white/30 rounded-2xl text-white transition-all duration-300 group"
            >
              <Link href="/personachain">
                <span className="flex items-center">
                  Explore PersonaChain
                  <Globe className="ml-3 w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
                </span>
              </Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* Enhanced Feature Icons Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto"
        >
          {[
            { icon: Shield, label: "Zero-Knowledge Proofs", color: "purple", description: "Prove without revealing" },
            { icon: Fingerprint, label: "Self-Sovereign Identity", color: "blue", description: "You own your data" },
            { icon: Lock, label: "Military-Grade Security", color: "pink", description: "Unbreakable encryption" }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group relative"
            >
              <div className="glass-card p-8 hover:bg-white/10 transition-all duration-500 group-hover:shadow-2xl">
                {/* Hover Glow Effect */}
                <div className={cn(
                  "absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10",
                  feature.color === "purple" && "bg-purple-600/30",
                  feature.color === "blue" && "bg-blue-600/30",
                  feature.color === "pink" && "bg-pink-600/30"
                )} />
                
                {/* Icon */}
                <div className={cn(
                  "w-20 h-20 mx-auto rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110",
                  feature.color === "purple" && "bg-gradient-to-br from-purple-500/20 to-purple-600/20 border border-purple-500/30",
                  feature.color === "blue" && "bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-500/30",
                  feature.color === "pink" && "bg-gradient-to-br from-pink-500/20 to-pink-600/20 border border-pink-500/30"
                )}>
                  <feature.icon className={cn(
                    "w-10 h-10 transition-all duration-300 group-hover:scale-110",
                    feature.color === "purple" && "text-purple-400",
                    feature.color === "blue" && "text-blue-400", 
                    feature.color === "pink" && "text-pink-400"
                  )} />
                </div>
                
                {/* Content */}
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-gradient transition-all duration-300">
                  {feature.label}
                </h3>
                <p className="text-sm text-white/60 group-hover:text-white/80 transition-colors duration-300">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Enhanced Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center text-white/50 group hover:text-white/80 transition-colors duration-300 cursor-pointer"
        >
          <div className="glass-card px-4 py-2 mb-3 hover:bg-white/10 transition-all duration-300">
            <span className="text-sm font-medium">Discover More</span>
          </div>
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronDown className="w-6 h-6" />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Bottom Glow Effect */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full h-40 bg-gradient-to-t from-purple-600/20 via-blue-600/10 to-transparent blur-3xl" />
    </section>
  );
}