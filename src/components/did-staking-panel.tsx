'use client';

import React, { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { personaChainClient, STAKING_TIERS, type StakedDIDResult } from '../lib/personachain-client';

interface DIDStakingPanelProps {
  userAddress?: string;
  onDIDCreated?: (result: StakedDIDResult) => void;
}

type StakingTier = 'BASIC' | 'PREMIUM' | 'ELITE' | 'INSTITUTIONAL';

const TIER_BENEFITS = {
  BASIC: {
    amount: 1000,
    price: '$1,250',
    features: ['Basic DID verification', 'Standard reputation scoring', 'Community governance voting']
  },
  PREMIUM: {
    amount: 10000,
    price: '$12,500',
    features: ['Enhanced verification priority', '2x reputation multiplier', 'Premium support access']
  },
  ELITE: {
    amount: 100000,
    price: '$125,000',
    features: ['Validator status eligibility', '5x reputation multiplier', 'Advanced governance power']
  },
  INSTITUTIONAL: {
    amount: 1000000,
    price: '$1,250,000',
    features: ['Enterprise features', '10x reputation multiplier', 'Custom integrations']
  }
} as const;

export function DIDStakingPanel({ userAddress, onDIDCreated }: DIDStakingPanelProps) {
  const [selectedTier, setSelectedTier] = useState<StakingTier>('BASIC');
  const [isStaking, setIsStaking] = useState(false);
  const [balance, setBalance] = useState<number>(0);
  const [networkStatus, setNetworkStatus] = useState<{ healthy: boolean; chainId: string }>({
    healthy: false,
    chainId: ''
  });
  const [credentials, setCredentials] = useState<any[]>([]);

  useEffect(() => {
    initializeClient();
  }, []);

  useEffect(() => {
    if (userAddress) {
      loadUserBalance();
    }
  }, [userAddress]);

  const initializeClient = async () => {
    try {
      await personaChainClient.connect();
      const status = await personaChainClient.getNetworkStatus();
      setNetworkStatus(status);
    } catch (error) {
      console.error('Failed to initialize PersonaChain client:', error);
    }
  };

  const loadUserBalance = async () => {
    if (!userAddress) return;
    
    try {
      const balance = await personaChainClient.getBalance(userAddress);
      setBalance(balance);
    } catch (error) {
      console.error('Failed to load balance:', error);
    }
  };

  const handleStakingTierSelect = (tier: StakingTier) => {
    setSelectedTier(tier);
  };

  const handleStakeDID = async () => {
    if (!userAddress) {
      alert('Please connect your wallet first');
      return;
    }

    const stakeAmount = TIER_BENEFITS[selectedTier].amount;
    
    if (balance < stakeAmount) {
      alert(`Insufficient balance. You need ${stakeAmount} PERSONA tokens.`);
      return;
    }

    setIsStaking(true);
    
    try {
      // In a real implementation, credentials would be collected from user
      const mockCredentials = [
        {
          type: 'EmailVerification',
          status: 'verified',
          timestamp: new Date().toISOString()
        },
        {
          type: 'KYCVerification', 
          status: 'verified',
          tier: selectedTier,
          timestamp: new Date().toISOString()
        }
      ];

      const result = await personaChainClient.createStakedDID(
        mockCredentials,
        stakeAmount * 1000000, // Convert to upersona
        30 * 24 * 3600 // 30 days
      );

      onDIDCreated?.(result);
      
      alert(`✅ DID created successfully!\nDID: ${result.did}\nReputation Score: ${result.reputationScore}\nExpires: ${result.expiresAt.toLocaleDateString()}`);
      
      // Refresh balance
      await loadUserBalance();
      
    } catch (error) {
      console.error('Failed to stake DID:', error);
      alert(`❌ Failed to create staked DID: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsStaking(false);
    }
  };

  const canAfford = (tier: StakingTier) => balance >= TIER_BENEFITS[tier].amount;

  return (
    <div className="space-y-6">
      {/* Network Status */}
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">PersonaChain Network</h3>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${networkStatus.healthy ? 'bg-green-500' : 'bg-red-500'}`} />
            <span className="text-sm text-gray-600">
              {networkStatus.healthy ? 'Connected' : 'Disconnected'}
            </span>
          </div>
        </div>
        {networkStatus.chainId && (
          <p className="text-sm text-gray-500 mt-1">Chain ID: {networkStatus.chainId}</p>
        )}
      </Card>

      {/* Balance Display */}
      {userAddress && (
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">PERSONA Balance</h3>
              <p className="text-sm text-gray-600">Available for staking</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-blue-600">{balance.toLocaleString()}</p>
              <p className="text-sm text-gray-500">PERSONA</p>
            </div>
          </div>
        </Card>
      )}

      {/* Staking Tiers */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {(Object.keys(TIER_BENEFITS) as StakingTier[]).map((tier) => {
          const tierInfo = TIER_BENEFITS[tier];
          const isSelected = selectedTier === tier;
          const affordable = canAfford(tier);
          
          return (
            <Card 
              key={tier}
              className={`p-4 cursor-pointer transition-all duration-200 ${
                isSelected ? 'ring-2 ring-blue-500 bg-blue-50' : 
                affordable ? 'hover:bg-gray-50' : 'opacity-50'
              }`}
              onClick={() => affordable && handleStakingTierSelect(tier)}
            >
              <div className="space-y-3">
                <div className="text-center">
                  <h4 className="font-semibold text-lg">{tier}</h4>
                  <p className="text-2xl font-bold text-blue-600">{tierInfo.amount.toLocaleString()}</p>
                  <p className="text-sm text-gray-500">PERSONA</p>
                  <p className="text-sm text-green-600 font-medium">{tierInfo.price}</p>
                </div>
                
                <div className="space-y-2">
                  {tierInfo.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                      <p className="text-sm text-gray-700">{feature}</p>
                    </div>
                  ))}
                </div>

                {!affordable && (
                  <p className="text-xs text-red-600 text-center font-medium">
                    Insufficient balance
                  </p>
                )}
              </div>
            </Card>
          );
        })}
      </div>

      {/* Staking Action */}
      <Card className="p-6">
        <div className="space-y-4">
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-2">Create Staked DID</h3>
            <p className="text-gray-600">
              Stake {TIER_BENEFITS[selectedTier].amount.toLocaleString()} PERSONA tokens to create your verified digital identity
            </p>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">Selected Tier: {selectedTier}</h4>
            <div className="space-y-1 text-sm text-blue-800">
              <p>• Stake Amount: {TIER_BENEFITS[selectedTier].amount.toLocaleString()} PERSONA</p>
              <p>• Duration: 30 days (renewable)</p>
              <p>• Reputation Multiplier: {selectedTier === 'BASIC' ? '1x' : 
                                         selectedTier === 'PREMIUM' ? '2x' :
                                         selectedTier === 'ELITE' ? '5x' : '10x'}</p>
              <p>• Slashing Risk: 5% for malicious behavior</p>
            </div>
          </div>

          <div className="flex gap-3">
            <Button 
              onClick={handleStakeDID}
              disabled={!userAddress || isStaking || !canAfford(selectedTier) || !networkStatus.healthy}
              className="flex-1"
            >
              {isStaking ? 'Creating Staked DID...' : 
               !userAddress ? 'Connect Wallet First' :
               !networkStatus.healthy ? 'Network Unavailable' :
               !canAfford(selectedTier) ? 'Insufficient Balance' :
               `Stake ${TIER_BENEFITS[selectedTier].amount.toLocaleString()} PERSONA`}
            </Button>
          </div>

          {!userAddress && (
            <p className="text-center text-sm text-gray-500">
              Connect your PersonaChain wallet to create a staked DID
            </p>
          )}
        </div>
      </Card>

      {/* Benefits Explanation */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">🏆 Identity Staking Benefits</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-blue-600 mb-2">🛡️ Security & Trust</h4>
            <ul className="space-y-1 text-sm text-gray-700">
              <li>• Sybil attack protection through economic stake</li>
              <li>• Verifiable proof of identity commitment</li>
              <li>• Slashing penalties for malicious behavior</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-green-600 mb-2">💰 Economic Incentives</h4>
            <ul className="space-y-1 text-sm text-gray-700">
              <li>• Earn PERSONA rewards for verifications</li>
              <li>• Higher stakes = higher rewards</li>
              <li>• Governance voting power</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-purple-600 mb-2">🌐 Network Effects</h4>
            <ul className="space-y-1 text-sm text-gray-700">
              <li>• Reputation builds over time</li>
              <li>• Cross-platform identity portability</li>
              <li>• Access to premium features</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-orange-600 mb-2">🔧 Technical Features</h4>
            <ul className="space-y-1 text-sm text-gray-700">
              <li>• Self-sovereign identity control</li>
              <li>• Zero-knowledge proof integration</li>
              <li>• Selective disclosure capabilities</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}