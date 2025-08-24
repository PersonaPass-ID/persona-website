"use client"

import { useState } from 'react'
import Link from 'next/link'
import { personaWallet } from '@/lib/persona-wallet-core'

export default function LoginPage() {
  const [step, setStep] = useState<'login' | 'totp' | 'wallet' | 'recover'>('login')
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    totpCode: '',
    privateKey: '',
    recoveryMethod: 'password' as 'password' | 'privatekey'
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [walletData, setWalletData] = useState<any>(null)

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // Use backend API directly
      const apiUrl = '/api'
      const response = await fetch(`${apiUrl}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      })

      const result = await response.json()
      
      if (result.success) {
        setStep('totp')
      } else if (result.requiresTotp) {
        // TOTP is required - move to TOTP step
        setStep('totp')
        setError('') // Clear any errors
      } else {
        setError(result.error || result.message || 'Login failed')
      }
    } catch (err) {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleTotpSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // Use backend API for login verification
      const apiUrl = '/api'
      const response = await fetch(`${apiUrl}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password, // Include password for full login
          totpCode: formData.totpCode
        })
      })

      const result = await response.json()
      
      if (result.success) {
        setStep('wallet')
        // Try to restore wallet from stored data
        await handleWalletRestore()
      } else {
        setError(result.error || result.message || 'TOTP verification failed')
      }
    } catch (err) {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleWalletRestore = async () => {
    setLoading(true)
    setError('')

    try {
      // Check if wallet exists in localStorage
      const stored = localStorage.getItem('persona_wallet_account')
      if (stored) {
        const accountData = JSON.parse(stored)
        setWalletData(accountData)
        console.log('✅ Wallet restored from storage')
        return accountData
      } else {
        setError('No wallet found. You may need to recover using your private key.')
        setStep('recover')
      }
    } catch (err) {
      setError('Failed to restore wallet. Please try recovery.')
      setStep('recover')
    } finally {
      setLoading(false)
    }
  }

  const handlePrivateKeyRecover = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      if (!formData.privateKey.startsWith('0x') || formData.privateKey.length !== 66) {
        setError('Please enter a valid private key (66 characters starting with 0x)')
        return
      }

      const wallet = await personaWallet.connectExistingWallet(formData.privateKey)
      setWalletData(wallet)
      console.log('✅ Wallet recovered successfully')
    } catch (err) {
      setError('Failed to recover wallet. Please check your private key.')
    } finally {
      setLoading(false)
    }
  }

  const renderLoginStep = () => (
    <div className="max-w-md mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-4 shadow-lg shadow-blue-500/25">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent mb-2">
          Welcome Back
        </h2>
        <p className="text-gray-400">Access your secure digital identity</p>
      </div>
      
      <div className="bg-gray-900/40 backdrop-blur-xl rounded-2xl border border-gray-700/30 shadow-2xl p-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-600/5 pointer-events-none" />
        
        <form onSubmit={handleLoginSubmit} className="space-y-6 relative z-10">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-3 text-gray-200">
              Email Address
            </label>
            <div className="relative">
              <input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 backdrop-blur-sm transition-all duration-300 hover:border-gray-500/50"
                placeholder="your@email.com"
              />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-600/10 opacity-0 hover:opacity-100 transition-opacity pointer-events-none" />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-3 text-gray-200">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 backdrop-blur-sm transition-all duration-300 hover:border-gray-500/50"
                placeholder="Enter your secure password"
              />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-600/10 opacity-0 hover:opacity-100 transition-opacity pointer-events-none" />
            </div>
          </div>

          {error && (
            <div className="bg-red-900/20 backdrop-blur-sm border border-red-700/30 rounded-xl p-4 animate-scale-in">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-red-400 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-red-200 text-sm">{error}</p>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-blue-500/25 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative flex items-center justify-center">
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3" />
                  Signing in...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  Sign In to PersonaPass
                </>
              )}
            </div>
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-700/30 text-center">
          <button
            onClick={() => setStep('recover')}
            className="text-sm text-blue-400 hover:text-blue-300 transition-colors duration-300 hover:underline"
          >
            Lost access? Recover with private key →
          </button>
        </div>
      </div>
    </div>
  )

  const renderTotpStep = () => (
    <div className="max-w-md mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl mb-4 shadow-lg shadow-green-500/25 animate-pulse">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-white via-green-100 to-emerald-100 bg-clip-text text-transparent mb-2">
          Security Verification
        </h2>
        <p className="text-gray-400">Enter your 6-digit authenticator code</p>
      </div>
      
      <div className="bg-gray-900/40 backdrop-blur-xl rounded-2xl border border-gray-700/30 shadow-2xl p-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-600/5 pointer-events-none" />
        
        <form onSubmit={handleTotpSubmit} className="space-y-6 relative z-10">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-xl mb-3 backdrop-blur-sm border border-blue-500/20">
              <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-sm text-gray-300 mb-2">
              Open your <span className="text-green-400 font-medium">Google Authenticator</span> app
            </p>
            <p className="text-xs text-gray-400">
              Find "PersonaPass" and enter the 6-digit code below
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-3 text-center text-gray-200">
              Authentication Code
            </label>
            <div className="relative">
              <input
                id="totpCode"
                type="text"
                required
                maxLength={6}
                value={formData.totpCode}
                onChange={(e) => setFormData(prev => ({ ...prev, totpCode: e.target.value.replace(/\D/g, '') }))}
                className="w-full px-6 py-4 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 backdrop-blur-sm transition-all duration-300 text-center text-2xl font-mono tracking-widest"
                placeholder="000000"
              />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-green-500/10 to-emerald-600/10 opacity-0 hover:opacity-100 transition-opacity pointer-events-none" />
            </div>
            <div className="flex justify-center mt-2">
              <div className="flex space-x-1">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      i < formData.totpCode.length
                        ? 'bg-green-400 shadow-lg shadow-green-400/50'
                        : 'bg-gray-600'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {error && (
            <div className="bg-red-900/20 backdrop-blur-sm border border-red-700/30 rounded-xl p-4 animate-scale-in">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-red-400 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-red-200 text-sm">{error}</p>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading || formData.totpCode.length !== 6}
            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 px-6 rounded-xl font-medium hover:from-green-700 hover:to-emerald-700 disabled:opacity-50 transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-green-500/25 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-green-700 to-emerald-700 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative flex items-center justify-center">
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3" />
                  Verifying Code...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.040A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  Verify & Access Dashboard
                </>
              )}
            </div>
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-gray-700/30 text-center">
          <p className="text-xs text-gray-400">
            Code refreshes every 30 seconds in your authenticator app
          </p>
        </div>
      </div>
    </div>
  )

  const renderWalletStep = () => (
    <div className="max-w-md mx-auto text-center">
      <div className="mb-8">
        <div className="w-16 h-16 mx-auto mb-4 bg-green-600 rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-orbitron font-bold mb-4">Welcome Back!</h2>
        <p className="text-gray-400">Your wallet has been successfully restored.</p>
      </div>

      {walletData && (
        <div className="bg-gray-800 p-6 rounded-lg mb-6 text-left">
          <h3 className="font-semibold mb-4">Your Identity</h3>
          <div className="space-y-3 text-sm">
            <div>
              <span className="text-gray-400">DID:</span>
              <div className="font-mono text-xs break-all">{walletData.did}</div>
            </div>
            <div>
              <span className="text-gray-400">Address:</span>
              <div className="font-mono text-xs break-all">{walletData.address}</div>
            </div>
            <div>
              <span className="text-gray-400">Balance:</span>
              <div>{walletData.balance || '0'} PERSONA</div>
            </div>
            <div>
              <span className="text-gray-400">Credentials:</span>
              <div>{walletData.credentials?.length || 0} issued</div>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4">
        <Link
          href="/dashboard"
          className="block w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-md font-medium hover:from-blue-700 hover:to-purple-700 transition-colors"
        >
          Access Dashboard
        </Link>
        
        <Link
          href="/credentials"
          className="block w-full border border-gray-600 text-white py-3 px-4 rounded-md font-medium hover:bg-gray-800 transition-colors"
        >
          Manage Credentials
        </Link>
      </div>
    </div>
  )

  const renderRecoverStep = () => (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-orbitron font-bold text-center mb-8">Recover Your Wallet</h2>
      
      <div className="mb-6">
        <div className="flex rounded-md bg-gray-800 p-1">
          <button
            onClick={() => setFormData(prev => ({ ...prev, recoveryMethod: 'password' }))}
            className={`flex-1 py-2 px-3 rounded text-sm font-medium transition-colors ${
              formData.recoveryMethod === 'password' 
                ? 'bg-blue-600 text-white' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Email/Password
          </button>
          <button
            onClick={() => setFormData(prev => ({ ...prev, recoveryMethod: 'privatekey' }))}
            className={`flex-1 py-2 px-3 rounded text-sm font-medium transition-colors ${
              formData.recoveryMethod === 'privatekey' 
                ? 'bg-blue-600 text-white' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Private Key
          </button>
        </div>
      </div>

      {formData.recoveryMethod === 'password' ? (
        <div className="text-center space-y-4">
          <div className="bg-gray-800 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Email/Password Recovery</h3>
            <p className="text-sm text-gray-400">
              If you remember your email and password, go back to the login page to sign in normally.
            </p>
          </div>
          <button
            onClick={() => setStep('login')}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-md font-medium hover:from-blue-700 hover:to-purple-700 transition-colors"
          >
            Back to Login
          </button>
        </div>
      ) : (
        <form onSubmit={handlePrivateKeyRecover} className="space-y-6">
          <div>
            <label htmlFor="privateKey" className="block text-sm font-medium mb-2">
              Enter Your Private Key
            </label>
            <textarea
              id="privateKey"
              required
              rows={3}
              value={formData.privateKey}
              onChange={(e) => setFormData(prev => ({ ...prev, privateKey: e.target.value.trim() }))}
              className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-800 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
              placeholder="0x..."
            />
            <p className="text-xs text-gray-400 mt-1">
              Your private key should be 66 characters starting with "0x"
            </p>
          </div>

          {error && (
            <div className="text-red-400 text-sm text-center p-3 bg-red-900/20 rounded-md">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !formData.privateKey}
            className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white py-3 px-4 rounded-md font-medium hover:from-orange-700 hover:to-red-700 disabled:opacity-50 transition-colors"
          >
            {loading ? 'Recovering...' : 'Recover Wallet'}
          </button>

          <div className="text-center">
            <button
              type="button"
              onClick={() => setStep('login')}
              className="text-sm text-blue-400 hover:text-blue-300"
            >
              Back to Login
            </button>
          </div>
        </form>
      )}
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
      {/* Animated Background Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-full blur-3xl animate-float" />
        <div className="absolute top-1/2 -left-40 w-60 h-60 bg-gradient-to-br from-purple-500/20 to-pink-600/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
        <div className="absolute -bottom-40 right-1/3 w-96 h-96 bg-gradient-to-br from-cyan-500/10 to-blue-600/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '6s' }} />
      </div>

      <div className="container mx-auto px-6 py-16 relative z-10">
        {step !== 'recover' && (
          <div className="max-w-4xl mx-auto mb-12">
            <div className="relative">
              <div className="h-2 bg-gray-800/30 rounded-full backdrop-blur-sm border border-gray-700/30">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full transition-all duration-700 ease-out relative overflow-hidden"
                  style={{ width: `${step === 'login' ? 33 : step === 'totp' ? 66 : 100}%` }}
                >
                  <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                </div>
              </div>
              <div className="flex justify-between items-center mt-4">
                {['login', 'totp', 'wallet'].map((stepName, index) => (
                  <div key={stepName} className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all duration-500 ${
                      step === stepName 
                        ? 'bg-gradient-to-br from-blue-500 to-purple-600 border-blue-400 text-white shadow-lg shadow-blue-500/25 scale-110' 
                        : ['login', 'totp', 'wallet'].indexOf(step) > index 
                        ? 'bg-gradient-to-br from-green-500 to-emerald-600 border-green-400 text-white shadow-lg shadow-green-500/25' 
                        : 'bg-gray-800/50 border-gray-600 text-gray-400 backdrop-blur-sm'
                    }`}>
                      {['login', 'totp', 'wallet'].indexOf(step) > index ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        index + 1
                      )}
                    </div>
                    <span className="text-xs mt-2 text-gray-400 font-medium">
                      {stepName === 'login' ? 'Sign In' : stepName === 'totp' ? 'Verify' : 'Dashboard'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 'login' && renderLoginStep()}
        {step === 'totp' && renderTotpStep()}
        {step === 'wallet' && renderWalletStep()}
        {step === 'recover' && renderRecoverStep()}

        <div className="text-center mt-12">
          <div className="bg-gray-900/40 backdrop-blur-xl rounded-2xl border border-gray-700/30 p-6 max-w-md mx-auto">
            <p className="text-gray-300 text-sm">
              Don't have a PersonaPass account?{' '}
            </p>
            <Link 
              href="/signup" 
              className="inline-flex items-center mt-3 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Create Digital Identity
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}