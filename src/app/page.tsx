export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section - Modern Web3 Design */}
      <section className="py-12 midnight-bg sm:pb-16 lg:pb-20 xl:pb-24 relative overflow-hidden">
        {/* Meteors Background Effect */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="meteor"></div>
          <div className="meteor"></div>
          <div className="meteor"></div>
        </div>
        
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="relative">
            <div className="lg:w-2/3">
              <p className="tech-label text-[var(--color-slate-gray)] tracking-widest uppercase">
                The Future of Digital Identity
              </p>
              <h1 className="mt-6 text-4xl font-normal text-[var(--color-cloud-white)] sm:mt-10 sm:text-5xl lg:text-6xl xl:text-8xl">
                <span className="animated-gradient-text display-hero">
                  Own Your Digital
                </span>{' '}
                <span className="display-hero">Sovereignty</span>
              </h1>
              <p className="max-w-lg mt-4 text-xl font-normal text-[var(--color-slate-gray)] sm:mt-8">
                Zero-knowledge proofs meet decentralized identity. Control your data, prove your credentials, and access the Web3 ecosystem without revealing personal information.
              </p>
              
              <div className="relative inline-flex items-center justify-center mt-8 sm:mt-12 group">
                <div className="absolute transition-all duration-200 rounded-full -inset-px bg-gradient-to-r from-[var(--color-neon-teal)] to-[var(--color-electric-purple)] group-hover:shadow-lg group-hover:shadow-[var(--color-neon-teal)]/50"></div>
                <a href="/app" className="relative inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-[var(--color-midnight-blue)] bg-gradient-to-r from-[var(--color-neon-teal)] to-[var(--color-electric-purple)] rounded-full hover:shadow-lg hover:shadow-[var(--color-neon-teal)]/30 transition-all duration-300 transform hover:-translate-y-0.5" role="button">
                  Launch PERSONA Identity
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
              </div>

              <div>
                <div className="inline-flex items-center pt-6 mt-8 border-t border-[var(--color-glass-border)] sm:pt-10 sm:mt-14">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" strokeWidth="1.5" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13 7.00003H21M21 7.00003V15M21 7.00003L13 15L9 11L3 17" stroke="url(#neon-gradient)" strokeLinecap="round" strokeLinejoin="round" />
                    <defs>
                      <linearGradient id="neon-gradient" x1="3" y1="7.00003" x2="22.2956" y2="12.0274" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="var(--color-neon-teal)" />
                        <stop offset="100%" stopColor="var(--color-electric-purple)" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <span className="ml-2 text-base font-normal text-[var(--color-cloud-white)]">
                    111+ blocks secured on PersonaChain this week
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-8 md:absolute md:mt-0 md:top-32 lg:top-0 md:right-0">
              {/* 3D Identity Visualization */}
              <div className="w-full max-w-xs mx-auto lg:max-w-lg xl:max-w-xl relative">
                {/* Main Identity Card with Neon Gradient Border */}
                <div className="neon-gradient-card rotate-3 animate-float">
                  <div className="neon-gradient-card-content p-8">
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="w-12 h-12 bg-gradient-to-br from-[var(--color-neon-teal)] to-[var(--color-electric-purple)] rounded-xl neon-glow"></div>
                      <div>
                        <h3 className="text-[var(--color-cloud-white)] font-bold">Digital Identity</h3>
                        <p className="tech-label text-xs text-[var(--color-slate-gray)]">Verified Sovereign</p>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-[var(--color-slate-gray)] text-sm">DID</span>
                        <span className="text-[var(--color-neon-teal)] text-sm font-mono">did:persona:...</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[var(--color-slate-gray)] text-sm">Status</span>
                        <span className="text-[var(--color-success-green)] text-sm">Verified</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[var(--color-slate-gray)] text-sm">Privacy</span>
                        <span className="text-[var(--color-neon-teal)] text-sm">Zero-Knowledge</span>
                      </div>
                    </div>
                    
                    {/* GIF Placeholder with Border Beam */}
                    <div className="mt-6 border-beam">
                      <div className="h-24 bg-gradient-to-r from-[var(--color-midnight-dark)] to-[var(--color-glass)] rounded-lg flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-12 h-12 mx-auto mb-2 bg-[var(--color-glass-light)] rounded-lg flex items-center justify-center">
                            <svg className="w-6 h-6 text-[var(--color-neon-teal)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h8m-6-10V4a2 2 0 012-2h4a2 2 0 012 2v2M9 7h6" />
                            </svg>
                          </div>
                          <p className="text-xs text-[var(--color-slate-gray)]">Identity Animation</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Credential Cards */}
                <div className="absolute -top-4 -right-4 w-20 h-12 glass-card p-2 -rotate-12 animate-float" style={{animationDelay: '1s'}}>
                  <div className="w-full h-full bg-gradient-to-r from-[var(--color-success-green)] to-[var(--color-neon-teal)] rounded opacity-60"></div>
                </div>
                
                <div className="absolute -bottom-2 -left-6 w-16 h-10 glass-card p-2 rotate-12 animate-float" style={{animationDelay: '2s'}}>
                  <div className="w-full h-full bg-gradient-to-r from-[var(--color-electric-purple)] to-[var(--color-neon-teal)] rounded opacity-60"></div>
                </div>

                {/* Neon Particles */}
                <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-[var(--color-neon-teal)] rounded-full animate-neon-pulse"></div>
                <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-[var(--color-electric-purple)] rounded-full animate-neon-pulse" style={{animationDelay: '1s'}}></div>
                <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-[var(--color-neon-teal)] rounded-full animate-neon-pulse" style={{animationDelay: '0.5s'}}></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-24 px-6 border-t border-[var(--color-glass-border)]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Your Identity is Broken</h2>
            <p className="body-large text-[var(--color-slate-gray)] max-w-3xl mx-auto">
              The current digital identity system puts your privacy, security, and control at risk
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass-card p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[var(--color-crimson-red)] to-[var(--color-radiant-magenta)] rounded-xl mx-auto mb-6 flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
              </div>
              <h3 className="h4 mb-4">100+ Passwords</h3>
              <p className="text-[var(--color-slate-gray)]">
                Average person manages 100+ accounts with weak passwords and poor security
              </p>
            </div>
            
            <div className="glass-card p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[var(--color-crimson-red)] to-[var(--color-radiant-magenta)] rounded-xl mx-auto mb-6 flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="h4 mb-4">Data Breaches Daily</h3>
              <p className="text-[var(--color-slate-gray)]">
                Your personal data is sold, leaked, and exploited without your knowledge or consent
              </p>
            </div>
            
            <div className="glass-card p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[var(--color-crimson-red)] to-[var(--color-radiant-magenta)] rounded-xl mx-auto mb-6 flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="h4 mb-4">No Privacy</h3>
              <p className="text-[var(--color-slate-gray)]">
                Complete activity tracking across platforms with zero control over your digital footprint
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-24 px-6 bg-[var(--color-deep-amethyst)]/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">
              <span className="animated-gradient-text">One Identity. Infinite Possibilities.</span>
            </h2>
            <p className="body-large text-[var(--color-slate-gray)] max-w-3xl mx-auto">
              PERSONA revolutionizes digital identity with cryptographic sovereignty and zero-knowledge privacy
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass-card p-8 text-center group hover:border-[var(--color-electric-blue)]/50 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-[var(--color-electric-blue)] to-[var(--color-radiant-magenta)] rounded-xl mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="h4 mb-4">Universal Access</h3>
              <p className="text-[var(--color-slate-gray)]">
                One sovereign identity that works across the entire Web3 ecosystem and beyond
              </p>
            </div>
            
            <div className="glass-card p-8 text-center group hover:border-[var(--color-electric-blue)]/50 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-[var(--color-electric-blue)] to-[var(--color-radiant-magenta)] rounded-xl mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="h4 mb-4">You Own Your Data</h3>
              <p className="text-[var(--color-slate-gray)]">
                Encrypted, decentralized storage ensures your personal data is yours forever
              </p>
            </div>
            
            <div className="glass-card p-8 text-center group hover:border-[var(--color-electric-blue)]/50 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-[var(--color-electric-blue)] to-[var(--color-radiant-magenta)] rounded-xl mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h3 className="h4 mb-4">Prove Without Revealing</h3>
              <p className="text-[var(--color-slate-gray)]">
                Zero-knowledge proofs let you verify anything without exposing sensitive data
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">How It Works</h2>
            <p className="body-large text-[var(--color-slate-gray)] max-w-3xl mx-auto">
              Three simple steps to digital sovereignty
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12 relative">
            <div className="text-center">
              <div className="relative mb-8">
                <div className="w-24 h-24 bg-gradient-to-br from-[var(--color-electric-blue)] to-[var(--color-radiant-magenta)] rounded-full mx-auto flex items-center justify-center">
                  <span className="text-3xl font-bold text-white">1</span>
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-[var(--color-neon-mint)] rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-[var(--color-void-black)]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <h3 className="h4 mb-4">Create Your DID</h3>
              <p className="text-[var(--color-slate-gray)]">
                Generate your decentralized identity in seconds by connecting your wallet
              </p>
            </div>
            
            {/* Animated Beam between steps 1 and 2 */}
            <div className="hidden md:block absolute top-12 left-1/3 w-1/3 h-1 beam-container">
              <div className="beam"></div>
            </div>
            
            <div className="text-center">
              <div className="relative mb-8">
                <div className="w-24 h-24 bg-gradient-to-br from-[var(--color-electric-blue)] to-[var(--color-radiant-magenta)] rounded-full mx-auto flex items-center justify-center">
                  <span className="text-3xl font-bold text-white">2</span>
                </div>
              </div>
              <h3 className="h4 mb-4">Add Credentials</h3>
              <p className="text-[var(--color-slate-gray)]">
                Link verifications, licenses, and achievements to build your sovereign profile
              </p>
            </div>
            
            {/* Animated Beam between steps 2 and 3 */}
            <div className="hidden md:block absolute top-12 right-1/3 w-1/3 h-1 beam-container">
              <div className="beam" style={{animationDelay: '1.5s'}}></div>
            </div>
            
            <div className="text-center">
              <div className="relative mb-8">
                <div className="w-24 h-24 bg-gradient-to-br from-[var(--color-electric-blue)] to-[var(--color-radiant-magenta)] rounded-full mx-auto flex items-center justify-center">
                  <span className="text-3xl font-bold text-white">3</span>
                </div>
              </div>
              <h3 className="h4 mb-4">Access Everything</h3>
              <p className="text-[var(--color-slate-gray)]">
                Use your PERSONA across the entire Web3 ecosystem with complete privacy
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-24 px-6 bg-[var(--color-deep-amethyst)]/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Built for Real-World Use</h2>
            <p className="body-large text-[var(--color-slate-gray)] max-w-3xl mx-auto">
              From DeFi to gaming, PERSONA enables private, secure access across Web3
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="glass-card p-6 text-center group hover:border-[var(--color-neon-mint)]/50 transition-all duration-300">
              <div className="w-12 h-12 bg-[var(--color-neon-mint)]/20 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <svg className="w-6 h-6 text-[var(--color-neon-mint)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h4 className="font-semibold mb-2">DeFi KYC</h4>
              <p className="body-small text-[var(--color-slate-gray)]">Compliant trading without revealing personal data</p>
            </div>
            
            <div className="glass-card p-6 text-center group hover:border-[var(--color-radiant-magenta)]/50 transition-all duration-300">
              <div className="w-12 h-12 bg-[var(--color-radiant-magenta)]/20 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <svg className="w-6 h-6 text-[var(--color-radiant-magenta)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                </svg>
              </div>
              <h4 className="font-semibold mb-2">Event Access</h4>
              <p className="body-small text-[var(--color-slate-gray)]">Instant age verification for venues and events</p>
            </div>
            
            <div className="glass-card p-6 text-center group hover:border-[var(--color-electric-blue)]/50 transition-all duration-300">
              <div className="w-12 h-12 bg-[var(--color-electric-blue)]/20 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <svg className="w-6 h-6 text-[var(--color-electric-blue)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h4 className="font-semibold mb-2">DAO Governance</h4>
              <p className="body-small text-[var(--color-slate-gray)]">Sybil-resistant voting with reputation systems</p>
            </div>
            
            <div className="glass-card p-6 text-center group hover:border-[var(--color-crimson-red)]/50 transition-all duration-300">
              <div className="w-12 h-12 bg-[var(--color-crimson-red)]/20 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <svg className="w-6 h-6 text-[var(--color-crimson-red)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>
              <h4 className="font-semibold mb-2">Gaming Identity</h4>
              <p className="body-small text-[var(--color-slate-gray)]">Portable gaming profile across metaverses</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Stats Section */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Trusted by the Web3 Ecosystem</h2>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-gradient mb-2">256-bit</div>
              <div className="text-[var(--color-slate-gray)]">Military-grade encryption</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-gradient mb-2">100%</div>
              <div className="text-[var(--color-slate-gray)]">Data sovereignty</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-gradient mb-2">W3C</div>
              <div className="text-[var(--color-slate-gray)]">Standard compliant</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-gradient mb-2">Open</div>
              <div className="text-[var(--color-slate-gray)]">Source protocol</div>
            </div>
          </div>
        </div>
      </section>

      {/* Network Status Section */}
      <section className="py-24 px-6 bg-[var(--color-deep-amethyst)]/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">Built on PersonaChain</h2>
              <p className="body-large text-[var(--color-slate-gray)] mb-8">
                Our purpose-built blockchain ensures maximum security, scalability, and privacy for your digital identity.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-[var(--color-neon-mint)] rounded-full mt-3"></div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2">Quantum-Resistant Security</h4>
                    <p className="text-[var(--color-slate-gray)]">Future-proof cryptography against quantum computing threats</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-[var(--color-neon-mint)] rounded-full mt-3"></div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2">Instant Finality</h4>
                    <p className="text-[var(--color-slate-gray)]">Sub-second transaction confirmation for seamless UX</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-[var(--color-neon-mint)] rounded-full mt-3"></div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2">Carbon Neutral</h4>
                    <p className="text-[var(--color-slate-gray)]">Proof-of-stake consensus with minimal environmental impact</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="glass-card p-8">
              <h3 className="text-2xl font-bold mb-6">Live Network Status</h3>
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <span className="text-[var(--color-slate-gray)]">PersonaChain Status</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-[var(--color-neon-mint)] rounded-full animate-pulse"></div>
                    <span className="text-[var(--color-neon-mint)] font-semibold">OPERATIONAL</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-[var(--color-slate-gray)]">Block Height</span>
                  <span className="text-[var(--color-ghost-white)] font-mono">111+</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-[var(--color-slate-gray)]">Active Validators</span>
                  <span className="text-[var(--color-ghost-white)] font-mono">1</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-[var(--color-slate-gray)]">Average Block Time</span>
                  <span className="text-[var(--color-ghost-white)] font-mono">6.1s</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-[var(--color-slate-gray)]">Monthly Cost</span>
                  <span className="text-[var(--color-neon-mint)] font-semibold">$40</span>
                </div>
                
                <div className="mt-6 pt-6 border-t border-[var(--color-glass-border)]">
                  <button className="btn-glass w-full">
                    View Block Explorer
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-electric-blue)]/10 to-[var(--color-radiant-magenta)]/10"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Own Your Identity?</h2>
          <p className="body-large text-[var(--color-slate-gray)] mb-8 max-w-2xl mx-auto">
            Join thousands building the sovereign internet. Create your PERSONA today and experience true digital freedom.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a href="/app" className="btn-primary flex items-center justify-center space-x-2">
              <span>Launch PERSONA App</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
            <a href="/developers" className="btn-glass flex items-center justify-center space-x-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
              <span>Explore Developer Docs</span>
            </a>
          </div>
          
          <div className="mt-12 flex items-center justify-center space-x-8 text-[var(--color-slate-gray)] body-small">
            <span>No sign-up required</span>
            <span>•</span>
            <span>Free to start</span>
            <span>•</span>
            <span>100% private</span>
          </div>
        </div>
      </section>
    </div>
  )
}