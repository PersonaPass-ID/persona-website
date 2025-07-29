"use client"

import { BoxReveal } from '@/components/ui/box-reveal'
import { TypingAnimation } from '@/components/ui/typing-animation'
import { AnimatedGradientText } from '@/components/ui/animated-gradient-text'
import { Button } from '@/components/ui/button'
import { AnimatedBeam } from '@/components/ui/animated-beam'
import { WalletConnect } from '@/components/web3/wallet-connect'
import { useRef } from 'react'

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const div1Ref = useRef<HTMLDivElement>(null)
  const div2Ref = useRef<HTMLDivElement>(null)
  const div3Ref = useRef<HTMLDivElement>(null)

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-persona-dark via-slate-900 to-persona-dark">
      {/* Animated Background */}
      <div className="absolute inset-0 mesh-gradient opacity-30" />
      <div className="absolute inset-0 cyber-grid opacity-20" />
      
      {/* Floating Elements for Animated Beams */}
      <div ref={containerRef} className="absolute inset-0">
        <div
          ref={div1Ref}
          className="absolute top-1/4 left-1/4 w-4 h-4 bg-persona-primary rounded-full opacity-60 floating"
        />
        <div
          ref={div2Ref}
          className="absolute top-1/3 right-1/4 w-4 h-4 bg-persona-secondary rounded-full opacity-60 floating animation-delay-2000"
        />
        <div
          ref={div3Ref}
          className="absolute bottom-1/3 left-1/3 w-4 h-4 bg-persona-accent rounded-full opacity-60 floating animation-delay-4000"
        />
        
        {/* Animated Beams */}
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={div1Ref}
          toRef={div2Ref}
          curvature={-75}
          gradientStartColor="#6366f1"
          gradientStopColor="#8b5cf6"
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={div2Ref}
          toRef={div3Ref}
          curvature={75}
          reverse
          gradientStartColor="#8b5cf6"
          gradientStopColor="#06b6d4"
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <div className="space-y-8">
          {/* Badge */}
          <BoxReveal boxColor="#6366f1" duration={0.5}>
            <AnimatedGradientText className="mb-6">
              🚀 Welcome to the Future of Digital Identity
            </AnimatedGradientText>
          </BoxReveal>

          {/* Main Heading */}
          <BoxReveal boxColor="#8b5cf6" duration={0.7}>
            <TypingAnimation
              text="Zero-Knowledge. Maximum Trust."
              className="text-6xl md:text-8xl font-bold gradient-text mb-6"
              duration={100}
            />
          </BoxReveal>

          {/* Subheading */}
          <BoxReveal boxColor="#06b6d4" duration={0.9}>
            <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              Persona revolutionizes digital identity with privacy-first technology.
              Own your credentials, control your data, trust the protocol.
            </p>
          </BoxReveal>

          {/* Call to Action */}
          <BoxReveal boxColor="#6366f1" duration={1.1}>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-12">
              <Button
                variant="gradient"
                size="xl"
                className="group"
              >
                <span className="flex items-center gap-2">
                  Get Started
                  <svg 
                    className="w-5 h-5 transition-transform group-hover:translate-x-1" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </Button>
              
              <Button
                variant="glass"
                size="xl"
                className="group"
              >
                <span className="flex items-center gap-2">
                  Learn More
                  <svg 
                    className="w-5 h-5 transition-transform group-hover:scale-110" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
              </Button>
            </div>
          </BoxReveal>

          {/* Wallet Connection */}
          <BoxReveal boxColor="#8b5cf6" duration={1.3}>
            <div className="mt-16">
              <WalletConnect />
            </div>
          </BoxReveal>

          {/* Trust Indicators */}
          <BoxReveal boxColor="#06b6d4" duration={1.5}>
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="glass-card text-center">
                <div className="text-3xl font-bold gradient-text">100%</div>
                <div className="text-white/70">Privacy Preserved</div>
              </div>
              <div className="glass-card text-center">
                <div className="text-3xl font-bold gradient-text">Zero</div>
                <div className="text-white/70">Data Compromised</div>
              </div>
              <div className="glass-card text-center">
                <div className="text-3xl font-bold gradient-text">∞</div>
                <div className="text-white/70">Trust Enhanced</div>
              </div>
            </div>
          </BoxReveal>
        </div>
      </div>
    </section>
  )
}