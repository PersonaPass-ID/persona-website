'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useAccount, useDisconnect } from 'wagmi'
import { 
  Shield, 
  User, 
  Key, 
  Clock, 
  CheckCircle, 
  Globe,
  Loader2,
  Plus,
  ExternalLink,
  Copy,
  Download,
  Share2
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useKeplrWallet } from '@/hooks/useKeplrWallet'
import { personaApiClient as api } from '@/lib/api-client'
import type { APICredential } from '@/lib/api-client'

export default function DashboardClient() {
  const router = useRouter()
  const { address: wagmiAddress, isConnected: wagmiConnected } = useAccount()
  const { disconnect } = useDisconnect()
  const { address: keplrAddress, isConnected: keplrConnected, disconnectKeplr } = useKeplrWallet()
  
  // Use either wagmi or keplr connection
  const address = wagmiAddress || keplrAddress
  const isConnected = wagmiConnected || keplrConnected
  
  const [userDID, setUserDID] = useState<string | null>(null)
  const [credentials, setCredentials] = useState<APICredential[]>([])
  const [isLoadingCredentials, setIsLoadingCredentials] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Check for existing session on mount
  useEffect(() => {
    const checkSession = async () => {
      // Check localStorage for saved wallet address
      const savedAddress = localStorage.getItem('personapass_wallet_address')
      const savedDID = localStorage.getItem('persona_did')
      
      if (savedAddress && savedDID) {
        setUserDID(savedDID)
        // Wallet should auto-reconnect through wagmi or keplr
      } else if (!isConnected) {
        // No saved session and not connected, redirect to login
        router.push('/login')
      }
    }
    
    checkSession()
  }, [isConnected, router])

  // Fetch user's credentials when DID is available
  useEffect(() => {
    const fetchCredentials = async () => {
      if (!userDID) {
        setIsLoadingCredentials(false)
        return
      }
      
      try {
        setIsLoadingCredentials(true)
        const response = await api.getCredentials(userDID)
        
        if (response.credentials && Array.isArray(response.credentials)) {
          setCredentials(response.credentials)
        }
      } catch (err) {
        console.error('Failed to fetch credentials:', err)
        setError('Failed to load your credentials')
      } finally {
        setIsLoadingCredentials(false)
      }
    }
    
    fetchCredentials()
  }, [userDID])

  // Fetch DID based on wallet address
  useEffect(() => {
    const fetchUserDID = async () => {
      if (!address) return
      
      try {
        // Try to get DID from localStorage first
        const savedDID = localStorage.getItem('persona_did')
        if (savedDID) {
          setUserDID(savedDID)
          return
        }
        
        // User might not have created a DID yet - this is normal for new users
        // They need to go through onboarding first
      } catch (err) {
        console.error('Failed to fetch DID:', err)
        // User might not have created a DID yet
      }
    }
    
    fetchUserDID()
  }, [address])

  const handleDisconnect = () => {
    // Clear localStorage
    localStorage.removeItem('personapass_wallet_address')
    localStorage.removeItem('persona_did')
    
    // Disconnect wallet
    if (wagmiConnected) {
      disconnect()
    } else if (keplrConnected) {
      disconnectKeplr()
    }
    
    // Redirect to home
    router.push('/')
  }

  const handleRequestCredential = () => {
    router.push('/verify')
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    // Could add a toast notification here
  }

  const downloadCredential = (credential: APICredential) => {
    const blob = new Blob([JSON.stringify(credential, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `credential-${credential.id}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const shareCredential = (credential: APICredential) => {
    // In a real app, this would generate a shareable link
    const shareUrl = `https://personapass.xyz/verify/${credential.id}`
    copyToClipboard(shareUrl)
  }

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-white mx-auto mb-4" />
          <p className="text-white text-lg">Connecting to your wallet...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Shield className="w-8 h-8 text-white" />
              <h1 className="text-xl font-bold text-white">PersonaPass Dashboard</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="bg-white/10 px-4 py-2 rounded-lg">
                <p className="text-sm text-white/70">Connected Wallet</p>
                <p className="text-sm font-mono text-white">
                  {address?.slice(0, 6)}...{address?.slice(-4)}
                </p>
              </div>
              
              <button
                onClick={handleDisconnect}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Disconnect
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* User Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 mb-8"
        >
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Your Digital Identity</h2>
              {userDID ? (
                <div className="flex items-center space-x-2">
                  <p className="text-white/70">DID:</p>
                  <code className="bg-black/30 px-3 py-1 rounded text-white font-mono text-sm">
                    {userDID}
                  </code>
                  <button
                    onClick={() => copyToClipboard(userDID)}
                    className="text-white/50 hover:text-white transition-colors"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="bg-yellow-500/20 border border-yellow-500/50 rounded-lg p-4 mt-4">
                  <p className="text-yellow-200">
                    You haven't created a DID yet. 
                    <button
                      onClick={() => router.push('/get-started')}
                      className="ml-2 underline hover:no-underline"
                    >
                      Create one now →
                    </button>
                  </p>
                </div>
              )}
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="bg-green-500/20 px-3 py-1 rounded-full flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span className="text-green-400 text-sm">Verified</span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-black/20 rounded-xl p-4">
              <div className="flex items-center space-x-3">
                <Key className="w-8 h-8 text-blue-400" />
                <div>
                  <p className="text-white/70 text-sm">Credentials</p>
                  <p className="text-2xl font-bold text-white">{credentials.length}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-black/20 rounded-xl p-4">
              <div className="flex items-center space-x-3">
                <Globe className="w-8 h-8 text-purple-400" />
                <div>
                  <p className="text-white/70 text-sm">Verifications</p>
                  <p className="text-2xl font-bold text-white">
                    {credentials.filter(c => c.status === 'active').length}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-black/20 rounded-xl p-4">
              <div className="flex items-center space-x-3">
                <Clock className="w-8 h-8 text-green-400" />
                <div>
                  <p className="text-white/70 text-sm">Member Since</p>
                  <p className="text-lg font-bold text-white">
                    {credentials.length > 0 && credentials[0]?.createdAt 
                      ? new Date(credentials[0].createdAt).toLocaleDateString()
                      : 'Today'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Credentials Section */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Your Credentials</h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleRequestCredential}
              className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 hover:shadow-lg transition-shadow"
            >
              <Plus className="w-5 h-5" />
              <span>Request New Credential</span>
            </motion.button>
          </div>

          {/* Credentials List */}
          {isLoadingCredentials ? (
            <div className="flex items-center justify-center py-12">
              <div className="flex items-center space-x-3 text-gray-600">
                <Loader2 className="w-6 h-6 animate-spin" />
                <span>Loading your credentials...</span>
              </div>
            </div>
          ) : credentials.length === 0 ? (
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-12 text-center">
              <Shield className="w-16 h-16 text-white/50 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No Credentials Yet</h3>
              <p className="text-white/70 mb-6">
                Get started by requesting your first verifiable credential
              </p>
              <button
                onClick={handleRequestCredential}
                className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-shadow"
              >
                Request Your First Credential
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {credentials.map((credential) => (
                <motion.div
                  key={credential.id}
                  whileHover={{ scale: 1.02 }}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold mb-1">
                        {credential.type || 'Identity Credential'}
                      </h3>
                      <p className="text-white/70 text-sm">
                        Issued: {new Date(credential.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <CheckCircle className="w-6 h-6 text-green-300" />
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="bg-white/10 rounded-lg px-3 py-2">
                      <p className="text-xs text-white/70">Credential ID</p>
                      <p className="font-mono text-sm">{credential.id.slice(0, 20)}...</p>
                    </div>
                    
                    <div className="bg-white/10 rounded-lg px-3 py-2">
                      <p className="text-xs text-white/70">Issuer</p>
                      <p className="text-sm">PersonaPass Issuer</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => shareCredential(credential)}
                      className="flex-1 bg-white/20 hover:bg-white/30 px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-1"
                    >
                      <Share2 className="w-4 h-4" />
                      <span>Share</span>
                    </button>
                    
                    <button
                      onClick={() => downloadCredential(credential)}
                      className="flex-1 bg-white/20 hover:bg-white/30 px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-1"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download</span>
                    </button>
                    
                    <a
                      href={`/credential/${credential.id}`}
                      className="flex-1 bg-white/20 hover:bg-white/30 px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-1"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>View</span>
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Error Display */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 bg-red-500/20 border border-red-500/50 rounded-lg p-4"
          >
            <p className="text-red-200">{error}</p>
          </motion.div>
        )}
      </main>
    </div>
  )
}