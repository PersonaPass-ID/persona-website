'use client'

import { useState } from 'react'

export default function SolutionsPage() {
  const [activeSolution, setActiveSolution] = useState(0)

  const solutions = [
    {
      id: 'defi',
      title: 'DeFi Protocols',
      subtitle: 'Privacy-First Finance',
      description: 'Enable privacy-preserving KYC/AML compliance while maintaining user anonymity in DeFi protocols.',
      icon: '💰',
      gradient: 'from-electric-blue to-cyber-cyan',
      features: [
        'Zero-knowledge KYC verification',
        'Anonymous transaction compliance', 
        'Regulatory audit trails',
        'Cross-protocol identity'
      ],
      metrics: [
        { label: 'Privacy Score', value: '100%' },
        { label: 'Compliance Rate', value: '99.9%' },
        { label: 'Integration Time', value: '< 1 day' }
      ]
    },
    {
      id: 'events',
      title: 'Events & Ticketing',
      subtitle: 'Fraud-Proof Access',
      description: 'Create verifiable event credentials and prevent ticket fraud with blockchain-backed identity verification.',
      icon: '🎫',
      gradient: 'from-neon-purple to-plasma-pink',
      features: [
        'NFT-based ticket verification',
        'Anti-fraud identity checks',
        'Age verification without data exposure',
        'Transferable credentials'
      ],
      metrics: [
        { label: 'Fraud Reduction', value: '98%' },
        { label: 'Verification Speed', value: '< 2s' },
        { label: 'User Satisfaction', value: '96%' }
      ]
    },
    {
      id: 'daos',
      title: 'DAOs & Governance',
      subtitle: 'Transparent Democracy',
      description: 'Enable quadratic voting and governance participation while preserving voter privacy and preventing Sybil attacks.',
      icon: '🗳️',
      gradient: 'from-quantum-green to-electric-blue',
      features: [
        'Sybil-resistant voting',
        'Privacy-preserving quadratic voting',
        'Credential-based governance',
        'Reputation tracking'
      ],
      metrics: [
        { label: 'Sybil Protection', value: '99.9%' },
        { label: 'Voter Privacy', value: '100%' },
        { label: 'Proposal Success', value: '87%' }
      ]
    },
    {
      id: 'enterprise',
      title: 'Enterprise SSO',
      subtitle: 'Seamless Integration',
      description: 'Replace traditional SSO with decentralized identity for enhanced security and user control.',
      icon: '🏢',
      gradient: 'from-plasma-pink to-neon-purple',
      features: [
        'Zero-trust authentication',
        'Multi-org credential sharing',
        'Compliance automation',
        'Reduced IT overhead'
      ],
      metrics: [
        { label: 'Security Score', value: '99.9%' },
        { label: 'Cost Reduction', value: '65%' },
        { label: 'Setup Time', value: '< 1 week' }
      ]
    }
  ]

  return (
    <div className="min-h-screen midnight-bg">
      {/* Hero Section */}
      <section className="py-32 px-6 relative overflow-hidden">
        {/* Animated Grid Background */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0" 
               style={{
                 backgroundImage: `
                   linear-gradient(rgba(0, 224, 198, 0.1) 1px, transparent 1px),
                   linear-gradient(90deg, rgba(0, 224, 198, 0.1) 1px, transparent 1px)
                 `,
                 backgroundSize: '40px 40px'
               }}>
          </div>
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center space-x-2 bg-gradient-secondary/10 backdrop-blur-sm border border-neon-purple/20 rounded-full px-6 py-2 mb-8">
            <div className="w-2 h-2 bg-neon-purple rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-neon-purple">Industry Solutions</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-pearl-white via-neon-purple to-electric-blue bg-clip-text text-transparent">
            Built for Every
            <br />
            <span className="relative">
              Industry
              <div className="absolute -inset-1 bg-gradient-secondary opacity-30 blur-2xl rounded-full"></div>
            </span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed">
            From DeFi protocols to enterprise authentication, PersonaPass delivers tailored 
            solutions that transform how industries handle digital identity and privacy.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            {solutions.map((solution, index) => (
              <button
                key={solution.id}
                onClick={() => setActiveSolution(index)}
                className={`px-6 py-3 rounded-full font-medium transition-all ${
                  activeSolution === index
                    ? `bg-gradient-to-r ${solution.gradient} text-white shadow-lg`
                    : 'bg-secondary/20 text-muted-foreground hover:bg-secondary/30 border border-border'
                }`}
              >
                <span className="flex items-center space-x-2">
                  <span>{solution.icon}</span>
                  <span>{solution.title}</span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Active Solution Details */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Solution Info */}
            <div>
              <div className="mb-8">
                <div className={`inline-flex items-center space-x-3 p-4 rounded-2xl bg-gradient-to-r ${solutions[activeSolution].gradient}/10 border border-electric-blue/20 mb-6`}>
                  <div className={`text-4xl p-3 rounded-xl bg-gradient-to-br ${solutions[activeSolution].gradient} shadow-lg`}>
                    {solutions[activeSolution].icon}
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold">{solutions[activeSolution].title}</h2>
                    <p className="text-lg text-muted-foreground">{solutions[activeSolution].subtitle}</p>
                  </div>
                </div>
                
                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                  {solutions[activeSolution].description}
                </p>
              </div>

              {/* Features */}
              <div className="space-y-4 mb-8">
                <h3 className="text-xl font-bold mb-4">Key Features</h3>
                {solutions[activeSolution].features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-5 h-5 bg-quantum-green rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-foreground">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-4">
                {solutions[activeSolution].metrics.map((metric, index) => (
                  <div key={index} className="text-center p-4 bg-card/50 rounded-lg border border-border">
                    <div className={`text-2xl font-bold bg-gradient-to-r ${solutions[activeSolution].gradient} bg-clip-text text-transparent`}>
                      {metric.value}
                    </div>
                    <div className="text-sm text-muted-foreground">{metric.label}</div>
                  </div>
                ))}
              </div>

              <div className="flex space-x-4 mt-8">
                <button className={`px-8 py-3 bg-gradient-to-r ${solutions[activeSolution].gradient} rounded-lg font-semibold text-white shadow-lg hover:shadow-glow-primary transition-all`}>
                  Get Started
                </button>
                <button className="px-8 py-3 bg-secondary/20 border border-border rounded-lg font-semibold hover:bg-secondary/30 transition-all">
                  View Case Study
                </button>
              </div>
            </div>

            {/* Interactive Demo */}
            <div className="relative">
              <div className="glass-card p-8 rounded-3xl border-2 border-electric-blue/20">
                <div className="aspect-square relative overflow-hidden rounded-2xl bg-gradient-to-br from-void-black via-primary/10 to-secondary/10">
                  {/* Demo Content Based on Active Solution */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    {activeSolution === 0 && (
                      // DeFi Demo
                      <div className="relative w-80 h-80">
                        <div className="absolute inset-0 rounded-full border-4 border-electric-blue/30 animate-spin" style={{animationDuration: '20s'}}></div>
                        <div className="absolute inset-4 rounded-full border-2 border-cyber-cyan/50 animate-spin" style={{animationDuration: '15s', animationDirection: 'reverse'}}></div>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-gradient-primary rounded-full shadow-glow-primary flex items-center justify-center">
                          <span className="text-3xl">💰</span>
                        </div>
                        {/* Transaction Nodes */}
                        {[0, 1, 2, 3].map((i) => (
                          <div
                            key={i}
                            className="absolute w-12 h-12 bg-gradient-secondary rounded-full shadow-glow-secondary animate-pulse flex items-center justify-center"
                            style={{
                              top: `${50 + 40 * Math.sin((i * Math.PI) / 2)}%`,
                              left: `${50 + 40 * Math.cos((i * Math.PI) / 2)}%`,
                              transform: 'translate(-50%, -50%)',
                              animationDelay: `${i * 0.3}s`
                            }}
                          >
                            <span className="text-xs">🔐</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {activeSolution === 1 && (
                      // Events Demo
                      <div className="relative w-80 h-80">
                        <div className="absolute inset-0 grid grid-cols-4 gap-4 p-8">
                          {Array.from({length: 16}).map((_, i) => (
                            <div
                              key={i}
                              className={`aspect-square rounded-lg flex items-center justify-center text-xs animate-pulse ${
                                i % 3 === 0 ? 'bg-gradient-primary shadow-glow-primary' : 'bg-secondary/30'
                              }`}
                              style={{animationDelay: `${i * 0.1}s`}}
                            >
                              {i % 3 === 0 ? '🎫' : ''}
                            </div>
                          ))}
                        </div>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gradient-secondary rounded-full shadow-glow-secondary flex items-center justify-center">
                          <span className="text-2xl">✅</span>
                        </div>
                      </div>
                    )}

                    {activeSolution === 2 && (
                      // DAO Demo
                      <div className="relative w-80 h-80">
                        {/* Voting Nodes */}
                        {[0, 1, 2, 3, 4, 5].map((i) => (
                          <div
                            key={i}
                            className="absolute w-16 h-16 bg-gradient-to-br from-quantum-green to-electric-blue rounded-full shadow-glow-success animate-float flex items-center justify-center"
                            style={{
                              top: `${30 + 40 * Math.sin((i * Math.PI) / 3)}%`,
                              left: `${30 + 40 * Math.cos((i * Math.PI) / 3)}%`,
                              animationDelay: `${i * 0.5}s`
                            }}
                          >
                            <span className="text-xl">🗳️</span>
                          </div>
                        ))}
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-gradient-primary rounded-full shadow-glow-primary flex items-center justify-center">
                          <span className="text-3xl">⚖️</span>
                        </div>
                      </div>
                    )}

                    {activeSolution === 3 && (
                      // Enterprise Demo
                      <div className="relative w-80 h-80">
                        <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 gap-4 p-8">
                          {Array.from({length: 9}).map((_, i) => (
                            <div
                              key={i}
                              className="bg-gradient-to-br from-plasma-pink/20 to-neon-purple/20 rounded-lg border border-neon-purple/30 flex items-center justify-center animate-pulse"
                              style={{animationDelay: `${i * 0.2}s`}}
                            >
                              <span className="text-lg">🏢</span>
                            </div>
                          ))}
                        </div>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gradient-secondary rounded-full shadow-glow-secondary flex items-center justify-center">
                          <span className="text-2xl">🔗</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="mt-6 text-center">
                  <h4 className="text-lg font-semibold mb-2">Live Demo</h4>
                  <p className="text-sm text-muted-foreground">
                    Interactive preview of {solutions[activeSolution].title.toLowerCase()} implementation
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industry Stats */}
      <section className="py-24 px-6 bg-gradient-to-b from-transparent to-secondary/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Trusted by Leading Organizations</h2>
            <p className="text-xl text-muted-foreground">
              See how PersonaPass is transforming digital identity across industries
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center glass-card p-8 rounded-2xl">
              <div className="text-4xl font-bold text-electric-blue mb-2">$2.5B+</div>
              <div className="text-muted-foreground">Assets Secured</div>
            </div>
            <div className="text-center glass-card p-8 rounded-2xl">
              <div className="text-4xl font-bold text-neon-purple mb-2">1M+</div>
              <div className="text-muted-foreground">Verified Users</div>
            </div>
            <div className="text-center glass-card p-8 rounded-2xl">
              <div className="text-4xl font-bold text-quantum-green mb-2">99.9%</div>
              <div className="text-muted-foreground">Uptime SLA</div>
            </div>
            <div className="text-center glass-card p-8 rounded-2xl">
              <div className="text-4xl font-bold text-cyber-cyan mb-2">150+</div>
              <div className="text-muted-foreground">Integrations</div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Success Stories</h2>
            <p className="text-xl text-muted-foreground">
              Real results from real implementations
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="glass-card p-8 rounded-2xl border border-border hover:border-electric-blue/50 transition-all group">
              <div className="w-16 h-16 bg-gradient-to-br from-electric-blue to-cyber-cyan rounded-xl mb-6 flex items-center justify-center">
                <span className="text-2xl">🏦</span>
              </div>
              <h3 className="text-xl font-bold mb-4">DeFi Protocol X</h3>
              <p className="text-muted-foreground mb-6">
                Reduced KYC costs by 70% while maintaining 100% regulatory compliance through zero-knowledge proofs.
              </p>
              <div className="space-y-2 mb-6">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Cost Reduction</span>
                  <span className="text-sm font-medium text-quantum-green">70%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">User Onboarding</span>
                  <span className="text-sm font-medium text-electric-blue">5x Faster</span>
                </div>
              </div>
              <button className="text-electric-blue hover:text-neon-purple transition-colors font-medium">
                Read Case Study →
              </button>
            </div>

            <div className="glass-card p-8 rounded-2xl border border-border hover:border-electric-blue/50 transition-all group">
              <div className="w-16 h-16 bg-gradient-to-br from-neon-purple to-plasma-pink rounded-xl mb-6 flex items-center justify-center">
                <span className="text-2xl">🎭</span>
              </div>
              <h3 className="text-xl font-bold mb-4">Global Events Co.</h3>
              <p className="text-muted-foreground mb-6">
                Eliminated ticket fraud and reduced entry wait times by 85% with blockchain-verified credentials.
              </p>
              <div className="space-y-2 mb-6">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Fraud Reduction</span>
                  <span className="text-sm font-medium text-quantum-green">98%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Entry Speed</span>
                  <span className="text-sm font-medium text-electric-blue">85% Faster</span>
                </div>
              </div>
              <button className="text-electric-blue hover:text-neon-purple transition-colors font-medium">
                Read Case Study →
              </button>
            </div>

            <div className="glass-card p-8 rounded-2xl border border-border hover:border-electric-blue/50 transition-all group">
              <div className="w-16 h-16 bg-gradient-to-br from-quantum-green to-electric-blue rounded-xl mb-6 flex items-center justify-center">
                <span className="text-2xl">🏛️</span>
              </div>
              <h3 className="text-xl font-bold mb-4">Democracy DAO</h3>
              <p className="text-muted-foreground mb-6">
                Achieved 95% voter participation with privacy-preserving quadratic voting and Sybil resistance.
              </p>
              <div className="space-y-2 mb-6">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Participation</span>
                  <span className="text-sm font-medium text-quantum-green">95%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Sybil Protection</span>
                  <span className="text-sm font-medium text-electric-blue">99.9%</span>
                </div>
              </div>
              <button className="text-electric-blue hover:text-neon-purple transition-colors font-medium">
                Read Case Study →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-gradient-to-r from-electric-blue/10 via-neon-purple/10 to-cyber-cyan/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Industry?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join the digital identity revolution and give your users true data sovereignty.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-gradient-primary rounded-lg font-semibold text-primary-foreground shadow-lg hover:shadow-glow-primary transition-all">
              Schedule Demo
            </button>
            <button className="px-8 py-4 bg-secondary/20 border border-border rounded-lg font-semibold hover:bg-secondary/30 transition-all">
              Contact Sales
            </button>
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