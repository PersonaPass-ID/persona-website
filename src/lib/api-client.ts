'use client'

/**
 * PERSONA API Client - Production AWS Backend Integration
 * Connects to live PersonaChain infrastructure at 44.201.59.57
 */

interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

interface PersonaUser {
  id: string
  email: string
  did: string
  walletAddress: string
  kycStatus: 'pending' | 'approved' | 'rejected'
  totpSetup: boolean
}

interface CreateAccountRequest {
  email: string
  password: string
  totpCode: string
}

interface LoginRequest {
  email: string
  password: string
  totpCode: string
}

interface TOTPSetupResponse {
  qrCode: string
  secret: string
  backupCodes: string[]
}

class PersonaApiClient {
  private baseUrl: string
  private chainRpcUrl: string
  private chainApiUrl: string

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_PERSONA_API_URL || 'https://api.personapass.xyz/api'
    this.chainRpcUrl = process.env.NEXT_PUBLIC_PERSONACHAIN_RPC || 'https://rpc.personapass.xyz:26657'
    this.chainApiUrl = process.env.NEXT_PUBLIC_PERSONACHAIN_API_URL || 'https://rpc.personapass.xyz:1317'

    console.log('🔗 PersonaApiClient initialized with baseUrl:', this.baseUrl)
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`
    
    const defaultHeaders = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          ...defaultHeaders,
          ...options.headers
        }
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || data.error || 'API request failed')
      }

      return {
        success: true,
        data,
        message: data.message
      }
    } catch (error: any) {
      console.error(`API Error [${endpoint}]:`, error)
      return {
        success: false,
        error: error.message || 'Network error'
      }
    }
  }

  // Authentication Endpoints
  async setupTOTP(email: string): Promise<ApiResponse<TOTPSetupResponse>> {
    console.log('🔐 Setting up TOTP for:', email)
    return this.request<TOTPSetupResponse>('/auth/totp-setup', {
      method: 'POST',
      body: JSON.stringify({ email })
    })
  }

  async createAccount(data: CreateAccountRequest): Promise<ApiResponse<PersonaUser>> {
    console.log('👤 Creating authenticated account...')
    return this.request<PersonaUser>('/auth/create-account', {
      method: 'POST',
      body: JSON.stringify(data)
    })
  }

  async login(data: LoginRequest): Promise<ApiResponse<{ token: string; user: PersonaUser }>> {
    console.log('🔑 Authenticating user login...')
    return this.request<{ token: string; user: PersonaUser }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data)
    })
  }

  // PersonaChain Integration
  async checkPersonaChainHealth(): Promise<ApiResponse<{ status: string; services: any[] }>> {
    console.log('🔗 Connecting to PersonaChain network...')
    
    try {
      // Check RPC endpoint
      const rpcResponse = await fetch(`${this.chainRpcUrl}/status`)
      const rpcData = await rpcResponse.json()

      // Check API endpoint  
      const apiResponse = await fetch(`${this.chainApiUrl}/node_info`)
      const apiData = await apiResponse.json()

      return {
        success: true,
        data: {
          status: 'healthy',
          services: [
            { name: 'PersonaChain RPC', status: 'operational', url: this.chainRpcUrl },
            { name: 'PersonaChain API', status: 'operational', url: this.chainApiUrl }
          ]
        }
      }
    } catch (error: any) {
      console.error('PersonaChain connection failed:', error)
      return {
        success: false,
        error: error.message,
        data: {
          status: 'unhealthy',
          services: [
            { name: 'PersonaChain RPC', status: 'error', url: this.chainRpcUrl },
            { name: 'PersonaChain API', status: 'error', url: this.chainApiUrl }
          ]
        }
      }
    }
  }

  // DID & Verifiable Credentials
  async createDID(walletAddress: string): Promise<ApiResponse<{ did: string }>> {
    console.log('🆔 Creating decentralized identity...')
    return this.request<{ did: string }>('/identity/create-did', {
      method: 'POST',
      body: JSON.stringify({ walletAddress })
    })
  }

  async issueCredential(credentialData: any): Promise<ApiResponse<any>> {
    console.log('📜 Issuing verifiable credential...')
    return this.request('/credentials/issue', {
      method: 'POST',
      body: JSON.stringify(credentialData)
    })
  }

  async verifyCredential(credential: any): Promise<ApiResponse<{ valid: boolean }>> {
    console.log('✅ Verifying credential...')
    return this.request<{ valid: boolean }>('/credentials/verify', {
      method: 'POST',
      body: JSON.stringify({ credential })
    })
  }

  // System Health
  async checkBackendHealth(): Promise<ApiResponse<{ status: string; timestamp: string }>> {
    return this.request<{ status: string; timestamp: string }>('/health')
  }
}

// Global singleton instance
export const personaApi = new PersonaApiClient()

// Export types for use in components
export type {
  ApiResponse,
  PersonaUser,
  CreateAccountRequest,
  LoginRequest,
  TOTPSetupResponse
}