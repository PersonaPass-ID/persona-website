'use client'

import { http, createConfig } from 'wagmi'
import { defineChain } from 'viem'

// PersonaChain Configuration
const personaChain = defineChain({
  id: 1001, // PersonaChain testnet ID
  name: 'PersonaChain Testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'PERSONA',
    symbol: 'PERSONA',
  },
  rpcUrls: {
    default: {
      http: [
        process.env.NEXT_PUBLIC_PERSONACHAIN_RPC || 
        'http://44.201.59.57:26657'
      ]
    }
  },
  blockExplorers: {
    default: {
      name: 'PersonaChain Explorer',
      url: process.env.NEXT_PUBLIC_PERSONACHAIN_API_URL || 'http://44.201.59.57:1317'
    }
  },
  testnet: true,
})

// PERSONA Wallet Connector (custom implementation)
const personaWalletConnector = {
  id: 'persona-wallet',
  name: 'PERSONA Wallet',
  type: 'injected' as const,
  icon: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJMMTMuMDkgOC4yNkwyMCAxTDE0IDdMMjIgMTJMMTQuNzQgMTAuOTFMMTcgMTlMMTEgMTNMMTIgMjJMMTAuOTEgMTQuNzRMNCAyM0wxMCAxN0wyIDEyTDkuMjYgMTMuMDlMNyA1TDEzIDExTDEyIDJaIiBmaWxsPSIjMDBFMEM2Ii8+Cjwvc3ZnPgo='
}

export const config = createConfig({
  chains: [personaChain],
  connectors: [
    // Only PERSONA Wallet connector for now
    // Will be implemented with actual PERSONA Wallet integration
  ],
  transports: {
    [personaChain.id]: http(personaChain.rpcUrls.default.http[0]),
  },
  ssr: false,
})

declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}