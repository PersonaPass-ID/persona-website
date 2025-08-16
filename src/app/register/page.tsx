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
}

export default function RegisterPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [registrationState, setRegistrationState] = useState<RegistrationState>({})

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
      } else if (currentStep === 2) {
        // Generate DID and wallet after blockchain step
        await generateDidAndWallet()
      }
      
      setCurrentStep(prev => prev + 1)
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
      
      const response = await fetch('/api/auth/totp-setup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })

      if (!response.ok) throw new Error('Failed to generate TOTP secret')
      
      const data = await response.json()
      setRegistrationState(prev => ({
        ...prev,
        totpSecret: data.secret,
        qrCodeUrl: data.qrCodeUrl
      }))
    } catch (err) {
      setError('Failed to setup two-factor authentication')
    } finally {
      setIsLoading(false)
    }
  }

  const generateDidAndWallet = async () => {
    try {
      setIsLoading(true)
      
      const response = await fetch('/api/blockchain/generate-identity', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: watch('email'),
          firstName: watch('firstName'),
          lastName: watch('lastName')
        })
      })

      if (!response.ok) throw new Error('Failed to generate digital identity')
      
      const data = await response.json()
      setRegistrationState(prev => ({
        ...prev,
        did: data.did,
        walletAddress: data.walletAddress
      }))
    } catch (err) {
      setError('Failed to generate digital identity')
    } finally {
      setIsLoading(false)
    }
  }

  const onSubmit = async (data: RegistrationData) => {
    try {
      setIsLoading(true)
      setError(null)

      const registrationPayload = {
        ...data,
        ...registrationState
      }

      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registrationPayload)
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Registration failed')
      }

      // Success - redirect to login or dashboard
      window.location.href = '/login?registered=true'
      
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
                  {currentStepData.title}
                </h1>
                <p className="text-gray-300">
                  {currentStepData.description}
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
                      Generating Your Digital Identity
                    </h3>
                    <p className="text-gray-300 mb-6">
                      We're creating your Decentralized Identifier (DID) and secure wallet on PersonaChain.
                      This process is cryptographically secure and gives you complete control over your digital identity.
                    </p>
                    
                    {registrationState.did && registrationState.walletAddress ? (
                      <div className="space-y-4">
                        <div className="bg-gray-800/50 rounded-lg p-4">
                          <div className="text-sm text-gray-400 mb-1">Your DID</div>
                          <div className="text-cyan-400 font-mono text-sm break-all">
                            {registrationState.did}
                          </div>
                        </div>
                        <div className="bg-gray-800/50 rounded-lg p-4">
                          <div className="text-sm text-gray-400 mb-1">Wallet Address</div>
                          <div className="text-purple-400 font-mono text-sm break-all">
                            {registrationState.walletAddress}
                          </div>
                        </div>
                        <div className="flex items-center justify-center text-green-400">
                          <CheckCircleIcon className="h-5 w-5 mr-2" />
                          Digital identity generated successfully!
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
                      Setup Two-Factor Authentication
                    </h3>
                    <p className="text-gray-300 mb-6">
                      Scan this QR code with Google Authenticator and enter the 6-digit code to complete your registration.
                    </p>
                    
                    {registrationState.qrCodeUrl ? (
                      <div className="bg-white p-4 rounded-xl inline-block mb-6">
                        <img 
                          src={registrationState.qrCodeUrl} 
                          alt="TOTP QR Code" 
                          className="w-48 h-48"
                        />
                      </div>
                    ) : (
                      <div className="w-48 h-48 bg-gray-800 rounded-xl flex items-center justify-center mx-auto mb-6">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400"></div>
                      </div>
                    )}

                    <div className="max-w-sm mx-auto">
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Authentication Code *
                      </label>
                      <input
                        {...register('totpCode')}
                        type="text"
                        maxLength={6}
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-colors duration-200 text-center font-mono text-lg"
                        placeholder="000000"
                      />
                      {errors.totpCode && (
                        <p className="text-red-400 text-sm mt-1">{errors.totpCode.message}</p>
                      )}
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
                        'Continue'
                      )}
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isLoading || !isValid}
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