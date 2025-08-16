'use client'

import { useState } from 'react'

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = [
    { id: 'all', label: 'All Posts', count: 24 },
    { id: 'technology', label: 'Technology', count: 8 },
    { id: 'privacy', label: 'Privacy', count: 6 },
    { id: 'tutorials', label: 'Tutorials', count: 5 },
    { id: 'announcements', label: 'Announcements', count: 5 }
  ]

  const posts = [
    {
      id: 1,
      title: 'The Future of Zero-Knowledge Identity',
      excerpt: 'Exploring how ZK-SNARKs revolutionize digital identity verification while preserving complete user privacy.',
      category: 'technology',
      author: 'Dr. Sarah Chen',
      date: '2024-01-15',
      readTime: '8 min read',
      image: '🔐',
      featured: true
    },
    {
      id: 2,
      title: 'Building Your First DID Application',
      excerpt: 'A step-by-step guide to integrating PersonaPass DIDs into your Web3 application.',
      category: 'tutorials',
      author: 'Marcus Rodriguez',
      date: '2024-01-12',
      readTime: '12 min read',
      image: '🛠️',
      featured: false
    },
    {
      id: 3,
      title: 'PersonaChain Mainnet Launch',
      excerpt: 'Announcing the official launch of PersonaChain with enhanced security and performance features.',
      category: 'announcements',
      author: 'PersonaPass Team',
      date: '2024-01-10',
      readTime: '5 min read',
      image: '🚀',
      featured: true
    },
    {
      id: 4,
      title: 'Privacy by Design: Core Principles',
      excerpt: 'Understanding the fundamental principles that guide privacy-preserving technology development.',
      category: 'privacy',
      author: 'Dr. Emily Watson',
      date: '2024-01-08',
      readTime: '10 min read',
      image: '🛡️',
      featured: false
    },
    {
      id: 5,
      title: 'Verifiable Credentials Explained',
      excerpt: 'Deep dive into W3C Verifiable Credentials and their role in the decentralized identity ecosystem.',
      category: 'technology',
      author: 'Alex Thompson',
      date: '2024-01-05',
      readTime: '9 min read',
      image: '✅',
      featured: false
    },
    {
      id: 6,
      title: 'DeFi KYC Without Compromising Privacy',
      excerpt: 'How zero-knowledge proofs enable regulatory compliance while maintaining user anonymity.',
      category: 'privacy',
      author: 'Dr. Sarah Chen',
      date: '2024-01-03',
      readTime: '7 min read',
      image: '🏦',
      featured: false
    }
  ]

  const filteredPosts = selectedCategory === 'all' ? posts : posts.filter(post => post.category === selectedCategory)
  const featuredPosts = posts.filter(post => post.featured)
  const regularPosts = filteredPosts.filter(post => !post.featured)

  return (
    <div className="min-h-screen midnight-bg">
      {/* Hero Section */}
      <section className="py-32 px-6 relative overflow-hidden">
        {/* Floating Elements */}
        <div className="absolute inset-0 opacity-20">
          {Array.from({length: 15}).map((_, i) => (
            <div
              key={i}
              className="absolute"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`
              }}
            >
              <div className="w-4 h-4 bg-gradient-to-r from-electric-blue to-neon-purple rounded-full animate-float opacity-60"></div>
            </div>
          ))}
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-neon-purple/10 to-plasma-pink/10 backdrop-blur-sm border border-neon-purple/20 rounded-full px-6 py-2 mb-8">
            <div className="w-2 h-2 bg-neon-purple rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-neon-purple">Knowledge Hub</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-pearl-white via-neon-purple to-plasma-pink bg-clip-text text-transparent">
            Insights &
            <br />
            <span className="relative">
              Resources
              <div className="absolute -inset-1 bg-gradient-secondary opacity-30 blur-2xl rounded-full"></div>
            </span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed">
            Stay updated with the latest developments in digital identity, zero-knowledge technology, 
            and privacy-preserving solutions from the PersonaPass ecosystem.
          </p>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full font-medium transition-all ${
                  selectedCategory === category.id
                    ? 'bg-gradient-primary text-primary-foreground shadow-glow-primary'
                    : 'bg-secondary/20 text-muted-foreground hover:bg-secondary/30 border border-border'
                }`}
              >
                {category.label} ({category.count})
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {selectedCategory === 'all' && (
        <section className="py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Featured Articles</h2>
            <div className="grid lg:grid-cols-2 gap-8">
              {featuredPosts.map((post) => (
                <article key={post.id} className="group glass-card rounded-2xl overflow-hidden hover:border-electric-blue/50 transition-all">
                  <div className="p-8">
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="text-4xl p-3 bg-gradient-primary rounded-xl shadow-glow-primary">
                        {post.image}
                      </div>
                      <div>
                        <span className="inline-block px-3 py-1 bg-electric-blue/20 text-electric-blue rounded-full text-xs font-medium uppercase tracking-wide">
                          {post.category}
                        </span>
                        <div className="flex items-center space-x-2 mt-2 text-sm text-muted-foreground">
                          <span>{post.author}</span>
                          <span>•</span>
                          <span>{new Date(post.date).toLocaleDateString()}</span>
                          <span>•</span>
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                    </div>
                    
                    <h3 className="text-2xl font-bold mb-4 group-hover:text-electric-blue transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      {post.excerpt}
                    </p>
                    
                    <button className="text-electric-blue hover:text-neon-purple transition-colors font-medium flex items-center space-x-2">
                      <span>Read Full Article</span>
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Posts */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">
            {selectedCategory === 'all' ? 'Latest Articles' : `${categories.find(c => c.id === selectedCategory)?.label} Articles`}
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(selectedCategory === 'all' ? regularPosts : filteredPosts).map((post) => (
              <article key={post.id} className="group glass-card rounded-2xl overflow-hidden hover:border-electric-blue/50 transition-all hover:scale-105">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-3xl p-2 bg-gradient-secondary rounded-lg">
                      {post.image}
                    </div>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wide ${
                      post.category === 'technology' ? 'bg-electric-blue/20 text-electric-blue' :
                      post.category === 'privacy' ? 'bg-neon-purple/20 text-neon-purple' :
                      post.category === 'tutorials' ? 'bg-quantum-green/20 text-quantum-green' :
                      'bg-cyber-cyan/20 text-cyber-cyan'
                    }`}>
                      {post.category}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 group-hover:text-electric-blue transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{post.author}</span>
                    <span>{post.readTime}</span>
                  </div>
                  
                  <div className="text-xs text-muted-foreground mt-2">
                    {new Date(post.date).toLocaleDateString()}
                  </div>
                  
                  <button className="mt-4 text-electric-blue hover:text-neon-purple transition-colors font-medium flex items-center space-x-2 w-full justify-center py-2 border border-electric-blue/30 rounded-lg hover:bg-electric-blue/10">
                    <span>Read More</span>
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-24 px-6 bg-gradient-to-r from-electric-blue/5 via-neon-purple/5 to-cyber-cyan/5">
        <div className="max-w-4xl mx-auto text-center">
          <div className="glass-card p-12 rounded-3xl">
            <div className="text-5xl mb-6">📧</div>
            <h2 className="text-3xl font-bold mb-6">Stay Informed</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Get the latest insights on digital identity, privacy technology, and Web3 innovations delivered to your inbox.
            </p>
            
            <div className="max-w-md mx-auto">
              <div className="flex space-x-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-secondary/20 border border-border rounded-lg focus:border-electric-blue focus:outline-none text-foreground"
                />
                <button className="px-6 py-3 bg-gradient-primary rounded-lg font-semibold text-primary-foreground hover:shadow-glow-primary transition-all">
                  Subscribe
                </button>
              </div>
              <p className="text-xs text-muted-foreground mt-3">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tags Cloud */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-8">Popular Topics</h2>
          <div className="flex flex-wrap gap-3 justify-center">
            {[
              'Zero-Knowledge', 'DIDs', 'Verifiable Credentials', 'Privacy', 'Blockchain',
              'Web3', 'Identity', 'Security', 'DeFi', 'NFTs', 'DAO', 'Governance',
              'Tutorials', 'SDK', 'API', 'Integration'
            ].map((tag) => (
              <span
                key={tag}
                className="px-4 py-2 bg-secondary/20 hover:bg-secondary/30 border border-border rounded-full text-sm cursor-pointer transition-colors"
              >
                #{tag}
              </span>
            ))}
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