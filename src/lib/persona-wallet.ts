'use client'

/**
 * PERSONA Wallet Integration
 * Direct integration with PERSONA's sovereign identity wallet
 */

export interface PersonaWalletConnection {
  did: string
  address: string
  publicKey: string
  isConnected: boolean
}

export interface PersonaCredential {
  id: string
  type: string[]
  credentialSubject: any
  proof: any
  issuer: string
  issuanceDate: string
}

class PersonaWallet {
  private connection: PersonaWalletConnection | null = null
  private listeners: Array<(connection: PersonaWalletConnection | null) => void> = []

  async connect(): Promise<PersonaWalletConnection> {
    try {
      // Check if PERSONA Wallet is installed
      if (typeof window === 'undefined' || !window.personaWallet) {
        throw new Error('PERSONA Wallet not found. Please install PERSONA Wallet extension.')
      }

      // Request connection to PERSONA Wallet
      const response = await window.personaWallet.connect()
      
      this.connection = {
        did: response.did,
        address: response.address,
        publicKey: response.publicKey,
        isConnected: true
      }

      // Notify listeners
      this.listeners.forEach(listener => listener(this.connection))
      
      return this.connection
    } catch (error) {
      console.error('Failed to connect to PERSONA Wallet:', error)
      throw error
    }
  }

  async disconnect(): Promise<void> {
    if (window.personaWallet) {
      await window.personaWallet.disconnect()
    }
    
    this.connection = null
    this.listeners.forEach(listener => listener(null))
  }

  async createDID(): Promise<string> {
    if (!this.connection) {
      throw new Error('Wallet not connected')
    }

    const did = await window.personaWallet.createDID()
    return did
  }

  async issueCredential(credentialData: any): Promise<PersonaCredential> {
    if (!this.connection) {
      throw new Error('Wallet not connected')
    }

    const credential = await window.personaWallet.issueCredential(credentialData)
    return credential
  }

  async verifyCredential(credential: PersonaCredential): Promise<boolean> {
    if (!this.connection) {
      throw new Error('Wallet not connected')
    }

    const isValid = await window.personaWallet.verifyCredential(credential)
    return isValid
  }

  async signMessage(message: string): Promise<string> {
    if (!this.connection) {
      throw new Error('Wallet not connected')
    }

    const signature = await window.personaWallet.signMessage(message)
    return signature
  }

  getConnection(): PersonaWalletConnection | null {
    return this.connection
  }

  onConnectionChange(listener: (connection: PersonaWalletConnection | null) => void): () => void {
    this.listeners.push(listener)
    
    // Return unsubscribe function
    return () => {
      const index = this.listeners.indexOf(listener)
      if (index > -1) {
        this.listeners.splice(index, 1)
      }
    }
  }

  isInstalled(): boolean {
    return typeof window !== 'undefined' && !!window.personaWallet
  }
}

// Global PERSONA Wallet instance
export const personaWallet = new PersonaWallet()

// Type declarations for window.personaWallet
declare global {
  interface Window {
    personaWallet?: {
      connect(): Promise<{
        did: string
        address: string  
        publicKey: string
      }>
      disconnect(): Promise<void>
      createDID(): Promise<string>
      issueCredential(data: any): Promise<PersonaCredential>
      verifyCredential(credential: PersonaCredential): Promise<boolean>
      signMessage(message: string): Promise<string>
      isConnected(): boolean
    }
  }
}

// PersonaChain Configuration
export const PERSONACHAIN_CONFIG = {
  chainId: 'personachain-1',
  rpcUrl: process.env.NEXT_PUBLIC_PERSONACHAIN_RPC || 'http://44.201.59.57:26657',
  apiUrl: process.env.NEXT_PUBLIC_PERSONACHAIN_API_URL || 'http://44.201.59.57:1317',
  name: 'PersonaChain Mainnet',
  nativeCurrency: {
    decimals: 18,
    name: 'PERSONA',
    symbol: 'PERSONA',
  }
}