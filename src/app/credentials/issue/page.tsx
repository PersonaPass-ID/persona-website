"use client"

import { useState, useEffect } from 'react'
import { personaWallet, PersonaWalletAccount, PersonaCredential } from '@/lib/persona-wallet-core'
import Link from 'next/link'

interface CredentialTemplate {
  id: string
  name: string
  description: string
  type: string[]
  schema: {
    [key: string]: {
      type: 'string' | 'number' | 'boolean' | 'date'
      label: string
      required: boolean
      placeholder?: string
    }
  }
}

const CREDENTIAL_TEMPLATES: CredentialTemplate[] = [
  {
    id: 'email',
    name: 'Email Verification',
    description: 'Verify ownership of an email address',
    type: ['EmailCredential'],
    schema: {
      email: {
        type: 'string',
        label: 'Email Address',
        required: true,
        placeholder: 'your@email.com'
      },
      verificationMethod: {
        type: 'string',
        label: 'Verification Method',
        required: true,
        placeholder: 'Email verification code'
      }
    }
  },
  {
    id: 'identity',
    name: 'Identity Document',
    description: 'Government issued identity verification',
    type: ['IdentityCredential'],
    schema: {
      fullName: {
        type: 'string',
        label: 'Full Name',
        required: true,
        placeholder: 'John Doe'
      },
      dateOfBirth: {
        type: 'date',
        label: 'Date of Birth',
        required: true
      },
      nationality: {
        type: 'string',
        label: 'Nationality',
        required: true,
        placeholder: 'US'
      },
      documentType: {
        type: 'string',
        label: 'Document Type',
        required: true,
        placeholder: 'passport, drivers_license, national_id'
      },
      documentNumber: {
        type: 'string',
        label: 'Document Number',
        required: true,
        placeholder: 'Document ID number'
      }
    }
  },
  {
    id: 'education',
    name: 'Education Certificate',
    description: 'Academic achievement or course completion',
    type: ['EducationCredential'],
    schema: {
      institutionName: {
        type: 'string',
        label: 'Institution Name',
        required: true,
        placeholder: 'University of Example'
      },
      degreeName: {
        type: 'string',
        label: 'Degree/Certificate Name',
        required: true,
        placeholder: 'Bachelor of Science'
      },
      fieldOfStudy: {
        type: 'string',
        label: 'Field of Study',
        required: true,
        placeholder: 'Computer Science'
      },
      graduationDate: {
        type: 'date',
        label: 'Graduation Date',
        required: true
      },
      gpa: {
        type: 'number',
        label: 'GPA (optional)',
        required: false,
        placeholder: '3.8'
      }
    }
  },
  {
    id: 'employment',
    name: 'Employment Verification',
    description: 'Current or past employment status',
    type: ['EmploymentCredential'],
    schema: {
      companyName: {
        type: 'string',
        label: 'Company Name',
        required: true,
        placeholder: 'Tech Corp Inc.'
      },
      position: {
        type: 'string',
        label: 'Job Title',
        required: true,
        placeholder: 'Software Engineer'
      },
      startDate: {
        type: 'date',
        label: 'Start Date',
        required: true
      },
      endDate: {
        type: 'date',
        label: 'End Date (leave blank if current)',
        required: false
      },
      salary: {
        type: 'number',
        label: 'Annual Salary (optional)',
        required: false,
        placeholder: '75000'
      }
    }
  },
  {
    id: 'custom',
    name: 'Custom Credential',
    description: 'Create a custom credential with your own fields',
    type: ['CustomCredential'],
    schema: {
      credentialName: {
        type: 'string',
        label: 'Credential Name',
        required: true,
        placeholder: 'My Custom Credential'
      },
      description: {
        type: 'string',
        label: 'Description',
        required: true,
        placeholder: 'Description of what this credential proves'
      },
      customData: {
        type: 'string',
        label: 'Custom JSON Data',
        required: true,
        placeholder: '{"key": "value", "attribute": "data"}'
      }
    }
  }
]

export default function IssueCredentialPage() {
  const [account, setAccount] = useState<PersonaWalletAccount | null>(null)
  const [selectedTemplate, setSelectedTemplate] = useState<CredentialTemplate | null>(null)
  const [formData, setFormData] = useState<{[key: string]: any}>({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [issuedCredential, setIssuedCredential] = useState<PersonaCredential | null>(null)

  useEffect(() => {
    const currentAccount = personaWallet.getAccount()
    if (!currentAccount) {
      window.location.href = '/login'
      return
    }
    setAccount(currentAccount)
  }, [])

  const handleTemplateSelect = (template: CredentialTemplate) => {
    setSelectedTemplate(template)
    setFormData({})
    setError('')
    setSuccess('')
    setIssuedCredential(null)
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
      for (const [field, config] of Object.entries(selectedTemplate.schema)) {
        if (config.required && !formData[field]) {
          throw new Error(`${config.label} is required`)
        }
      }

      // Process custom credential JSON
      if (selectedTemplate.id === 'custom' && formData.customData) {
        try {
          const parsedData = JSON.parse(formData.customData)
          formData.customData = parsedData
        } catch (err) {
          throw new Error('Invalid JSON format in custom data')
        }
      }

      // Create credential subject
      const credentialSubject = {
        ...formData,
        issuedBy: 'PersonaPass Self-Sovereign Identity',
        verificationDate: new Date().toISOString()
      }

      // Issue the credential
      const credential = await personaWallet.issueCredential(
        credentialSubject,
        selectedTemplate.type
      )

      setIssuedCredential(credential)
      setSuccess('Credential issued successfully!')
      
      // Reset form
      setFormData({})
      
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setLoading(false)
    }
  }

  const renderFormField = (field: string, config: any) => {
    const value = formData[field] || ''

    switch (config.type) {
      case 'date':
        return (
          <input
            type="date"
            id={field}
            required={config.required}
            value={value}
            onChange={(e) => handleInputChange(field, e.target.value)}
            className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-800 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        )

      case 'number':
        return (
          <input
            type="number"
            id={field}
            required={config.required}
            value={value}
            onChange={(e) => handleInputChange(field, parseFloat(e.target.value) || '')}
            className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-800 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder={config.placeholder}
          />
        )

      case 'boolean':
        return (
          <input
            type="checkbox"
            id={field}
            checked={value}
            onChange={(e) => handleInputChange(field, e.target.checked)}
            className="w-4 h-4 text-blue-600 bg-gray-800 border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
          />
        )

      default:
        if (field === 'customData') {
          return (
            <textarea
              id={field}
              required={config.required}
              value={value}
              onChange={(e) => handleInputChange(field, e.target.value)}
              className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-800 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
              placeholder={config.placeholder}
              rows={4}
            />
          )
        }
        
        return (
          <input
            type="text"
            id={field}
            required={config.required}
            value={value}
            onChange={(e) => handleInputChange(field, e.target.value)}
            className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-800 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder={config.placeholder}
          />
        )
    }
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
            <Link href="/dashboard" className="text-blue-400 hover:text-blue-300">
              ← Back to Dashboard
            </Link>
            <h1 className="text-xl font-orbitron font-bold">Issue Verifiable Credential</h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {!selectedTemplate ? (
          <div>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-4">Choose Credential Type</h2>
              <p className="text-gray-400">
                Select a credential template to issue a verifiable credential
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {CREDENTIAL_TEMPLATES.map((template) => (
                <button
                  key={template.id}
                  onClick={() => handleTemplateSelect(template)}
                  className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-blue-500 transition-colors text-left"
                >
                  <h3 className="text-lg font-semibold mb-2">{template.name}</h3>
                  <p className="text-gray-400 text-sm mb-4">{template.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {template.type.map((type) => (
                      <span
                        key={type}
                        className="inline-block px-2 py-1 bg-blue-900/20 text-blue-300 text-xs rounded border border-blue-700"
                      >
                        {type}
                      </span>
                    ))}
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : issuedCredential ? (
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto mb-4 bg-green-600 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-2">Credential Issued Successfully!</h2>
              <p className="text-gray-400">Your verifiable credential has been created and stored.</p>
            </div>

            <div className="bg-gray-800 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-semibold mb-4">Credential Details</h3>
              <div className="space-y-3">
                <div>
                  <span className="text-gray-400 text-sm">ID:</span>
                  <div className="font-mono text-sm break-all">{issuedCredential.id}</div>
                </div>
                <div>
                  <span className="text-gray-400 text-sm">Type:</span>
                  <div>{issuedCredential.type.join(', ')}</div>
                </div>
                <div>
                  <span className="text-gray-400 text-sm">Issued:</span>
                  <div>{new Date(issuedCredential.issuanceDate).toLocaleString()}</div>
                </div>
                <div>
                  <span className="text-gray-400 text-sm">Status:</span>
                  <div className="flex items-center space-x-2">
                    <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-900/20 text-green-400 border border-green-700">
                      ✓ Valid & Verified
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex space-x-4">
              <Link
                href="/dashboard"
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-md font-medium text-center hover:from-blue-700 hover:to-purple-700 transition-colors"
              >
                Back to Dashboard
              </Link>
              <button
                onClick={() => {
                  setSelectedTemplate(null)
                  setIssuedCredential(null)
                  setSuccess('')
                }}
                className="flex-1 border border-gray-600 text-white py-3 px-4 rounded-md font-medium hover:bg-gray-700 transition-colors"
              >
                Issue Another
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
                className="text-blue-400 hover:text-blue-300"
              >
                ← Back
              </button>
              <h2 className="text-2xl font-bold">Issue {selectedTemplate.name}</h2>
            </div>

            <div className="bg-gray-800 rounded-lg p-6 mb-6">
              <p className="text-gray-400 mb-4">{selectedTemplate.description}</p>
              <div className="flex flex-wrap gap-2">
                {selectedTemplate.type.map((type) => (
                  <span
                    key={type}
                    className="inline-block px-2 py-1 bg-blue-900/20 text-blue-300 text-xs rounded border border-blue-700"
                  >
                    {type}
                  </span>
                ))}
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
              {Object.entries(selectedTemplate.schema).map(([field, config]) => (
                <div key={field}>
                  <label htmlFor={field} className="block text-sm font-medium mb-2">
                    {config.label} {config.required && <span className="text-red-400">*</span>}
                  </label>
                  {renderFormField(field, config)}
                </div>
              ))}

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-md font-medium hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 transition-colors"
                >
                  {loading ? 'Issuing Credential...' : 'Issue Credential'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}