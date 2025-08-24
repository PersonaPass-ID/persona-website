"use client"

import { useState } from 'react'
import Link from 'next/link'
import { personaWallet } from '@/lib/persona-wallet-core'

export default function SignUpPage() {
  const [step, setStep] = useState<'email' | 'wallet' | 'did-explain' | 'recovery-key' | 'totp' | 'complete'>('email')
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    totpCode: '',
    qrCode: '',
    backupCodes: [] as string[],
    totpSecret: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [walletData, setWalletData] = useState<any>(null)
  const [backupAcknowledged, setBackupAcknowledged] = useState(false)
  const [recoveryKeySaved, setRecoveryKeySaved] = useState(false)
  const [didUnderstood, setDidUnderstood] = useState(false)
  const [secretCopied, setSecretCopied] = useState(false)

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text)
      // Show success message
      if (type === 'secret') setSecretCopied(true)
      
      // Reset success state after 2 seconds
      setTimeout(() => {
        if (type === 'secret') setSecretCopied(false)
      }, 2000)
      
      console.log(`✅ Copied ${type} to clipboard`)
    } catch (err) {
      console.error('Failed to copy:', err)
      // Fallback for browsers that don't support clipboard API
      const textArea = document.createElement('textarea')
      textArea.value = text
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
    }
  }

  const copyAllBackupCodes = async () => {
    const allCodes = formData.backupCodes.join('\n')
    await copyToClipboard(allCodes, 'backup codes')
  }

  const downloadRecoveryFile = () => {
    const recoveryData = {
      email: formData.email,
      did: walletData?.did || '',
      address: walletData?.address || '',
      backupCodes: formData.backupCodes,
      totpSecret: formData.totpSecret,
      privateKey: walletData?.privateKey || '',
      createdAt: new Date().toISOString(),
      warning: 'KEEP THIS FILE SECURE! Contains sensitive recovery information.'
    }

    const blob = new Blob([JSON.stringify(recoveryData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `persona-recovery-${formData.email.split('@')[0]}-${Date.now()}.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
    setRecoveryKeySaved(true)
  }

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setLoading(true)
    setError('')

    try {
      // Move to wallet creation step
      setStep('wallet')
    } catch (err) {
      setError('Account creation failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleWalletCreation = async () => {
    setLoading(true)
    setError('')

    try {
      console.log('🚀 Creating PERSONA wallet...')
      
      // Create wallet using the real PersonaWallet implementation
      const wallet = await personaWallet.createWallet()
      setWalletData(wallet)
      
      console.log('✅ PERSONA Wallet created successfully')
      console.log('🆔 DID:', wallet.did)
      console.log('💳 Address:', wallet.address)
      
      // Move to DID explanation step
      setStep('did-explain')
      
    } catch (error) {
      console.error('❌ Wallet creation failed:', error)
      setError('Failed to create wallet. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleTotpSetup = async () => {
    setLoading(true)
    setError('')

    try {
      console.log('🔐 Setting up TOTP for email:', formData.email)
      
      // Use environment variable for API URL
      const apiUrl = '/api'
      const response = await fetch(`${apiUrl}/auth/totp-setup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email })
      })

      const result = await response.json()
      console.log('TOTP setup response:', result)

      if (result.success) {
        setFormData(prev => ({ 
          ...prev, 
          qrCode: result.data.qrCode,
          backupCodes: result.data.backupCodes || [],
          totpSecret: result.data.secret || ''
        }))
        console.log('✅ TOTP setup successful')
      } else {
        throw new Error(result.message || 'TOTP setup failed')
      }
    } catch (err) {
      console.error('❌ TOTP setup error:', err)
      setError(`TOTP setup failed: ${err instanceof Error ? err.message : 'Unknown error'}`)
    } finally {
      setLoading(false)
    }
  }

  const handleTotpSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      console.log('🔐 Verifying TOTP code:', formData.totpCode)
      
      // Use environment variable for API URL - fixed port to 8001
      const apiUrl = '/api'
      const response = await fetch(`${apiUrl}/auth/create-account`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          totpCode: formData.totpCode
        })
      })

      const result = await response.json()
      console.log('Account creation response:', result)

      if (result.success) {
        console.log('✅ Account created successfully, moving to complete step')
        setStep('complete')
      } else {
        throw new Error(result.message || 'Account creation failed')
      }
    } catch (err) {
      console.error('❌ Account creation error:', err)
      setError(`Account creation failed: ${err instanceof Error ? err.message : 'Unknown error'}`)
    } finally {
      setLoading(false)
    }
  }

  const progressPercentage = () => {
    const steps = ['email', 'wallet', 'did-explain', 'recovery-key', 'totp', 'complete']
    const currentIndex = steps.indexOf(step)
    return ((currentIndex + 1) / steps.length) * 100
  }

  // Enhanced Progress Indicator with Animations
  const renderProgressIndicator = () => (
    <div className="max-w-4xl mx-auto mb-12">
      <div className="relative">
        {/* Progress bar background */}
        <div className="h-2 bg-gray-800/30 rounded-full backdrop-blur-sm border border-gray-700/30">
          {/* Animated progress bar */}
          <div 
            className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full transition-all duration-700 ease-out relative overflow-hidden"
            style={{ width: `${progressPercentage()}%` }}
          >
            {/* Shimmer effect */}
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </div>
        </div>
        
        {/* Step indicators */}
        <div className="flex justify-between items-center mt-4">
          {[
            { key: 'email', label: 'Account', icon: '📧' },
            { key: 'wallet', label: 'Wallet', icon: '👛' },
            { key: 'did-explain', label: 'Identity', icon: '🆔' },
            { key: 'recovery-key', label: 'Security', icon: '🔒' },
            { key: 'totp', label: '2FA', icon: '📱' },
            { key: 'complete', label: 'Done', icon: '✅' }
          ].map((stepInfo, index) => {
            const isActive = step === stepInfo.key
            const isCompleted = progressPercentage() > ((index + 1) / 6) * 100
            
            return (
              <div key={stepInfo.key} className="flex flex-col items-center group">
                <div className={`
                  w-12 h-12 rounded-full flex items-center justify-center text-lg font-medium transition-all duration-500
                  ${isActive 
                    ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25 scale-110' 
                    : isCompleted 
                      ? 'bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-md' 
                      : 'bg-gray-800/50 text-gray-400 border border-gray-700/50'
                  }
                  ${isActive ? 'animate-pulse' : ''}
                `}>
                  {isCompleted && !isActive ? '✓' : stepInfo.icon}
                </div>
                <span className={`
                  text-xs mt-2 font-medium transition-all duration-300
                  ${isActive ? 'text-blue-400' : isCompleted ? 'text-green-400' : 'text-gray-500'}
                `}>
                  {stepInfo.label}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )

  // Enhanced Email Step with Glass-morphism
  const renderEmailStep = () => (
    <div className="max-w-lg mx-auto">
      <div className="bg-gray-900/40 backdrop-blur-xl rounded-2xl border border-gray-700/30 shadow-2xl p-8 relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5" />
        
        <div className="relative">
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-2xl">🚀</span>
            </div>
            <h2 className="text-3xl font-orbitron font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
              Create Your Digital Identity
            </h2>
            <p className="text-gray-400">Join the future of sovereign identity</p>
          </div>

          <form onSubmit={handleEmailSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="group">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 group-hover:border-gray-500/50"
                    placeholder="your@email.com"
                  />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </div>
              </div>

              <div className="group">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 group-hover:border-gray-500/50"
                    placeholder="Enter a secure password"
                    minLength={8}
                  />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </div>
              </div>

              <div className="group">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    required
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 group-hover:border-gray-500/50"
                    placeholder="Confirm your password"
                  />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </div>
              </div>
            </div>

            {error && (
              <div className="bg-red-900/30 backdrop-blur-sm border border-red-500/30 rounded-xl p-4 text-red-300 text-sm animate-in slide-in-from-top-2 duration-300">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-xl shadow-lg hover:shadow-xl disabled:opacity-50 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden group"
            >
              {loading && (
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600">
                  <div className="flex items-center justify-center h-full">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  </div>
                </div>
              )}
              <span className={loading ? 'opacity-0' : 'opacity-100'}>
                Create Account
              </span>
              {!loading && (
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700" />
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )

  // Enhanced Wallet Creation Step
  const renderWalletStep = () => (
    <div className="max-w-lg mx-auto">
      <div className="bg-gray-900/40 backdrop-blur-xl rounded-2xl border border-gray-700/30 shadow-2xl p-8 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-blue-500/5" />
        
        <div className="relative">
          <div className="mb-8">
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center animate-pulse">
              <span className="text-3xl">👛</span>
            </div>
            <h2 className="text-3xl font-orbitron font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent mb-4">
              Creating Your Wallet
            </h2>
            <p className="text-gray-400 mb-6">
              Generating your cryptographic keys and decentralized identity...
            </p>
          </div>

          {!walletData && (
            <button
              onClick={handleWalletCreation}
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-medium rounded-xl shadow-lg hover:shadow-xl disabled:opacity-50 transition-all duration-300 transform hover:scale-[1.02] relative overflow-hidden group"
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Creating Wallet...</span>
                </div>
              ) : (
                <>
                  Generate My Wallet
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700" />
                </>
              )}
            </button>
          )}

          {walletData && (
            <div className="space-y-4 animate-in slide-in-from-bottom-4 duration-500">
              <div className="bg-green-900/30 backdrop-blur-sm border border-green-500/30 rounded-xl p-4">
                <div className="flex items-center justify-center space-x-2 text-green-400 font-medium">
                  <span className="text-xl">✅</span>
                  <span>Wallet Created Successfully!</span>
                </div>
              </div>
              
              <button
                onClick={() => setStep('did-explain')}
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] relative overflow-hidden group"
              >
                Continue to Identity Setup
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )

  // Enhanced DID Explanation Step
  const renderDidExplainStep = () => (
    <div className="max-w-2xl mx-auto">
      <div className="bg-gray-900/40 backdrop-blur-xl rounded-2xl border border-gray-700/30 shadow-2xl p-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5" />
        
        <div className="relative">
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
              <span className="text-2xl">🆔</span>
            </div>
            <h2 className="text-3xl font-orbitron font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
              Your Digital Identity (DID)
            </h2>
            <p className="text-gray-400">Understanding Decentralized Identifiers</p>
          </div>

          <div className="space-y-6">
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700/30">
              <h3 className="text-xl font-semibold text-white mb-4">What is a DID?</h3>
              <p className="text-gray-300 leading-relaxed">
                A Decentralized Identifier (DID) is your unique, self-sovereign digital identity. 
                Unlike traditional accounts, you own and control your DID completely—no company or 
                government can take it away from you.
              </p>
            </div>

            {walletData && (
              <div className="bg-blue-900/20 backdrop-blur-sm rounded-xl p-6 border border-blue-500/30 animate-in slide-in-from-bottom-4 duration-500">
                <h3 className="text-lg font-semibold text-blue-300 mb-3">Your DID Details</h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-gray-400 text-sm">DID:</span>
                    <div className="font-mono text-xs text-blue-300 break-all bg-gray-800/50 rounded p-2 mt-1">
                      {walletData.did}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-400 text-sm">Wallet Address:</span>
                    <div className="font-mono text-xs text-green-300 break-all bg-gray-800/50 rounded p-2 mt-1">
                      {walletData.address}
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30">
              <h3 className="text-lg font-semibold text-purple-300 mb-3">Key Benefits</h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start space-x-2">
                  <span className="text-green-400 mt-0.5">✓</span>
                  <span>Complete ownership and control</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-400 mt-0.5">✓</span>
                  <span>Privacy-preserving authentication</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-400 mt-0.5">✓</span>
                  <span>Works across all PersonaPass services</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-400 mt-0.5">✓</span>
                  <span>Blockchain-secured and verifiable</span>
                </li>
              </ul>
            </div>

            <div className="flex items-center space-x-3 p-4 bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/30">
              <input
                type="checkbox"
                id="did-understood"
                checked={didUnderstood}
                onChange={(e) => setDidUnderstood(e.target.checked)}
                className="w-5 h-5 text-purple-500 bg-gray-800 border-gray-600 rounded focus:ring-purple-500"
              />
              <label htmlFor="did-understood" className="text-gray-300 text-sm">
                I understand what a DID is and how it protects my digital identity
              </label>
            </div>

            <button
              onClick={() => setStep('recovery-key')}
              disabled={!didUnderstood}
              className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium rounded-xl shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden group"
            >
              Continue to Security Setup
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  // Enhanced Recovery Key Step
  const renderRecoveryKeyStep = () => (
    <div className="max-w-2xl mx-auto">
      <div className="bg-gray-900/40 backdrop-blur-xl rounded-2xl border border-gray-700/30 shadow-2xl p-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-red-500/5" />
        
        <div className="relative">
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center">
              <span className="text-2xl">🔒</span>
            </div>
            <h2 className="text-3xl font-orbitron font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent mb-2">
              Secure Your Recovery Keys
            </h2>
            <p className="text-gray-400">Critical for account recovery - save them safely!</p>
          </div>

          {walletData && (
            <div className="space-y-6">
              <div className="bg-orange-900/20 backdrop-blur-sm rounded-xl p-6 border border-orange-500/30">
                <h3 className="text-lg font-semibold text-orange-300 mb-4 flex items-center">
                  <span className="mr-2">⚠️</span>
                  Critical Security Information
                </h3>
                <p className="text-gray-300 mb-4">
                  Your private key is the only way to recover your wallet if you lose access. 
                  Store it securely offline - anyone with this key can access your account.
                </p>
                
                <div className="space-y-4">
                  <div>
                    <span className="text-gray-400 text-sm block mb-2">Private Key:</span>
                    <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-600/50 relative group">
                      <div className="font-mono text-xs text-green-300 break-all">
                        {walletData.privateKey || 'Not available'}
                      </div>
                      <button
                        onClick={() => copyToClipboard(walletData.privateKey || '', 'private key')}
                        className="absolute top-2 right-2 p-2 bg-gray-700/50 hover:bg-gray-600/50 rounded text-gray-400 hover:text-white transition-colors"
                        title="Copy private key"
                      >
                        📋
                      </button>
                    </div>
                  </div>

                  {formData.backupCodes.length > 0 && (
                    <div>
                      <span className="text-gray-400 text-sm block mb-2">Backup Recovery Codes:</span>
                      <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-600/50 relative group">
                        <div className="grid grid-cols-2 gap-2">
                          {formData.backupCodes.map((code, index) => (
                            <div key={index} className="font-mono text-xs text-blue-300 bg-gray-700/50 rounded p-2 text-center">
                              {code}
                            </div>
                          ))}
                        </div>
                        <button
                          onClick={copyAllBackupCodes}
                          className="absolute top-2 right-2 p-2 bg-gray-700/50 hover:bg-gray-600/50 rounded text-gray-400 hover:text-white transition-colors"
                          title="Copy all backup codes"
                        >
                          📋
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={() => copyToClipboard(JSON.stringify({
                    privateKey: walletData.privateKey,
                    backupCodes: formData.backupCodes,
                    address: walletData.address,
                    did: walletData.did
                  }, null, 2), 'recovery data')}
                  className="flex-1 py-3 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 text-blue-300 font-medium rounded-xl transition-all duration-300 hover:scale-[1.02]"
                >
                  📋 Copy All
                </button>
                
                <button
                  onClick={downloadRecoveryFile}
                  className="flex-1 py-3 bg-green-600/20 hover:bg-green-600/30 border border-green-500/30 text-green-300 font-medium rounded-xl transition-all duration-300 hover:scale-[1.02]"
                >
                  💾 Download File
                </button>
              </div>

              <div className="flex items-start space-x-3 p-4 bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/30">
                <input
                  type="checkbox"
                  id="backup-acknowledged"
                  checked={backupAcknowledged}
                  onChange={(e) => setBackupAcknowledged(e.target.checked)}
                  className="w-5 h-5 mt-0.5 text-orange-500 bg-gray-800 border-gray-600 rounded focus:ring-orange-500"
                />
                <label htmlFor="backup-acknowledged" className="text-gray-300 text-sm leading-relaxed">
                  I have securely saved my private key and backup codes. I understand that losing 
                  these will result in permanent loss of access to my account and funds.
                </label>
              </div>

              <button
                onClick={() => {
                  setStep('totp')
                  handleTotpSetup()
                }}
                disabled={!backupAcknowledged}
                className="w-full py-4 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-medium rounded-xl shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden group"
              >
                Continue to 2FA Setup
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )

  // Enhanced TOTP Step
  const renderTotpStep = () => (
    <div className="max-w-lg mx-auto">
      <div className="bg-gray-900/40 backdrop-blur-xl rounded-2xl border border-gray-700/30 shadow-2xl p-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-blue-500/5" />
        
        <div className="relative">
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center">
              <span className="text-2xl">📱</span>
            </div>
            <h2 className="text-3xl font-orbitron font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent mb-2">
              Setup Two-Factor Authentication
            </h2>
            <p className="text-gray-400">Secure your account with Google Authenticator</p>
          </div>

          {!formData.qrCode ? (
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 text-gray-400">
                <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                <span>Setting up TOTP...</span>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="text-center">
                <div className="inline-block p-4 bg-white rounded-xl shadow-lg">
                  <img 
                    src={formData.qrCode} 
                    alt="TOTP QR Code" 
                    className="w-48 h-48 mx-auto"
                  />
                </div>
                <p className="text-sm text-gray-400 mt-4">
                  Scan with Google Authenticator
                </p>
              </div>

              {formData.totpSecret && (
                <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-4 border border-gray-700/30">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400 text-sm">Manual Entry Key:</span>
                    <button
                      onClick={() => copyToClipboard(formData.totpSecret, 'secret')}
                      className={`p-2 rounded text-xs transition-all duration-200 ${
                        secretCopied 
                          ? 'bg-green-600/20 text-green-300' 
                          : 'bg-gray-700/50 text-gray-400 hover:text-white'
                      }`}
                      title="Copy secret key"
                    >
                      {secretCopied ? '✅ Copied!' : '📋 Copy'}
                    </button>
                  </div>
                  <div className="font-mono text-xs text-blue-300 break-all bg-gray-900/50 rounded p-3">
                    {formData.totpSecret}
                  </div>
                </div>
              )}

              <form onSubmit={handleTotpSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Enter 6-digit code from your authenticator app
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    pattern="[0-9]{6}"
                    value={formData.totpCode}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      totpCode: e.target.value.replace(/\D/g, '') 
                    }))}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white text-center text-lg font-mono tracking-widest placeholder-gray-400 focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition-all duration-300"
                    placeholder="123456"
                  />
                </div>

                {error && (
                  <div className="bg-red-900/30 backdrop-blur-sm border border-red-500/30 rounded-xl p-4 text-red-300 text-sm animate-in slide-in-from-top-2 duration-300">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading || formData.totpCode.length !== 6}
                  className="w-full py-4 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-medium rounded-xl shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden group"
                >
                  {loading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Verifying...</span>
                    </div>
                  ) : (
                    <>
                      Verify & Complete Setup
                      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700" />
                    </>
                  )}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  )

  // Enhanced Complete Step with Celebration
  const renderCompleteStep = () => (
    <div className="max-w-lg mx-auto">
      <div className="bg-gray-900/40 backdrop-blur-xl rounded-2xl border border-gray-700/30 shadow-2xl p-8 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-blue-500/5 to-purple-500/10" />
        
        {/* Success particles animation */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-r from-green-400 to-blue-400 rounded-full animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${1 + Math.random()}s`
              }}
            />
          ))}
        </div>

        <div className="relative">
          <div className="mb-8">
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg shadow-green-500/25 animate-pulse">
              <span className="text-4xl">🎉</span>
            </div>
            <h2 className="text-4xl font-orbitron font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-4 animate-in slide-in-from-bottom-4 duration-700">
              Welcome to PersonaPass!
            </h2>
            <p className="text-gray-300 text-lg mb-6">
              Your sovereign digital identity is ready
            </p>
          </div>

          {walletData && (
            <div className="bg-gradient-to-r from-green-900/20 to-blue-900/20 backdrop-blur-sm rounded-xl p-6 border border-green-500/30 mb-8 animate-in slide-in-from-bottom-4 duration-500 delay-200">
              <h3 className="text-lg font-semibold text-green-300 mb-4">🎊 Account Created Successfully!</h3>
              <div className="space-y-3 text-left">
                <div>
                  <span className="text-gray-400 text-sm">Your DID:</span>
                  <div className="font-mono text-xs text-green-300 break-all bg-gray-800/50 rounded p-2 mt-1">
                    {walletData.did}
                  </div>
                </div>
                <div>
                  <span className="text-gray-400 text-sm">Wallet Address:</span>
                  <div className="font-mono text-xs text-blue-300 break-all bg-gray-800/50 rounded p-2 mt-1">
                    {walletData.address}
                  </div>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-gray-700/50">
                  <span className="text-gray-400 text-sm">Balance:</span>
                  <span className="text-purple-300 font-medium">0 PERSONA</span>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-4 animate-in slide-in-from-bottom-4 duration-500 delay-300">
            <Link
              href="/login"
              className="block w-full py-4 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] relative overflow-hidden group"
            >
              Access Your Identity
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700" />
            </Link>
            
            <Link
              href="/"
              className="block w-full py-3 border border-gray-600/50 text-gray-300 hover:text-white hover:border-gray-500/50 font-medium rounded-xl transition-all duration-300 hover:bg-gray-800/30"
            >
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse" />
        <div className="absolute top-20 right-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-300" />
        <div className="absolute bottom-10 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-700" />
      </div>
      
      <div className="container mx-auto px-6 py-8 relative">
        {renderProgressIndicator()}
        
        <div className="animate-in fade-in duration-700">
          {step === 'email' && renderEmailStep()}
          {step === 'wallet' && renderWalletStep()}
          {step === 'did-explain' && renderDidExplainStep()}
          {step === 'recovery-key' && renderRecoveryKeyStep()}
          {step === 'totp' && renderTotpStep()}
          {step === 'complete' && renderCompleteStep()}
        </div>

        <div className="text-center mt-8">
          <p className="text-gray-400 text-sm">
            Already have an account?{' '}
            <Link href="/login" className="text-blue-400 hover:text-blue-300 transition-colors">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}