'use client'

import { useState } from 'react'
import { personaWallet } from '@/lib/persona-wallet-core'

export default function WalletTestPage() {
  const [account, setAccount] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [logs, setLogs] = useState<string[]>([])

  const addLog = (message: string) => {
    setLogs(prev => [...prev, `${new Date().toISOString()}: ${message}`])
  }

  const handleCreateWallet = async () => {
    try {
      setLoading(true)
      addLog('🚀 Creating PERSONA Wallet...')
      
      const walletAccount = await personaWallet.createWallet()
      setAccount(walletAccount)
      
      addLog(`✅ Wallet created: ${walletAccount.did}`)
      addLog(`💳 Address: ${walletAccount.address}`)
    } catch (error: any) {
      addLog(`❌ Error: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateDID = async () => {
    try {
      setLoading(true)
      addLog('🆔 Registering DID on PersonaChain...')
      
      const did = await personaWallet.createDID()
      addLog(`✅ DID registered: ${did}`)
    } catch (error: any) {
      addLog(`❌ Error: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  const handleIssueCredential = async () => {
    try {
      setLoading(true)
      addLog('📜 Issuing verifiable credential...')
      
      const credential = await personaWallet.issueCredential(
        {
          name: 'Test User',
          email: 'test@personapass.me',
          verifiedAt: new Date().toISOString()
        },
        ['EmailCredential', 'IdentityCredential']
      )
      
      addLog(`✅ Credential issued: ${credential.id}`)
    } catch (error: any) {
      addLog(`❌ Error: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  const handleGetBalance = async () => {
    try {
      setLoading(true)
      addLog('💰 Checking PERSONA balance...')
      
      const balance = await personaWallet.updateBalance()
      addLog(`💰 Balance: ${balance} PERSONA`)
    } catch (error: any) {
      addLog(`❌ Error: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen p-6 bg-gray-900 text-white">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">PERSONA Wallet Core Test</h1>
        
        {/* Account Info */}
        {account && (
          <div className="bg-gray-800 rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Account Information</h2>
            <div className="space-y-2 text-sm font-mono">
              <div><strong>DID:</strong> {account.did}</div>
              <div><strong>Address:</strong> {account.address}</div>
              <div><strong>Balance:</strong> {account.balance || '0'} PERSONA</div>
              <div><strong>Connected:</strong> {account.isConnected ? 'Yes' : 'No'}</div>
              <div><strong>Credentials:</strong> {account.credentials?.length || 0}</div>
            </div>
          </div>
        )}
        
        {/* Action Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <button
            onClick={handleCreateWallet}
            disabled={loading || !!account}
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 px-4 py-2 rounded-lg"
          >
            Create Wallet
          </button>
          <button
            onClick={handleCreateDID}
            disabled={loading || !account}
            className="bg-green-600 hover:bg-green-700 disabled:opacity-50 px-4 py-2 rounded-lg"
          >
            Create DID
          </button>
          <button
            onClick={handleIssueCredential}
            disabled={loading || !account}
            className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 px-4 py-2 rounded-lg"
          >
            Issue Credential
          </button>
          <button
            onClick={handleGetBalance}
            disabled={loading || !account}
            className="bg-yellow-600 hover:bg-yellow-700 disabled:opacity-50 px-4 py-2 rounded-lg"
          >
            Get Balance
          </button>
        </div>

        {/* Logs */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Logs</h2>
          <div className="bg-black rounded p-4 max-h-96 overflow-y-auto">
            {logs.length === 0 ? (
              <p className="text-gray-500">No logs yet. Create a wallet to start.</p>
            ) : (
              logs.map((log, index) => (
                <div key={index} className="text-sm text-green-400 font-mono">
                  {log}
                </div>
              ))
            )}
          </div>
        </div>

        {/* PersonaChain Status */}
        <div className="mt-6 bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">PersonaChain Status</h2>
          <div className="text-sm">
            <p><strong>Network:</strong> personachain-1</p>
            <p><strong>RPC Endpoint:</strong> http://44.201.59.57:26657</p>
            <p><strong>API Endpoint:</strong> http://44.201.59.57:1317</p>
            <p><strong>Status:</strong> <span className="text-green-400">Active (55,462+ blocks)</span></p>
          </div>
        </div>
      </div>
    </div>
  )
}