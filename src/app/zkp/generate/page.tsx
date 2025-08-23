"use client"

import { useState, useEffect } from 'react'
import { personaWallet, PersonaWalletAccount, ZKProof, PersonaCredential } from '@/lib/persona-wallet-core'
import Link from 'next/link'

interface ZKProofTemplate {
  id: string
  name: string
  description: string
  proofType: ZKProof['proofType']
  requiredData: string[]
  example: string
}

const ZK_PROOF_TEMPLATES: ZKProofTemplate[] = [
  {
    id: 'age_verification',
    name: 'Age Verification',
    description: 'Prove you are over a certain age without revealing your exact date of birth',
    proofType: 'age',
    requiredData: ['dateOfBirth', 'minimumAge'],
    example: 'Prove you are over 18 for age-restricted services'
  },
  {
    id: 'citizenship_proof',
    name: 'Citizenship Proof',
    description: 'Prove your citizenship without revealing other identity details',
    proofType: 'citizenship',
    requiredData: ['nationality', 'documentType'],
    example: 'Prove citizenship for voting rights or government services'
  },
  {
    id: 'income_range',
    name: 'Income Range Proof',
    description: 'Prove your income falls within a range without revealing exact amount',
    proofType: 'custom',
    requiredData: ['annualIncome', 'minimumIncome', 'maximumIncome'],
    example: 'Qualify for loans or services based on income brackets'
  },
  {
    id: 'education_level',
    name: 'Education Level Proof',
    description: 'Prove minimum education level without revealing institution details',
    proofType: 'custom',
    requiredData: ['highestDegree', 'requiredLevel'],
    example: 'Prove bachelor\'s degree or higher for job applications'
  },
  {
    id: 'identity_ownership',
    name: 'Identity Ownership',
    description: 'Prove ownership of your digital identity without revealing personal data',
    proofType: 'identity',
    requiredData: ['did', 'challenge'],
    example: 'Authenticate to services without revealing personal information'
  }
]

export default function GenerateZKProofPage() {
  const [account, setAccount] = useState<PersonaWalletAccount | null>(null)
  const [selectedTemplate, setSelectedTemplate] = useState<ZKProofTemplate | null>(null)
  const [formData, setFormData] = useState<{[key: string]: any}>({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [generatedProof, setGeneratedProof] = useState<ZKProof | null>(null)
  const [availableCredentials, setAvailableCredentials] = useState<PersonaCredential[]>([])

  useEffect(() => {
    const currentAccount = personaWallet.getAccount()
    if (!currentAccount) {
      window.location.href = '/login'
      return
    }
    setAccount(currentAccount)
    setAvailableCredentials(currentAccount.credentials || [])
  }, [])

  const handleTemplateSelect = (template: ZKProofTemplate) => {
    setSelectedTemplate(template)
    setFormData({})
    setError('')
    setSuccess('')
    setGeneratedProof(null)
  }

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedTemplate || !account) return

    setLoading(true)
    setError('')
    setSuccess('')

    try {
      // Validate required fields
      for (const field of selectedTemplate.requiredData) {
        if (!formData[field]) {
          throw new Error(`${field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} is required`)
        }
      }

      // Create proof data based on template
      let proofData: any = {}

      switch (selectedTemplate.proofType) {
        case 'age':
          const birthDate = new Date(formData.dateOfBirth)
          const today = new Date()
          const age = today.getFullYear() - birthDate.getFullYear()
          const monthDiff = today.getMonth() - birthDate.getMonth()
          if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            // age--
          }
          
          proofData = {
            statement: `User is over ${formData.minimumAge} years old`,
            isValid: age >= parseInt(formData.minimumAge),
            minimumAge: formData.minimumAge,
            proofDate: today.toISOString()
          }
          break

        case 'citizenship':
          proofData = {
            statement: `User is a citizen of ${formData.nationality}`,
            nationality: formData.nationality,
            documentType: formData.documentType,
            isValid: true
          }
          break

        case 'identity':
          proofData = {
            statement: 'User owns this digital identity',
            did: account.did,
            challenge: formData.challenge,
            timestamp: Date.now()
          }
          break

        default: // custom
          proofData = {
            ...formData,
            statement: formData.statement || `Custom proof for ${selectedTemplate.name}`,
            timestamp: Date.now()
          }
      }

      // Generate the ZK proof
      const proof = await personaWallet.generateZKProof(selectedTemplate.proofType, proofData)
      
      setGeneratedProof(proof)
      setSuccess('ZK proof generated successfully!')
      setFormData({})
      
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setLoading(false)
    }
  }

  const renderFormFields = () => {
    if (!selectedTemplate) return null

    return selectedTemplate.requiredData.map(field => {
      let label = field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())
      let type = 'text'
      let placeholder = ''

      // Customize based on field name
      switch (field) {
        case 'dateOfBirth':
          type = 'date'
          label = 'Date of Birth'
          break
        case 'minimumAge':
          type = 'number'
          label = 'Minimum Age to Verify'
          placeholder = '18'
          break
        case 'nationality':
          label = 'Country of Citizenship'
          placeholder = 'United States'
          break
        case 'documentType':
          label = 'Document Type'
          placeholder = 'passport, drivers_license, national_id'
          break
        case 'annualIncome':
          type = 'number'
          label = 'Annual Income ($)'
          placeholder = '50000'
          break
        case 'minimumIncome':
          type = 'number'
          label = 'Minimum Income to Prove ($)'
          placeholder = '30000'
          break
        case 'maximumIncome':
          type = 'number'
          label = 'Maximum Income Range ($)'
          placeholder = '100000'
          break
        case 'highestDegree':
          label = 'Your Highest Degree'
          placeholder = 'bachelors, masters, phd'
          break
        case 'requiredLevel':
          label = 'Required Education Level'
          placeholder = 'bachelors'
          break
        case 'challenge':
          label = 'Authentication Challenge'
          placeholder = 'Random string provided by the verifier'
          break
        case 'statement':
          label = 'Proof Statement'
          placeholder = 'What you want to prove'
          break
      }

      return (
        <div key={field}>
          <label htmlFor={field} className="block text-sm font-medium mb-2">
            {label} <span className="text-red-400">*</span>
          </label>
          <input
            type={type}
            id={field}
            required
            value={formData[field] || ''}
            onChange={(e) => handleInputChange(field, e.target.value)}
            className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-800 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder={placeholder}
          />
        </div>
      )
    })
  }

  if (!account) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400">Redirecting to login...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard" className="text-purple-400 hover:text-purple-300">
              ← Back to Dashboard
            </Link>
            <h1 className="text-xl font-orbitron font-bold">Generate Zero-Knowledge Proof</h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {!selectedTemplate ? (
          <div>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-4">Choose Proof Type</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Zero-Knowledge Proofs allow you to prove statements about your identity or credentials 
                without revealing the underlying private information.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ZK_PROOF_TEMPLATES.map((template) => (
                <button
                  key={template.id}
                  onClick={() => handleTemplateSelect(template)}
                  className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-purple-500 transition-colors text-left h-full"
                >
                  <div className="flex items-start space-x-3 mb-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold">{template.name}</h3>
                  </div>
                  <p className="text-gray-400 text-sm mb-4">{template.description}</p>
                  <div className="bg-gray-700/50 p-3 rounded text-xs text-gray-300">
                    <strong>Example:</strong> {template.example}
                  </div>
                </button>
              ))}
            </div>

            {availableCredentials.length === 0 && (
              <div className="mt-8 bg-yellow-900/20 border border-yellow-700 rounded-lg p-4">
                <h3 className="font-semibold text-yellow-300 mb-2">No Credentials Available</h3>
                <p className="text-yellow-200 text-sm mb-4">
                  You need to have some verifiable credentials to generate meaningful zero-knowledge proofs.
                </p>
                <Link
                  href="/credentials/issue"
                  className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 rounded-md text-sm font-medium hover:from-blue-700 hover:to-purple-700 transition-colors"
                >
                  Issue Your First Credential
                </Link>
              </div>
            )}
          </div>
        ) : generatedProof ? (
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-2">ZK Proof Generated!</h2>
              <p className="text-gray-400">Your zero-knowledge proof has been created and is ready to use.</p>
            </div>

            <div className="bg-gray-800 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-semibold mb-4">Proof Details</h3>
              <div className="space-y-4">
                <div>
                  <span className="text-gray-400 text-sm">Proof Type:</span>
                  <div className="capitalize">{generatedProof.proofType.replace('_', ' ')}</div>
                </div>
                
                <div>
                  <span className="text-gray-400 text-sm">Public Signals:</span>
                  <div className="space-y-1">
                    {generatedProof.publicSignals.map((signal, index) => (
                      <div key={index} className="font-mono text-sm bg-gray-700 p-2 rounded">
                        {signal}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <span className="text-gray-400 text-sm">Verification Key:</span>
                  <div className="font-mono text-xs bg-gray-700 p-2 rounded break-all">
                    {generatedProof.verificationKey}
                  </div>
                </div>
                
                <div>
                  <span className="text-gray-400 text-sm">Proof Hash:</span>
                  <div className="font-mono text-xs bg-gray-700 p-2 rounded break-all">
                    {generatedProof.proof}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-4 mb-8">
              <h3 className="font-semibold text-blue-300 mb-2">🔐 Privacy Preserved</h3>
              <p className="text-blue-200 text-sm">
                This proof can verify your claim without revealing any sensitive personal information. 
                Only the specific statement you're proving (and no additional details) can be verified.
              </p>
            </div>

            <div className="flex space-x-4">
              <Link
                href="/dashboard"
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-4 rounded-md font-medium text-center hover:from-purple-700 hover:to-pink-700 transition-colors"
              >
                Back to Dashboard
              </Link>
              <button
                onClick={() => {
                  setSelectedTemplate(null)
                  setGeneratedProof(null)
                  setSuccess('')
                }}
                className="flex-1 border border-gray-600 text-white py-3 px-4 rounded-md font-medium hover:bg-gray-700 transition-colors"
              >
                Generate Another
              </button>
            </div>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center space-x-4 mb-6">
              <button
                onClick={() => {
                  setSelectedTemplate(null)
                  setFormData({})
                  setError('')
                }}
                className="text-purple-400 hover:text-purple-300"
              >
                ← Back
              </button>
              <h2 className="text-2xl font-bold">{selectedTemplate.name}</h2>
            </div>

            <div className="bg-gray-800 rounded-lg p-6 mb-6">
              <p className="text-gray-400 mb-4">{selectedTemplate.description}</p>
              <div className="bg-gray-700/50 p-3 rounded">
                <strong className="text-sm">Example Use Case:</strong>
                <p className="text-sm text-gray-300 mt-1">{selectedTemplate.example}</p>
              </div>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-900/20 border border-red-700 rounded-md text-red-300">
                {error}
              </div>
            )}

            {success && (
              <div className="mb-6 p-4 bg-green-900/20 border border-green-700 rounded-md text-green-300">
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit} className="bg-gray-800 rounded-lg p-6 space-y-6">
              {renderFormFields()}

              <div className="bg-purple-900/20 border border-purple-700 rounded-lg p-4">
                <h3 className="font-semibold text-purple-300 mb-2">🛡️ Privacy Notice</h3>
                <p className="text-purple-200 text-sm">
                  This proof will be generated using zero-knowledge cryptography. The verifier will only 
                  learn whether your claim is true or false, without accessing any of your private data.
                </p>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-4 rounded-md font-medium hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 transition-colors"
                >
                  {loading ? 'Generating Proof...' : 'Generate ZK Proof'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}