'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { DIDStakingPanel } from '../../components/did-staking-panel';
import { IdentityMarketplace } from '../../components/identity-marketplace';
import { IdentityGovernance } from '../../components/identity-governance';
import { PersonaTradingIntegration } from '../../components/persona-trading-integration';
import { UnifiedOnboarding } from '../../components/unified-onboarding';
import { personaChainClient, type StakedDIDResult } from '../../lib/personachain-client';
import { walletService, type WalletState } from '../../services/wallet-service';

type Tab = 'overview' | 'onboarding' | 'staking' | 'marketplace' | 'governance' | 'trading';

export default function PersonaChainPage() {
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [isConnected, setIsConnected] = useState(false);
  const [userAddress, setUserAddress] = useState<string>('');
  const [balance, setBalance] = useState<number>(0);
  const [reputation, setReputation] = useState<number>(0);
  const [networkStatus, setNetworkStatus] = useState<{ healthy: boolean; chainId: string; blockHeight: number }>({
    healthy: false,
    chainId: '',
    blockHeight: 0
  });
  const [userDIDs, setUserDIDs] = useState<StakedDIDResult[]>([]);

  useEffect(() => {
    initializePersonaChain();
  }, []);

  const initializePersonaChain = async () => {
    try {
      await personaChainClient.connect();
      const status = await personaChainClient.getNetworkStatus();
      setNetworkStatus(status);
    } catch (error) {
      console.error('Failed to initialize PersonaChain:', error);
    }
  };

  const handleWalletConnect = async () => {
    try {
      // In a real implementation, this would integrate with Keplr or other Cosmos wallets
      // For demo purposes, we'll use a mock connection
      const mockMnemonic = "abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about";
      const address = await personaChainClient.connectWallet(mockMnemonic);
      
      setUserAddress(address);
      setIsConnected(true);
      
      // Load user data
      const userBalance = await personaChainClient.getBalance(address);
      const userReputation = await personaChainClient.getReputation(address);
      
      setBalance(userBalance);
      setReputation(userReputation);
      
      console.log('✅ Wallet connected:', address);
    } catch (error) {
      console.error('❌ Failed to connect wallet:', error);
      alert('Failed to connect wallet. Please ensure you have a compatible wallet installed.');
    }
  };

  const handleDIDCreated = (result: StakedDIDResult) => {
    setUserDIDs(prev => [...prev, result]);
    // Refresh user balance and reputation
    loadUserData();
  };

  const loadUserData = async () => {
    if (!userAddress) return;
    
    try {
      const userBalance = await personaChainClient.getBalance(userAddress);
      const userReputation = await personaChainClient.getReputation(userAddress);
      
      setBalance(userBalance);
      setReputation(userReputation);
    } catch (error) {
      console.error('Failed to load user data:', error);
    }
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    setUserAddress('');
    setBalance(0);
    setReputation(0);
    setUserDIDs([]);
  };

  const tabs = [
    { id: 'overview', label: '🏠 Overview', description: 'Network status and introduction' },
    { id: 'onboarding', label: '🚀 Get Started', description: 'Complete Web3 identity setup' },
    { id: 'staking', label: '🔒 DID Staking', description: 'Create staked digital identities' },
    { id: 'marketplace', label: '🛒 Verification Marketplace', description: 'Verify identities and earn rewards' },
    { id: 'governance', label: '🏛️ Governance', description: 'Vote on identity standards' },
    { id: 'trading', label: '💱 Trading', description: 'Trade PERSONA on DEXes' }
  ] as const;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">PersonaChain</h1>
              <span className="ml-3 px-2 py-1 bg-blue-100 text-blue-600 text-xs font-semibold rounded-full">
                Digital Sovereign Identity
              </span>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Network Status Indicator */}
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${networkStatus.healthy ? 'bg-green-500' : 'bg-red-500'}`} />
                <span className="text-sm text-gray-600">
                  {networkStatus.healthy ? 'Connected' : 'Disconnected'}
                </span>
              </div>
              
              {/* Wallet Connection */}
              {isConnected ? (
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                      {userAddress.substring(0, 8)}...{userAddress.substring(-6)}
                    </p>
                    <p className="text-xs text-gray-500">
                      {balance.toLocaleString()} PERSONA
                    </p>
                  </div>
                  <Button variant="outline" size="sm" onClick={handleDisconnect}>
                    Disconnect
                  </Button>
                </div>
              ) : (
                <Button onClick={handleWalletConnect}>
                  Connect Wallet
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as Tab)}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="flex flex-col items-center">
                  <span>{tab.label}</span>
                  <span className="text-xs mt-1 text-gray-400">{tab.description}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Hero Section */}
            <div className="text-center">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Welcome to PersonaChain
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                The first blockchain-native digital identity platform where PERSONA tokens provide economic incentives 
                for identity verification, reputation building, and governance participation.
              </p>
            </div>

            {/* Network Stats */}
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Network Status</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">{networkStatus.blockHeight.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">Block Height</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">1,000,000,000</p>
                  <p className="text-sm text-gray-600">Total PERSONA Supply</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-600">100,000</p>
                  <p className="text-sm text-gray-600">Min Validator Stake</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-orange-600">21</p>
                  <p className="text-sm text-gray-600">Days Unbonding</p>
                </div>
              </div>
            </Card>

            {/* User Dashboard */}
            {isConnected && (
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4">Your PersonaChain Dashboard</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-900">PERSONA Balance</h4>
                    <p className="text-2xl font-bold text-blue-600">{balance.toLocaleString()}</p>
                    <p className="text-sm text-blue-700">Available for staking</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-900">Reputation Score</h4>
                    <p className="text-2xl font-bold text-green-600">{reputation.toLocaleString()}</p>
                    <p className="text-sm text-green-700">Identity trustworthiness</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-purple-900">Staked DIDs</h4>
                    <p className="text-2xl font-bold text-purple-600">{userDIDs.length}</p>
                    <p className="text-sm text-purple-700">Created identities</p>
                  </div>
                </div>
              </Card>
            )}

            {/* Features Overview */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="p-6">
                <div className="text-4xl mb-4">🔒</div>
                <h3 className="text-xl font-semibold mb-2">Identity Staking</h3>
                <p className="text-gray-600">
                  Stake PERSONA tokens to create verified digital identities with reputation scoring and economic security.
                </p>
                <Button 
                  className="mt-4 w-full" 
                  variant="outline"
                  onClick={() => setActiveTab('staking')}
                >
                  Start Staking
                </Button>
              </Card>

              <Card className="p-6">
                <div className="text-4xl mb-4">🛒</div>
                <h3 className="text-xl font-semibold mb-2">Verification Marketplace</h3>
                <p className="text-gray-600">
                  Verify other users' identities and earn PERSONA rewards based on their stake amounts and reputation.
                </p>
                <Button 
                  className="mt-4 w-full" 
                  variant="outline"
                  onClick={() => setActiveTab('marketplace')}
                >
                  Browse Identities
                </Button>
              </Card>

              <Card className="p-6">
                <div className="text-4xl mb-4">🏛️</div>
                <h3 className="text-xl font-semibold mb-2">Sovereign Governance</h3>
                <p className="text-gray-600">
                  Participate in governance to shape identity standards, staking parameters, and network upgrades.
                </p>
                <Button 
                  className="mt-4 w-full" 
                  variant="outline"
                  onClick={() => setActiveTab('governance')}
                >
                  View Proposals
                </Button>
              </Card>

              <Card className="p-6">
                <div className="text-4xl mb-4">💱</div>
                <h3 className="text-xl font-semibold mb-2">PERSONA Trading</h3>
                <p className="text-gray-600">
                  Trade PERSONA tokens on DEXes via IBC integration. Access liquidity pools and cross-chain trading.
                </p>
                <Button 
                  className="mt-4 w-full" 
                  variant="outline"
                  onClick={() => setActiveTab('trading')}
                >
                  Start Trading
                </Button>
              </Card>
            </div>

            {/* Economic Model */}
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">💰 Economic Model</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-blue-600 mb-2">Staking Tiers</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• <strong>Basic:</strong> 1,000 PERSONA - Standard DID features</li>
                    <li>• <strong>Premium:</strong> 10,000 PERSONA - Enhanced verification (2x multiplier)</li>
                    <li>• <strong>Elite:</strong> 100,000 PERSONA - Validator status (5x multiplier)</li>
                    <li>• <strong>Institutional:</strong> 1,000,000 PERSONA - Enterprise features (10x multiplier)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-green-600 mb-2">Reward System</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• <strong>Verification Rewards:</strong> 10-100 PERSONA per successful verification</li>
                    <li>• <strong>Staking Rewards:</strong> 12% APY on staked PERSONA</li>
                    <li>• <strong>Governance Rewards:</strong> Bonus PERSONA for active voting</li>
                    <li>• <strong>Slashing Penalties:</strong> 5% stake loss for malicious behavior</li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* DID Staking Tab */}
        {activeTab === 'staking' && (
          <div>
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-gray-900">DID Staking</h2>
              <p className="text-gray-600 mt-2">
                Create your staked digital identity and earn reputation through PERSONA token commitment
              </p>
            </div>
            <DIDStakingPanel 
              userAddress={userAddress} 
              onDIDCreated={handleDIDCreated}
            />
          </div>
        )}

        {/* Identity Marketplace Tab */}
        {activeTab === 'marketplace' && (
          <div>
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-gray-900">Identity Verification Marketplace</h2>
              <p className="text-gray-600 mt-2">
                Verify other users' identities and earn PERSONA rewards while building network trust
              </p>
            </div>
            <IdentityMarketplace 
              userAddress={userAddress}
              userReputation={reputation}
            />
          </div>
        )}

        {/* Governance Tab */}
        {activeTab === 'governance' && (
          <div>
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-gray-900">Identity Governance</h2>
              <p className="text-gray-600 mt-2">
                Shape the future of PersonaChain identity standards through democratic participation
              </p>
            </div>
            <IdentityGovernance 
              userAddress={userAddress}
              userVotingPower={balance}
            />
          </div>
        )}

        {/* Trading Tab */}
        {activeTab === 'trading' && (
          <div>
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-gray-900">PERSONA Trading</h2>
              <p className="text-gray-600 mt-2">
                Trade PERSONA tokens on decentralized exchanges through IBC integration with Osmosis
              </p>
            </div>
            <PersonaTradingIntegration />
          </div>
        )}

        {/* Onboarding Tab */}
        {activeTab === 'onboarding' && (
          <div>
            <UnifiedOnboarding />
          </div>
        )}
      </div>
    </div>
  );
}