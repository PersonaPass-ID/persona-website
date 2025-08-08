"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

// Background Grid Pattern
function BackgroundGrid() {
  return (
    <div className="absolute inset-0 w-full h-full opacity-30">
      <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-primary-50 to-secondary-50" />
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `linear-gradient(rgba(37, 99, 235, 0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(37, 99, 235, 0.1) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />
    </div>
  );
}

// CTA Button Component
interface CTAButtonProps {
  children: React.ReactNode;
  href: string;
  variant?: "primary" | "secondary";
  className?: string;
}

function CTAButton({ children, href, variant = "primary", className }: CTAButtonProps) {
  return (
    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
      <Button
        asChild
        variant={variant === "primary" ? "default" : "outline"}
        size="lg"
        className={cn(
          "px-8 py-3 font-medium",
          variant === "primary" && "bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 shadow-lg hover:shadow-xl transition-all duration-200",
          className
        )}
      >
        <Link href={href}>
          {children}
        </Link>
      </Button>
    </motion.div>
  );
}

// Feature Card Component
interface FeatureCardProps {
  title: string;
  description: string;
  delay: number;
  accent?: string;
}

function FeatureCard({ title, description, delay, accent = "primary" }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="relative p-6 rounded-xl bg-white/80 backdrop-blur-sm border border-neutral-200/60 hover:border-primary-300/60 transition-all duration-300 group hover:shadow-lg hover:shadow-primary-100/50"
    >
      <div className={cn(
        "w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-all duration-300",
        "bg-gradient-to-br from-primary-50 to-secondary-50 border border-primary-200/50",
        "group-hover:from-primary-100 group-hover:to-secondary-100 group-hover:border-primary-300/60"
      )}>
        <div className={cn(
          "w-6 h-6 rounded-full",
          accent === "primary" && "bg-gradient-to-r from-primary-500 to-primary-600",
          accent === "secondary" && "bg-gradient-to-r from-secondary-500 to-secondary-600",
          accent === "success" && "bg-gradient-to-r from-green-500 to-green-600"
        )} />
      </div>
      <h3 className="text-lg font-semibold text-neutral-900 mb-2">{title}</h3>
      <p className="text-neutral-600 leading-relaxed">{description}</p>
    </motion.div>
  );
}

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background */}
      <BackgroundGrid />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-white" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-primary-50 to-secondary-50 border border-primary-200/50 text-primary-700 text-sm font-medium mb-8"
          >
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 mr-2" />
            🚀 Now with PersonaChain Integration
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-900 mb-6 leading-tight"
          >
            Digital Sovereign{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Identity Platform
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-neutral-600 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Stake PERSONA tokens to create verified digital identities. Earn rewards through identity verification. 
            Participate in governance to shape the future of digital sovereignty on PersonaChain.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <CTAButton href="/personachain" variant="primary">
              Explore PersonaChain
            </CTAButton>
            
            <CTAButton href="/auth/github" variant="secondary">
              Connect GitHub
            </CTAButton>
          </motion.div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <FeatureCard
              title="PERSONA Staking"
              description="Stake PERSONA tokens to create verified digital identities with reputation scoring and economic security."
              delay={0.4}
              accent="primary"
            />
            <FeatureCard
              title="Identity Rewards"
              description="Earn PERSONA tokens by verifying other users' identities and building network trustworthiness."
              delay={0.5}
              accent="secondary"
            />
            <FeatureCard
              title="Sovereign Governance"
              description="Vote on identity standards and network parameters to shape the future of digital sovereignty."
              delay={0.6}
              accent="success"
            />
          </div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="mt-16 pt-8 border-t border-neutral-200/50"
          >
            <p className="text-sm text-neutral-500 mb-6">Trusted by developers worldwide</p>
            <div className="flex flex-wrap items-center justify-center gap-8 opacity-60">
              {/* Placeholder for company logos */}
              {["AWS", "Vercel", "GitHub", "Digital Ocean", "Cloudflare"].map((company, i) => (
                <div
                  key={i}
                  className="px-4 py-2 text-neutral-500 font-medium text-sm bg-white/50 backdrop-blur-sm border border-neutral-200/60 rounded-lg hover:bg-white/70 transition-all duration-200"
                >
                  {company}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}