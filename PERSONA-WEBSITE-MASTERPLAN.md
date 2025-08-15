# PERSONA WEBSITE MASTER PLAN
## Complete Overhaul Blueprint with Aurora Noir Design System

---

# 🎯 PROJECT OVERVIEW

## Brand Evolution
**From**: PersonaPass - Complex blockchain identity platform
**To**: **PERSONA** - The sovereign internet identity

## Mission Statement
"Your Identity. Your Data. Your Control."
Making Web3 identity as simple as Web2, as secure as military-grade encryption, and as elegant as luxury tech.

## Target Audiences
1. **Crypto Natives** (Primary): DeFi users needing KYC without doxxing
2. **Web3 Builders** (Secondary): Developers building identity-aware dApps
3. **Privacy Advocates** (Tertiary): Users seeking data sovereignty
4. **Enterprise** (Future): Companies needing compliant identity verification

---

# 🏗️ COMPLETE SITE ARCHITECTURE

## Navigation Structure

### Primary Navigation (Always Visible)
```
[PERSONA Logo] | Product | Solutions | Developers | Network | Resources | [Connect Wallet] [Launch App]
```

### Footer Navigation
```
Product          Solutions         Developers        Company          Legal
- Features       - For DeFi        - Documentation   - About          - Privacy Policy
- Security       - For Events      - API Reference   - Mission        - Terms of Service
- Roadmap        - For DAOs        - SDKs            - Team           - Cookie Policy
- Pricing        - For Gaming      - Github          - Careers        - Compliance
                 - Enterprise      - Tutorials       - Press Kit      
                                  - Examples        - Blog           
```

## Complete Page Map

### 1. CORE PAGES

#### **Homepage** (`/`)
- Hero Section with Aurora gradient animation
- Problem/Solution narrative
- Key Features showcase
- How It Works visualization
- Use Cases carousel
- Trust indicators
- CTA to launch app

#### **Product** (`/product`)
- **Features** (`/product/features`)
  - DID Technology deep dive
  - Verifiable Credentials explained
  - Zero-Knowledge Proofs visualization
  - Wallet integration details
- **Security** (`/product/security`)
  - Encryption standards
  - Audit reports
  - Security architecture diagram
  - Bug bounty program
- **Roadmap** (`/product/roadmap`)
  - Interactive timeline
  - Completed milestones
  - Upcoming features
  - Community voting integration
- **Pricing** (`/product/pricing`)
  - Free tier details
  - Pro features
  - Enterprise custom pricing
  - Token utility

### 2. SOLUTIONS PAGES

#### **Industry Solutions** (`/solutions`)
- Overview of all verticals
- Case studies
- ROI calculator

#### **Specific Solutions**:
- **DeFi** (`/solutions/defi`)
  - KYC without doxxing
  - Compliant lending/borrowing
  - Institutional DeFi access
- **Events** (`/solutions/events`)
  - NFT ticketing with identity
  - Age verification
  - VIP access management
- **DAOs** (`/solutions/daos`)
  - Sybil resistance
  - Reputation systems
  - Governance participation
- **Gaming** (`/solutions/gaming`)
  - Player identity
  - Age-appropriate content
  - Cross-game reputation
- **Enterprise** (`/solutions/enterprise`)
  - B2B identity verification
  - Supply chain credentials
  - Employee credentials

### 3. DEVELOPER HUB

#### **Documentation** (`/developers`)
- Getting Started guide
- Core Concepts
- Integration guides
- Best practices

#### **API Reference** (`/developers/api`)
- REST API endpoints
- WebSocket subscriptions
- Rate limits
- Authentication

#### **SDKs** (`/developers/sdks`)
- JavaScript/TypeScript
- Python
- Go
- React components

#### **Resources** (`/developers/resources`)
- **Tutorials** (`/developers/tutorials`)
- **Examples** (`/developers/examples`)
- **Tools** (`/developers/tools`)
- **Sandbox** (`/developers/sandbox`)

### 4. NETWORK PAGES

#### **Network Status** (`/network`)
- Live blockchain metrics
- Validator information
- Network health
- Recent transactions

#### **Block Explorer** (`/network/explorer`)
- Search by address/tx/block
- Transaction details
- Address analytics
- Token transfers

#### **Validators** (`/network/validators`)
- Validator list
- Staking guide
- Performance metrics
- Rewards calculator

#### **Governance** (`/network/governance`)
- Active proposals
- Voting interface
- Past decisions
- Submit proposal

### 5. RESOURCES

#### **Blog** (`/blog`)
- Technical articles
- Industry insights
- Product updates
- Community highlights

#### **Learn** (`/learn`)
- **Academy** (`/learn/academy`)
  - Web3 identity basics
  - Advanced cryptography
  - Integration tutorials
- **Glossary** (`/learn/glossary`)
- **FAQs** (`/learn/faq`)
- **Videos** (`/learn/videos`)

#### **Community** (`/community`)
- Discord link
- Twitter feed
- GitHub activity
- Ambassador program

#### **Support** (`/support`)
- Help center
- Contact form
- System status
- Developer support

### 6. COMPANY PAGES

#### **About** (`/about`)
- Mission & Vision
- Team profiles
- Advisors
- Timeline

#### **Careers** (`/careers`)
- Open positions
- Culture
- Benefits
- Application process

#### **Press** (`/press`)
- Press kit
- Media coverage
- Press releases
- Brand assets

### 7. LEGAL PAGES
- **Privacy Policy** (`/privacy`)
- **Terms of Service** (`/terms`)
- **Cookie Policy** (`/cookies`)
- **Compliance** (`/compliance`)

### 8. APPLICATION PAGES

#### **Launch App** (`/app`)
- Wallet connection
- Dashboard redirect
- New user onboarding

#### **Dashboard** (`/app/dashboard`)
- Identity overview
- Credentials management
- Recent activity
- Quick actions

---

# 🎨 AURORA NOIR DESIGN SYSTEM IMPLEMENTATION

## Color Palette Application

### Primary Colors
```css
--void-black: #0D0C12;        /* Main background */
--deep-amethyst: #1A1821;     /* Cards, modals */
--electric-blue: #4A4AFF;     /* Primary CTAs */
--radiant-magenta: #D43DFF;   /* Secondary accents */
--ghost-white: #F0F0F5;       /* Primary text */
--slate-gray: #8B8999;        /* Secondary text */
--neon-mint: #18E199;         /* Success states */
--crimson-red: #FF4D4D;       /* Error states */
--glass-border: rgba(255, 255, 255, 0.1);
```

### Gradient Definitions
```css
/* Aurora Background Gradient */
.aurora-gradient {
  background: radial-gradient(
    ellipse at top left,
    rgba(74, 74, 255, 0.15) 0%,
    transparent 50%
  ),
  radial-gradient(
    ellipse at bottom right,
    rgba(212, 61, 255, 0.15) 0%,
    transparent 50%
  );
}

/* Text Gradient */
.text-gradient {
  background: linear-gradient(135deg, #4A4AFF 0%, #D43DFF 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Button Gradient */
.button-gradient {
  background: linear-gradient(135deg, #4A4AFF 0%, #6B6BFF 100%);
  transition: all 0.3s ease;
}

.button-gradient:hover {
  background: linear-gradient(135deg, #5A5AFF 0%, #7B7BFF 100%);
  box-shadow: 0 8px 32px rgba(74, 74, 255, 0.3);
}
```

## Typography System

### Font Stack
```css
/* Headings - Space Grotesk */
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap');

/* Body - Inter (Updated from Satoshi for better availability) */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

/* Monospace - JetBrains Mono */
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap');
```

### Type Scale
```css
/* Display */
.display-1 { font-size: 72px; line-height: 1.1; font-weight: 700; }
.display-2 { font-size: 60px; line-height: 1.1; font-weight: 700; }

/* Headings */
h1 { font-size: 48px; line-height: 1.2; font-weight: 700; }
h2 { font-size: 36px; line-height: 1.25; font-weight: 600; }
h3 { font-size: 28px; line-height: 1.3; font-weight: 600; }
h4 { font-size: 24px; line-height: 1.35; font-weight: 500; }
h5 { font-size: 20px; line-height: 1.4; font-weight: 500; }
h6 { font-size: 18px; line-height: 1.45; font-weight: 500; }

/* Body */
.body-large { font-size: 18px; line-height: 1.6; }
.body-regular { font-size: 16px; line-height: 1.5; }
.body-small { font-size: 14px; line-height: 1.5; }

/* Labels */
.label-large { font-size: 14px; font-weight: 600; letter-spacing: 0.5px; text-transform: uppercase; }
.label-regular { font-size: 12px; font-weight: 600; letter-spacing: 0.5px; text-transform: uppercase; }
.label-small { font-size: 11px; font-weight: 600; letter-spacing: 0.5px; text-transform: uppercase; }
```

## Component Library

### 1. Buttons

```tsx
// Primary Button
<button className="
  px-8 py-4 
  bg-gradient-to-r from-electric-blue to-electric-blue-light
  text-ghost-white font-semibold
  rounded-xl
  hover:shadow-glow-blue
  transition-all duration-300
  transform hover:-translate-y-0.5
">
  Launch App
</button>

// Secondary Button
<button className="
  px-8 py-4
  border-2 border-radiant-magenta
  text-radiant-magenta font-semibold
  rounded-xl
  hover:bg-radiant-magenta/10
  transition-all duration-300
">
  Learn More
</button>

// Glass Button
<button className="
  px-6 py-3
  bg-glass-white/5
  backdrop-blur-md
  border border-glass-border
  text-ghost-white
  rounded-lg
  hover:bg-glass-white/10
  transition-all duration-300
">
  Connect Wallet
</button>
```

### 2. Cards

```tsx
// Glass Card
<div className="
  p-8
  bg-deep-amethyst/80
  backdrop-blur-xl
  border border-glass-border
  rounded-2xl
  hover:border-electric-blue/50
  transition-all duration-300
">
  {/* Card content */}
</div>

// Feature Card
<div className="
  relative p-8
  bg-gradient-to-br from-deep-amethyst to-deep-amethyst/50
  border border-glass-border
  rounded-2xl
  overflow-hidden
  group
">
  <div className="absolute inset-0 bg-electric-blue/5 opacity-0 group-hover:opacity-100 transition-opacity" />
  {/* Card content */}
</div>

// Stat Card
<div className="
  p-6
  bg-void-black
  border border-glass-border
  rounded-xl
  text-center
">
  <div className="text-4xl font-bold text-gradient">256-bit</div>
  <div className="text-slate-gray mt-2">Encryption Standard</div>
</div>
```

### 3. Navigation Components

```tsx
// Main Navigation
<nav className="
  fixed top-0 w-full z-50
  bg-void-black/95
  backdrop-blur-xl
  border-b border-glass-border
">
  <div className="max-w-7xl mx-auto px-6 py-4">
    <div className="flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <div className="w-10 h-10 bg-gradient-to-br from-electric-blue to-radiant-magenta rounded-xl" />
        <span className="text-2xl font-bold">PERSONA</span>
      </div>
      
      {/* Nav Items */}
      <div className="hidden lg:flex items-center space-x-8">
        <a href="/product" className="text-slate-gray hover:text-ghost-white transition-colors">Product</a>
        <a href="/solutions" className="text-slate-gray hover:text-ghost-white transition-colors">Solutions</a>
        {/* More items */}
      </div>
      
      {/* Actions */}
      <div className="flex items-center space-x-4">
        <button className="glass-button">Connect Wallet</button>
        <button className="primary-button">Launch App</button>
      </div>
    </div>
  </div>
</nav>
```

### 4. Form Elements

```tsx
// Input Field
<div className="space-y-2">
  <label className="label-regular text-slate-gray">Email Address</label>
  <input 
    type="email"
    className="
      w-full px-4 py-3
      bg-deep-amethyst
      border border-glass-border
      rounded-lg
      text-ghost-white
      placeholder-slate-gray
      focus:border-electric-blue
      focus:outline-none
      transition-colors
    "
    placeholder="you@example.com"
  />
</div>

// Select Dropdown
<select className="
  w-full px-4 py-3
  bg-deep-amethyst
  border border-glass-border
  rounded-lg
  text-ghost-white
  focus:border-electric-blue
  focus:outline-none
  appearance-none
  cursor-pointer
">
  <option>Select Network</option>
  <option>Ethereum</option>
  <option>Polygon</option>
</select>
```

### 5. Modals

```tsx
// Connect Wallet Modal
<div className="
  fixed inset-0 z-50
  bg-void-black/80
  backdrop-blur-sm
  flex items-center justify-center
">
  <div className="
    w-full max-w-md
    bg-deep-amethyst/95
    backdrop-blur-xl
    border border-glass-border
    rounded-2xl
    p-8
  ">
    <h2 className="text-2xl font-bold mb-6">Connect Your Wallet</h2>
    {/* Wallet options */}
  </div>
</div>
```

---

# 📄 PAGE CONTENT SPECIFICATIONS

## 1. Homepage Content Flow

### Hero Section
```
Headline: "The Sovereign Internet Starts Here"
Subheadline: "Own your identity. Control your data. Access everything."
CTA Primary: "Create Your Persona" → /app/onboarding
CTA Secondary: "See How It Works" → Scroll to demo
Background: Animated aurora gradient with floating glass particles
```

### Problem Section
```
Title: "Your Identity is Broken"
Three Pain Points:
1. "100+ Passwords" - Icon: Fragmented key
   "Average person manages 100+ accounts"
2. "Data Breaches Daily" - Icon: Broken shield
   "Your data sold without permission"
3. "No Privacy" - Icon: Eye
   "Complete activity tracking everywhere"
```

### Solution Section
```
Title: "One Identity. Infinite Possibilities."
Three Solutions:
1. "Universal Access" - Animated connection web
   "One identity for all Web3 and beyond"
2. "You Own Your Data" - Locked vault visualization
   "Encrypted, decentralized, yours forever"
3. "Prove Without Revealing" - ZK proof animation
   "Verify anything without exposing data"
```

### How It Works
```
Interactive 3-step flow:
Step 1: "Create Your DID"
- Animation: Wallet connecting
- Text: "Generate your decentralized identity in seconds"

Step 2: "Add Credentials"
- Animation: Documents flowing into vault
- Text: "Link verifications, licenses, and achievements"

Step 3: "Access Everything"
- Animation: Key unlocking multiple doors
- Text: "Use your Persona across the entire Web3 ecosystem"
```

### Use Cases Carousel
```
1. DeFi KYC
   Image: Trading interface
   "Access compliant DeFi without revealing personal data"
   
2. Event Access
   Image: Digital ticket
   "Instant age verification for events and venues"
   
3. DAO Governance
   Image: Voting interface
   "Sybil-resistant voting with reputation"
   
4. Gaming Identity
   Image: Avatar with achievements
   "Portable gaming profile across metaverses"
```

### Trust Section
```
Stats Row:
- "256-bit Encryption"
- "100% Open Source"
- "$0 to Start"
- "W3C Compliant"

Security Badges:
- "Audited by CertiK"
- "SOC 2 Compliant"
- "GDPR Ready"
```

## 2. Product/Features Page

### Features Grid
```
1. Decentralized Identifiers (DIDs)
   Icon: Fingerprint
   "Self-sovereign identity anchored on blockchain"
   Learn More → /learn/dids

2. Verifiable Credentials
   Icon: Certificate
   "Tamper-proof digital credentials"
   Learn More → /learn/vcs

3. Zero-Knowledge Proofs
   Icon: Lock with key
   "Prove facts without revealing data"
   Learn More → /learn/zkp

4. Multi-Chain Support
   Icon: Network
   "Works on Ethereum, Polygon, and more"
   See Chains → /network

5. Wallet Integration
   Icon: Wallet
   "Seamless with MetaMask, WalletConnect"
   View Wallets → /developers/wallets

6. Developer APIs
   Icon: Code
   "Simple integration in minutes"
   View Docs → /developers
```

## 3. Solutions/DeFi Page

### Hero
```
Title: "DeFi Without Doxxing"
Subtitle: "Access institutional liquidity while maintaining complete privacy"
CTA: "Start KYC Process"
Background: Abstract visualization of liquidity pools
```

### Benefits
```
1. "Compliant Access"
   "Meet regulatory requirements without exposing personal data"
   
2. "Instant Verification"
   "Automated KYC/AML checks in seconds"
   
3. "Cross-Protocol"
   "One verification works everywhere"
```

### Integration Partners
```
Logo Grid:
- Aave
- Compound
- Uniswap
- Curve
- MakerDAO
- Synthetix
```

## 4. Developer Documentation Structure

### Getting Started
```
1. Installation
   - npm install @persona/sdk
   - Environment setup
   - API key generation

2. Quick Start
   - Initialize client
   - Connect wallet
   - Create DID
   - Issue first credential

3. Core Concepts
   - Understanding DIDs
   - Credential schemas
   - Proof generation
   - Verification flows
```

### API Reference
```
Endpoints:
- POST /api/did/create
- GET /api/did/{id}
- POST /api/credential/issue
- POST /api/credential/verify
- POST /api/proof/generate
- POST /api/proof/verify
```

---

# 🔄 USER FLOWS

## 1. New User Onboarding Flow

```mermaid
Start → Homepage → Click "Create Your Persona"
↓
Connect Wallet Modal
↓
Choose Wallet (MetaMask/WalletConnect/etc)
↓
Sign Message to Create DID
↓
DID Created Success Screen
↓
Optional: Add First Credential
↓
Dashboard Overview
```

## 2. Credential Verification Flow

```mermaid
User Requests Service → Service Requests Proof
↓
Persona Wallet Opens → User Selects Claims
↓
Generate ZK Proof → Submit Proof
↓
Service Verifies → Access Granted
```

## 3. Developer Integration Flow

```mermaid
Visit Developer Docs → View Quick Start
↓
Install SDK → Get API Keys
↓
Implement Basic Integration → Test in Sandbox
↓
Review Examples → Deploy to Production
```

---

# 🚀 IMPLEMENTATION ROADMAP

## Phase 1: Foundation (Week 1)
- [ ] Set up Next.js with TypeScript
- [ ] Implement Aurora Noir design system
- [ ] Create component library
- [ ] Set up Tailwind v4 configuration
- [ ] Implement responsive grid system

## Phase 2: Core Pages (Week 2)
- [ ] Homepage with all sections
- [ ] Product/Features page
- [ ] Solutions overview page
- [ ] Basic navigation and footer

## Phase 3: Interactive Elements (Week 3)
- [ ] Wallet connection flow
- [ ] Aurora gradient animations
- [ ] Glassmorphism effects
- [ ] Interactive how-it-works section
- [ ] Use case carousel

## Phase 4: Developer Hub (Week 4)
- [ ] Documentation structure
- [ ] API reference pages
- [ ] Code examples
- [ ] Interactive sandbox

## Phase 5: Network Pages (Week 5)
- [ ] Live network status dashboard
- [ ] Block explorer interface
- [ ] Validator information
- [ ] Governance interface

## Phase 6: Additional Pages (Week 6)
- [ ] All solution pages (DeFi, Events, DAOs, Gaming)
- [ ] Blog/Resources section
- [ ] Company pages (About, Careers, Press)
- [ ] Legal pages

## Phase 7: Optimization (Week 7)
- [ ] Performance optimization
- [ ] SEO implementation
- [ ] Analytics integration
- [ ] A/B testing setup
- [ ] Accessibility audit

## Phase 8: Launch Preparation (Week 8)
- [ ] Final QA testing
- [ ] Cross-browser testing
- [ ] Mobile optimization
- [ ] Load testing
- [ ] Deployment to production

---

# 📱 RESPONSIVE DESIGN BREAKPOINTS

```css
/* Mobile First Approach */
/* Base: 0-639px (Mobile) */

/* Tablet */
@media (min-width: 640px) { /* sm */ }
@media (min-width: 768px) { /* md */ }

/* Desktop */
@media (min-width: 1024px) { /* lg */ }
@media (min-width: 1280px) { /* xl */ }

/* Wide Desktop */
@media (min-width: 1536px) { /* 2xl */ }
```

---

# 🎯 SUCCESS METRICS

## Performance Targets
- Lighthouse Score: 95+
- First Contentful Paint: <1.5s
- Time to Interactive: <3s
- Cumulative Layout Shift: <0.1

## User Engagement
- Bounce Rate: <40%
- Average Session Duration: >3 minutes
- Wallet Connection Rate: >30%
- Documentation engagement: >5 minutes

## Conversion Goals
- Homepage → App Launch: >10%
- Developer Docs → SDK Install: >20%
- Solutions Page → Contact: >5%

---

# 🔧 TECHNICAL STACK

## Frontend
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **3D**: Three.js for hero animations
- **Icons**: Lucide React + Custom SVGs

## Web3 Integration
- **Wallet Connection**: RainbowKit
- **Blockchain Interaction**: Viem/Wagmi
- **Smart Contracts**: PersonaChain modules

## Backend Services
- **API**: Next.js API Routes
- **Database**: Supabase
- **Authentication**: NextAuth + SIWE
- **Analytics**: Mixpanel
- **Monitoring**: Sentry

## Infrastructure
- **Hosting**: Vercel
- **CDN**: Cloudflare
- **Domain**: persona.xyz
- **SSL**: Let's Encrypt

---

This master plan provides a complete blueprint for transforming PersonaPass into PERSONA with a world-class Web3 identity platform website.