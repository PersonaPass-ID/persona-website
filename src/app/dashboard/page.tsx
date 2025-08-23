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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-xl font-orbitron font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                PersonaPass
              </Link>
              <span className="text-gray-400">Dashboard</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-400">
                {account.balance} PERSONA
              </div>
              <button
                onClick={handleDisconnect}
                className="text-sm text-red-400 hover:text-red-300"
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
            <div className="bg-gray-800 rounded-lg p-6 mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Identity Overview</h2>
                <button
                  onClick={handleRefreshBalance}
                  disabled={balanceLoading}
                  className="p-2 text-gray-400 hover:text-white disabled:opacity-50"
                  title="Refresh balance"
                >
                  <svg className={`w-5 h-5 ${balanceLoading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">DID</label>
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 font-mono text-sm bg-gray-700 p-3 rounded break-all">
                      {account.did}
                    </div>
                    <button
                      onClick={() => copyToClipboard(account.did)}
                      className="p-2 text-gray-400 hover:text-white"
                      title="Copy DID"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </button>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Wallet Address</label>
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 font-mono text-sm bg-gray-700 p-3 rounded break-all">
                      {account.address}
                    </div>
                    <button
                      onClick={() => copyToClipboard(account.address)}
                      className="p-2 text-gray-400 hover:text-white"
                      title="Copy address"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </button>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Balance</label>
                  <div className="text-2xl font-semibold text-green-400">
                    {account.balance || '0'} PERSONA
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Network</label>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span>PersonaChain (personachain-1)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Credentials Section */}
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Verifiable Credentials</h2>
                <Link
                  href="/credentials/issue"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 rounded-md text-sm font-medium hover:from-blue-700 hover:to-purple-700 transition-colors"
                >
                  Issue New Credential
                </Link>
              </div>

              {account.credentials && account.credentials.length > 0 ? (
                <div className="space-y-4">
                  {account.credentials.map((credential: PersonaCredential, index: number) => (
                    <div key={credential.id || index} className="border border-gray-700 rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="font-medium">{credential.type.filter(t => t !== 'VerifiableCredential').join(', ')}</h3>
                            {credential.isValid && (
                              <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-900/20 text-green-400 border border-green-700">
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
                        <div className="flex space-x-2">
                          <Link
                            href={`/credentials/${credential.id}`}
                            className="text-blue-400 hover:text-blue-300 text-sm"
                          >
                            View
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-400">
                  <svg className="w-12 h-12 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <p>No credentials yet</p>
                  <Link
                    href="/credentials/issue"
                    className="inline-block mt-2 text-blue-400 hover:text-blue-300"
                  >
                    Issue your first credential →
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-6">Quick Actions</h2>
              <div className="space-y-4">
                <Link
                  href="/credentials/issue"
                  className="block w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-md font-medium text-center hover:from-blue-700 hover:to-purple-700 transition-colors"
                >
                  Issue Credential
                </Link>
                
                <Link
                  href="/zkp/generate"
                  className="block w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-4 rounded-md font-medium text-center hover:from-purple-700 hover:to-pink-700 transition-colors"
                >
                  Generate ZK Proof
                </Link>
                
                <Link
                  href="/wallet/export"
                  className="block w-full border border-gray-600 text-white py-3 px-4 rounded-md font-medium text-center hover:bg-gray-700 transition-colors"
                >
                  Export Wallet
                </Link>
                
                <Link
                  href="/settings"
                  className="block w-full border border-gray-600 text-white py-3 px-4 rounded-md font-medium text-center hover:bg-gray-700 transition-colors"
                >
                  Settings
                </Link>
              </div>
            </div>

            {/* Stats */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-6">Statistics</h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-400">Credentials Issued</span>
                  <span className="font-semibold">{account.credentials?.length || 0}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-400">Account Age</span>
                  <span className="font-semibold">
                    {Math.floor((Date.now() - new Date(account.createdAt).getTime()) / (1000 * 60 * 60 * 24))} days
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-400">Network</span>
                  <span className="font-semibold text-green-400">Connected</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}