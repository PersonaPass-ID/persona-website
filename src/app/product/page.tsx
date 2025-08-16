'use client'

import { useState } from 'react'

export default function ProductPage() {
  const [activeFeature, setActiveFeature] = useState(0)

  const features = [
    {
      id: 'zk-proofs',
      title: 'Zero-Knowledge Proofs',
      description: 'Prove your identity without revealing personal data. Our advanced ZK-SNARK implementation ensures complete privacy while maintaining verifiability.',
      icon: '🔐',
      gradient: 'from-electric-blue to-cyber-cyan'
    },
    {
      id: 'did',
      title: 'Decentralized Identity',
      description: 'Own your identity completely. Create, manage, and control your DID across all platforms without relying on centralized authorities.',
      icon: '🆔',
      gradient: 'from-neon-purple to-plasma-pink'
    },
    {
      id: 'credentials',
      title: 'Verifiable Credentials',
      description: 'Issue and verify credentials instantly. Our W3C-compliant VC system enables trustless verification of qualifications and attestations.',
      icon: '✅',
      gradient: 'from-quantum-green to-electric-blue'
    }
  ]

  return (
    <div className="min-h-screen midnight-bg">
      {/* Hero Section */}
      <section className="py-32 px-6 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-primary rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
          <div className="absolute top-40 right-20 w-72 h-72 bg-gradient-secondary rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-gradient-mesh rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{animationDelay: '4s'}}></div>
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center space-x-2 bg-gradient-primary/10 backdrop-blur-sm border border-electric-blue/20 rounded-full px-6 py-2 mb-8">
            <div className="w-2 h-2 bg-electric-blue rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-electric-blue">Revolutionary Identity Technology</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-pearl-white via-electric-blue to-neon-purple bg-clip-text text-transparent">
            The Future of
            <br />
            <span className="relative">
              Digital Identity
              <div className="absolute -inset-1 bg-gradient-primary opacity-30 blur-2xl rounded-full"></div>
            </span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed">
            Experience true digital sovereignty with PersonaPass. Our cutting-edge zero-knowledge technology 
            puts you in complete control of your identity, credentials, and personal data.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="group relative px-8 py-4 bg-gradient-primary rounded-lg font-semibold text-primary-foreground transition-all hover:shadow-glow-primary hover:scale-105">
              <div className="absolute inset-0 bg-gradient-primary rounded-lg blur opacity-75 group-hover:opacity-100 transition-opacity"></div>
              <span className="relative flex items-center space-x-2">
                <span>Start Your Journey</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </button>
            
            <button className="group px-8 py-4 bg-secondary/10 backdrop-blur-sm border border-border rounded-lg font-semibold text-foreground hover:bg-secondary/20 transition-all">
              <span className="flex items-center space-x-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h8m-7-4h6m-3-2v2m0 4v2" />
                </svg>
                <span>View Demo</span>
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Interactive Features */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Revolutionary Features</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover the technologies that make PersonaPass the most advanced digital identity platform
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Feature Tabs */}
            <div className="space-y-4">
              {features.map((feature, index) => (
                <div
                  key={feature.id}
                  className={`group relative p-6 rounded-xl cursor-pointer transition-all ${
                    activeFeature === index
                      ? 'bg-gradient-to-r from-secondary/20 to-accent/20 border-electric-blue/50 shadow-glow-primary'
                      : 'bg-card/50 backdrop-blur-sm border-border hover:border-electric-blue/30'
                  } border`}
                  onClick={() => setActiveFeature(index)}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`text-4xl p-3 rounded-lg bg-gradient-to-br ${feature.gradient} shadow-lg`}>
                      {feature.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2 group-hover:text-electric-blue transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                  
                  {activeFeature === index && (
                    <div className="absolute inset-0 bg-gradient-to-r from-electric-blue/10 to-cyber-cyan/10 rounded-xl pointer-events-none">
                      <div className="absolute inset-0 bg-gradient-border rounded-xl opacity-50 blur-sm"></div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Feature Visualization */}
            <div className="relative">
              <div className="glass-card p-8 rounded-2xl border-2 border-electric-blue/20">
                <div className="aspect-square relative overflow-hidden rounded-xl bg-gradient-to-br from-void-black to-primary/20">
                  {/* Animated Network Nodes */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-64 h-64">
                      {/* Central Node */}
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gradient-primary rounded-full shadow-glow-primary animate-pulse flex items-center justify-center">
                        <span className="text-2xl">🔐</span>
                      </div>
                      
                      {/* Orbital Nodes */}
                      {[0, 1, 2, 3, 4, 5].map((i) => (
                        <div
                          key={i}
                          className="absolute w-8 h-8 bg-gradient-secondary rounded-full shadow-glow-secondary animate-float"
                          style={{
                            top: `${50 + 35 * Math.sin((i * Math.PI) / 3)}%`,
                            left: `${50 + 35 * Math.cos((i * Math.PI) / 3)}%`,
                            transform: 'translate(-50%, -50%)',
                            animationDelay: `${i * 0.5}s`
                          }}
                        >
                          <div className="w-full h-full bg-neon-purple rounded-full opacity-75"></div>
                        </div>
                      ))}
                      
                      {/* Connection Lines */}
                      <svg className="absolute inset-0 w-full h-full">
                        {[0, 1, 2, 3, 4, 5].map((i) => (
                          <line
                            key={i}
                            x1="50%"
                            y1="50%"
                            x2={`${50 + 35 * Math.cos((i * Math.PI) / 3)}%`}
                            y2={`${50 + 35 * Math.sin((i * Math.PI) / 3)}%`}
                            stroke="url(#gradient)"
                            strokeWidth="2"
                            className="opacity-60"
                          />
                        ))}
                        <defs>
                          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" style={{stopColor: 'hsl(var(--electric-blue))', stopOpacity: 0.8}} />
                            <stop offset="100%" style={{stopColor: 'hsl(var(--neon-purple))', stopOpacity: 0.3}} />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 text-center">
                  <h4 className="text-lg font-semibold mb-2">{features[activeFeature].title}</h4>
                  <p className="text-sm text-muted-foreground">
                    Interactive visualization of {features[activeFeature].title.toLowerCase()} in action
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-24 px-6 bg-gradient-to-b from-transparent to-secondary/10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Choose Your Plan</h2>
            <p className="text-xl text-muted-foreground">
              Start free and scale as you grow
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Developer Plan */}
            <div className="glass-card p-8 rounded-2xl border border-border hover:border-electric-blue/50 transition-all group">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">Developer</h3>
                <div className="text-4xl font-bold mb-4">
                  <span className="text-electric-blue">Free</span>
                </div>
                <p className="text-muted-foreground">Perfect for getting started</p>
              </div>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-center space-x-3">
                  <div className="w-5 h-5 bg-quantum-green rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>1,000 API calls/month</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-5 h-5 bg-quantum-green rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>Basic ZK proofs</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-5 h-5 bg-quantum-green rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>Community support</span>
                </li>
              </ul>
              
              <button className="w-full py-3 px-6 bg-secondary rounded-lg font-semibold hover:bg-secondary/80 transition-colors">
                Get Started
              </button>
            </div>

            {/* Pro Plan */}
            <div className="glass-card p-8 rounded-2xl border-2 border-electric-blue relative group hover:shadow-glow-primary transition-all">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-gradient-primary px-6 py-2 rounded-full text-sm font-semibold text-primary-foreground">
                  Most Popular
                </div>
              </div>
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">Professional</h3>
                <div className="text-4xl font-bold mb-4">
                  <span className="text-electric-blue">$49</span>
                  <span className="text-lg text-muted-foreground">/month</span>
                </div>
                <p className="text-muted-foreground">For production applications</p>
              </div>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-center space-x-3">
                  <div className="w-5 h-5 bg-quantum-green rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>100,000 API calls/month</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-5 h-5 bg-quantum-green rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>Advanced ZK proofs</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-5 h-5 bg-quantum-green rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>Priority support</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-5 h-5 bg-quantum-green rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>Custom integrations</span>
                </li>
              </ul>
              
              <button className="w-full py-3 px-6 bg-gradient-primary rounded-lg font-semibold text-primary-foreground hover:shadow-glow-primary transition-all">
                Start Pro Trial
              </button>
            </div>

            {/* Enterprise Plan */}
            <div className="glass-card p-8 rounded-2xl border border-border hover:border-electric-blue/50 transition-all group">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">Enterprise</h3>
                <div className="text-4xl font-bold mb-4">
                  <span className="text-electric-blue">Custom</span>
                </div>
                <p className="text-muted-foreground">For large organizations</p>
              </div>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-center space-x-3">
                  <div className="w-5 h-5 bg-quantum-green rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>Unlimited API calls</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-5 h-5 bg-quantum-green rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>Custom ZK circuits</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-5 h-5 bg-quantum-green rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>Dedicated support</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-5 h-5 bg-quantum-green rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>SLA guarantees</span>
                </li>
              </ul>
              
              <button className="w-full py-3 px-6 bg-secondary rounded-lg font-semibold hover:bg-secondary/80 transition-colors">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Back to Home */}
      <div className="text-center py-12">
        <a href="/" className="text-electric-blue hover:text-neon-purple transition-colors font-medium">
          ← Back to Homepage
        </a>
      </div>
    </div>
  )
}