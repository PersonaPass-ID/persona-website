export default function DevelopersPage() {
  return (
    <div className="min-h-screen midnight-bg">
      {/* Developer Hub */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold mb-6">
              <span className="animated-gradient-text">Developer Hub</span>
            </h1>
            <p className="body-large text-[var(--color-slate-gray)] max-w-3xl mx-auto">
              Build the future of digital identity with PERSONA's powerful SDK and APIs
            </p>
          </div>
          
          {/* Quick Start Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <div className="glass-card p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[var(--color-neon-teal)] to-[var(--color-electric-purple)] rounded-xl mx-auto mb-6 flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Quick Start</h3>
              <p className="text-[var(--color-slate-gray)] mb-6">
                Get up and running with PERSONA in 5 minutes
              </p>
              <button className="btn-secondary">
                View Guide
              </button>
            </div>
            
            <div className="glass-card p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[var(--color-electric-purple)] to-[var(--color-neon-teal)] rounded-xl mx-auto mb-6 flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">API Reference</h3>
              <p className="text-[var(--color-slate-gray)] mb-6">
                Complete API documentation and examples
              </p>
              <button className="btn-secondary">
                Explore APIs
              </button>
            </div>
            
            <div className="glass-card p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[var(--color-warning-amber)] to-[var(--color-electric-purple)] rounded-xl mx-auto mb-6 flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Examples</h3>
              <p className="text-[var(--color-slate-gray)] mb-6">
                Ready-to-use code examples and tutorials
              </p>
              <button className="btn-secondary">
                View Examples
              </button>
            </div>
          </div>
          
          {/* Code Example */}
          <div className="glass-card p-8">
            <h3 className="text-2xl font-bold mb-6">Install PERSONA SDK</h3>
            <div className="bg-[var(--color-midnight-dark)] rounded-lg p-6 font-mono text-sm">
              <div className="text-[var(--color-slate-gray)]"># Install via npm</div>
              <div className="text-[var(--color-neon-teal)] mt-2">npm install @persona/sdk</div>
              <div className="text-[var(--color-slate-gray)] mt-4"># Or via yarn</div>
              <div className="text-[var(--color-neon-teal)] mt-2">yarn add @persona/sdk</div>
            </div>
          </div>
          
          {/* Back to Home */}
          <div className="text-center mt-12">
            <a href="/" className="text-[var(--color-neon-teal)] hover:text-[var(--color-electric-purple)] transition-colors">
              ← Back to Homepage
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}