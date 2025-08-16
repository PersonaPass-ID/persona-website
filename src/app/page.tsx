'use client'

import { WavyBackground } from '../components/ui/wavy-background'
import Navigation from '../components/layout/Navigation'
import HeroSection from '../components/sections/HeroSection'
import FeaturesSection from '../components/sections/FeaturesSection'
import HowItWorksSection from '../components/sections/HowItWorksSection'
import EcosystemSection from '../components/sections/EcosystemSection'
import UseCasesSection from '../components/sections/UseCasesSection'
import ProblemSolutionSection from '../components/sections/ProblemSolutionSection'
import Footer from '../components/layout/Footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <Navigation />
      
      {/* Hero Section with Wavy Background */}
      <section className="relative min-h-screen">
        <WavyBackground className="max-w-6xl mx-auto">
          <HeroSection />
        </WavyBackground>
      </section>

      {/* Features Section */}
      <FeaturesSection />

      {/* How It Works Section */}
      <HowItWorksSection />

      {/* Problem & Solution */}
      <ProblemSolutionSection />

      {/* Ecosystem Section */}
      <EcosystemSection />

      {/* Use Cases Section */}
      <UseCasesSection />

      {/* Footer */}
      <Footer />
    </div>
  )
}