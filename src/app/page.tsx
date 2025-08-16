'use client'

// import { WavyBackground } from '../components/ui/wavy-background' // Replaced with custom background
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
      
      {/* Hero Section with Background Image */}
      <section className="relative min-h-screen">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url("/images/Information Overload - Germán Di Ciccio.jpeg")',
          }}
        />
        {/* Gradient overlay inspired by the image - cosmic blue to tech orange */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-indigo-900/70 to-orange-900/60" />
        <div className="relative z-10 max-w-6xl mx-auto">
          <HeroSection />
        </div>
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