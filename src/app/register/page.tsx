'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import { 
  ShieldCheckIcon, 
  UserIcon, 
  LockClosedIcon, 
  KeyIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline'
import Link from 'next/link'

// Validation Schema
const registrationSchema = z.object({
  // Personal Information
  email: z.string().email('Please enter a valid email address'),
  password: z.string()
    .min(12, 'Password must be at least 12 characters')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, 
      'Password must contain uppercase, lowercase, number and special character'),
  confirmPassword: z.string(),
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  
  // Security
  totpCode: z.string().optional(),
  
  // Legal
  acceptTerms: z.boolean().refine(val => val === true, 'You must accept the terms of service'),
  acceptPrivacy: z.boolean().refine(val => val === true, 'You must accept the privacy policy'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

type RegistrationData = z.infer<typeof registrationSchema>

const steps = [
  { id: 'personal', title: 'Personal Info', icon: UserIcon, description: 'Basic account information' },
  { id: 'security', title: 'Security Setup', icon: LockClosedIcon, description: 'Password and 2FA configuration' },
  { id: 'blockchain', title: 'Digital Identity', icon: KeyIcon, description: 'DID and wallet generation' },
  { id: 'complete', title: 'Complete', icon: CheckCircleIcon, description: 'Account verification' }
]

interface RegistrationState {
  did?: string
  walletAddress?: string
  totpSecret?: string
  qrCodeUrl?: string
  backupCodes?: string[]
  userData?: {
    firstName: string
    lastName: string
    email?: string
    createdAt: string
    verified: boolean
  }
  blockchain?: {
    network: string
    status: string
    blockHeight?: number
    transactionHash?: string
    confirmations?: number
    features: string[]
  }
  isExisting?: boolean
}

export default function RegisterPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [registrationState, setRegistrationState] = useState<RegistrationState>({})
  const [backupAcknowledged, setBackupAcknowledged] = useState(false)
  const [secretCopied, setSecretCopied] = useState(false)

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    formState: { errors, isValid }
  } = useForm<RegistrationData>({
    resolver: zodResolver(registrationSchema),
    mode: 'onChange'
  })

  const currentStepData = steps[currentStep]
  const isLastStep = currentStep === steps.length - 1

  // Form field validation for current step
  const getStepFields = (stepIndex: number): (keyof RegistrationData)[] => {
    switch (stepIndex) {
      case 0: return ['firstName', 'lastName', 'email', 'dateOfBirth']
      case 1: return ['password', 'confirmPassword', 'acceptTerms', 'acceptPrivacy']
      case 2: return []
      case 3: return ['totpCode']
      default: return []
    }
  }

  const validateCurrentStep = async () => {
    const fieldsToValidate = getStepFields(currentStep)
    if (fieldsToValidate.length === 0) return true
    
    const result = await trigger(fieldsToValidate)
    return result
  }

  const nextStep = async () => {
    const isStepValid = await validateCurrentStep()
    if (!isStepValid) return

    if (currentStep < steps.length - 1) {
      // Handle step-specific logic
      if (currentStep === 1) {
        // Generate TOTP secret after security setup
        await generateTotpSecret()
        setCurrentStep(prev => prev + 1)
      } else if (currentStep === 2) {
        // Check if DID already exists in state
        if (registrationState.did) {
          console.log('🎯 DID already exists, advancing to next step')
          setCurrentStep(prev => prev + 1)
        } else {
          console.log('🎯 No DID found, generating new DID')
          await generateDidAndWallet()
        }
      } else {
        setCurrentStep(prev => prev + 1)
      }
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const generateTotpSecret = async () => {
    try {
      setIsLoading(true)
      const email = watch('email')
      
      // Use backend endpoint directly
      const apiUrl = '/api'
      const fullUrl = `${apiUrl}/auth/totp-setup`
      
      console.log('🔐 Generating TOTP secret for:', email?.substring(0, 3) + '***')
      console.log('🌐 TOTP endpoint:', fullUrl)
      
      const response = await fetch(fullUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })

      if (!response.ok) throw new Error('Failed to generate TOTP secret')
      
      const data = await response.json()
      console.log('🎯 TOTP response:', data.success ? 'Success' : 'Failed')
      
      if (data.success) {
        setRegistrationState(prev => ({
          ...prev,
          totpSecret: data.data.secret,
          qrCodeUrl: data.data.qrCode, // Backend returns 'qrCode', not 'qrCodeUrl'
          backupCodes: data.data.backupCodes || []
        }))
        console.log('✅ TOTP secret generated successfully')
      } else {
        throw new Error(data.message || 'TOTP setup failed')
      }
    } catch (err) {
      console.error('❌ TOTP setup error:', err)
      setError(`Failed to setup two-factor authentication: ${err.message}`)
    } finally {
      setIsLoading(false)
    }
  }

  const generateDidAndWallet = async () => {
    try {
      console.log('🚀 Starting DID generation...')
      setIsLoading(true)
      setError(null)
      
      const firstName = watch('firstName')
      const lastName = watch('lastName')
      const email = watch('email')
      
      console.log('📋 User data:', { firstName, lastName, email: email?.substring(0, 3) + '***' })
      
      const apiUrl = '/api'
      const fullUrl = `${apiUrl}/identity/create-did`
      
      console.log('🌐 Making request to:', fullUrl)
      
      const requestPayload = {
        firstName,
        lastName,
        email
      }
      
      console.log('📦 Request payload:', { ...requestPayload, email: email?.substring(0, 3) + '***' })
      
      const response = await fetch(fullUrl, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(requestPayload)
      })

      console.log('📡 Response status:', response.status, response.statusText)
      console.log('📡 Response headers:', Object.fromEntries(response.headers.entries()))

      if (!response.ok) {
        console.error('❌ Response not OK:', response.status, response.statusText)
        const errorText = await response.text()
        console.error('❌ Error response body:', errorText)
        throw new Error(`API Error ${response.status}: ${response.statusText}`)
      }
      
      const data = await response.json()
      console.log('✅ Response data:', {
        success: data.success,
        did: data.did?.substring(0, 20) + '...',
        message: data.message,
        isExisting: data.isExisting
      })
      
      if (data.success) {
        console.log('🎯 Setting registration state...')
        setRegistrationState(prev => {
          const newState = {
            ...prev,
            did: data.did,
            walletAddress: data.walletAddress,
            userData: data.userData,
            blockchain: data.blockchain,
            isExisting: data.isExisting
          }
          console.log('✅ DID generation completed successfully!')
          console.log('🎯 DID:', data.did?.substring(0, 25) + '...')
          console.log('🎯 State updated with new DID')
          return newState
        })
      } else {
        console.error('❌ API returned success=false:', data.message)
        throw new Error(data.message || 'API returned unsuccessful response')
      }
      
    } catch (err) {
      console.error('💥 DID generation failed:', err)
      console.error('Stack trace:', err.stack)
      setError(`Failed to generate digital identity: ${err.message}`)
    } finally {
      console.log('🏁 Setting loading to false')
      setIsLoading(false)
    }
  }

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text)
      if (type === 'secret') {
        setSecretCopied(true)
        setTimeout(() => setSecretCopied(false), 2000)
      }
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const onSubmit = async (data: RegistrationData) => {
    try {
      setIsLoading(true)
      setError(null)

      console.log('🎯 Final registration submission:', {
        email: data.email?.substring(0, 3) + '***',
        hasPassword: !!data.password,
        hasTotpCode: !!data.totpCode,
        totpCodeLength: data.totpCode?.length || 0
      })

      const registrationPayload = {
        email: data.email,
        password: data.password,
        totpCode: data.totpCode
      }

      // Use backend endpoint for final account creation
      const apiUrl = '/api'
      const fullUrl = `${apiUrl}/auth/create-account`
      
      console.log('🎯 Final registration to:', fullUrl)
      console.log('📦 Registration payload:', { ...registrationPayload, password: '***', totpCode: '***' })

      const response = await fetch(fullUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registrationPayload)
      })

      const result = await response.json()
      
      if (!response.ok) {
        throw new Error(result.message || 'Registration failed')
      }

      if (result.success) {
        console.log('✅ Registration successful:', result.message)
        // Success - redirect to login or dashboard
        window.location.href = '/login?registered=true'
      } else {
        throw new Error(result.message || 'Registration failed')
      }
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex flex-col">
      {/* Header */}
      <header className="border-b border-gray-800 bg-black/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/" className="flex items-center space-x-2">
            <ShieldCheckIcon className="h-8 w-8 text-cyan-400" />
            <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              PersonaPass
            </span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="w-full max-w-4xl">
          {/* Progress Stepper */}
          <div className="mb-12">
            <div className="flex items-center justify-center space-x-4 sm:space-x-8">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                        index <= currentStep
                          ? 'bg-gradient-to-r from-cyan-500 to-purple-600 border-cyan-400 text-white'
                          : 'border-gray-600 text-gray-400 bg-gray-800'
                      }`}
                    >
                      <step.icon className="h-6 w-6" />
                    </div>
                    <div className="text-center mt-2">
                      <div className={`text-sm font-medium ${
                        index <= currentStep ? 'text-white' : 'text-gray-400'
                      }`}>
                        {step.title}
                      </div>
                      <div className="text-xs text-gray-500 hidden sm:block">
                        {step.description}
                      </div>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-8 sm:w-16 h-0.5 mx-2 sm:mx-4 transition-all duration-300 ${
                      index < currentStep ? 'bg-gradient-to-r from-cyan-400 to-purple-400' : 'bg-gray-600'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Error Alert */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-red-900/50 border border-red-700 rounded-xl flex items-center space-x-3"
            >
              <ExclamationTriangleIcon className="h-5 w-5 text-red-400 flex-shrink-0" />
              <span className="text-red-300 text-sm">{error}</span>
            </motion.div>
          )}

          {/* Registration Form */}
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 lg:p-12"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* Step Content */}
              <div className="text-center mb-8">
                <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">
                  {currentStepData?.title || 'Loading...'}
                </h1>
                <p className="text-gray-300">
                  {currentStepData?.description || 'Please wait...'}
                </p>
              </div>

              {/* Step 1: Personal Information */}
              {currentStep === 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      First Name *
                    </label>
                    <input
                      {...register('firstName')}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-colors duration-200"
                      placeholder="Enter your first name"
                    />
                    {errors.firstName && (
                      <p className="text-red-400 text-sm mt-1">{errors.firstName.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Last Name *
                    </label>
                    <input
                      {...register('lastName')}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-colors duration-200"
                      placeholder="Enter your last name"
                    />
                    {errors.lastName && (
                      <p className="text-red-400 text-sm mt-1">{errors.lastName.message}</p>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address *
                    </label>
                    <input
                      {...register('email')}
                      type="email"
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-colors duration-200"
                      placeholder="Enter your email address"
                    />
                    {errors.email && (
                      <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Date of Birth *
                    </label>
                    <input
                      {...register('dateOfBirth')}
                      type="date"
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-colors duration-200"
                    />
                    {errors.dateOfBirth && (
                      <p className="text-red-400 text-sm mt-1">{errors.dateOfBirth.message}</p>
                    )}
                  </div>
                </div>
              )}

              {/* Step 2: Security Setup */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Password *
                    </label>
                    <input
                      {...register('password')}
                      type="password"
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-colors duration-200"
                      placeholder="Create a strong password"
                    />
                    {errors.password && (
                      <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>
                    )}
                    <p className="text-gray-400 text-xs mt-1">
                      Must be 12+ characters with uppercase, lowercase, number, and special character
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Confirm Password *
                    </label>
                    <input
                      {...register('confirmPassword')}
                      type="password"
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-colors duration-200"
                      placeholder="Confirm your password"
                    />
                    {errors.confirmPassword && (
                      <p className="text-red-400 text-sm mt-1">{errors.confirmPassword.message}</p>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <input
                        {...register('acceptTerms')}
                        type="checkbox"
                        className="mt-1 h-4 w-4 bg-gray-800 border-gray-600 rounded focus:ring-cyan-400 focus:ring-2 text-cyan-500"
                      />
                      <label className="text-sm text-gray-300">
                        I accept the{' '}
                        <a href="/terms" className="text-cyan-400 hover:text-cyan-300 underline">
                          Terms of Service
                        </a>
                        {' '}*
                      </label>
                    </div>
                    {errors.acceptTerms && (
                      <p className="text-red-400 text-sm">{errors.acceptTerms.message}</p>
                    )}

                    <div className="flex items-start space-x-3">
                      <input
                        {...register('acceptPrivacy')}
                        type="checkbox"
                        className="mt-1 h-4 w-4 bg-gray-800 border-gray-600 rounded focus:ring-cyan-400 focus:ring-2 text-cyan-500"
                      />
                      <label className="text-sm text-gray-300">
                        I accept the{' '}
                        <a href="/privacy" className="text-cyan-400 hover:text-cyan-300 underline">
                          Privacy Policy
                        </a>
                        {' '}*
                      </label>
                    </div>
                    {errors.acceptPrivacy && (
                      <p className="text-red-400 text-sm">{errors.acceptPrivacy.message}</p>
                    )}
                  </div>
                </div>
              )}

              {/* Step 3: Blockchain Identity Generation */}
              {currentStep === 2 && (
                <div className="text-center space-y-6">
                  <div className="bg-gradient-to-r from-cyan-900/20 to-purple-900/20 border border-cyan-800/30 rounded-xl p-8">
                    <div className="inline-flex p-4 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 mb-4">
                      <KeyIcon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-4">
                      {registrationState.did ? 'Your Digital Identity' : 'Generating Your Digital Identity'}
                    </h3>
                    <p className="text-gray-300 mb-6">
                      {registrationState.did 
                        ? 'Your Decentralized Identifier (DID) and secure wallet have been created on PersonaChain blockchain.'
                        : 'We\'re creating your Decentralized Identifier (DID) and secure wallet on PersonaChain. This process is cryptographically secure and gives you complete control over your digital identity.'
                      }
                    </p>
                    
                    {registrationState.did && registrationState.walletAddress ? (
                      <div className="space-y-4">
                        {registrationState.isExisting && (
                          <div className="bg-blue-900/20 border border-blue-700/30 rounded-lg p-3 mb-4">
                            <div className="text-blue-400 text-sm font-medium">
                              ℹ️ Existing Identity Retrieved
                            </div>
                            <div className="text-blue-300 text-xs mt-1">
                              Your identity was already registered. Same person = same DID.
                            </div>
                          </div>
                        )}
                        
                        <div className="bg-gray-800/50 rounded-lg p-4 text-left">
                          <div className="text-sm text-gray-400 mb-1">Your DID (Decentralized Identifier)</div>
                          <div className="text-cyan-400 font-mono text-sm break-all">
                            {registrationState.did}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            🔗 Registered on PersonaChain blockchain
                          </div>
                        </div>
                        
                        <div className="bg-gray-800/50 rounded-lg p-4 text-left">
                          <div className="text-sm text-gray-400 mb-1">Wallet Address</div>
                          <div className="text-purple-400 font-mono text-sm break-all">
                            {registrationState.walletAddress}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            💰 PersonaChain compatible address
                          </div>
                        </div>

                        {registrationState.userData && (
                          <div className="bg-gray-800/50 rounded-lg p-4 text-left">
                            <div className="text-sm text-gray-400 mb-2">Attached Identity Data</div>
                            <div className="text-xs space-y-1">
                              <div><span className="text-gray-500">Name:</span> <span className="text-white">{registrationState.userData.firstName} {registrationState.userData.lastName}</span></div>
                              {registrationState.userData.email && (
                                <div><span className="text-gray-500">Email:</span> <span className="text-white">{registrationState.userData.email}</span></div>
                              )}
                              <div><span className="text-gray-500">Created:</span> <span className="text-white">{new Date(registrationState.userData.createdAt).toLocaleDateString()}</span></div>
                            </div>
                          </div>
                        )}

                        {registrationState.blockchain && (
                          <div className="bg-gray-800/50 rounded-lg p-4 text-left">
                            <div className="text-sm text-gray-400 mb-2">Blockchain Information</div>
                            <div className="text-xs space-y-1">
                              <div><span className="text-gray-500">Network:</span> <span className="text-green-400">{registrationState.blockchain.network}</span></div>
                              {registrationState.blockchain.blockHeight && (
                                <div><span className="text-gray-500">Block Height:</span> <span className="text-green-400">{registrationState.blockchain.blockHeight.toLocaleString()}</span></div>
                              )}
                              {registrationState.blockchain.transactionHash && (
                                <div><span className="text-gray-500">Transaction:</span> <span className="text-green-400 font-mono text-xs break-all">{registrationState.blockchain.transactionHash}</span></div>
                              )}
                              {registrationState.blockchain.confirmations && (
                                <div><span className="text-gray-500">Confirmations:</span> <span className="text-green-400">{registrationState.blockchain.confirmations}/6</span></div>
                              )}
                            </div>
                          </div>
                        )}
                        
                        <div className="flex items-center justify-center text-green-400 mt-6">
                          <CheckCircleIcon className="h-5 w-5 mr-2" />
                          Digital identity {registrationState.isExisting ? 'retrieved' : 'created'} successfully!
                        </div>
                        
                        <div className="text-xs text-gray-400 mt-4 bg-gray-900/50 rounded-lg p-3">
                          <div className="font-medium text-white mb-1">🔒 Your identity is now:</div>
                          <div>✅ Cryptographically secured on PersonaChain</div>
                          <div>✅ Linked to your personal information</div>
                          <div>✅ Under your complete control</div>
                          <div>✅ Persistent across sessions</div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400"></div>
                        <span className="ml-3 text-gray-300">Generating identity...</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Step 4: Two-Factor Authentication Setup */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-white mb-4">
                      🔐 Secure Your Account
                    </h3>
                    <p className="text-gray-300 mb-6">
                      Complete your two-factor authentication setup and save your recovery information.
                    </p>
                  </div>

                  {/* QR Code and Secret */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* QR Code Section */}
                    <div className="bg-gray-800/50 rounded-xl p-6">
                      <h4 className="font-semibold text-white mb-4 text-center">📱 Scan QR Code</h4>
                      <div className="text-center">
                        {registrationState.qrCodeUrl ? (
                          <div className="bg-white p-4 rounded-xl inline-block mb-4">
                            <img 
                              src={registrationState.qrCodeUrl} 
                              alt="TOTP QR Code" 
                              className="w-40 h-40"
                            />
                          </div>
                        ) : (
                          <div className="w-40 h-40 bg-gray-700 rounded-xl flex items-center justify-center mx-auto mb-4">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400"></div>
                          </div>
                        )}
                        <p className="text-sm text-gray-400">
                          Scan with Google Authenticator
                        </p>
                      </div>
                    </div>

                    {/* Manual Entry Section */}
                    <div className="bg-gray-800/50 rounded-xl p-6">
                      <h4 className="font-semibold text-white mb-4 text-center">🔑 Manual Entry</h4>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-2">
                            Secret Key (backup)
                          </label>
                          <div className="flex items-center space-x-2">
                            <input
                              type="text"
                              value={registrationState.totpSecret || ''}
                              readOnly
                              className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white font-mono text-sm"
                            />
                            <button
                              type="button"
                              onClick={() => copyToClipboard(registrationState.totpSecret || '', 'secret')}
                              className="px-3 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg text-sm transition-colors"
                            >
                              {secretCopied ? '✓' : 'Copy'}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Backup Codes */}
                  {registrationState.backupCodes && registrationState.backupCodes.length > 0 && (
                    <div className="bg-red-900/20 border border-red-700/50 rounded-xl p-6">
                      <div className="flex items-center mb-4">
                        <ExclamationTriangleIcon className="h-6 w-6 text-red-400 mr-3" />
                        <h4 className="font-semibold text-white">⚠️ Emergency Recovery Codes</h4>
                      </div>
                      <p className="text-red-200 text-sm mb-4">
                        Save these backup codes in a secure location. You can use them to access your account if you lose your authenticator device.
                      </p>
                      
                      <div className="grid grid-cols-2 gap-2 mb-4">
                        {registrationState.backupCodes.map((code, index) => (
                          <div key={index} className="flex items-center justify-between bg-gray-800/50 px-3 py-2 rounded-lg">
                            <span className="font-mono text-sm text-white">{code}</span>
                            <button
                              type="button"
                              onClick={() => copyToClipboard(code, 'backup')}
                              className="text-xs text-cyan-400 hover:text-cyan-300 ml-2"
                            >
                              Copy
                            </button>
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center space-x-3 mb-4">
                        <input
                          type="checkbox"
                          id="backupAcknowledged"
                          checked={backupAcknowledged}
                          onChange={(e) => setBackupAcknowledged(e.target.checked)}
                          className="h-4 w-4 bg-gray-800 border-gray-600 rounded focus:ring-cyan-400 focus:ring-2 text-cyan-500"
                        />
                        <label htmlFor="backupAcknowledged" className="text-sm text-red-200 select-none">
                          ✅ I have saved my backup codes in a secure location
                        </label>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          const codesText = registrationState.backupCodes?.join('\n') || ''
                          copyToClipboard(`PersonaPass Recovery Codes:\n${codesText}\n\nKeep these codes secure and do not share them.`, 'all')
                        }}
                        className="w-full px-4 py-2 bg-red-700 hover:bg-red-600 text-white rounded-lg text-sm transition-colors"
                      >
                        📋 Copy All Recovery Codes
                      </button>
                    </div>
                  )}

                  {/* Authentication Code Input */}
                  <div className="bg-gray-800/50 rounded-xl p-6">
                    <h4 className="font-semibold text-white mb-4 text-center">🔐 Enter Authentication Code</h4>
                    <div className="max-w-sm mx-auto">
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        6-Digit Code from Authenticator *
                      </label>
                      <input
                        {...register('totpCode')}
                        type="text"
                        maxLength={6}
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-colors duration-200 text-center font-mono text-lg"
                        placeholder="000000"
                      />
                      {errors.totpCode && (
                        <p className="text-red-400 text-sm mt-1">{errors.totpCode.message}</p>
                      )}
                      <p className="text-xs text-gray-400 mt-2 text-center">
                        Enter the current code from your Google Authenticator app
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex flex-col sm:flex-row justify-between gap-4 pt-8">
                <button
                  type="button"
                  onClick={prevStep}
                  disabled={currentStep === 0}
                  className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                    currentStep === 0
                      ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  Previous
                </button>

                <div className="flex space-x-3">
                  {!isLastStep ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      disabled={isLoading}
                      className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold rounded-xl hover:from-cyan-600 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                    >
                      {isLoading ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Processing...
                        </>
                      ) : (
                        currentStep === 2 && registrationState.did
                          ? 'Continue to Authentication'
                          : currentStep === 2
                            ? 'Generate Digital Identity'
                            : 'Continue'
                      )}
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isLoading || !watch('totpCode') || watch('totpCode')?.length !== 6}
                      className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                    >
                      {isLoading ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Creating Account...
                        </>
                      ) : (
                        'Complete Registration'
                      )}
                    </button>
                  )}
                </div>
              </div>
            </form>
          </motion.div>

          {/* Additional Information */}
          <div className="mt-8 text-center">
            <p className="text-gray-400 text-sm">
              Already have an account?{' '}
              <Link href="/login" className="text-cyan-400 hover:text-cyan-300 underline">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}