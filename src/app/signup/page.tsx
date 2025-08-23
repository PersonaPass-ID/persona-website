"use client"

import { useState } from 'react'
import Link from 'next/link'
import { personaWallet } from '@/lib/persona-wallet-core'

export default function SignUpPage() {
  const [step, setStep] = useState<'email' | 'totp' | 'wallet' | 'complete'>('email')
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    totpCode: '',
    qrCode: '',
    backupCodes: [] as string[]
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [walletData, setWalletData] = useState<any>(null)

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters')
      return
    }

    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/auth/totp-setup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email })
      })

      const result = await response.json()
      
      if (result.success) {
        setFormData(prev => ({
          ...prev,
          qrCode: result.data.qrCode,
          backupCodes: result.data.backupCodes
        }))
        setStep('totp')
      } else {
        setError(result.message || 'Failed to setup TOTP')
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
      const response = await fetch('/api/auth/create-account', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          totpCode: formData.totpCode
        })
      })

      const result = await response.json()
      
      if (result.success) {
        setStep('wallet')
      } else {
        setError(result.message || 'Failed to create account')
      }
    } catch (err) {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleCreateWallet = async () => {
    setLoading(true)
    setError('')

    try {
      const wallet = await personaWallet.createWallet()
      setWalletData(wallet)
      setStep('complete')
    } catch (err) {
      setError('Failed to create wallet. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const renderEmailStep = () => (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-orbitron font-bold text-center mb-8">Create Your Digital Identity</h2>
      
      <form onSubmit={handleEmailSubmit} className="space-y-6">
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
            placeholder="Minimum 8 characters"
          />
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            required
            value={formData.confirmPassword}
            onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-800 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Confirm your password"
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
          {loading ? 'Setting up...' : 'Continue'}
        </button>
      </form>
    </div>
  )

  const renderTotpStep = () => (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-orbitron font-bold text-center mb-8">Setup 2FA Authentication</h2>
      
      <div className="space-y-6">
        <div className="text-center">
          <p className="text-sm text-gray-400 mb-4">Scan this QR code with Google Authenticator:</p>
          {formData.qrCode && (
            <img src={formData.qrCode} alt="QR Code" className="mx-auto border-2 border-gray-600 rounded-lg" />
          )}
        </div>

        <div className="bg-gray-800 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Backup Codes</h3>
          <p className="text-xs text-gray-400 mb-2">Save these codes in a secure location:</p>
          <div className="grid grid-cols-2 gap-2 text-sm font-mono">
            {formData.backupCodes.map((code, i) => (
              <div key={i} className="bg-gray-700 p-2 rounded text-center">
                {code}
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handleTotpSubmit} className="space-y-4">
          <div>
            <label htmlFor="totpCode" className="block text-sm font-medium mb-2">
              Enter 6-digit code from your authenticator:
            </label>
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
            {loading ? 'Verifying...' : 'Verify & Create Account'}
          </button>
        </form>
      </div>
    </div>
  )

  const renderWalletStep = () => (
    <div className="max-w-md mx-auto text-center">
      <h2 className="text-2xl font-orbitron font-bold mb-8">Create Your Sovereign Wallet</h2>
      
      <div className="space-y-6">
        <div className="bg-gray-800 p-6 rounded-lg">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h3 className="font-semibold mb-2">Secure Cryptographic Wallet</h3>
          <p className="text-sm text-gray-400">
            Your wallet uses the same security as Bitcoin and Ethereum. 
            Your private keys are generated locally and never stored on our servers.
          </p>
        </div>

        {error && (
          <div className="text-red-400 text-sm text-center p-3 bg-red-900/20 rounded-md">
            {error}
          </div>
        )}

        <button
          onClick={handleCreateWallet}
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-md font-medium hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 transition-colors"
        >
          {loading ? 'Creating Wallet...' : 'Create My Wallet'}
        </button>

        <p className="text-xs text-gray-400">
          By creating a wallet, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  )

  const renderCompleteStep = () => (
    <div className="max-w-md mx-auto text-center">
      <div className="mb-8">
        <div className="w-16 h-16 mx-auto mb-4 bg-green-600 rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-orbitron font-bold mb-4">Welcome to PersonaPass!</h2>
        <p className="text-gray-400">Your digital sovereign identity has been created successfully.</p>
      </div>

      {walletData && (
        <div className="bg-gray-800 p-6 rounded-lg mb-6 text-left">
          <h3 className="font-semibold mb-4">Your Identity Details</h3>
          <div className="space-y-3 text-sm">
            <div>
              <span className="text-gray-400">DID:</span>
              <div className="font-mono text-xs break-all">{walletData.did}</div>
            </div>
            <div>
              <span className="text-gray-400">Wallet Address:</span>
              <div className="font-mono text-xs break-all">{walletData.address}</div>
            </div>
            <div>
              <span className="text-gray-400">Network:</span>
              <div>PersonaChain (personachain-1)</div>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4">
        <Link
          href="/dashboard"
          className="block w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-md font-medium hover:from-blue-700 hover:to-purple-700 transition-colors"
        >
          Access My Dashboard
        </Link>
        
        <Link
          href="/credentials"
          className="block w-full border border-gray-600 text-white py-3 px-4 rounded-md font-medium hover:bg-gray-800 transition-colors"
        >
          Issue My First Credential
        </Link>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="container mx-auto px-6 py-16">
        {/* Progress indicator */}
        <div className="max-w-md mx-auto mb-12">
          <div className="flex justify-between items-center">
            {['email', 'totp', 'wallet', 'complete'].map((stepName, index) => (
              <div key={stepName} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step === stepName ? 'bg-blue-600 text-white' : 
                  ['email', 'totp', 'wallet', 'complete'].indexOf(step) > index ? 'bg-green-600 text-white' : 
                  'bg-gray-600 text-gray-300'
                }`}>
                  {['email', 'totp', 'wallet', 'complete'].indexOf(step) > index ? '✓' : index + 1}
                </div>
                {index < 3 && (
                  <div className={`w-16 h-0.5 ${
                    ['email', 'totp', 'wallet', 'complete'].indexOf(step) > index ? 'bg-green-600' : 'bg-gray-600'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {step === 'email' && renderEmailStep()}
        {step === 'totp' && renderTotpStep()}
        {step === 'wallet' && renderWalletStep()}
        {step === 'complete' && renderCompleteStep()}

        <div className="text-center mt-8">
          <p className="text-gray-400 text-sm">
            Already have an account?{' '}
            <Link href="/login" className="text-blue-400 hover:text-blue-300">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}