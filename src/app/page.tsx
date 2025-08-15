export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
            PersonaPass Digital Identity
          </h1>
          <p className="text-2xl text-muted-foreground mb-4 max-w-3xl mx-auto leading-relaxed">
            The most secure digital identity platform in the world
          </p>
          <p className="text-lg text-muted-foreground/80 mb-12 max-w-2xl mx-auto">
            Create verifiable credentials, prove your identity with zero-knowledge technology, 
            and maintain complete control over your personal data on the blockchain.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="btn-primary text-lg px-12 py-4">
              Create Your Identity
            </button>
            <button className="btn-secondary text-lg px-12 py-4">
              View Documentation
            </button>
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section className="py-20 px-6 border-t border-border/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Core Capabilities</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Enterprise-grade digital identity infrastructure built for privacy and security
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-10">
            <div className="card-professional">
              <div className="mb-6">
                <div className="badge-professional">
                  PRIVACY TECHNOLOGY
                </div>
              </div>
              <h3 className="mb-4">Zero-Knowledge Proofs</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Prove your identity, age, or credentials without revealing any personal information. 
                Our advanced cryptographic protocols ensure your data remains completely private.
              </p>
            </div>
            
            <div className="card-professional">
              <div className="mb-6">
                <div className="badge-professional">
                  BLOCKCHAIN SECURITY
                </div>
              </div>
              <h3 className="mb-4">Decentralized Storage</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Your credentials are secured on PersonaChain blockchain with enterprise-grade encryption. 
                No single point of failure, complete data sovereignty.
              </p>
            </div>
            
            <div className="card-professional">
              <div className="mb-6">
                <div className="badge-professional">
                  IDENTITY VERIFICATION
                </div>
              </div>
              <h3 className="mb-4">KYC Integration</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Connect with verified identity providers for seamless onboarding. 
                Instantly generate multiple credential types from a single verification.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-20 px-6 bg-secondary/20">
        <div className="max-w-6xl mx-auto text-center">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="p-6">
              <div className="text-3xl font-bold text-primary mb-2">256-bit</div>
              <div className="text-muted-foreground">Military-grade encryption</div>
            </div>
            <div className="p-6">
              <div className="text-3xl font-bold text-primary mb-2">100%</div>
              <div className="text-muted-foreground">Data sovereignty</div>
            </div>
            <div className="p-6">
              <div className="text-3xl font-bold text-primary mb-2">W3C</div>
              <div className="text-muted-foreground">Standard compliant</div>
            </div>
            <div className="p-6">
              <div className="text-3xl font-bold text-primary mb-2">Open</div>
              <div className="text-muted-foreground">Source protocol</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}