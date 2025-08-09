'use client';

import React, { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { personaChainClient, type StakedDIDResult } from '../lib/personachain-client';

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

interface UserProfile {
  walletAddress: string;
  did: string;
  stakeAmount: number;
  credentials: VerifiableCredential[];
  kycLevel: 'none' | 'basic' | 'advanced' | 'institutional';
}

interface VerifiableCredential {
  id: string;
  type: string;
  issuer: string;
  subject: string;
  issuanceDate: string;
  credentialSubject: any;
  proof: any;
}

export function Web3Onboarding() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isConnected, setIsConnected] = useState(false);
  const [userAddress, setUserAddress] = useState('');
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [stakeAmount, setStakeAmount] = useState('1000');
  const [isCreatingDID, setIsCreatingDID] = useState(false);
  const [kycData, setKycData] = useState({
    fullName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    governmentId: '',
    address: ''
  });

  const onboardingSteps: OnboardingStep[] = [
    {
      id: 'connect-wallet',
      title: 'Connect Web3 Wallet',
      description: 'Connect your Cosmos wallet (Keplr, Leap, or Cosmostation)',
      completed: isConnected
    },
    {
      id: 'create-did',
      title: 'Create Digital Identity',
      description: 'Stake PERSONA tokens to create your blockchain-verified DID',
      completed: !!userProfile?.did
    },
    {
      id: 'kyc-verification',
      title: 'KYC Verification',
      description: 'Complete identity verification to earn verifiable credentials',
      completed: userProfile?.kycLevel !== 'none'
    },
    {
      id: 'vc-collection',
      title: 'Collect Credentials',
      description: 'Add verifiable credentials to your DID from DIDit integrations',
      completed: (userProfile?.credentials.length || 0) > 0
    }
  ];

  // Check for existing wallet connection on load
  useEffect(() => {
    checkExistingConnection();
  }, []);

  const checkExistingConnection = async () => {
    try {
      await personaChainClient.connect();
      
      // Check localStorage for previous connection
      const savedAddress = localStorage.getItem('personapass_wallet_address');
      const savedDID = localStorage.getItem('personapass_did');
      
      if (savedAddress && savedDID) {
        setUserAddress(savedAddress);
        setIsConnected(true);
        
        // Load user profile from blockchain/localStorage
        const profile = await loadUserProfile(savedAddress, savedDID);
        setUserProfile(profile);
        
        // Set current step based on profile completeness
        setCurrentStep(calculateCurrentStep(profile));
      }
    } catch (error) {
      console.error('Failed to check existing connection:', error);
    }
  };

  const loadUserProfile = async (address: string, did: string): Promise<UserProfile> => {
    try {
      const balance = await personaChainClient.getBalance(address);
      const reputation = await personaChainClient.getReputation(address);
      
      // Load from localStorage (in production, would be from blockchain/IPFS)
      const savedCredentials = JSON.parse(localStorage.getItem(`credentials_${address}`) || '[]');
      const savedKycLevel = localStorage.getItem(`kyc_level_${address}`) || 'none';
      
      return {
        walletAddress: address,
        did,
        stakeAmount: balance,
        credentials: savedCredentials,
        kycLevel: savedKycLevel as any
      };
    } catch (error) {
      console.error('Failed to load user profile:', error);
      return {
        walletAddress: address,
        did,
        stakeAmount: 0,
        credentials: [],
        kycLevel: 'none'
      };
    }
  };

  const calculateCurrentStep = (profile: UserProfile): number => {
    if (!profile.walletAddress) return 0;
    if (!profile.did) return 1;
    if (profile.kycLevel === 'none') return 2;
    if (profile.credentials.length === 0) return 3;
    return 4; // Completed
  };

  const connectWallet = async () => {
    try {
      // In production, would integrate with Keplr/Leap/Cosmostation
      if (window.keplr) {
        await window.keplr.enable('personachain-1');
        const offlineSigner = window.keplr.getOfflineSigner('personachain-1');
        const accounts = await (offlineSigner as any).getAccounts();
        
        if (accounts.length > 0 && accounts[0]) {
          const address = accounts[0].address;
          setUserAddress(address);
          setIsConnected(true);
          
          // Save to localStorage for persistent login
          localStorage.setItem('personapass_wallet_address', address);
          
          // Connect PersonaChain client
          await personaChainClient.connectWallet(address);
          
          // Check if user already has DID
          const existingDID = localStorage.getItem(`did_${address}`);
          if (existingDID) {
            const profile = await loadUserProfile(address, existingDID);
            setUserProfile(profile);
            setCurrentStep(calculateCurrentStep(profile));
          } else {
            setCurrentStep(1);
          }
        }
      } else {
        // Fallback for demo - use mock connection
        const mockAddress = await personaChainClient.connectWallet(
          "abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about"
        );
        setUserAddress(mockAddress);
        setIsConnected(true);
        localStorage.setItem('personapass_wallet_address', mockAddress);
        setCurrentStep(1);
      }
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      alert('Failed to connect wallet. Please install Keplr or use demo mode.');
    }
  };

  const createDID = async () => {
    if (!isConnected || !userAddress) {
      alert('Please connect your wallet first');
      return;
    }

    setIsCreatingDID(true);
    
    try {
      const stakeAmountNum = parseInt(stakeAmount);
      if (stakeAmountNum < 1000) {
        throw new Error('Minimum stake of 1,000 PERSONA required');
      }

      // Create basic credentials from form data
      const basicCredentials = [
        {
          type: 'PersonalInformation',
          data: kycData.fullName ? { name: kycData.fullName } : {}
        },
        {
          type: 'ContactInformation', 
          data: {
            email: kycData.email,
            phone: kycData.phone
          }
        }
      ];

      const result: StakedDIDResult = await personaChainClient.createStakedDID(
        basicCredentials,
        stakeAmountNum,
        90 * 24 * 3600 // 90 days
      );

      // Save DID to localStorage for persistent recognition
      localStorage.setItem('personapass_did', result.did);
      localStorage.setItem(`did_${userAddress}`, result.did);
      localStorage.setItem(`stake_${userAddress}`, stakeAmountNum.toString());

      const profile: UserProfile = {
        walletAddress: userAddress,
        did: result.did,
        stakeAmount: stakeAmountNum,
        credentials: [],
        kycLevel: 'none'
      };

      setUserProfile(profile);
      setCurrentStep(2);

      alert(
        `✅ DID Created Successfully!\n` +
        `DID: ${result.did}\n` +
        `Stake: ${stakeAmountNum.toLocaleString()} PERSONA\n` +
        `Reputation: ${result.reputationScore}\n` +
        `TX: ${result.txHash.substring(0, 16)}...`
      );

    } catch (error) {
      console.error('Failed to create DID:', error);
      alert(`❌ Failed to create DID: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsCreatingDID(false);
    }
  };

  const completeKYC = async () => {
    if (!userProfile) return;

    try {
      // In production, would integrate with DIDit API
      const kycCredential: VerifiableCredential = {
        id: `kyc_${Date.now()}`,
        type: 'KYCCredential',
        issuer: 'did:didit:kyc-issuer',
        subject: userProfile.did,
        issuanceDate: new Date().toISOString(),
        credentialSubject: {
          id: userProfile.did,
          fullName: kycData.fullName,
          email: kycData.email,
          phone: kycData.phone,
          dateOfBirth: kycData.dateOfBirth,
          governmentId: kycData.governmentId.substring(0, 4) + '****', // Masked
          address: kycData.address,
          kycLevel: 'basic',
          verifiedAt: new Date().toISOString()
        },
        proof: {
          type: 'Ed25519Signature2020',
          created: new Date().toISOString(),
          verificationMethod: 'did:didit:kyc-issuer#key-1',
          proofPurpose: 'assertionMethod',
          jws: 'mock_signature_hash_12345'
        }
      };

      // Save credentials to blockchain/IPFS (mock with localStorage)
      const updatedCredentials = [...userProfile.credentials, kycCredential];
      const updatedProfile: UserProfile = {
        ...userProfile,
        credentials: updatedCredentials,
        kycLevel: 'basic'
      };

      localStorage.setItem(`credentials_${userAddress}`, JSON.stringify(updatedCredentials));
      localStorage.setItem(`kyc_level_${userAddress}`, 'basic');

      setUserProfile(updatedProfile);
      setCurrentStep(3);

      alert('✅ KYC Verification Complete! Basic credentials added to your DID.');

    } catch (error) {
      console.error('Failed to complete KYC:', error);
      alert('❌ KYC verification failed. Please try again.');
    }
  };

  const addVerifiableCredential = async (credentialType: string) => {
    if (!userProfile) return;

    try {
      // Mock creating different types of VCs based on DIDit integrations
      const vcTemplates = {
        'github': {
          type: 'GitHubVerification',
          data: { username: 'user123', verified: true, repositories: 25 }
        },
        'twitter': {
          type: 'TwitterVerification', 
          data: { handle: '@user123', verified: true, followers: 1500 }
        },
        'education': {
          type: 'EducationCredential',
          data: { institution: 'University Name', degree: 'Computer Science', year: 2023 }
        },
        'employment': {
          type: 'EmploymentCredential',
          data: { employer: 'Tech Company', position: 'Developer', startDate: '2023-01-01' }
        }
      };

      const template = vcTemplates[credentialType as keyof typeof vcTemplates];
      if (!template) return;

      const newCredential: VerifiableCredential = {
        id: `${credentialType}_${Date.now()}`,
        type: template.type,
        issuer: `did:didit:${credentialType}-issuer`,
        subject: userProfile.did,
        issuanceDate: new Date().toISOString(),
        credentialSubject: {
          id: userProfile.did,
          ...template.data
        },
        proof: {
          type: 'Ed25519Signature2020',
          created: new Date().toISOString(),
          verificationMethod: `did:didit:${credentialType}-issuer#key-1`,
          proofPurpose: 'assertionMethod',
          jws: `mock_${credentialType}_signature_${Date.now()}`
        }
      };

      const updatedCredentials = [...userProfile.credentials, newCredential];
      const updatedProfile: UserProfile = {
        ...userProfile,
        credentials: updatedCredentials
      };

      localStorage.setItem(`credentials_${userAddress}`, JSON.stringify(updatedCredentials));
      setUserProfile(updatedProfile);

      alert(`✅ ${template.type} added to your DID!`);

    } catch (error) {
      console.error('Failed to add credential:', error);
      alert('❌ Failed to add credential. Please try again.');
    }
  };

  const renderStepContent = () => {
    const step = onboardingSteps[currentStep];
    if (!step) return null;

    switch (step.id) {
      case 'connect-wallet':
        return (
          <Card className="p-6">
            <h3 className="text-xl font-bold mb-4">Connect Your Web3 Wallet</h3>
            <p className="text-gray-600 mb-6">
              Connect your Cosmos ecosystem wallet to access PersonaPass identity services
            </p>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="p-4 text-center">
                  <div className="text-2xl mb-2">🦘</div>
                  <h4 className="font-semibold">Keplr</h4>
                  <p className="text-sm text-gray-600">Most popular Cosmos wallet</p>
                </Card>
                <Card className="p-4 text-center">
                  <div className="text-2xl mb-2">🦌</div>
                  <h4 className="font-semibold">Leap</h4>
                  <p className="text-sm text-gray-600">Fast & secure wallet</p>
                </Card>
                <Card className="p-4 text-center">
                  <div className="text-2xl mb-2">🚀</div>
                  <h4 className="font-semibold">Cosmostation</h4>
                  <p className="text-sm text-gray-600">Full-featured wallet</p>
                </Card>
              </div>
              
              <Button 
                onClick={connectWallet}
                className="w-full"
                size="lg"
              >
                Connect Wallet
              </Button>
            </div>
          </Card>
        );

      case 'create-did':
        return (
          <Card className="p-6">
            <h3 className="text-xl font-bold mb-4">Create Your Digital Identity</h3>
            <p className="text-gray-600 mb-6">
              Stake PERSONA tokens to create your blockchain-verified decentralized identity
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  PERSONA Stake Amount (minimum 1,000)
                </label>
                <Input
                  type="number"
                  value={stakeAmount}
                  onChange={(e) => setStakeAmount(e.target.value)}
                  placeholder="1000"
                  min="1000"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Higher stakes = higher reputation and rewards
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Full Name</label>
                  <Input
                    value={kycData.fullName}
                    onChange={(e) => setKycData({...kycData, fullName: e.target.value})}
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <Input
                    type="email"
                    value={kycData.email}
                    onChange={(e) => setKycData({...kycData, email: e.target.value})}
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <Button 
                onClick={createDID}
                disabled={isCreatingDID || parseInt(stakeAmount) < 1000}
                className="w-full"
                size="lg"
              >
                {isCreatingDID ? 'Creating DID...' : `Stake ${stakeAmount} PERSONA & Create DID`}
              </Button>
            </div>
          </Card>
        );

      case 'kyc-verification':
        return (
          <Card className="p-6">
            <h3 className="text-xl font-bold mb-4">Complete KYC Verification</h3>
            <p className="text-gray-600 mb-6">
              Verify your identity to unlock advanced features and earn verifiable credentials
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium mb-1">Phone Number</label>
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
              <div>
                <label className="block text-sm font-medium mb-1">Government ID</label>
                <Input
                  value={kycData.governmentId}
                  onChange={(e) => setKycData({...kycData, governmentId: e.target.value})}
                  placeholder="Driver's License or Passport"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Address</label>
                <Input
                  value={kycData.address}
                  onChange={(e) => setKycData({...kycData, address: e.target.value})}
                  placeholder="Your address"
                />
              </div>
            </div>

            <Button 
              onClick={completeKYC}
              disabled={!kycData.phone || !kycData.dateOfBirth || !kycData.governmentId}
              className="w-full"
              size="lg"
            >
              Complete KYC & Get Verified Credential
            </Button>
          </Card>
        );

      case 'vc-collection':
        return (
          <Card className="p-6">
            <h3 className="text-xl font-bold mb-4">Collect Verifiable Credentials</h3>
            <p className="text-gray-600 mb-6">
              Add more credentials to your DID from various verification services
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <Card className="p-4">
                <h4 className="font-semibold mb-2">📱 Social Credentials</h4>
                <div className="space-y-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => addVerifiableCredential('github')}
                    className="w-full"
                  >
                    Verify GitHub Account
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => addVerifiableCredential('twitter')}
                    className="w-full"
                  >
                    Verify Twitter Account
                  </Button>
                </div>
              </Card>

              <Card className="p-4">
                <h4 className="font-semibold mb-2">🎓 Professional Credentials</h4>
                <div className="space-y-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => addVerifiableCredential('education')}
                    className="w-full"
                  >
                    Add Education Credential
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => addVerifiableCredential('employment')}
                    className="w-full"
                  >
                    Add Employment Credential
                  </Button>
                </div>
              </Card>
            </div>

            {userProfile && userProfile.credentials.length > 0 && (
              <div className="mt-6">
                <h4 className="font-semibold mb-3">Your Verifiable Credentials:</h4>
                <div className="space-y-2">
                  {userProfile.credentials.map((cred) => (
                    <div key={cred.id} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div>
                        <span className="font-medium">{cred.type}</span>
                        <span className="text-sm text-gray-600 ml-2">
                          Issued by {cred.issuer.split(':').pop()}
                        </span>
                      </div>
                      <span className="text-green-600 font-bold">✓ Verified</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Card>
        );

      default:
        return (
          <Card className="p-6 text-center">
            <h3 className="text-xl font-bold text-green-600 mb-4">🎉 Onboarding Complete!</h3>
            <p className="text-gray-600 mb-6">
              Your PersonaPass identity is fully set up and ready to use
            </p>
            <Button onClick={() => setCurrentStep(0)} variant="outline">
              Start Over
            </Button>
          </Card>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome to PersonaPass</h1>
          <p className="text-gray-600">
            Create your sovereign digital identity on the blockchain
          </p>
        </div>

        {/* Progress Steps */}
        <Card className="p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            {onboardingSteps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div 
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    step.completed 
                      ? 'bg-green-500 text-white' 
                      : currentStep === index
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {step.completed ? '✓' : index + 1}
                </div>
                {index < onboardingSteps.length - 1 && (
                  <div 
                    className={`w-16 h-0.5 mx-2 ${
                      step.completed ? 'bg-green-500' : 'bg-gray-200'
                    }`} 
                  />
                )}
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
            {onboardingSteps.map((step, index) => (
              <div key={step.id}>
                <h4 className={`font-semibold text-sm ${
                  currentStep === index ? 'text-blue-600' : 
                  step.completed ? 'text-green-600' : 'text-gray-600'
                }`}>
                  {step.title}
                </h4>
                <p className="text-xs text-gray-500 mt-1">{step.description}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Current Step Content */}
        {renderStepContent()}

        {/* User Profile Display */}
        {userProfile && (
          <Card className="p-6 mt-8">
            <h3 className="text-xl font-bold mb-4">Your PersonaPass Profile</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">{userProfile.stakeAmount.toLocaleString()}</p>
                <p className="text-sm text-gray-600">PERSONA Staked</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">{userProfile.credentials.length}</p>
                <p className="text-sm text-gray-600">Verifiable Credentials</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-600">{userProfile.kycLevel.toUpperCase()}</p>
                <p className="text-sm text-gray-600">KYC Level</p>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm">
                <span className="font-medium">DID:</span> 
                <span className="font-mono text-xs ml-2">{userProfile.did}</span>
              </p>
              <p className="text-sm mt-1">
                <span className="font-medium">Wallet:</span> 
                <span className="font-mono text-xs ml-2">{userProfile.walletAddress}</span>
              </p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}