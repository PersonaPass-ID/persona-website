'use client'

import { useState, useEffect } from 'react'

interface BackendStatus {
  success: boolean
  message: string
  endpoints?: any
  blockchain?: any
}

interface TOTPSetupResponse {
  success: boolean
  data?: {
    qrCode: string
    secret: string
    backupCodes: string[]
  }
  message: string
}

interface AccountResponse {
  success: boolean
  data?: {
    id: string
    email: string
    did: string
    walletAddress: string
    kycStatus: string
    totpSetup: boolean
  }
  message: string
}

export default function TestAuth() {
  const [backendStatus, setBackendStatus] = useState<BackendStatus | null>(null)
  const [totpSetup, setTotpSetup] = useState<TOTPSetupResponse | null>(null)
  const [email, setEmail] = useState('test@personapass.me')
  const [password, setPassword] = useState('SecurePass123')
  const [totpCode, setTotpCode] = useState('')
  const [accountResult, setAccountResult] = useState<AccountResponse | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    checkBackendStatus()
  }, [])

  const checkBackendStatus = async () => {
    try {
      const response = await fetch('http://localhost:3002/api/status')
      const data = await response.json()
      setBackendStatus(data)
    } catch (error) {
      setBackendStatus({
        success: false,
        message: 'Failed to connect to backend: ' + (error as Error).message
      })
    }
  }

  const setupTOTP = async () => {
    setLoading(true)
    try {
      const response = await fetch('http://localhost:3002/api/auth/totp-setup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email })
      })
      const data = await response.json()
      setTotpSetup(data)
    } catch (error) {
      setTotpSetup({
        success: false,
        message: 'Failed to setup TOTP: ' + (error as Error).message
      })
    } finally {
      setLoading(false)
    }
  }

  const createAccount = async () => {
    if (!totpCode) {
      alert('Please enter TOTP code')
      return
    }
    
    setLoading(true)
    try {
      const response = await fetch('http://localhost:3002/api/auth/create-account', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          totpCode
        })
      })
      const data = await response.json()
      setAccountResult(data)
    } catch (error) {
      setAccountResult({
        success: false,
        message: 'Failed to create account: ' + (error as Error).message
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">PersonaPass Authentication Test</h1>
      
      {/* Backend Status */}
      <div className="mb-8 p-4 border rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Backend API Status</h2>
        {backendStatus ? (
          <div className={`p-3 rounded ${backendStatus.success ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
            <p><strong>Status:</strong> {backendStatus.success ? 'Connected' : 'Failed'}</p>
            <p><strong>Message:</strong> {backendStatus.message}</p>
            {backendStatus.endpoints && (
              <div className="mt-2">
                <p><strong>Available Endpoints:</strong></p>
                <pre className="text-xs mt-1 overflow-x-auto">
                  {JSON.stringify(backendStatus.endpoints, null, 2)}
                </pre>
              </div>
            )}
          </div>
        ) : (
          <p>Checking backend status...</p>
        )}
        <button 
          onClick={checkBackendStatus}
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Refresh Status
        </button>
      </div>

      {/* TOTP Setup */}
      <div className="mb-8 p-4 border rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Step 1: TOTP Setup</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email:
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="test@personapass.me"
          />
        </div>
        <button 
          onClick={setupTOTP}
          disabled={loading}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
        >
          {loading ? 'Setting up...' : 'Setup TOTP'}
        </button>
        
        {totpSetup && (
          <div className={`mt-4 p-3 rounded ${totpSetup.success ? 'bg-green-50' : 'bg-red-50'}`}>
            {totpSetup.success ? (
              <div>
                <p className="text-green-800 font-medium">TOTP Setup Successful!</p>
                {totpSetup.data && (
                  <div className="mt-2">
                    <p className="text-sm text-green-700 mb-2">
                      Scan this QR code with Google Authenticator:
                    </p>
                    <img 
                      src={totpSetup.data.qrCode} 
                      alt="TOTP QR Code" 
                      className="border rounded"
                    />
                    <p className="text-xs text-gray-600 mt-2">
                      Secret: {totpSetup.data.secret}
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-red-800">{totpSetup.message}</p>
            )}
          </div>
        )}
      </div>

      {/* Account Creation */}
      <div className="mb-8 p-4 border rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Step 2: Create Account</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email:
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password:
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              TOTP Code:
            </label>
            <input
              type="text"
              value={totpCode}
              onChange={(e) => setTotpCode(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="123456"
            />
          </div>
        </div>
        <button 
          onClick={createAccount}
          disabled={loading || !totpSetup?.success}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Creating Account...' : 'Create Account'}
        </button>
        
        {accountResult && (
          <div className={`mt-4 p-3 rounded ${accountResult.success ? 'bg-green-50' : 'bg-red-50'}`}>
            {accountResult.success ? (
              <div>
                <p className="text-green-800 font-medium">Account Created Successfully!</p>
                {accountResult.data && (
                  <div className="mt-2 text-sm text-green-700">
                    <p><strong>User ID:</strong> {accountResult.data.id}</p>
                    <p><strong>Email:</strong> {accountResult.data.email}</p>
                    <p><strong>DID:</strong> {accountResult.data.did}</p>
                    <p><strong>Wallet Address:</strong> {accountResult.data.walletAddress}</p>
                    <p><strong>KYC Status:</strong> {accountResult.data.kycStatus}</p>
                    <p><strong>TOTP Setup:</strong> {accountResult.data.totpSetup ? 'Yes' : 'No'}</p>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-red-800">{accountResult.message}</p>
            )}
          </div>
        )}
      </div>

      <div className="text-sm text-gray-600">
        <p><strong>Note:</strong> This is a test page for verifying backend connectivity and authentication flow.</p>
        <p>Backend API: http://localhost:3002</p>
        <p>PersonaChain: http://44.201.59.57:26657 (operational)</p>
      </div>
    </div>
  )
}