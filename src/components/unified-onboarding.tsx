'use client';

import React, { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { walletService, WalletService, type WalletState } from '../services/wallet-service';
import { diditVCService, type VerifiableCredential } from '../services/didit-vc-service';
import { personaChainClient } from '../lib/personachain-client';

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  icon: string;
  completed: boolean;
}

export function UnifiedOnboarding() {
  const [walletState, setWalletState] = useState<WalletState>(walletService.getState());
  const [currentStep, setCurrentStep] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [credentials, setCredentials] = useState<VerifiableCredential[]>([]);
  
  // Form data
  const [stakeAmount, setStakeAmount] = useState('1000');
  const [kycData, setKycData] = useState({
    fullName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    governmentId: '',
    address: ''
  });

  // Subscribe to wallet state changes
  useEffect(() => {
    const unsubscribe = walletService.subscribe(setWalletState);
    return unsubscribe;
  }, []);

  // Auto-advance steps based on wallet state
  useEffect(() => {
    if (walletState.isConnected && currentStep === 0) {
      setCurrentStep(1);
    }
    if (walletState.did && currentStep === 1) {
      setCurrentStep(2);
    }
  }, [walletState, currentStep]);

  const steps: OnboardingStep[] = [
    {
      id: 'wallet',
      title: 'Connect Wallet',
      description: 'Connect your Cosmos wallet',
      icon: '🔗',
      completed: walletState.isConnected
    },
    {
      id: 'did',
      title: 'Create DID',
      description: 'Stake PERSONA for identity',
      icon: '🆔',
      completed: !!walletState.did
    },
    {
      id: 'kyc',
      title: 'KYC Verification',
      description: 'Verify your identity',
      icon: '✅',
      completed: credentials.some(c => c.type.includes('KYCCredential'))
    },
    {
      id: 'personhood',
      title: 'Proof of Personhood',
      description: 'Prove you are human',
      icon: '👤',
      completed: credentials.some(c => c.type.includes('ProofOfPersonhood'))
    },
    {
      id: 'credentials',
      title: 'Add Credentials',
      description: 'Add more verifications',
      icon: '📜',
      completed: credentials.length >= 3
    }
  ];

  const connectWallet = async (walletType: 'keplr' | 'leap' | 'cosmostation') => {
    setIsProcessing(true);
    try {
      if (walletType === 'keplr') {
        await walletService.connectKeplr();
      } else if (walletType === 'leap') {
        await walletService.connectLeap();
      } else if (walletType === 'cosmostation') {
        await walletService.connectCosmostation();
      }
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      alert(`Failed to connect ${walletType}: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const createDID = async () => {
    if (!walletState.address) return;
    
    setIsProcessing(true);
    try {
      const amount = parseInt(stakeAmount);
      if (amount < 1000) {
        throw new Error('Minimum stake is 1000 PERSONA');
      }

      // Create initial credentials
      const initialCredentials = [
        { type: 'PersonalInfo', data: kycData }
      ];

      const did = await walletService.createDID(amount, initialCredentials);
      
      alert(`✅ DID Created: ${did}\nStaked: ${amount} PERSONA`);
      setCurrentStep(2);
    } catch (error) {
      console.error('Failed to create DID:', error);
      alert(`Failed to create DID: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const completeKYC = async () => {
    if (!walletState.did) return;
    
    setIsProcessing(true);
    try {
      // Initiate and complete KYC verification
      const { verificationId } = await diditVCService.initiateKYCVerification(
        walletState.did,
        kycData
      );
      
      const kycCredential = await diditVCService.completeKYCVerification(
        verificationId,
        walletState.did
      );
      
      // Add credential to wallet
      await walletService.addCredential(kycCredential);
      setCredentials([...credentials, kycCredential]);
      
      alert('✅ KYC Verification Complete!');
      setCurrentStep(3);
    } catch (error) {
      console.error('Failed to complete KYC:', error);
      alert('Failed to complete KYC verification');
    } finally {
      setIsProcessing(false);
    }
  };

  const verifyPersonhood = async () => {
    if (!walletState.did) return;
    
    setIsProcessing(true);
    try {
      const proofCredential = await diditVCService.verifyProofOfPersonhood(
        walletState.did,
        'multi_factor'
      );
      
      await walletService.addCredential(proofCredential);
      setCredentials([...credentials, proofCredential]);
      
      alert('✅ Proof of Personhood Verified!');
      setCurrentStep(4);
    } catch (error) {
      console.error('Failed to verify personhood:', error);
      alert('Failed to verify proof of personhood');
    } finally {
      setIsProcessing(false);
    }
  };

  const addSocialCredential = async (platform: 'github' | 'twitter' | 'linkedin') => {
    if (!walletState.did) return;
    
    setIsProcessing(true);
    try {
      const username = prompt(`Enter your ${platform} username:`);
      if (!username) return;
      
      const socialCredential = await diditVCService.verifySocialAccount(
        walletState.did,
        platform,
        username
      );
      
      await walletService.addCredential(socialCredential);
      setCredentials([...credentials, socialCredential]);
      
      alert(`✅ ${platform} account verified!`);
    } catch (error) {
      console.error(`Failed to verify ${platform}:`, error);
      alert(`Failed to verify ${platform} account`);
    } finally {
      setIsProcessing(false);
    }
  };

  const renderStepContent = () => {
    const step = steps[currentStep];
    if (!step) return null;

    switch (step.id) {
      case 'wallet':
        return (
          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-4">Connect Your Cosmos Wallet</h2>
            <p className="text-gray-600 mb-6">
              Choose your preferred Cosmos wallet to get started
            </p>
            
            <div className="space-y-4">
              <Button
                onClick={() => connectWallet('keplr')}
                disabled={isProcessing || !WalletService.isKeplrAvailable()}
                className="w-full h-14 text-lg"
                variant={WalletService.isKeplrAvailable() ? 'default' : 'outline'}
              >
                <span className="mr-2">🦘</span>
                {WalletService.isKeplrAvailable() ? 'Connect Keplr' : 'Keplr Not Installed'}
              </Button>
              
              <Button
                onClick={() => connectWallet('leap')}
                disabled={isProcessing || !WalletService.isLeapAvailable()}
                className="w-full h-14 text-lg"
                variant={WalletService.isLeapAvailable() ? 'default' : 'outline'}
              >
                <span className="mr-2">🦌</span>
                {WalletService.isLeapAvailable() ? 'Connect Leap' : 'Leap Not Installed'}
              </Button>
              
              <Button
                onClick={() => connectWallet('cosmostation')}
                disabled={isProcessing || !WalletService.isCosmostationAvailable()}
                className="w-full h-14 text-lg"
                variant={WalletService.isCosmostationAvailable() ? 'default' : 'outline'}
              >
                <span className="mr-2">🚀</span>
                {WalletService.isCosmostationAvailable() ? 'Connect Cosmostation' : 'Cosmostation Not Installed'}
              </Button>
            </div>
            
            {walletState.isConnected && (
              <div className="mt-6 p-4 bg-green-50 rounded-lg">
                <p className="text-green-800">
                  ✅ Connected: {walletState.address?.substring(0, 12)}...
                </p>
                <p className="text-sm text-green-600">
                  Balance: {walletState.balance.toLocaleString()} PERSONA
                </p>
              </div>
            )}
          </Card>
        );

      case 'did':
        return (
          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-4">Create Your Digital Identity</h2>
            <p className="text-gray-600 mb-6">
              Stake PERSONA tokens to create your blockchain-verified DID
            </p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Stake Amount (min 1,000 PERSONA)
                </label>
                <Input
                  type="number"
                  value={stakeAmount}
                  onChange={(e) => setStakeAmount(e.target.value)}
                  min="1000"
                  className="text-lg"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Full Name</label>
                  <Input
                    value={kycData.fullName}
                    onChange={(e) => setKycData({...kycData, fullName: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <Input
                    type="email"
                    value={kycData.email}
                    onChange={(e) => setKycData({...kycData, email: e.target.value})}
                  />
                </div>
              </div>
              
              <Button
                onClick={createDID}
                disabled={isProcessing || parseInt(stakeAmount) < 1000}
                className="w-full h-12"
              >
                {isProcessing ? 'Creating DID...' : `Stake ${stakeAmount} PERSONA & Create DID`}
              </Button>
            </div>
          </Card>
        );

      case 'kyc':
        return (
          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-4">KYC Verification</h2>
            <p className="text-gray-600 mb-6">
              Complete identity verification to unlock all features
            </p>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Phone</label>
                  <Input
                    value={kycData.phone}
                    onChange={(e) => setKycData({...kycData, phone: e.target.value})}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Date of Birth</label>
                  <Input
                    type="date"
                    value={kycData.dateOfBirth}
                    onChange={(e) => setKycData({...kycData, dateOfBirth: e.target.value})}
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Government ID</label>
                <Input
                  value={kycData.governmentId}
                  onChange={(e) => setKycData({...kycData, governmentId: e.target.value})}
                  placeholder="Driver's License or Passport Number"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Address</label>
                <Input
                  value={kycData.address}
                  onChange={(e) => setKycData({...kycData, address: e.target.value})}
                  placeholder="Your full address"
                />
              </div>
              
              <Button
                onClick={completeKYC}
                disabled={isProcessing || !kycData.phone || !kycData.governmentId}
                className="w-full h-12"
              >
                {isProcessing ? 'Verifying...' : 'Complete KYC Verification'}
              </Button>
            </div>
          </Card>
        );

      case 'personhood':
        return (
          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-4">Proof of Personhood</h2>
            <p className="text-gray-600 mb-6">
              Verify that you are a unique human to prevent Sybil attacks
            </p>
            
            <div className="space-y-6">
              <div className="p-6 bg-blue-50 rounded-lg">
                <h3 className="font-semibold mb-2">Multi-Factor Verification</h3>
                <p className="text-sm text-gray-700 mb-4">
                  We'll verify your humanity through multiple factors including:
                </p>
                <ul className="space-y-2 text-sm">
                  <li>✓ Government ID verification</li>
                  <li>✓ Liveness detection</li>
                  <li>✓ Social proof analysis</li>
                  <li>✓ Behavioral patterns</li>
                </ul>
              </div>
              
              <Button
                onClick={verifyPersonhood}
                disabled={isProcessing}
                className="w-full h-12"
              >
                {isProcessing ? 'Verifying...' : 'Start Personhood Verification'}
              </Button>
            </div>
          </Card>
        );

      case 'credentials':
        return (
          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-4">Add More Credentials</h2>
            <p className="text-gray-600 mb-6">
              Enhance your identity with additional verifications
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-4">
                <h3 className="font-semibold mb-3">Social Accounts</h3>
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    onClick={() => addSocialCredential('github')}
                    disabled={isProcessing}
                    className="w-full"
                  >
                    Verify GitHub
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => addSocialCredential('twitter')}
                    disabled={isProcessing}
                    className="w-full"
                  >
                    Verify Twitter
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => addSocialCredential('linkedin')}
                    disabled={isProcessing}
                    className="w-full"
                  >
                    Verify LinkedIn
                  </Button>
                </div>
              </Card>
              
              <Card className="p-4">
                <h3 className="font-semibold mb-3">Professional</h3>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full" disabled>
                    Add Education (Coming Soon)
                  </Button>
                  <Button variant="outline" className="w-full" disabled>
                    Add Employment (Coming Soon)
                  </Button>
                  <Button variant="outline" className="w-full" disabled>
                    Add Certification (Coming Soon)
                  </Button>
                </div>
              </Card>
            </div>
            
            {credentials.length > 0 && (
              <div className="mt-6">
                <h3 className="font-semibold mb-3">Your Credentials ({credentials.length})</h3>
                <div className="space-y-2">
                  {credentials.map((cred, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-green-50 rounded">
                      <span className="font-medium">{cred.type[1] || cred.type[0]}</span>
                      <span className="text-green-600">✓ Verified</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">PersonaPass Web3 Identity</h1>
          <p className="text-xl text-gray-600">
            Your sovereign digital identity on the blockchain
          </p>
        </div>

        {/* Progress Steps */}
        <Card className="p-6 mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold transition-all ${
                    step.completed
                      ? 'bg-green-500 text-white'
                      : currentStep === index
                      ? 'bg-blue-500 text-white ring-4 ring-blue-200'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {step.completed ? '✓' : step.icon}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`w-full h-1 mx-2 transition-all ${
                      step.completed ? 'bg-green-500' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-5 gap-2 mt-4 text-center">
            {steps.map((step) => (
              <div key={step.id}>
                <p className="font-semibold text-sm">{step.title}</p>
                <p className="text-xs text-gray-500">{step.description}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Current Step Content */}
        {renderStepContent()}

        {/* Wallet Status */}
        {walletState.isConnected && (
          <Card className="p-6 mt-8">
            <h3 className="text-lg font-semibold mb-4">Your Identity Status</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">
                  {walletState.balance.toLocaleString()}
                </p>
                <p className="text-sm text-gray-600">PERSONA Balance</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">
                  {credentials.length}
                </p>
                <p className="text-sm text-gray-600">Verifiable Credentials</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-600">
                  {walletState.did ? 'Active' : 'Pending'}
                </p>
                <p className="text-sm text-gray-600">DID Status</p>
              </div>
            </div>
            
            {walletState.did && (
              <div className="mt-4 p-3 bg-gray-50 rounded">
                <p className="text-sm">
                  <span className="font-medium">DID:</span>
                  <span className="font-mono text-xs ml-2">{walletState.did}</span>
                </p>
              </div>
            )}
            
            <Button
              variant="outline"
              onClick={() => walletService.disconnect()}
              className="mt-4"
            >
              Disconnect Wallet
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
}