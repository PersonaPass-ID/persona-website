// 🎉 WELCOME STEP - Modern Web3 Onboarding Experience
// Award-winning design with glassmorphism and Web3 aesthetics

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Fingerprint, Globe, Zap, TrendingUp, Users, Lock, CheckCircle } from 'lucide-react';
import type { StepProps } from './types';

const WelcomeStep: React.FC<StepProps> = ({ 
  onNext, 
  stepData 
}) => {
  const features = [
    {
      icon: Fingerprint,
      title: 'Self-Sovereign Identity',
      description: 'Own your identity with a decentralized identifier (DID) that works everywhere',
      color: 'purple'
    },
    {
      icon: Shield,
      title: 'Zero-Knowledge Privacy',
      description: 'Your data is cryptographically secured - prove without revealing',
      color: 'blue'
    },
    {
      icon: Globe,
      title: 'Universal Access',
      description: 'Use one identity across all Web3 apps and services seamlessly',
      color: 'pink'
    },
    {
      icon: Zap,
      title: 'Instant Verification',
      description: 'Prove who you are instantly without sharing personal information',
      color: 'purple'
    }
  ];

  const stats = [
    { label: 'Active Users', value: '50,000+', icon: Users, color: 'purple' },
    { label: 'Blockchain Txs', value: '2M+', icon: TrendingUp, color: 'blue' },
    { label: 'Verifications', value: '500K+', icon: CheckCircle, color: 'pink' }
  ];

  const steps = [
    { number: 1, label: 'Choose Auth', color: 'purple' },
    { number: 2, label: 'Secure Keys', color: 'blue' },
    { number: 3, label: 'Build Profile', color: 'pink' },
    { number: 4, label: 'Launch!', color: 'green', isComplete: true }
  ];

  return (
    <div className="text-center relative">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute -top-40 -left-40 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ rotate: [360, 0] }}
          transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-40 -right-40 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"
        />
      </div>

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-12"
      >
        {/* Logo */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 100 }}
          className="relative group mb-8"
        >
          <div className="w-24 h-24 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-3xl mx-auto flex items-center justify-center relative overflow-hidden">
            <motion.div
              animate={{ rotate: [0, 180, 360] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="text-4xl text-white font-bold"
            >
              P
            </motion.div>
            {/* Animated border */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 opacity-0 group-hover:opacity-50 blur-lg transition-opacity duration-500" />
          </div>
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight"
        >
          Welcome to the{' '}
          <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
            Future of Identity
          </span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-xl text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Create your decentralized identity in minutes. Own your data, control your privacy, 
          and access the Web3 world with confidence.
        </motion.p>

        {/* Trust Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-3xl mx-auto">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 + 0.6 }}
              className="glass-card p-6 hover:bg-white/10 transition-all duration-300 group"
            >
              <div className={`w-12 h-12 rounded-xl mb-4 mx-auto flex items-center justify-center ${
                stat.color === 'purple' ? 'bg-purple-500/20 border border-purple-500/30' :
                stat.color === 'blue' ? 'bg-blue-500/20 border border-blue-500/30' :
                'bg-pink-500/20 border border-pink-500/30'
              }`}>
                <stat.icon className={`w-6 h-6 ${
                  stat.color === 'purple' ? 'text-purple-400' :
                  stat.color === 'blue' ? 'text-blue-400' :
                  'text-pink-400'
                }`} />
              </div>
              <div className="text-2xl font-bold text-white mb-1 group-hover:text-gradient transition-all duration-300">
                {stat.value}
              </div>
              <div className="text-sm text-white/60 group-hover:text-white/80 transition-colors duration-300">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 + 0.8 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="glass-card p-8 hover:bg-white/10 transition-all duration-500 group relative overflow-hidden"
          >
            {/* Hover glow */}
            <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10 ${
              feature.color === 'purple' ? 'bg-purple-600/20' :
              feature.color === 'blue' ? 'bg-blue-600/20' :
              'bg-pink-600/20'
            }`} />
            
            <div className={`w-16 h-16 rounded-2xl mb-6 mx-auto flex items-center justify-center transition-all duration-300 group-hover:scale-110 ${
              feature.color === 'purple' ? 'bg-gradient-to-br from-purple-500/20 to-purple-600/20 border border-purple-500/30' :
              feature.color === 'blue' ? 'bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-500/30' :
              'bg-gradient-to-br from-pink-500/20 to-pink-600/20 border border-pink-500/30'
            }`}>
              <feature.icon className={`w-8 h-8 transition-all duration-300 group-hover:scale-110 ${
                feature.color === 'purple' ? 'text-purple-400' :
                feature.color === 'blue' ? 'text-blue-400' :
                'text-pink-400'
              }`} />
            </div>
            
            <h3 className="text-lg font-bold text-white mb-3 group-hover:text-gradient transition-all duration-300">
              {feature.title}
            </h3>
            <p className="text-white/60 group-hover:text-white/80 transition-colors duration-300 leading-relaxed">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>

      {/* How It Works */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="mb-12"
      >
        <h2 className="text-2xl font-bold text-white mb-8">
          How PersonaPass Works
        </h2>
        
        <div className="glass-card p-8">
          <div className="flex flex-col md:flex-row justify-center items-center md:space-x-6 space-y-4 md:space-y-0">
            {steps.map((step, index) => (
              <React.Fragment key={step.number}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.3 + index * 0.1 }}
                  className="flex flex-col items-center group"
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white mb-2 transition-all duration-300 group-hover:scale-110 ${
                    step.isComplete ? 'bg-gradient-to-r from-green-500 to-emerald-500' :
                    step.color === 'purple' ? 'bg-gradient-to-r from-purple-500 to-purple-600' :
                    step.color === 'blue' ? 'bg-gradient-to-r from-blue-500 to-blue-600' :
                    'bg-gradient-to-r from-pink-500 to-pink-600'
                  }`}>
                    {step.isComplete ? (
                      <CheckCircle className="w-6 h-6" />
                    ) : (
                      step.number
                    )}
                  </div>
                  <span className="text-sm text-white/80 font-medium">{step.label}</span>
                </motion.div>
                
                {index < steps.length - 1 && (
                  <div className="hidden md:block text-white/30 text-xl">→</div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Security Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.5 }}
        className="glass-card inline-flex items-center space-x-3 px-6 py-4 mb-10 hover:bg-white/10 transition-all duration-300 group"
      >
        <div className="w-8 h-8 bg-green-500/20 border border-green-500/30 rounded-lg flex items-center justify-center">
          <Lock className="w-4 h-4 text-green-400" />
        </div>
        <span className="text-white font-medium">Enterprise-grade security & privacy</span>
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
      </motion.div>

      {/* Enhanced CTA Button */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6 }}
        className="relative group"
      >
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-2xl blur-lg opacity-70 group-hover:opacity-100 transition-opacity duration-500" />
        <motion.button
          onClick={onNext}
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          className="relative px-12 py-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold text-lg rounded-2xl shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 overflow-hidden group"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
          <span className="relative z-10 flex items-center">
            Create My Digital Identity
            <motion.span
              className="ml-3"
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Zap className="w-5 h-5" />
            </motion.span>
          </span>
        </motion.button>
      </motion.div>

      {/* Social Proof */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="mt-12"
      >
        <p className="text-white/40 text-sm mb-4">Trusted by developers at leading Web3 companies</p>
        <div className="flex justify-center items-center space-x-8 opacity-60">
          <motion.div
            whileHover={{ scale: 1.1, opacity: 1 }}
            className="text-white/60 font-semibold cursor-pointer transition-all duration-300"
          >
            🏢 Microsoft
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.1, opacity: 1 }}
            className="text-white/60 font-semibold cursor-pointer transition-all duration-300"
          >
            🌐 Ethereum
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.1, opacity: 1 }}
            className="text-white/60 font-semibold cursor-pointer transition-all duration-300"
          >
            🔗 Polygon
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.1, opacity: 1 }}
            className="text-white/60 font-semibold cursor-pointer transition-all duration-300"
          >
            ⚡ Solana
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default WelcomeStep;