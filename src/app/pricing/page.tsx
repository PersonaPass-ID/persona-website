import { Navbar } from '@/components/navbar'

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      <div className="pt-20">
        <div className="container mx-auto px-4 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Pricing
            </h1>
            <p className="text-xl text-white/70 max-w-3xl mx-auto mb-16">
              Simple, transparent pricing for everyone.
            </p>
            
            <div className="glass-card p-12 max-w-2xl mx-auto">
              <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl mx-auto mb-6 flex items-center justify-center">
                <span className="text-2xl">🆓</span>
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">Free During Beta</h2>
              <p className="text-white/60 mb-8">
                PersonaPass is currently free to use during our beta phase. Create your digital identity at no cost.
              </p>
              <a 
                href="/get-started" 
                className="btn-primary inline-block"
              >
                Get Started Free
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}