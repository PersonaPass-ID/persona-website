import { Navbar } from '@/components/navbar'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      <div className="pt-20">
        <div className="container mx-auto px-4 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              About PersonaPass
            </h1>
            <p className="text-xl text-white/70 max-w-3xl mx-auto mb-16">
              Building the future of self-sovereign digital identity.
            </p>
            
            <div className="glass-card p-12 max-w-2xl mx-auto">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl mx-auto mb-6 flex items-center justify-center">
                <span className="text-2xl">🌟</span>
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
              <p className="text-white/60 mb-8">
                We believe everyone deserves to own and control their digital identity. PersonaPass makes this vision a reality through blockchain technology and zero-knowledge proofs.
              </p>
              <a 
                href="/get-started" 
                className="btn-primary inline-block"
              >
                Join Our Mission
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}