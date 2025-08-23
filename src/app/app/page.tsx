'use client'

import { useState, useEffect } from 'react'
import { personaWallet as personaWalletWrapper, PersonaWalletConnection } from '@/lib/persona-wallet'
import { personaWallet as personaWalletCore } from '@/lib/persona-wallet-core'
import { personaApi, type CreateAccountRequest, type TOTPSetupResponse } from '@/lib/api-client'

export default function AppPage() {
  const [connection, setConnection] = useState<PersonaWalletConnection | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [authStep, setAuthStep] = useState<'connect' | 'totp-setup' | 'account-creation' | 'complete'>('connect')
  const [totpData, setTotpData] = useState<TOTPSetupResponse | null>(null)
  const [chainHealth, setChainHealth] = useState<any>(null)
  const [formData, setFormData] = useState({ email: '', password: '', totpCode: '' })

  useEffect(() => {
    // Subscribe to PERSONA Wallet Core changes
    const unsubscribe = personaWalletCore.onAccountChange((account) => {
      if (account) {
        setConnection({
          did: account.did,
          address: account.address,
          publicKey: account.publicKey,
          isConnected: account.isConnected
        })
      } else {
        setConnection(null)
      }
    })
    
    // Check if already connected to PERSONA Wallet Core
    const account = personaWalletCore.getAccount()
    if (account) {
      setConnection({
        did: account.did,
        address: account.address,
        publicKey: account.publicKey,
        isConnected: account.isConnected
      })
    }
    
    // Check PersonaChain health on mount
    checkPersonaChainHealth()
    
    return unsubscribe
  }, [])

  const checkPersonaChainHealth = async () => {
    try {
      const health = await personaApi.checkPersonaChainHealth()
      setChainHealth(health)
      console.log('🔗 PersonaChain health:', health.data)
      
      if (!health.success) {
        console.warn('⚠️ PersonaChain connection issues:', health.error)
      }
    } catch (error: any) {
      console.error('Failed to check PersonaChain health:', error)
      setChainHealth({ success: false, error: error.message })
    }
  }

  const handleConnect = async () => {
    try {
      setIsConnecting(true)
      setError(null)
      
      // For now, simulate wallet connection and start auth flow
      // TODO: Replace with actual PERSONA Wallet when ready
      setAuthStep('totp-setup')
      
    } catch (err: any) {
      setError(err.message || 'Failed to start authentication')
    } finally {
      setIsConnecting(false)
    }
  }

  const handleTOTPSetup = async () => {
    try {
      setError(null)
      
      if (!formData.email) {
        setError('Please enter your email address')
        return
      }
      
      const response = await personaApi.setupTOTP(formData.email)
      
      if (response.success && response.data) {
        setTotpData(response.data)
        console.log('✅ TOTP setup successful')
        setAuthStep('account-creation')
      } else {
        throw new Error(response.error || 'TOTP setup failed')
      }
    } catch (err: any) {
      setError(err.message || 'Failed to setup TOTP')
      console.error('❌ TOTP setup failed:', err)
    }
  }

  const handleCreateAccount = async () => {
    try {
      setError(null)
      
      if (!formData.email || !formData.password || !formData.totpCode) {
        setError('Please fill in all fields')
        return
      }
      
      console.log('👤 Creating account with authentication...')
      
      const response = await personaApi.createAccount({
        email: formData.email,
        password: formData.password,
        totpCode: formData.totpCode
      })
      
      if (response.success && response.data) {
        console.log('✅ Account created successfully:', response.data)
        setAuthStep('complete')
        
        // Create real PERSONA Wallet
        console.log('🔐 Creating PERSONA Wallet...')
        const walletAccount = await personaWalletCore.createWallet()
        
        // Register DID on PersonaChain
        console.log('🆔 Registering DID on PersonaChain...')
        await personaWalletCore.createDID()
        
        console.log('✅ PERSONA Wallet and DID created successfully!')
      } else {
        throw new Error(response.error || 'Account creation failed')
      }
    } catch (err: any) {
      setError(err.message || 'Failed to create account')
      console.error('❌ Account creation failed:', err)
    }
  }

  const handleDisconnect = async () => {
    try {
      await personaWalletCore.disconnect()
    } catch (err: any) {
      setError(err.message || 'Failed to disconnect')
    }
  }

  const handleIssueCredential = async () => {
    try {
      console.log('📜 Issuing verifiable credential...')
      const credential = await personaWalletCore.issueCredential(
        {
          name: formData.email.split('@')[0],
          email: formData.email,
          verifiedAt: new Date().toISOString()
        },
        ['EmailCredential', 'IdentityCredential']
      )
      alert(`Credential Issued: ${credential.id}`)
      console.log('✅ Credential:', credential)
    } catch (err: any) {
      setError(err.message || 'Failed to issue credential')
    }
  }

  return (
    <div className="min-h-screen midnight-bg">
      {/* App Launch/Onboarding */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-8">
            <span className="animated-gradient-text">Launch PERSONA Identity</span>
          </h1>
          <p className="body-large text-[var(--color-slate-gray)] mb-12 max-w-2xl mx-auto">
            Connect your PERSONA Wallet to create your sovereign digital identity and start accessing PersonaChain with complete privacy.
          </p>
          
          {/* Error Display */}
          {error && (
            <div className="max-w-md mx-auto mb-6">
              <div className="glass-card p-4 border border-[var(--color-crimson-red)]/50">
                <p className="text-[var(--color-crimson-red)] text-sm">{error}</p>
              </div>
            </div>
          )}

          {/* Authentication Flow */}
          {authStep === 'connect' && (
            <div className="max-w-md mx-auto mb-12">
              <div className="neon-gradient-card group cursor-pointer">
                <div className="neon-gradient-card-content p-8 text-center">
                  <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-[var(--color-neon-teal)] to-[var(--color-electric-purple)] rounded-xl flex items-center justify-center neon-glow">
                    <div className="w-12 h-12 bg-[var(--color-midnight-dark)] rounded-lg flex items-center justify-center">
                      <span className="tech-label text-lg text-[var(--color-neon-teal)]">P</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-3">PERSONA Identity</h3>
                  <p className="text-[var(--color-slate-gray)] mb-6">
                    Create your sovereign digital identity with zero-knowledge privacy
                  </p>
                  <button 
                    onClick={handleConnect}
                    disabled={isConnecting}
                    className="btn-primary w-full disabled:opacity-50"
                  >
                    {isConnecting ? 'Starting...' : 'Start Identity Creation'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TOTP Setup Step */}
          {authStep === 'totp-setup' && (
            <div className="max-w-md mx-auto mb-12">
              <div className="neon-gradient-card">
                <div className="neon-gradient-card-content p-8">
                  <h3 className="text-xl font-bold mb-6 text-center">Setup Authentication</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Email Address</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full p-3 bg-[var(--color-glass)] border border-[var(--color-glass-border)] rounded-lg focus:border-[var(--color-neon-teal)] focus:outline-none text-white"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Password</label>
                      <input
                        type="password"
                        value={formData.password}
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                        className="w-full p-3 bg-[var(--color-glass)] border border-[var(--color-glass-border)] rounded-lg focus:border-[var(--color-neon-teal)] focus:outline-none text-white"
                        placeholder="Create secure password"
                      />
                    </div>
                    <button onClick={handleTOTPSetup} className="btn-primary w-full">
                      Setup 2FA & Continue
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Account Creation Step */}
          {authStep === 'account-creation' && totpData && (
            <div className="max-w-md mx-auto mb-12">
              <div className="neon-gradient-card">
                <div className="neon-gradient-card-content p-8">
                  <h3 className="text-xl font-bold mb-6 text-center">Complete Setup</h3>
                  <div className="space-y-4">
                    <div className="text-center mb-4">
                      <p className="text-sm text-[var(--color-slate-gray)] mb-3">Scan this QR code with Google Authenticator:</p>
                      <div className="bg-white p-4 rounded-lg mx-auto w-fit">
                        <img src={totpData.qrCode} alt="TOTP QR Code" className="w-32 h-32" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Enter 6-digit code from authenticator</label>
                      <input
                        type="text"
                        value={formData.totpCode}
                        onChange={(e) => setFormData({...formData, totpCode: e.target.value})}
                        className="w-full p-3 bg-[var(--color-glass)] border border-[var(--color-glass-border)] rounded-lg focus:border-[var(--color-neon-teal)] focus:outline-none text-white text-center font-mono text-xl"
                        placeholder="123456"
                        maxLength={6}
                      />
                    </div>
                    <button onClick={handleCreateAccount} className="btn-primary w-full">
                      Create PERSONA Identity
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Success State */}
          {connection && authStep === 'complete' && (
            <div className="max-w-md mx-auto mb-12">
              <div className="neon-gradient-card">
                <div className="neon-gradient-card-content p-8 text-center">
                  <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-[var(--color-success-green)] to-[var(--color-neon-teal)] rounded-xl flex items-center justify-center neon-glow">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-[var(--color-success-green)]">Identity Created!</h3>
                  <div className="space-y-2 mb-6 text-sm">
                    <div className="flex justify-between">
                      <span className="text-[var(--color-slate-gray)]">DID:</span>
                      <span className="text-[var(--color-neon-teal)] font-mono">{connection.did.slice(0, 20)}...</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[var(--color-slate-gray)]">Address:</span>
                      <span className="text-[var(--color-neon-teal)] font-mono">{connection.address.slice(0, 8)}...{connection.address.slice(-6)}</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <button onClick={handleIssueCredential} className="btn-secondary w-full">
                      Issue Credentials
                    </button>
                    <button 
                      onClick={() => {
                        if (connection) {
                          navigator.clipboard.writeText(connection.did)
                          alert('DID copied to clipboard!')
                        }
                      }}
                      className="btn-glass w-full"
                    >
                      Copy DID
                    </button>
                    <button onClick={handleDisconnect} className="btn-glass w-full">
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Download PERSONA Wallet */}
          <div className="glass-card p-6 max-w-2xl mx-auto mb-12">
            <h3 className="text-xl font-bold mb-4 text-center">Don't have PERSONA Wallet?</h3>
            <p className="text-[var(--color-slate-gray)] text-center mb-6">
              Download the official PERSONA Wallet to get started with your digital sovereignty
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <button className="btn-glass flex items-center justify-center space-x-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                </svg>
                <span>iOS App</span>
              </button>
              <button className="btn-glass flex items-center justify-center space-x-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.61 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                </svg>
                <span>Android App</span>
              </button>
              <button className="btn-glass flex items-center justify-center space-x-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12,15.39L8.24,17.66L9.23,13.38L5.91,10.5L10.29,10.13L12,6.09L13.71,10.13L18.09,10.5L14.77,13.38L15.76,17.66M22,9.24L14.81,8.63L12,2L9.19,8.63L2,9.24L7.45,13.97L5.82,21L12,17.27L18.18,21L16.54,13.97L22,9.24Z"/>
                </svg>
                <span>Extension</span>
              </button>
            </div>
          </div>
          
          {/* System Status */}
          <div className="glass-card p-6 max-w-md mx-auto">
            <h4 className="font-semibold mb-4 text-center">System Status</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[var(--color-slate-gray)]">PersonaChain Network</span>
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${
                    chainHealth?.success ? 'bg-[var(--color-success-green)]' : 'bg-[var(--color-warning-amber)]'
                  } animate-pulse`}></div>
                  <span className={`text-sm ${
                    chainHealth?.success ? 'text-[var(--color-success-green)]' : 'text-[var(--color-warning-amber)]'
                  }`}>
                    {chainHealth?.success ? 'Connected' : 'Connecting...'}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[var(--color-slate-gray)]">Backend API</span>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-[var(--color-success-green)] rounded-full animate-pulse"></div>
                  <span className="text-sm text-[var(--color-success-green)]">Operational</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[var(--color-slate-gray)]">Authentication</span>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-[var(--color-success-green)] rounded-full animate-pulse"></div>
                  <span className="text-sm text-[var(--color-success-green)]">Ready</span>
                </div>
              </div>
            </div>
            <p className="text-xs text-[var(--color-slate-gray)] mt-4 text-center">
              AWS Infrastructure: 44.201.59.57
            </p>
          </div>
          
          {/* Back to Home */}
          <div className="mt-12">
            <a href="/" className="text-[var(--color-neon-teal)] hover:text-[var(--color-electric-purple)] transition-colors">
              ← Back to Homepage
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}