export default function Home() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Hero Section */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            PersonaPass Digital Identity
          </h1>
          <p className="text-2xl text-slate-300 mb-4 max-w-3xl mx-auto leading-relaxed">
            The most secure digital identity platform in the world
          </p>
          <p className="text-lg text-slate-400 mb-12 max-w-2xl mx-auto">
            Create verifiable credentials, prove your identity with zero-knowledge technology, 
            and maintain complete control over your personal data on the blockchain.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-12 py-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl text-lg">
              Create Your Identity
            </button>
            <button className="border-2 border-slate-600 bg-transparent hover:bg-slate-800 text-white font-semibold px-12 py-4 rounded-xl transition-all duration-200 text-lg">
              View Documentation
            </button>
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section className="py-20 px-6 border-t border-slate-700">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Core Capabilities</h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Enterprise-grade digital identity infrastructure built for privacy and security
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-10">
            <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 transition-all duration-200 hover:border-slate-600 hover:shadow-lg">
              <div className="mb-6">
                <div className="inline-block px-3 py-1 bg-blue-600/20 text-blue-400 font-bold text-xs rounded-lg">
                  PRIVACY TECHNOLOGY
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4">Zero-Knowledge Proofs</h3>
              <p className="text-slate-300 text-lg leading-relaxed">
                Prove your identity, age, or credentials without revealing any personal information. 
                Our advanced cryptographic protocols ensure your data remains completely private.
              </p>
            </div>
            
            <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 transition-all duration-200 hover:border-slate-600 hover:shadow-lg">
              <div className="mb-6">
                <div className="inline-block px-3 py-1 bg-purple-600/20 text-purple-400 font-bold text-xs rounded-lg">
                  BLOCKCHAIN SECURITY
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4">Decentralized Storage</h3>
              <p className="text-slate-300 text-lg leading-relaxed">
                Your credentials are secured on PersonaChain blockchain with enterprise-grade encryption. 
                No single point of failure, complete data sovereignty.
              </p>
            </div>
            
            <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 transition-all duration-200 hover:border-slate-600 hover:shadow-lg">
              <div className="mb-6">
                <div className="inline-block px-3 py-1 bg-green-600/20 text-green-400 font-bold text-xs rounded-lg">
                  IDENTITY VERIFICATION
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4">KYC Integration</h3>
              <p className="text-slate-300 text-lg leading-relaxed">
                Connect with verified identity providers for seamless onboarding. 
                Instantly generate multiple credential types from a single verification.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-20 px-6 bg-slate-800/50">
        <div className="max-w-6xl mx-auto text-center">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="p-6">
              <div className="text-3xl font-bold text-blue-400 mb-2">256-bit</div>
              <div className="text-slate-400">Military-grade encryption</div>
            </div>
            <div className="p-6">
              <div className="text-3xl font-bold text-blue-400 mb-2">100%</div>
              <div className="text-slate-400">Data sovereignty</div>
            </div>
            <div className="p-6">
              <div className="text-3xl font-bold text-blue-400 mb-2">W3C</div>
              <div className="text-slate-400">Standard compliant</div>
            </div>
            <div className="p-6">
              <div className="text-3xl font-bold text-blue-400 mb-2">Open</div>
              <div className="text-slate-400">Source protocol</div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Features */}
      <section className="py-20 px-6 border-t border-slate-700">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">Built for Enterprise Security</h2>
              <p className="text-xl text-slate-300 mb-8">
                PersonaPass implements the latest in cryptographic security and blockchain technology 
                to provide uncompromising protection for your digital identity.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-3"></div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2">Quantum-Resistant Cryptography</h4>
                    <p className="text-slate-400">Future-proof security against quantum computing threats</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-3"></div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2">Multi-Signature Validation</h4>
                    <p className="text-slate-400">Distributed consensus for credential authenticity</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-3"></div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2">GDPR Compliance</h4>
                    <p className="text-slate-400">Built-in privacy controls and data portability</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700">
              <h3 className="text-2xl font-bold mb-6">Live Network Status</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">PersonaChain Status</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-green-400 font-semibold">OPERATIONAL</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Block Height</span>
                  <span className="text-white font-mono">111+</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Network Validators</span>
                  <span className="text-white font-mono">1</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Monthly Cost</span>
                  <span className="text-green-400 font-semibold">$40</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-6 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-t border-slate-700">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Take Control?</h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Join the future of digital identity. Create your sovereign identity today and experience 
            true privacy and security in the Web3 ecosystem.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-12 py-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl text-lg">
              Start Your Identity Journey
            </button>
            <button className="border-2 border-slate-600 bg-transparent hover:bg-slate-800 text-white font-semibold px-12 py-4 rounded-xl transition-all duration-200 text-lg">
              Explore Documentation
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-slate-700 bg-slate-800/50">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-slate-400">
            Built with ❤️ for a more private and secure digital future
          </p>
          <p className="text-slate-500 text-sm mt-2">
            PersonaPass © 2024 | Zero-Knowledge Digital Identity Protocol
          </p>
        </div>
      </footer>
    </div>
  )
}