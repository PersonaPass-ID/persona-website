"use client"

import { useState, useEffect } from 'react'
import { personaWallet, PersonaWalletAccount, PersonaCredential } from '@/lib/persona-wallet-core'
import Link from 'next/link'

export default function DashboardPage() {
  const [account, setAccount] = useState<PersonaWalletAccount | null>(null)
  const [loading, setLoading] = useState(true)
  const [balanceLoading, setBalanceLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const initializeDashboard = async () => {
      try {
        const currentAccount = personaWallet.getAccount()
        if (!currentAccount) {
          // Redirect to login if no account
          window.location.href = '/login'
          return
        }

        setAccount(currentAccount)
        
        // Set up account change listener
        const unsubscribe = personaWallet.onAccountChange((updatedAccount) => {
          setAccount(updatedAccount)
        })

        // Update balance
        await handleRefreshBalance()

        return () => unsubscribe()
      } catch (err) {
        setError('Failed to load dashboard')
        console.error('Dashboard initialization error:', err)
      } finally {
        setLoading(false)
      }
    }

    initializeDashboard()
  }, [])

  const handleRefreshBalance = async () => {
    if (!account) return
    
    setBalanceLoading(true)
    try {
      await personaWallet.updateBalance()
    } catch (err) {
      console.warn('Failed to update balance:', err)
    } finally {
      setBalanceLoading(false)
    }
  }

  const handleDisconnect = async () => {
    try {
      await personaWallet.disconnect()
      window.location.href = '/login'
    } catch (err) {
      setError('Failed to disconnect wallet')
    }
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      // You could add a toast notification here
      console.log('Copied to clipboard')
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 mx-auto mb-4 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-400">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  if (!account) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-orbitron font-bold mb-4">No Wallet Connected</h1>
          <p className="text-gray-400 mb-6">Please connect your wallet to access the dashboard.</p>
          <Link href="/login" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-md font-medium hover:from-blue-700 hover:to-purple-700 transition-colors">
            Connect Wallet
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
      {/* Animated Background Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-full blur-3xl animate-float" />
        <div className="absolute top-1/2 -left-40 w-60 h-60 bg-gradient-to-br from-purple-500/20 to-pink-600/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
        <div className="absolute -bottom-40 right-1/3 w-96 h-96 bg-gradient-to-br from-cyan-500/10 to-blue-600/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '6s' }} />
      </div>

      {/* Header */}
      <div className="bg-gray-900/40 backdrop-blur-xl border-b border-gray-700/30 relative z-10">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                PersonaPass
              </Link>
              <div className="hidden sm:block w-1 h-6 bg-gray-600 rounded-full"></div>
              <span className="text-gray-300 font-medium">Dashboard</span>
            </div>
            <div className="flex items-center space-x-6">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl px-4 py-2 border border-gray-600/30">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-300 font-medium">
                    {account.balance || '0'} PERSONA
                  </span>
                </div>
              </div>
              <button
                onClick={handleDisconnect}
                className="px-4 py-2 border border-red-500/50 text-red-400 rounded-xl hover:bg-red-900/20 transition-all duration-300 backdrop-blur-sm font-medium"
              >
                Disconnect
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {error && (
          <div className="mb-6 p-4 bg-red-900/20 border border-red-700 rounded-md text-red-300">
            {error}
          </div>
        )}

        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-orbitron font-bold mb-2">
            Welcome to Your Digital Identity
          </h1>
          <p className="text-gray-400">
            Manage your decentralized identity, credentials, and zero-knowledge proofs
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Identity Overview */}
          <div className="lg:col-span-2">
            <div className="bg-gray-900/40 backdrop-blur-xl rounded-2xl border border-gray-700/30 shadow-2xl p-8 mb-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-600/5 pointer-events-none" />
              <div className="flex items-center justify-between mb-8 relative z-10">
                <h2 className="text-2xl font-semibold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">Identity Overview</h2>
                <button
                  onClick={handleRefreshBalance}
                  disabled={balanceLoading}
                  className="p-3 text-gray-400 hover:text-white disabled:opacity-50 bg-gray-800/50 rounded-xl border border-gray-600/30 hover:bg-gray-700/50 transition-all duration-300 backdrop-blur-sm"
                  title="Refresh balance"
                >
                  <svg className={`w-5 h-5 ${balanceLoading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">DID</label>
                  <div className="flex items-center space-x-3">
                    <div className="flex-1 font-mono text-sm bg-gray-800/50 border border-gray-600/30 p-4 rounded-xl break-all backdrop-blur-sm hover:bg-gray-700/50 transition-all duration-300">
                      {account.did}
                    </div>
                    <button
                      onClick={() => copyToClipboard(account.did)}
                      className="p-3 text-gray-400 hover:text-white bg-gray-800/50 rounded-xl border border-gray-600/30 hover:bg-gray-700/50 transition-all duration-300 backdrop-blur-sm"
                      title="Copy DID"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </button>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">Wallet Address</label>
                  <div className="flex items-center space-x-3">
                    <div className="flex-1 font-mono text-sm bg-gray-800/50 border border-gray-600/30 p-4 rounded-xl break-all backdrop-blur-sm hover:bg-gray-700/50 transition-all duration-300">
                      {account.address}
                    </div>
                    <button
                      onClick={() => copyToClipboard(account.address)}
                      className="p-3 text-gray-400 hover:text-white bg-gray-800/50 rounded-xl border border-gray-600/30 hover:bg-gray-700/50 transition-all duration-300 backdrop-blur-sm"
                      title="Copy address"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </button>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">Balance</label>
                  <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl p-4 backdrop-blur-sm">
                    <div className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                      {account.balance || '0'} PERSONA
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">Network</label>
                  <div className="flex items-center space-x-3 bg-gray-800/50 border border-gray-600/30 rounded-xl p-4 backdrop-blur-sm">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
                    <span className="font-medium text-gray-200">PersonaChain (personachain-1)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Credentials Section */}
            <div className="bg-gray-900/40 backdrop-blur-xl rounded-2xl border border-gray-700/30 shadow-2xl p-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-600/5 pointer-events-none" />
              <div className="flex items-center justify-between mb-8 relative z-10">
                <h2 className="text-2xl font-semibold bg-gradient-to-r from-white via-purple-100 to-pink-100 bg-clip-text text-transparent">Verifiable Credentials</h2>
                <Link
                  href="/credentials/issue"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-xl text-sm font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-purple-500/25 transform hover:scale-105"
                >
                  Issue New Credential
                </Link>
              </div>

              {account.credentials && account.credentials.length > 0 ? (
                <div className="space-y-6 relative z-10">
                  {account.credentials.map((credential: PersonaCredential, index: number) => (
                    <div key={credential.id || index} className="bg-gray-800/50 border border-gray-600/30 rounded-xl p-6 backdrop-blur-sm hover:bg-gray-700/50 transition-all duration-300">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-3">
                            <h3 className="font-semibold text-lg text-gray-200">{credential.type.filter(t => t !== 'VerifiableCredential').join(', ')}</h3>
                            {credential.isValid && (
                              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-400 border border-green-500/30 backdrop-blur-sm">
                                ✓ Valid
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-400 mb-2">
                            Issued: {new Date(credential.issuanceDate).toLocaleDateString()}
                          </p>
                          {credential.expirationDate && (
                            <p className="text-sm text-gray-400">
                              Expires: {new Date(credential.expirationDate).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                        <div className="flex space-x-3">
                          <Link
                            href={`/credentials/${credential.id}`}
                            className="px-4 py-2 bg-blue-600/20 border border-blue-500/30 text-blue-400 hover:text-blue-300 rounded-xl text-sm font-medium hover:bg-blue-500/20 transition-all duration-300 backdrop-blur-sm"
                          >
                            View Details
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-gray-400 relative z-10">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-800/50 border border-gray-600/30 rounded-2xl mb-6 backdrop-blur-sm">
                    <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-medium text-gray-300 mb-2">No credentials yet</h3>
                  <p className="text-gray-500 mb-6">Create your first verifiable credential to get started</p>
                  <Link
                    href="/credentials/issue"
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-purple-500/25 transform hover:scale-105"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Issue your first credential
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-8">
            <div className="bg-gray-900/40 backdrop-blur-xl rounded-2xl border border-gray-700/30 shadow-2xl p-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-600/5 pointer-events-none" />
              <h2 className="text-2xl font-semibold mb-8 bg-gradient-to-r from-white via-cyan-100 to-blue-100 bg-clip-text text-transparent relative z-10">Quick Actions</h2>
              <div className="space-y-4 relative z-10">
                <Link
                  href="/credentials/issue"
                  className="group block w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-xl font-medium text-center hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-blue-500/25 transform hover:scale-[1.02]"
                >
                  <div className="flex items-center justify-center">
                    <svg className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Issue Credential
                  </div>
                </Link>
                
                <Link
                  href="/zkp/generate"
                  className="group block w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 px-6 rounded-xl font-medium text-center hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-purple-500/25 transform hover:scale-[1.02]"
                >
                  <div className="flex items-center justify-center">
                    <svg className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.040A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    Generate ZK Proof
                  </div>
                </Link>
                
                <Link
                  href="/wallet/export"
                  className="group block w-full bg-gray-800/50 border border-gray-600/30 text-white py-4 px-6 rounded-xl font-medium text-center hover:bg-gray-700/50 transition-all duration-300 backdrop-blur-sm transform hover:scale-[1.02]"
                >
                  <div className="flex items-center justify-center">
                    <svg className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Export Wallet
                  </div>
                </Link>
                
                <Link
                  href="/settings"
                  className="group block w-full bg-gray-800/50 border border-gray-600/30 text-white py-4 px-6 rounded-xl font-medium text-center hover:bg-gray-700/50 transition-all duration-300 backdrop-blur-sm transform hover:scale-[1.02]"
                >
                  <div className="flex items-center justify-center">
                    <svg className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Settings
                  </div>
                </Link>
              </div>
            </div>

            {/* Stats */}
            <div className="bg-gray-900/40 backdrop-blur-xl rounded-2xl border border-gray-700/30 shadow-2xl p-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-600/5 pointer-events-none" />
              <h2 className="text-2xl font-semibold mb-8 bg-gradient-to-r from-white via-emerald-100 to-teal-100 bg-clip-text text-transparent relative z-10">Statistics</h2>
              <div className="space-y-6 relative z-10">
                <div className="flex justify-between items-center p-4 bg-gray-800/50 border border-gray-600/30 rounded-xl backdrop-blur-sm">
                  <span className="text-gray-300 font-medium">Credentials Issued</span>
                  <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 px-3 py-1 rounded-lg border border-blue-500/30">
                    <span className="font-bold text-blue-400">{account.credentials?.length || 0}</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center p-4 bg-gray-800/50 border border-gray-600/30 rounded-xl backdrop-blur-sm">
                  <span className="text-gray-300 font-medium">Account Age</span>
                  <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 px-3 py-1 rounded-lg border border-purple-500/30">
                    <span className="font-bold text-purple-400">
                      {Math.floor((Date.now() - new Date(account.createdAt).getTime()) / (1000 * 60 * 60 * 24))} days
                    </span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center p-4 bg-gray-800/50 border border-gray-600/30 rounded-xl backdrop-blur-sm">
                  <span className="text-gray-300 font-medium">Network Status</span>
                  <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 px-3 py-1 rounded-lg border border-green-500/30">
                    <span className="font-bold text-green-400 flex items-center">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2"></div>
                      Connected
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}