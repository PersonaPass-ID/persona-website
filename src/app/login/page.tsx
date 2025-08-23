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
      const response = await fetch('/api/auth/login', {
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
      } else {
        setError(result.message || 'Login failed')
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
      const response = await fetch('/api/auth/verify-totp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          totpCode: formData.totpCode
        })
      })

      const result = await response.json()
      
      if (result.success) {
        setStep('wallet')
        // Try to restore wallet from stored data
        await handleWalletRestore()
      } else {
        setError(result.message || 'TOTP verification failed')
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
      <h2 className="text-2xl font-orbitron font-bold text-center mb-8">Access Your Digital Identity</h2>
      
      <form onSubmit={handleLoginSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-800 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="your@email.com"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-2">
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            value={formData.password}
            onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-800 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Your password"
          />
        </div>

        {error && (
          <div className="text-red-400 text-sm text-center p-3 bg-red-900/20 rounded-md">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-md font-medium hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 transition-colors"
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>

      <div className="mt-6 text-center">
        <button
          onClick={() => setStep('recover')}
          className="text-sm text-blue-400 hover:text-blue-300"
        >
          Lost access? Recover with private key
        </button>
      </div>
    </div>
  )

  const renderTotpStep = () => (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-orbitron font-bold text-center mb-8">Enter 2FA Code</h2>
      
      <form onSubmit={handleTotpSubmit} className="space-y-6">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <p className="text-sm text-gray-400 mb-6">
            Enter the 6-digit code from your Google Authenticator app:
          </p>
        </div>

        <div>
          <input
            id="totpCode"
            type="text"
            required
            maxLength={6}
            value={formData.totpCode}
            onChange={(e) => setFormData(prev => ({ ...prev, totpCode: e.target.value.replace(/\D/g, '') }))}
            className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-800 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center text-lg font-mono"
            placeholder="123456"
          />
        </div>

        {error && (
          <div className="text-red-400 text-sm text-center p-3 bg-red-900/20 rounded-md">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading || formData.totpCode.length !== 6}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-md font-medium hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 transition-colors"
        >
          {loading ? 'Verifying...' : 'Verify & Access Wallet'}
        </button>
      </form>
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="container mx-auto px-6 py-16">
        {step !== 'recover' && (
          <div className="max-w-md mx-auto mb-12">
            <div className="flex justify-between items-center">
              {['login', 'totp', 'wallet'].map((stepName, index) => (
                <div key={stepName} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step === stepName ? 'bg-blue-600 text-white' : 
                    ['login', 'totp', 'wallet'].indexOf(step) > index ? 'bg-green-600 text-white' : 
                    'bg-gray-600 text-gray-300'
                  }`}>
                    {['login', 'totp', 'wallet'].indexOf(step) > index ? '✓' : index + 1}
                  </div>
                  {index < 2 && (
                    <div className={`w-16 h-0.5 ${
                      ['login', 'totp', 'wallet'].indexOf(step) > index ? 'bg-green-600' : 'bg-gray-600'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 'login' && renderLoginStep()}
        {step === 'totp' && renderTotpStep()}
        {step === 'wallet' && renderWalletStep()}
        {step === 'recover' && renderRecoverStep()}

        <div className="text-center mt-8">
          <p className="text-gray-400 text-sm">
            Don't have an account?{' '}
            <Link href="/signup" className="text-blue-400 hover:text-blue-300">
              Create your digital identity
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}