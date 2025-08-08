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
  const accentColors = {
    primary: "from-primary-500 to-primary-600",
    secondary: "from-secondary-500 to-secondary-600",
    success: "from-green-500 to-green-600",
    info: "from-blue-500 to-blue-600"
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="relative text-center"
    >
      {/* Step Number with Enhanced Design */}
      <div className="relative mb-6">
        <div className={cn(
          "inline-flex items-center justify-center w-16 h-16 rounded-2xl font-bold text-xl mb-4 text-white shadow-lg",
          "bg-gradient-to-br",
          accentColors[accent as keyof typeof accentColors] || accentColors.primary
        )}>
          {number}
        </div>
        <div className={cn(
          "absolute -inset-2 rounded-2xl opacity-20 blur-xl",
          "bg-gradient-to-br",
          accentColors[accent as keyof typeof accentColors] || accentColors.primary
        )} />
      </div>
      
      {/* Content */}
      <h3 className="text-xl font-semibold text-neutral-900 mb-3">{title}</h3>
      <p className="text-neutral-600 leading-relaxed max-w-sm mx-auto">{description}</p>
      
      {/* Modern Connector */}
      {index < 3 && (
        <div className="hidden lg:block absolute top-8 left-full w-full">
          <div className="flex items-center justify-center h-0.5">
            <div className={cn(
              "h-full flex-1 bg-gradient-to-r opacity-30",
              accentColors[accent as keyof typeof accentColors] || accentColors.primary,
              "to-transparent"
            )} />
            <div className="w-2 h-2 rounded-full bg-neutral-300 mx-4" />
          </div>
        </div>
      )}
    </motion.div>
  );
}

export function HowItWorksSection() {
  const steps = [
    {
      title: "Connect GitHub",
      description: "Securely connect your GitHub account using OAuth 2.0. We analyze your contributions and repository access.",
      accent: "primary"
    },
    {
      title: "Generate Proof",
      description: "Our system creates zero-knowledge proofs of your GitHub activity without exposing sensitive data.",
      accent: "secondary"
    },
    {
      title: "Issue Credential",
      description: "Receive a W3C-compliant verifiable credential that proves your GitHub contributions and identity.",
      accent: "success"
    },
    {
      title: "Share & Verify",
      description: "Present your credentials anywhere. Others can instantly verify your GitHub identity and contributions.",
      accent: "info"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-4"
          >
            How It Works
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl text-neutral-600 max-w-3xl mx-auto"
          >
            Transform your GitHub contributions into verifiable credentials in four simple steps.
          </motion.p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 relative">
          {steps.map((step, index) => (
            <Step
              key={index}
              number={index + 1}
              title={step.title}
              description={step.description}
              index={index}
              accent={step.accent}
            />
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-center mt-16"
        >
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              asChild
              size="lg"
              className="px-8 py-3 bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Link href="/auth/github">
                Get Started Now
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}