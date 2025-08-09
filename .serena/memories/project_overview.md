# PersonaPass Project Overview

## Project Purpose
PersonaPass is a digital identity platform that leverages zero-knowledge proofs and blockchain technology to give users complete control over their personal data while maintaining ultimate privacy and security. It's a Web3 identity solution built on modern web technologies.

## Core Features
- Zero-knowledge proof-based identity verification
- Self-sovereign digital identity management
- Blockchain-based credential storage and verification
- Privacy-preserving identity sharing
- Integration with Cosmos ecosystem (Keplr wallet, PersonaChain)
- Web3 authentication flows

## Tech Stack
- **Framework**: Next.js 15 (React 19) with TypeScript
- **Styling**: Tailwind CSS v3.4.17 with custom Web3 design system
- **Animations**: Framer Motion for smooth animations and parallax effects
- **UI Components**: Radix UI primitives with custom styling
- **Web3 Integration**: 
  - Wagmi for Ethereum wallet connections
  - CosmJS for Cosmos blockchain interaction
  - Web3Auth for authentication
  - Keplr wallet integration
- **State Management**: React Hook Form for forms, custom hooks for wallet/blockchain state
- **Development Tools**: ESLint, Prettier, TypeScript
- **Deployment**: Vercel

## Project Structure
```
src/
├── app/                    # Next.js app router pages
│   ├── dashboard/         # User dashboard with credentials, ZK proofs, sharing
│   ├── get-started/       # Onboarding flow
│   ├── login/            # Authentication pages
│   └── personachain/     # Blockchain explorer
├── components/            # React components
│   ├── ui/               # Reusable UI primitives
│   ├── onboarding/       # Multi-step onboarding wizard
│   └── providers/        # React context providers
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions and API clients
├── services/             # External service integrations
├── styles/               # Global CSS and Tailwind configuration
└── types/                # TypeScript type definitions
```

## Current Status
The project has a comprehensive Web3 design system implemented with glass morphism effects, gradient backgrounds, and modern animations. The styling infrastructure is complete with custom CSS classes for Web3 aesthetics.