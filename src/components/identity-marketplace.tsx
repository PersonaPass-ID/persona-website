'use client';

import React, { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { personaChainClient, type VerificationResult } from '../lib/personachain-client';

interface Identity {
  did: string;
  owner: string;
  stakeAmount: number;
  reputationScore: number;
  verificationCount: number;
  potentialReward: number;
  credentials: string[];
  createdAt: Date;
  tier: 'BASIC' | 'PREMIUM' | 'ELITE' | 'INSTITUTIONAL';
}

interface IdentityMarketplaceProps {
  userAddress?: string;
  userReputation?: number;
}

const MOCK_IDENTITIES: Identity[] = [
  {
    did: 'did:persona:persona1developer123abc',
    owner: 'persona1developer123abc',
    stakeAmount: 50000,
    reputationScore: 8500,
    verificationCount: 127,
    potentialReward: 25.5,
    credentials: ['KYC Level 2', 'GitHub Verified', 'Email Verified', 'Phone Verified'],
    createdAt: new Date('2024-12-15'),
    tier: 'ELITE'
  },
  {
    did: 'did:persona:persona1trader456def',
    owner: 'persona1trader456def',
    stakeAmount: 15000,
    reputationScore: 6200,
    verificationCount: 89,
    potentialReward: 18.3,
    credentials: ['KYC Level 1', 'Twitter Verified', 'Email Verified'],
    createdAt: new Date('2025-01-02'),
    tier: 'PREMIUM'
  },
  {
    did: 'did:persona:persona1student789ghi',
    owner: 'persona1student789ghi',
    stakeAmount: 2500,
    reputationScore: 2100,
    verificationCount: 12,
    potentialReward: 12.8,
    credentials: ['Email Verified', 'University ID', 'Age Verification'],
    createdAt: new Date('2025-01-15'),
    tier: 'BASIC'
  },
  {
    did: 'did:persona:persona1enterprise999xyz',
    owner: 'persona1enterprise999xyz',
    stakeAmount: 500000,
    reputationScore: 9800,
    verificationCount: 342,
    potentialReward: 95.2,
    credentials: ['Enterprise KYC', 'Legal Entity Verification', 'Compliance Audit', 'Security Certification'],
    createdAt: new Date('2024-11-20'),
    tier: 'INSTITUTIONAL'
  }
];

export function IdentityMarketplace({ userAddress, userReputation = 0 }: IdentityMarketplaceProps) {
  const [identities, setIdentities] = useState<Identity[]>(MOCK_IDENTITIES);
  const [isVerifying, setIsVerifying] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'high-reward' | 'new' | 'elite'>('all');
  const [sortBy, setSortBy] = useState<'reward' | 'reputation' | 'recent'>('reward');
  const [myVerifications, setMyVerifications] = useState<string[]>([]);

  const filteredAndSortedIdentities = identities
    .filter(identity => {
      if (filter === 'high-reward') return identity.potentialReward >= 20;
      if (filter === 'new') return identity.createdAt > new Date('2025-01-01');
      if (filter === 'elite') return identity.tier === 'ELITE' || identity.tier === 'INSTITUTIONAL';
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'reward') return b.potentialReward - a.potentialReward;
      if (sortBy === 'reputation') return b.reputationScore - a.reputationScore;
      if (sortBy === 'recent') return b.createdAt.getTime() - a.createdAt.getTime();
      return 0;
    });

  const handleVerifyIdentity = async (identity: Identity) => {
    if (!userAddress) {
      alert('Please connect your wallet first');
      return;
    }

    if (identity.owner === userAddress) {
      alert('You cannot verify your own identity');
      return;
    }

    if (myVerifications.includes(identity.did)) {
      alert('You have already verified this identity');
      return;
    }

    setIsVerifying(identity.did);

    try {
      // Mock verification proof - in real implementation, this would be more sophisticated
      const verificationProof = {
        verifier: userAddress,
        target: identity.did,
        timestamp: new Date().toISOString(),
        method: 'credential_review',
        confidence: 0.95,
        evidence: [
          'Credential authenticity verified',
          'Cross-reference checks passed',
          'Behavioral analysis positive'
        ]
      };

      const result: VerificationResult = await personaChainClient.verifyDID(
        identity.did,
        verificationProof
      );

      // Update local state
      setMyVerifications(prev => [...prev, identity.did]);
      setIdentities(prev => prev.map(id => 
        id.did === identity.did 
          ? { ...id, verificationCount: id.verificationCount + 1 }
          : id
      ));

      alert(
        `✅ Verification successful!\n` +
        `Reward earned: ${result.rewardEarned} PERSONA\n` +
        `Your new reputation: ${result.newReputationScore}\n` +
        `Transaction: ${result.txHash.substring(0, 16)}...`
      );

    } catch (error) {
      console.error('Verification failed:', error);
      alert(`❌ Verification failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsVerifying(null);
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'BASIC': return 'text-gray-600 bg-gray-100';
      case 'PREMIUM': return 'text-blue-600 bg-blue-100';
      case 'ELITE': return 'text-purple-600 bg-purple-100';
      case 'INSTITUTIONAL': return 'text-gold-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getReputationColor = (score: number) => {
    if (score >= 8000) return 'text-green-600';
    if (score >= 5000) return 'text-blue-600';
    if (score >= 2000) return 'text-yellow-600';
    return 'text-gray-600';
  };

  return (
    <div className="space-y-6">
      {/* Header and Stats */}
      <Card className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold">Identity Verification Marketplace</h2>
            <p className="text-gray-600 mt-1">
              Verify others' identities and earn PERSONA rewards based on their stake levels
            </p>
          </div>
          
          {userAddress && (
            <div className="text-right">
              <p className="text-lg font-semibold">Your Reputation</p>
              <p className={`text-2xl font-bold ${getReputationColor(userReputation)}`}>
                {userReputation.toLocaleString()}
              </p>
            </div>
          )}
        </div>
        
        {/* Marketplace Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t">
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">{identities.length}</p>
            <p className="text-sm text-gray-600">Available Identities</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">
              {identities.reduce((sum, id) => sum + id.potentialReward, 0).toFixed(1)}
            </p>
            <p className="text-sm text-gray-600">Total Rewards (PERSONA)</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-600">
              {identities.reduce((sum, id) => sum + id.verificationCount, 0)}
            </p>
            <p className="text-sm text-gray-600">Total Verifications</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-orange-600">{myVerifications.length}</p>
            <p className="text-sm text-gray-600">Your Verifications</p>
          </div>
        </div>
      </Card>

      {/* Filters and Sorting */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex gap-2 flex-wrap">
            <span className="text-sm font-medium py-2">Filter:</span>
            {(['all', 'high-reward', 'new', 'elite'] as const).map(f => (
              <Button
                key={f}
                variant={filter === f ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter(f)}
              >
                {f === 'all' ? 'All' : 
                 f === 'high-reward' ? 'High Reward (20+ PERSONA)' :
                 f === 'new' ? 'New (2025)' : 'Elite Tier'}
              </Button>
            ))}
          </div>
          
          <div className="flex gap-2 flex-wrap">
            <span className="text-sm font-medium py-2">Sort:</span>
            {(['reward', 'reputation', 'recent'] as const).map(s => (
              <Button
                key={s}
                variant={sortBy === s ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSortBy(s)}
              >
                {s === 'reward' ? 'Highest Reward' :
                 s === 'reputation' ? 'Best Reputation' : 'Most Recent'}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      {/* Identity Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {filteredAndSortedIdentities.map(identity => {
          const isVerifyingIdentity = isVerifying === identity.did;
          const alreadyVerified = myVerifications.includes(identity.did);
          const isOwnIdentity = identity.owner === userAddress;
          
          return (
            <Card key={identity.did} className="p-6 hover:shadow-lg transition-shadow">
              <div className="space-y-4">
                {/* Header */}
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getTierColor(identity.tier)}`}>
                        {identity.tier}
                      </span>
                      {alreadyVerified && (
                        <span className="px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-600">
                          ✓ Verified by you
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 font-mono">
                      {identity.did.substring(0, 32)}...
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-green-600">
                      +{identity.potentialReward} PERSONA
                    </p>
                    <p className="text-xs text-gray-500">Verification reward</p>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 py-3 border-t border-b">
                  <div className="text-center">
                    <p className="text-lg font-semibold">{identity.stakeAmount.toLocaleString()}</p>
                    <p className="text-xs text-gray-600">PERSONA Staked</p>
                  </div>
                  <div className="text-center">
                    <p className={`text-lg font-semibold ${getReputationColor(identity.reputationScore)}`}>
                      {identity.reputationScore.toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-600">Reputation</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-semibold">{identity.verificationCount}</p>
                    <p className="text-xs text-gray-600">Verifications</p>
                  </div>
                </div>

                {/* Credentials */}
                <div>
                  <p className="text-sm font-semibold mb-2">Verified Credentials:</p>
                  <div className="flex flex-wrap gap-1">
                    {identity.credentials.map((cred, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded">
                        {cred}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action */}
                <div className="pt-2">
                  <Button
                    onClick={() => handleVerifyIdentity(identity)}
                    disabled={isVerifyingIdentity || alreadyVerified || isOwnIdentity || !userAddress}
                    className="w-full"
                  >
                    {!userAddress ? 'Connect Wallet' :
                     isOwnIdentity ? 'Your Identity' :
                     alreadyVerified ? 'Already Verified' :
                     isVerifyingIdentity ? 'Verifying...' :
                     `Verify & Earn ${identity.potentialReward} PERSONA`}
                  </Button>
                  
                  <p className="text-xs text-gray-500 text-center mt-2">
                    Created {identity.createdAt.toLocaleDateString()} • 
                    Requires 1,000 PERSONA verification stake
                  </p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {filteredAndSortedIdentities.length === 0 && (
        <Card className="p-12 text-center">
          <p className="text-gray-500 text-lg">No identities match your current filter.</p>
          <Button
            variant="outline"
            onClick={() => setFilter('all')}
            className="mt-4"
          >
            Show All Identities
          </Button>
        </Card>
      )}

      {/* How it Works */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">🔍 How Identity Verification Works</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-blue-600 mb-2">1. Stake & Verify</h4>
            <p className="text-sm text-gray-700 mb-3">
              Stake 1,000 PERSONA to verify an identity. Review their credentials, reputation, and verification history.
            </p>
            
            <h4 className="font-semibold text-green-600 mb-2">2. Earn Rewards</h4>
            <p className="text-sm text-gray-700">
              Successful verifications earn you PERSONA rewards based on the target's stake amount (1-10% of their stake).
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-purple-600 mb-2">3. Build Reputation</h4>
            <p className="text-sm text-gray-700 mb-3">
              Each verification increases your reputation score, unlocking higher-reward opportunities.
            </p>
            
            <h4 className="font-semibold text-orange-600 mb-2">4. Network Security</h4>
            <p className="text-sm text-gray-700">
              False verifications result in stake slashing. Honest verifiers build the network's trustworthiness.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}