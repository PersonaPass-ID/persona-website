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
  const accentColors = {
    primary: "from-primary-500 to-primary-600",
    secondary: "from-secondary-500 to-secondary-600",
    success: "from-green-500 to-green-600",
    warning: "from-yellow-500 to-yellow-600",
    info: "from-blue-500 to-blue-600",
    purple: "from-purple-500 to-purple-600"
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="h-full hover:shadow-lg transition-all duration-300 border-neutral-200/60 hover:border-primary-300/60 bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center space-x-3 mb-2">
            <div className={cn(
              "w-3 h-3 rounded-full bg-gradient-to-r",
              accentColors[accent as keyof typeof accentColors] || accentColors.primary
            )} />
            <CardTitle className="text-lg font-semibold text-neutral-900">
              {title}
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-neutral-600 leading-relaxed text-base">
            {description}
          </CardDescription>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function FeaturesSection() {
  const features = [
    {
      title: "Zero-Knowledge Proofs",
      description: "Verify your GitHub contributions without exposing sensitive data. Our ZK-proof system ensures maximum privacy while maintaining trust.",
      accent: "primary"
    },
    {
      title: "Instant Verification",
      description: "Generate verifiable credentials in seconds. Our optimized API processes GitHub data and issues W3C-compliant credentials instantly.",
      accent: "secondary"
    },
    {
      title: "Blockchain Security",
      description: "Built on PersonaChain, our custom blockchain ensures immutable credential storage and tamper-proof verification.",
      accent: "success"
    },
    {
      title: "Developer APIs",
      description: "RESTful APIs with comprehensive documentation. Integrate GitHub credential verification into your applications effortlessly.",
      accent: "info"
    },
    {
      title: "Community Driven",
      description: "Open-source foundation with active community contributions. Built by developers, for the developer ecosystem.",
      accent: "purple"
    },
    {
      title: "Global Standards",
      description: "Full W3C Verifiable Credentials compliance. Interoperable with existing identity systems and standards.",
      accent: "warning"
    }
  ];

  return (
    <section className="py-20 bg-neutral-50">
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
            Why Choose PersonaPass?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl text-neutral-600 max-w-3xl mx-auto"
          >
            Experience the future of digital identity with cutting-edge technology 
            and developer-first design principles.
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Feature
              key={index}
              title={feature.title}
              description={feature.description}
              index={index}
              accent={feature.accent}
            />
          ))}
        </div>
      </div>
    </section>
  );
}