'use client';

import React, { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { personaChainClient } from '../lib/personachain-client';

interface Proposal {
  id: number;
  title: string;
  description: string;
  proposer: string;
  status: 'voting' | 'passed' | 'rejected' | 'pending';
  category: 'identity-standards' | 'staking-parameters' | 'network-upgrade' | 'treasury';
  votingStart: Date;
  votingEnd: Date;
  yesVotes: number;
  noVotes: number;
  abstainVotes: number;
  totalVotingPower: number;
  quorum: number;
  threshold: number;
  userVote?: 'yes' | 'no' | 'abstain';
}

const MOCK_PROPOSALS: Proposal[] = [
  {
    id: 1,
    title: 'Reduce Minimum DID Staking Requirement',
    description: 'Proposal to reduce the minimum staking requirement for DID creation from 1,000 PERSONA to 500 PERSONA to increase accessibility for new users while maintaining security.',
    proposer: 'persona1validator123abc',
    status: 'voting',
    category: 'staking-parameters',
    votingStart: new Date('2025-01-20'),
    votingEnd: new Date('2025-02-03'),
    yesVotes: 12500000,
    noVotes: 8200000,
    abstainVotes: 1800000,
    totalVotingPower: 50000000,
    quorum: 33.4,
    threshold: 50.0
  },
  {
    id: 2,
    title: 'Implement Advanced KYC Standards',
    description: 'Introduce enhanced KYC verification standards for high-tier identities, including biometric verification and enhanced due diligence for institutional accounts.',
    proposer: 'persona1enterprise456def',
    status: 'voting',
    category: 'identity-standards',
    votingStart: new Date('2025-01-18'),
    votingEnd: new Date('2025-02-01'),
    yesVotes: 18900000,
    noVotes: 2100000,
    abstainVotes: 3200000,
    totalVotingPower: 50000000,
    quorum: 33.4,
    threshold: 50.0
  },
  {
    id: 3,
    title: 'PersonaChain v2.0 Network Upgrade',
    description: 'Major network upgrade including improved consensus mechanism, enhanced privacy features, and cross-chain interoperability improvements.',
    proposer: 'persona1developer789ghi',
    status: 'passed',
    category: 'network-upgrade',
    votingStart: new Date('2024-12-01'),
    votingEnd: new Date('2024-12-15'),
    yesVotes: 31200000,
    noVotes: 4500000,
    abstainVotes: 2800000,
    totalVotingPower: 45000000,
    quorum: 33.4,
    threshold: 66.7
  },
  {
    id: 4,
    title: 'Community Development Fund Allocation',
    description: 'Allocate 5M PERSONA from the community treasury for developer grants, hackathons, and ecosystem development initiatives over the next 12 months.',
    proposer: 'persona1community999xyz',
    status: 'pending',
    category: 'treasury',
    votingStart: new Date('2025-02-10'),
    votingEnd: new Date('2025-02-24'),
    yesVotes: 0,
    noVotes: 0,
    abstainVotes: 0,
    totalVotingPower: 50000000,
    quorum: 33.4,
    threshold: 50.0
  }
];

interface IdentityGovernanceProps {
  userAddress?: string;
  userVotingPower?: number;
}

export function IdentityGovernance({ userAddress, userVotingPower = 0 }: IdentityGovernanceProps) {
  const [proposals, setProposals] = useState<Proposal[]>(MOCK_PROPOSALS);
  const [filter, setFilter] = useState<'all' | 'voting' | 'passed' | 'pending'>('all');
  const [votingProposal, setVotingProposal] = useState<number | null>(null);
  const [selectedVote, setSelectedVote] = useState<'yes' | 'no' | 'abstain'>('yes');

  const filteredProposals = proposals.filter(p => 
    filter === 'all' || p.status === filter
  );

  const handleVote = async (proposalId: number, vote: 'yes' | 'no' | 'abstain') => {
    if (!userAddress) {
      alert('Please connect your wallet first');
      return;
    }

    if (userVotingPower === 0) {
      alert('You need to stake PERSONA tokens to participate in governance');
      return;
    }

    setVotingProposal(proposalId);

    try {
      const result = await personaChainClient.voteOnIdentityProposal(proposalId, vote);

      // Update local state
      setProposals(prev => prev.map(p => 
        p.id === proposalId 
          ? { 
              ...p, 
              userVote: vote,
              yesVotes: vote === 'yes' ? p.yesVotes + userVotingPower : p.yesVotes,
              noVotes: vote === 'no' ? p.noVotes + userVotingPower : p.noVotes,
              abstainVotes: vote === 'abstain' ? p.abstainVotes + userVotingPower : p.abstainVotes
            }
          : p
      ));

      alert(
        `✅ Vote submitted successfully!\n` +
        `Your vote: ${vote.toUpperCase()}\n` +
        `Voting power used: ${userVotingPower.toLocaleString()} PERSONA\n` +
        `Transaction: ${result.txHash?.substring(0, 16)}...`
      );

    } catch (error) {
      console.error('Voting failed:', error);
      alert(`❌ Voting failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setVotingProposal(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'voting': return 'text-blue-600 bg-blue-100';
      case 'passed': return 'text-green-600 bg-green-100';
      case 'rejected': return 'text-red-600 bg-red-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'identity-standards': return 'text-purple-600 bg-purple-50';
      case 'staking-parameters': return 'text-blue-600 bg-blue-50';
      case 'network-upgrade': return 'text-orange-600 bg-orange-50';
      case 'treasury': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const calculateVotePercentage = (votes: number, total: number) => {
    if (total === 0) return 0;
    return (votes / total) * 100;
  };

  const getQuorumStatus = (proposal: Proposal) => {
    const participationRate = ((proposal.yesVotes + proposal.noVotes + proposal.abstainVotes) / proposal.totalVotingPower) * 100;
    return participationRate >= proposal.quorum;
  };

  const getPassingStatus = (proposal: Proposal) => {
    const totalVotes = proposal.yesVotes + proposal.noVotes + proposal.abstainVotes;
    if (totalVotes === 0) return false;
    const yesPercentage = (proposal.yesVotes / totalVotes) * 100;
    return yesPercentage >= proposal.threshold;
  };

  const getDaysRemaining = (endDate: Date) => {
    const now = new Date();
    const diffTime = endDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  };

  return (
    <div className="space-y-6">
      {/* Header and Stats */}
      <Card className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold">Identity Governance</h2>
            <p className="text-gray-600 mt-1">
              Shape the future of PersonaChain identity standards through democratic voting
            </p>
          </div>
          
          {userAddress && (
            <div className="text-right">
              <p className="text-lg font-semibold">Your Voting Power</p>
              <p className="text-2xl font-bold text-blue-600">
                {userVotingPower.toLocaleString()}
              </p>
              <p className="text-sm text-gray-500">PERSONA staked</p>
            </div>
          )}
        </div>

        {/* Governance Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t">
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">
              {proposals.filter(p => p.status === 'voting').length}
            </p>
            <p className="text-sm text-gray-600">Active Proposals</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">
              {proposals.filter(p => p.status === 'passed').length}
            </p>
            <p className="text-sm text-gray-600">Passed</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-600">
              {(proposals[0]?.totalVotingPower || 0).toLocaleString()}
            </p>
            <p className="text-sm text-gray-600">Total Voting Power</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-orange-600">
              {proposals.filter(p => p.userVote).length}
            </p>
            <p className="text-sm text-gray-600">Your Votes</p>
          </div>
        </div>
      </Card>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex gap-2 flex-wrap">
          <span className="text-sm font-medium py-2">Show:</span>
          {(['all', 'voting', 'passed', 'pending'] as const).map(f => (
            <Button
              key={f}
              variant={filter === f ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter(f)}
            >
              {f === 'all' ? 'All Proposals' : 
               f === 'voting' ? 'Currently Voting' :
               f === 'passed' ? 'Passed' : 'Upcoming'}
            </Button>
          ))}
        </div>
      </Card>

      {/* Proposals */}
      <div className="space-y-6">
        {filteredProposals.map(proposal => {
          const isVoting = votingProposal === proposal.id;
          const hasVoted = !!proposal.userVote;
          const daysRemaining = getDaysRemaining(proposal.votingEnd);
          const quorumMet = getQuorumStatus(proposal);
          const willPass = getPassingStatus(proposal);
          const totalVotes = proposal.yesVotes + proposal.noVotes + proposal.abstainVotes;

          return (
            <Card key={proposal.id} className="p-6">
              <div className="space-y-4">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(proposal.status)}`}>
                        {proposal.status.toUpperCase()}
                      </span>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getCategoryColor(proposal.category)}`}>
                        {proposal.category.split('-').map(word => 
                          word.charAt(0).toUpperCase() + word.slice(1)
                        ).join(' ')}
                      </span>
                      {hasVoted && (
                        <span className="px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-600">
                          You voted: {proposal.userVote?.toUpperCase()}
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{proposal.title}</h3>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {proposal.description}
                    </p>
                  </div>
                  
                  {proposal.status === 'voting' && (
                    <div className="text-right">
                      <p className="text-lg font-semibold">
                        {daysRemaining === 0 ? 'Ends today' : `${daysRemaining} days left`}
                      </p>
                      <p className="text-sm text-gray-500">
                        Ends {proposal.votingEnd.toLocaleDateString()}
                      </p>
                    </div>
                  )}
                </div>

                {/* Voting Results */}
                {totalVotes > 0 && (
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm">
                      <span>Participation: {((totalVotes / proposal.totalVotingPower) * 100).toFixed(1)}%</span>
                      <div className="flex items-center gap-4">
                        <span className={quorumMet ? 'text-green-600' : 'text-red-600'}>
                          Quorum: {proposal.quorum}% {quorumMet ? '✓' : '✗'}
                        </span>
                        {proposal.status === 'voting' && (
                          <span className={willPass ? 'text-green-600' : 'text-red-600'}>
                            {willPass ? 'Passing' : 'Failing'}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Vote Bars */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <div className="w-12 text-sm text-green-600 font-medium">YES</div>
                        <div className="flex-1 bg-gray-200 rounded-full h-6 relative">
                          <div 
                            className="bg-green-500 h-6 rounded-full flex items-center justify-end pr-2"
                            style={{ width: `${calculateVotePercentage(proposal.yesVotes, totalVotes)}%` }}
                          >
                            <span className="text-white text-xs font-medium">
                              {calculateVotePercentage(proposal.yesVotes, totalVotes).toFixed(1)}%
                            </span>
                          </div>
                        </div>
                        <div className="w-20 text-sm text-gray-600 text-right">
                          {(proposal.yesVotes / 1000000).toFixed(1)}M
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="w-12 text-sm text-red-600 font-medium">NO</div>
                        <div className="flex-1 bg-gray-200 rounded-full h-6 relative">
                          <div 
                            className="bg-red-500 h-6 rounded-full flex items-center justify-end pr-2"
                            style={{ width: `${calculateVotePercentage(proposal.noVotes, totalVotes)}%` }}
                          >
                            <span className="text-white text-xs font-medium">
                              {calculateVotePercentage(proposal.noVotes, totalVotes).toFixed(1)}%
                            </span>
                          </div>
                        </div>
                        <div className="w-20 text-sm text-gray-600 text-right">
                          {(proposal.noVotes / 1000000).toFixed(1)}M
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="w-12 text-sm text-yellow-600 font-medium">ABSTAIN</div>
                        <div className="flex-1 bg-gray-200 rounded-full h-6 relative">
                          <div 
                            className="bg-yellow-500 h-6 rounded-full flex items-center justify-end pr-2"
                            style={{ width: `${calculateVotePercentage(proposal.abstainVotes, totalVotes)}%` }}
                          >
                            <span className="text-white text-xs font-medium">
                              {calculateVotePercentage(proposal.abstainVotes, totalVotes).toFixed(1)}%
                            </span>
                          </div>
                        </div>
                        <div className="w-20 text-sm text-gray-600 text-right">
                          {(proposal.abstainVotes / 1000000).toFixed(1)}M
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Voting Actions */}
                {proposal.status === 'voting' && !hasVoted && (
                  <div className="pt-4 border-t">
                    <div className="flex flex-col md:flex-row gap-3">
                      <div className="flex gap-2 flex-1">
                        <Button
                          variant={selectedVote === 'yes' ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setSelectedVote('yes')}
                          className="bg-green-500 hover:bg-green-600 text-white border-green-500"
                        >
                          Vote YES
                        </Button>
                        <Button
                          variant={selectedVote === 'no' ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setSelectedVote('no')}
                          className="bg-red-500 hover:bg-red-600 text-white border-red-500"
                        >
                          Vote NO
                        </Button>
                        <Button
                          variant={selectedVote === 'abstain' ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setSelectedVote('abstain')}
                          className="bg-yellow-500 hover:bg-yellow-600 text-white border-yellow-500"
                        >
                          Abstain
                        </Button>
                      </div>
                      
                      <Button
                        onClick={() => handleVote(proposal.id, selectedVote)}
                        disabled={!userAddress || userVotingPower === 0 || isVoting}
                        className="min-w-[200px]"
                      >
                        {!userAddress ? 'Connect Wallet' :
                         userVotingPower === 0 ? 'No Voting Power' :
                         isVoting ? 'Submitting Vote...' :
                         `Submit ${selectedVote.toUpperCase()} Vote`}
                      </Button>
                    </div>
                    
                    {userAddress && userVotingPower > 0 && (
                      <p className="text-sm text-gray-600 mt-2">
                        Your voting power: {userVotingPower.toLocaleString()} PERSONA
                      </p>
                    )}
                  </div>
                )}

                {/* Proposal Details */}
                <div className="pt-3 border-t text-sm text-gray-600">
                  <div className="flex flex-wrap gap-4">
                    <span>Proposal #{proposal.id}</span>
                    <span>Proposer: {proposal.proposer.substring(0, 16)}...</span>
                    <span>Started: {proposal.votingStart.toLocaleDateString()}</span>
                    {proposal.threshold > 50 && (
                      <span>Threshold: {proposal.threshold}%</span>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* How Governance Works */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">🏛️ How PersonaChain Governance Works</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-blue-600 mb-2">Voting Power</h4>
            <p className="text-sm text-gray-700 mb-3">
              Your voting power equals your staked PERSONA tokens. Higher stakes = more influence on network decisions.
            </p>
            
            <h4 className="font-semibold text-green-600 mb-2">Proposal Types</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Identity Standards (50% threshold)</li>
              <li>• Staking Parameters (50% threshold)</li>
              <li>• Network Upgrades (66.7% threshold)</li>
              <li>• Treasury Decisions (50% threshold)</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-purple-600 mb-2">Voting Process</h4>
            <p className="text-sm text-gray-700 mb-3">
              Proposals require 33.4% participation (quorum) and varying approval thresholds to pass.
            </p>
            
            <h4 className="font-semibold text-orange-600 mb-2">Stake to Participate</h4>
            <p className="text-sm text-gray-700">
              Only staked PERSONA holders can vote. Your stake determines your voting power and ensures commitment to network health.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}