// 🚀 STATE-OF-THE-ART ONBOARDING WIZARD
// Modern, accessible, mobile-first React component with animations

'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOnboarding } from '../../hooks/useOnboarding';
import type { OnboardingResult } from '../../lib/blockchain';

// Step Components
import WelcomeStep from './steps/WelcomeStep';
import AuthStep from './steps/AuthStep';
import KeysStep from './steps/KeysStep';
import ProfileStep from './steps/ProfileStep';
import PrivacyStep from './steps/PrivacyStep';
import CompleteStep from './steps/CompleteStep';

export interface OnboardingWizardProps {
  onComplete?: (result: OnboardingResult) => void;
  onError?: (error: string, step: string) => void;
  enableAnalytics?: boolean;
  theme?: 'light' | 'dark' | 'auto';
  className?: string;
}

const OnboardingWizard: React.FC<OnboardingWizardProps> = ({
  onComplete,
  onError,
  enableAnalytics = true,
  theme = 'auto',
  className = ''
}) => {
  const {
    currentStep,
    steps,
    loading,
    error,
    progress,
    isComplete,
    result,
    nextStep,
    prevStep,
    skipStep,
    canGoNext,
    canGoPrev,
    currentStepData,
    isFirstStep,
    isLastStep,
    userData,
    privacySettings,
    selectedAuth,
    authOptions,
    updateUserData,
    updatePrivacySettings,
    selectAuth,
    completeOnboarding,
    resetOnboarding,
    analytics
  } = useOnboarding(enableAnalytics, onComplete, onError);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    analytics.track('onboarding_wizard_loaded');
  }, [analytics]);

  if (!mounted) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="glass-card p-8 flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
          <p className="text-white/60 mt-4">Loading PersonaPass...</p>
        </div>
      </div>
    );
  }

  const stepComponents = {
    welcome: WelcomeStep,
    auth: AuthStep,
    keys: KeysStep,
    profile: ProfileStep,
    privacy: PrivacyStep,
    complete: CompleteStep
  };

  const CurrentStepComponent = stepComponents[currentStepData?.id as keyof typeof stepComponents];

  return (
    <div className={`min-h-screen bg-black relative overflow-hidden ${className}`}>
      {/* Epic Background Effects */}
      <div className="absolute inset-0">
        {/* Gradient Mesh */}
        <div className="absolute inset-0 gradient-mesh opacity-40" />
        
        {/* Animated Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(rgba(139, 92, 246, 0.3) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        {/* Floating Orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 0.8, 1.2],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-600/30 rounded-full blur-3xl"
        />
      </div>

      {/* Enhanced Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-2 bg-black/50 backdrop-blur-sm z-50">
        <motion.div
          className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 blur-sm" />
      </div>

      {/* Main Container */}
      <div className="relative z-10 container mx-auto px-4 py-12 max-w-5xl">
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-6">
            <motion.div 
              className="relative group"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center relative">
                <span className="text-white font-bold text-2xl">P</span>
                {/* Glow Effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500 to-blue-500 opacity-0 group-hover:opacity-50 blur-lg transition-opacity duration-300 -z-10" />
              </div>
            </motion.div>
            <div className="ml-4">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
                PersonaPass
              </h1>
              <p className="text-white/40 text-sm">Your Digital Identity Journey</p>
            </div>
          </div>
          
          {!isComplete && (
            <motion.div 
              className="inline-flex items-center px-6 py-3 rounded-full glass-card"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-3" />
              <span className="text-white/80 font-medium">Step {currentStep + 1} of {steps.length}</span>
              <span className="mx-3 text-white/30">•</span>
              <span className="text-white/60">{currentStepData?.title}</span>
            </motion.div>
          )}
        </motion.div>

        {/* Enhanced Step Indicators */}
        {!isComplete && (
          <motion.div 
            className="flex justify-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="glass-card px-8 py-4">
              <div className="flex items-center space-x-4">
                {steps.map((step, index) => (
                  <div key={step.id} className="flex items-center">
                    <motion.div
                      className={`relative w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${
                        step.completed 
                          ? 'bg-gradient-to-r from-green-500 to-emerald-500' 
                          : step.current
                          ? 'bg-gradient-to-r from-purple-500 to-blue-500'
                          : 'bg-white/10 border-2 border-white/20'
                      }`}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.1 }}
                    >
                      {step.completed ? (
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <span className="text-sm font-bold text-white">{index + 1}</span>
                      )}
                      
                      {/* Glow Effect for Current Step */}
                      {step.current && (
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 opacity-50 blur-lg animate-pulse -z-10" />
                      )}
                    </motion.div>
                    
                    {/* Connection Line */}
                    {index < steps.length - 1 && (
                      <motion.div
                        className={`w-12 h-0.5 mx-2 transition-all duration-500 ${
                          step.completed ? 'bg-gradient-to-r from-green-500 to-emerald-500' : 'bg-white/20'
                        }`}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: index * 0.1 + 0.2 }}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Enhanced Error Display */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className="mb-8 mx-auto max-w-2xl"
            >
              <div className="glass-card border border-red-500/20 bg-red-500/5">
                <div className="flex items-start p-6">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                      <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4 flex-1">
                    <h3 className="text-lg font-semibold text-red-300 mb-2">
                      Something went wrong
                    </h3>
                    <p className="text-red-400/80 leading-relaxed">
                      {error}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Enhanced Step Content */}
        <motion.div
          className="glass-card overflow-hidden max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          whileHover={{ y: -2, transition: { duration: 0.2 } }}
        >
          <div className="p-12 min-h-[600px]">
            <AnimatePresence mode="wait">
              {CurrentStepComponent && (
                <motion.div
                  key={currentStepData?.id}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.4 }}
                >
                  <CurrentStepComponent
                    userData={userData}
                    privacySettings={privacySettings}
                    selectedAuth={selectedAuth}
                    authOptions={authOptions}
                    loading={loading}
                    result={result}
                    onUpdateUserData={updateUserData}
                    onUpdatePrivacySettings={updatePrivacySettings}
                    onSelectAuth={selectAuth}
                    onNext={nextStep}
                    onPrevious={prevStep}
                    onSkip={skipStep}
                    onComplete={completeOnboarding}
                    onReset={resetOnboarding}
                    canGoNext={canGoNext}
                    canGoPrev={canGoPrev}
                    isFirstStep={isFirstStep}
                    isLastStep={isLastStep}
                    stepData={currentStepData}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Enhanced Navigation Footer */}
          {!isComplete && currentStepData?.id !== 'complete' && (
            <div className="bg-black/20 backdrop-blur-sm border-t border-white/10 px-12 py-6 flex justify-between items-center">
              <motion.button
                onClick={prevStep}
                disabled={!canGoPrev || loading}
                whileHover={canGoPrev && !loading ? { scale: 1.02, x: -5 } : {}}
                whileTap={canGoPrev && !loading ? { scale: 0.98 } : {}}
                className={`flex items-center px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  canGoPrev && !loading
                    ? 'text-white/80 hover:text-white hover:bg-white/10 backdrop-blur-sm'
                    : 'text-white/30 cursor-not-allowed'
                }`}
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Previous
              </motion.button>

              <div className="flex items-center space-x-4">
                {currentStepData?.optional && (
                  <motion.button
                    onClick={skipStep}
                    disabled={loading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-6 py-3 font-medium text-white/60 hover:text-white/80 transition-colors rounded-xl hover:bg-white/5"
                  >
                    Skip for now
                  </motion.button>
                )}

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative group"
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl blur opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
                  <button
                    onClick={currentStepData?.id === 'keys' ? completeOnboarding : nextStep}
                    disabled={!canGoNext || loading}
                    className={`relative px-8 py-3 font-semibold rounded-xl transition-all duration-300 ${
                      canGoNext && !loading
                        ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg'
                        : 'bg-white/10 text-white/40 cursor-not-allowed'
                    }`}
                  >
                    {loading ? (
                      <div className="flex items-center space-x-3">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>Creating your identity...</span>
                      </div>
                    ) : currentStepData?.id === 'keys' ? (
                      <div className="flex items-center space-x-2">
                        <span>Create My Identity</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <span>Continue</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    )}
                  </button>
                </motion.div>
              </div>
            </div>
          )}
        </motion.div>

        {/* Enhanced Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-12"
        >
          <div className="glass-card inline-block px-8 py-6 max-w-2xl">
            <div className="flex items-center justify-center mb-4">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-3" />
              <p className="text-white/80 font-medium">
                Secured by PersonaChain • End-to-end encrypted
              </p>
            </div>
            <div className="flex justify-center items-center space-x-6 text-sm">
              <motion.a 
                href="#" 
                className="text-white/50 hover:text-purple-400 transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
              >
                Privacy Policy
              </motion.a>
              <div className="w-1 h-1 bg-white/20 rounded-full" />
              <motion.a 
                href="#" 
                className="text-white/50 hover:text-blue-400 transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
              >
                Terms of Service
              </motion.a>
              <div className="w-1 h-1 bg-white/20 rounded-full" />
              <motion.a 
                href="#" 
                className="text-white/50 hover:text-pink-400 transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
              >
                Get Support
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Glow Effect */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full h-40 bg-gradient-to-t from-purple-600/10 via-blue-600/5 to-transparent blur-3xl" />
    </div>
  );
};

export default OnboardingWizard;