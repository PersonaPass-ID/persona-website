'use client'

import { useState, useEffect } from 'react'

export default function NetworkPage() {
  const [networkStats, setNetworkStats] = useState({
    blockHeight: 2847391,
    validators: 127,
    tps: 2847,
    uptime: 99.97
  })

  const [activeTab, setActiveTab] = useState('overview')

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setNetworkStats(prev => ({
        ...prev,
        blockHeight: prev.blockHeight + Math.floor(Math.random() * 3) + 1,
        tps: Math.floor(Math.random() * 1000) + 2000
      }))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const validators = [
    { name: 'PersonaPass Foundation', stake: '12.8M PRNA', commission: '5%', status: 'active' },
    { name: 'Identity Labs', stake: '8.4M PRNA', commission: '7%', status: 'active' },
    { name: 'ZK Validators', stake: '6.2M PRNA', commission: '6%', status: 'active' },
    { name: 'DeFi Guard', stake: '5.1M PRNA', commission: '8%', status: 'active' },
    { name: 'Privacy Network', stake: '4.7M PRNA', commission: '9%', status: 'active' }
  ]

  const networkFeatures = [
    {
      icon: '⚡',
      title: 'Lightning Fast',
      description: 'Sub-second finality with 10,000+ TPS capacity',
      metric: '<0.5s'
    },
    {
      icon: '🔒',
      title: 'Quantum Secure',
      description: 'Post-quantum cryptography for future-proof security',
      metric: '256-bit'
    },
    {
      icon: '🌱',
      title: 'Carbon Neutral',
      description: 'Proof-of-Stake consensus with minimal energy usage',
      metric: '0.01%'
    },
    {
      icon: '🔗',
      title: 'Interoperable',
      description: 'Native bridges to Ethereum, Cosmos, and more',
      metric: '15+ chains'
    }
  ]

  return (
    <div className="min-h-screen midnight-bg">
      {/* Hero Section */}
      <section className="py-32 px-6 relative overflow-hidden">
        {/* Animated Network Visualization */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full">
            {/* Network Grid */}
            {Array.from({length: 50}).map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-electric-blue rounded-full animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${2 + Math.random() * 2}s`
                }}
              />
            ))}
            {/* Connecting Lines */}
            <svg className="absolute inset-0 w-full h-full">
              {Array.from({length: 20}).map((_, i) => (
                <line
                  key={i}
                  x1={`${Math.random() * 100}%`}
                  y1={`${Math.random() * 100}%`}
                  x2={`${Math.random() * 100}%`}
                  y2={`${Math.random() * 100}%`}
                  stroke="hsl(var(--electric-blue))"
                  strokeWidth="1"
                  opacity="0.3"
                  className="animate-pulse"
                />
              ))}
            </svg>
          </div>
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-quantum-green/10 to-electric-blue/10 backdrop-blur-sm border border-quantum-green/20 rounded-full px-6 py-2 mb-8">
            <div className="w-2 h-2 bg-quantum-green rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-quantum-green">Network Status: Operational</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-pearl-white via-quantum-green to-electric-blue bg-clip-text text-transparent">
            PersonaChain
            <br />
            <span className="relative">
              Network
              <div className="absolute -inset-1 bg-gradient-to-r from-quantum-green to-electric-blue opacity-30 blur-2xl rounded-full"></div>
            </span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed">
            The world's most advanced blockchain for digital identity. Built on Cosmos SDK with 
            cutting-edge zero-knowledge technology and quantum-resistant security.
          </p>

          {/* Live Network Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="glass-card p-6 rounded-xl text-center">
              <div className="text-3xl font-bold text-electric-blue mb-2">
                {networkStats.blockHeight.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Block Height</div>
            </div>
            <div className="glass-card p-6 rounded-xl text-center">
              <div className="text-3xl font-bold text-quantum-green mb-2">
                {networkStats.validators}
              </div>
              <div className="text-sm text-muted-foreground">Active Validators</div>
            </div>
            <div className="glass-card p-6 rounded-xl text-center">
              <div className="text-3xl font-bold text-neon-purple mb-2">
                {networkStats.tps.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">TPS</div>
            </div>
            <div className="glass-card p-6 rounded-xl text-center">
              <div className="text-3xl font-bold text-cyber-cyan mb-2">
                {networkStats.uptime}%
              </div>
              <div className="text-sm text-muted-foreground">Uptime</div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="py-12 px-6 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-4 justify-center">
            {[
              { id: 'overview', label: 'Overview', icon: '📊' },
              { id: 'validators', label: 'Validators', icon: '⚖️' },
              { id: 'explorer', label: 'Explorer', icon: '🔍' },
              { id: 'governance', label: 'Governance', icon: '🗳️' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-gradient-primary text-primary-foreground shadow-glow-primary'
                    : 'bg-secondary/20 text-muted-foreground hover:bg-secondary/30 border border-border'
                }`}
              >
                <span className="flex items-center space-x-2">
                  <span>{tab.icon}</span>
                  <span>{tab.label}</span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Tab Content */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          {activeTab === 'overview' && (
            <div className="space-y-16">
              {/* Network Features */}
              <div>
                <h2 className="text-4xl font-bold text-center mb-16">Network Features</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {networkFeatures.map((feature, index) => (
                    <div key={index} className="glass-card p-8 rounded-2xl text-center hover:border-electric-blue/50 transition-all group">
                      <div className="text-5xl mb-6 group-hover:scale-110 transition-transform">
                        {feature.icon}
                      </div>
                      <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                      <p className="text-muted-foreground mb-4">{feature.description}</p>
                      <div className="text-2xl font-bold text-electric-blue">{feature.metric}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Architecture Diagram */}
              <div>
                <h2 className="text-4xl font-bold text-center mb-16">Network Architecture</h2>
                <div className="glass-card p-12 rounded-3xl">
                  <div className="relative h-96 overflow-hidden rounded-2xl bg-gradient-to-br from-void-black via-primary/5 to-secondary/5">
                    {/* Layer Visualization */}
                    <div className="absolute inset-0 flex flex-col justify-center items-center space-y-8">
                      {/* Application Layer */}
                      <div className="w-full max-w-4xl">
                        <div className="text-center mb-4">
                          <h4 className="text-lg font-semibold text-electric-blue">Application Layer</h4>
                        </div>
                        <div className="flex justify-center space-x-4">
                          {['DID Registry', 'VC Issuer', 'ZK Verifier'].map((app, i) => (
                            <div key={i} className="px-4 py-2 bg-gradient-to-r from-electric-blue/20 to-cyber-cyan/20 rounded-lg border border-electric-blue/30">
                              <span className="text-sm font-medium">{app}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Consensus Layer */}
                      <div className="w-full max-w-4xl">
                        <div className="text-center mb-4">
                          <h4 className="text-lg font-semibold text-neon-purple">Consensus Layer</h4>
                        </div>
                        <div className="flex justify-center space-x-4">
                          {['Tendermint BFT', 'PoS Validators', 'Block Production'].map((consensus, i) => (
                            <div key={i} className="px-4 py-2 bg-gradient-to-r from-neon-purple/20 to-plasma-pink/20 rounded-lg border border-neon-purple/30">
                              <span className="text-sm font-medium">{consensus}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Network Layer */}
                      <div className="w-full max-w-4xl">
                        <div className="text-center mb-4">
                          <h4 className="text-lg font-semibold text-quantum-green">Network Layer</h4>
                        </div>
                        <div className="flex justify-center space-x-4">
                          {['P2P Networking', 'IBC Protocol', 'Cross-Chain'].map((network, i) => (
                            <div key={i} className="px-4 py-2 bg-gradient-to-r from-quantum-green/20 to-electric-blue/20 rounded-lg border border-quantum-green/30">
                              <span className="text-sm font-medium">{network}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Connecting Lines */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none">
                      <defs>
                        <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" style={{stopColor: 'hsl(var(--electric-blue))', stopOpacity: 0.6}} />
                          <stop offset="50%" style={{stopColor: 'hsl(var(--neon-purple))', stopOpacity: 0.6}} />
                          <stop offset="100%" style={{stopColor: 'hsl(var(--quantum-green))', stopOpacity: 0.6}} />
                        </linearGradient>
                      </defs>
                      <line x1="50%" y1="25%" x2="50%" y2="75%" stroke="url(#connectionGradient)" strokeWidth="2" strokeDasharray="5,5" className="animate-pulse" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Performance Metrics */}
              <div>
                <h2 className="text-4xl font-bold text-center mb-16">Performance Metrics</h2>
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="glass-card p-8 rounded-2xl text-center">
                    <div className="text-5xl mb-4">⚡</div>
                    <h3 className="text-2xl font-bold mb-2">Transaction Speed</h3>
                    <div className="text-4xl font-bold text-electric-blue mb-2">0.3s</div>
                    <p className="text-muted-foreground">Average finality time</p>
                  </div>
                  <div className="glass-card p-8 rounded-2xl text-center">
                    <div className="text-5xl mb-4">💰</div>
                    <h3 className="text-2xl font-bold mb-2">Transaction Cost</h3>
                    <div className="text-4xl font-bold text-quantum-green mb-2">$0.001</div>
                    <p className="text-muted-foreground">Average gas fee</p>
                  </div>
                  <div className="glass-card p-8 rounded-2xl text-center">
                    <div className="text-5xl mb-4">🔋</div>
                    <h3 className="text-2xl font-bold mb-2">Energy Efficiency</h3>
                    <div className="text-4xl font-bold text-cyber-cyan mb-2">0.01%</div>
                    <p className="text-muted-foreground">Of Bitcoin's energy usage</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'validators' && (
            <div className="space-y-8">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-6">Network Validators</h2>
                <p className="text-xl text-muted-foreground">
                  Trusted validators securing the PersonaChain network
                </p>
              </div>

              <div className="glass-card rounded-2xl overflow-hidden">
                <div className="p-6 border-b border-border">
                  <div className="grid grid-cols-4 gap-4 text-sm font-medium text-muted-foreground">
                    <div>Validator</div>
                    <div>Stake</div>
                    <div>Commission</div>
                    <div>Status</div>
                  </div>
                </div>
                <div className="divide-y divide-border">
                  {validators.map((validator, index) => (
                    <div key={index} className="p-6 hover:bg-secondary/10 transition-colors">
                      <div className="grid grid-cols-4 gap-4 items-center">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                            <span className="text-sm font-bold">{validator.name[0]}</span>
                          </div>
                          <span className="font-medium">{validator.name}</span>
                        </div>
                        <div className="text-electric-blue font-medium">{validator.stake}</div>
                        <div>{validator.commission}</div>
                        <div>
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-quantum-green/20 text-quantum-green">
                            <div className="w-2 h-2 bg-quantum-green rounded-full mr-2 animate-pulse"></div>
                            {validator.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-center">
                <button className="px-8 py-3 bg-gradient-primary rounded-lg font-semibold text-primary-foreground hover:shadow-glow-primary transition-all">
                  Become a Validator
                </button>
              </div>
            </div>
          )}

          {activeTab === 'explorer' && (
            <div className="space-y-8">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-6">Block Explorer</h2>
                <p className="text-xl text-muted-foreground">
                  Explore transactions, blocks, and network activity
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                {/* Recent Blocks */}
                <div className="glass-card p-6 rounded-2xl">
                  <h3 className="text-xl font-bold mb-6">Recent Blocks</h3>
                  <div className="space-y-4">
                    {Array.from({length: 5}).map((_, i) => (
                      <div key={i} className="flex items-center justify-between p-4 bg-secondary/10 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-secondary rounded-lg flex items-center justify-center">
                            <span className="text-sm font-bold">{networkStats.blockHeight - i}</span>
                          </div>
                          <div>
                            <div className="text-sm font-medium">Block {networkStats.blockHeight - i}</div>
                            <div className="text-xs text-muted-foreground">{Math.floor(Math.random() * 100)} txs</div>
                          </div>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {i === 0 ? 'Now' : `${i}s ago`}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Transactions */}
                <div className="glass-card p-6 rounded-2xl">
                  <h3 className="text-xl font-bold mb-6">Recent Transactions</h3>
                  <div className="space-y-4">
                    {Array.from({length: 5}).map((_, i) => (
                      <div key={i} className="flex items-center justify-between p-4 bg-secondary/10 rounded-lg">
                        <div>
                          <div className="text-sm font-medium font-mono">
                            {`0x${Math.random().toString(16).substring(2, 10)}...`}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {['DID Creation', 'VC Issuance', 'ZK Proof', 'Transfer'][Math.floor(Math.random() * 4)]}
                          </div>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {i === 0 ? 'Now' : `${i * 2}s ago`}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="text-center">
                <button className="px-8 py-3 bg-secondary/20 border border-border rounded-lg font-semibold hover:bg-secondary/30 transition-all">
                  Open Full Explorer
                </button>
              </div>
            </div>
          )}

          {activeTab === 'governance' && (
            <div className="space-y-8">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-6">Network Governance</h2>
                <p className="text-xl text-muted-foreground">
                  Participate in network decisions and protocol upgrades
                </p>
              </div>

              <div className="grid lg:grid-cols-3 gap-8">
                {/* Active Proposals */}
                <div className="lg:col-span-2 glass-card p-6 rounded-2xl">
                  <h3 className="text-xl font-bold mb-6">Active Proposals</h3>
                  <div className="space-y-6">
                    <div className="p-6 border border-border rounded-xl hover:border-electric-blue/50 transition-all">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="font-semibold mb-2">Proposal #47: Enable IBC Transfer</h4>
                          <p className="text-sm text-muted-foreground">
                            Enable cross-chain transfers through IBC protocol integration
                          </p>
                        </div>
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-quantum-green/20 text-quantum-green">
                          Voting
                        </span>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span>Voting Progress</span>
                          <span>67% (2 days left)</span>
                        </div>
                        <div className="w-full bg-secondary/20 rounded-full h-2">
                          <div className="bg-gradient-primary h-2 rounded-full" style={{width: '67%'}}></div>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div className="text-center">
                            <div className="font-medium text-quantum-green">Yes: 78%</div>
                          </div>
                          <div className="text-center">
                            <div className="font-medium text-red-400">No: 15%</div>
                          </div>
                          <div className="text-center">
                            <div className="font-medium text-muted-foreground">Abstain: 7%</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-6 border border-border rounded-xl hover:border-electric-blue/50 transition-all">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="font-semibold mb-2">Proposal #46: Validator Commission Cap</h4>
                          <p className="text-sm text-muted-foreground">
                            Set maximum validator commission rate to 10%
                          </p>
                        </div>
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-neon-purple/20 text-neon-purple">
                          Passed
                        </span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Executed 3 days ago with 89% approval
                      </div>
                    </div>
                  </div>
                </div>

                {/* Governance Stats */}
                <div className="space-y-6">
                  <div className="glass-card p-6 rounded-2xl text-center">
                    <h4 className="font-semibold mb-4">Governance Participation</h4>
                    <div className="text-3xl font-bold text-electric-blue mb-2">84%</div>
                    <p className="text-sm text-muted-foreground">Average voter turnout</p>
                  </div>
                  
                  <div className="glass-card p-6 rounded-2xl text-center">
                    <h4 className="font-semibold mb-4">Total Proposals</h4>
                    <div className="text-3xl font-bold text-neon-purple mb-2">47</div>
                    <p className="text-sm text-muted-foreground">Since network launch</p>
                  </div>
                  
                  <div className="glass-card p-6 rounded-2xl text-center">
                    <h4 className="font-semibold mb-4">Success Rate</h4>
                    <div className="text-3xl font-bold text-quantum-green mb-2">91%</div>
                    <p className="text-sm text-muted-foreground">Proposals passed</p>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <button className="px-8 py-3 bg-gradient-primary rounded-lg font-semibold text-primary-foreground hover:shadow-glow-primary transition-all">
                  Submit Proposal
                </button>
              </div>
            </div>
          )}
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