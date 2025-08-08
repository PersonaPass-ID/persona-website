/**
 * PersonaChain Client - Blockchain integration for PersonaPass
 * Enables PERSONA staking for digital identity verification
 */
'use client';

// Dynamic imports to avoid SSR issues
let SigningStargateClient: any;
let StargateClient: any; 
let Registry: any;
let DirectSecp256k1HdWallet: any;
let stringToPath: any;

if (typeof window !== 'undefined') {
  Promise.all([
    import('@cosmjs/stargate'),
    import('@cosmjs/proto-signing'),
    import('@cosmjs/crypto')
  ]).then(([stargateModule, protoModule, cryptoModule]) => {
    SigningStargateClient = stargateModule.SigningStargateClient;
    StargateClient = stargateModule.StargateClient;
    Registry = protoModule.Registry;
    DirectSecp256k1HdWallet = protoModule.DirectSecp256k1HdWallet;
    stringToPath = cryptoModule.stringToPath;
  });
}

// PersonaChain configuration
export const PERSONACHAIN_CONFIG = {
  chainId: process.env.NEXT_PUBLIC_PERSONACHAIN_CHAIN_ID || 'personachain-1',
  rpcUrl: process.env.NEXT_PUBLIC_PERSONACHAIN_RPC || 'http://personachain-rpc-lb-463662045.us-east-1.elb.amazonaws.com',
  restUrl: process.env.NEXT_PUBLIC_PERSONACHAIN_REST || 'http://personachain-rpc-lb-463662045.us-east-1.elb.amazonaws.com:1317',
  addressPrefix: 'persona',
  coinType: 118,
  stakingDenom: 'upersona',
  chainName: 'PersonaChain'
};

// Minimum staking requirements
export const STAKING_TIERS = {
  BASIC: 1000000000, // 1,000 PERSONA
  PREMIUM: 10000000000, // 10,000 PERSONA  
  ELITE: 100000000000, // 100,000 PERSONA
  INSTITUTIONAL: 1000000000000 // 1,000,000 PERSONA
} as const;

export interface PersonaDIDDocument {
  id: string;
  controller: string;
  created: Date;
  updated: Date;
  stakeAmount: number;
  stakeExpiry: Date;
  reputationScore: number;
  verificationCount: number;
}

export interface StakedDIDResult {
  did: string;
  stakeId: string;
  reputationScore: number;
  expiresAt: Date;
  txHash: string;
}

export interface VerificationResult {
  verified: boolean;
  rewardEarned: number;
  newReputationScore: number;
  txHash: string;
}

export interface PersonaReputation {
  baseScore: number;
  stakeMultiplier: number;
  verificationCount: number;
  timeWeight: number;
  networkContribution: number;
}

export class PersonaChainClient {
  private client?: any; // StargateClient
  private signingClient?: any; // SigningStargateClient
  private wallet?: any; // DirectSecp256k1HdWallet
  public userAddress?: string;

  constructor(private config = PERSONACHAIN_CONFIG) {}

  /**
   * Connect to PersonaChain network
   */
  async connect(): Promise<void> {
    try {
      this.client = await StargateClient.connect(this.config.rpcUrl);
      console.log('✅ Connected to PersonaChain');
    } catch (error) {
      console.error('❌ Failed to connect to PersonaChain:', error);
      throw new Error('Failed to connect to PersonaChain network');
    }
  }

  /**
   * Connect wallet for signing transactions
   */
  async connectWallet(mnemonic: string): Promise<string> {
    try {
      this.wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, {
        prefix: this.config.addressPrefix,
        hdPaths: [stringToPath("m/44'/118'/0'/0/0")]
      });

      const accounts = await this.wallet.getAccounts();
      if (accounts.length === 0) {
        throw new Error('No accounts found in wallet');
      }
      this.userAddress = accounts[0]!.address;

      this.signingClient = await SigningStargateClient.connectWithSigner(
        this.config.rpcUrl,
        this.wallet
      );

      console.log('✅ Wallet connected:', this.userAddress);
      return this.userAddress!;
    } catch (error) {
      console.error('❌ Failed to connect wallet:', error);
      throw new Error('Failed to connect wallet to PersonaChain');
    }
  }

  /**
   * Get user's PERSONA token balance
   */
  async getBalance(address?: string): Promise<number> {
    if (!this.client) throw new Error('Client not connected');
    
    const targetAddress = address || this.userAddress;
    if (!targetAddress) throw new Error('No address provided');

    try {
      const balance = await this.client.getBalance(targetAddress, this.config.stakingDenom);
      return parseInt(balance.amount) / 1000000; // Convert from upersona to PERSONA
    } catch (error) {
      console.error('❌ Failed to get balance:', error);
      return 0;
    }
  }

  /**
   * Create DID with PERSONA staking
   */
  async createStakedDID(
    credentials: any[],
    stakeAmount: number,
    duration: number = 30 * 24 * 3600 // 30 days default
  ): Promise<StakedDIDResult> {
    if (!this.signingClient || !this.userAddress) {
      throw new Error('Wallet not connected');
    }

    // Validate minimum stake
    if (stakeAmount < STAKING_TIERS.BASIC) {
      throw new Error(`Minimum stake of ${STAKING_TIERS.BASIC / 1000000} PERSONA required`);
    }

    const didDoc = this.generateDIDDocument(credentials);
    const stakeAmountMicro = (stakeAmount * 1000000).toString(); // Convert to upersona

    const stakeMsg = {
      typeUrl: '/persona.did.v1.MsgCreateStakedDID',
      value: {
        creator: this.userAddress,
        didDocument: JSON.stringify(didDoc),
        stakeAmount: stakeAmountMicro,
        stakeDuration: duration.toString() + 's'
      }
    };

    try {
      const fee = this.calculateFee();
      const result = await this.signingClient.signAndBroadcast(
        this.userAddress,
        [stakeMsg],
        fee
      );

      // Extract results from transaction events
      const stakeId = this.extractEventAttribute(result, 'stake_created', 'stake_id') || 
                     `${this.userAddress}_${Date.now()}`;

      const reputationScore = await this.calculateReputation(this.userAddress, stakeAmount);

      return {
        did: didDoc.id,
        stakeId,
        reputationScore,
        expiresAt: new Date(Date.now() + duration * 1000),
        txHash: result.transactionHash
      };
    } catch (error) {
      console.error('❌ Failed to create staked DID:', error);
      throw new Error('Failed to create DID with stake');
    }
  }

  /**
   * Verify another user's DID and earn rewards
   */
  async verifyDID(targetDID: string, verificationProof: any): Promise<VerificationResult> {
    if (!this.signingClient || !this.userAddress) {
      throw new Error('Wallet not connected');
    }

    const verifyMsg = {
      typeUrl: '/persona.did.v1.MsgVerifyDID',
      value: {
        verifier: this.userAddress,
        targetDid: targetDID,
        proof: JSON.stringify(verificationProof),
        stake: (1000 * 1000000).toString() // 1000 PERSONA verification stake
      }
    };

    try {
      const fee = this.calculateFee();
      const result = await this.signingClient.signAndBroadcast(
        this.userAddress,
        [verifyMsg],
        fee
      );

      const rewardEarned = this.extractReward(result);
      const newReputationScore = await this.calculateReputation(this.userAddress);

      return {
        verified: true,
        rewardEarned,
        newReputationScore,
        txHash: result.transactionHash
      };
    } catch (error) {
      console.error('❌ Failed to verify DID:', error);
      throw new Error('Failed to verify DID');
    }
  }

  /**
   * Vote on identity governance proposals
   */
  async voteOnIdentityProposal(
    proposalId: number, 
    vote: 'yes' | 'no' | 'abstain'
  ): Promise<{ voted: boolean; votingPower: number; txHash: string }> {
    if (!this.signingClient || !this.userAddress) {
      throw new Error('Wallet not connected');
    }

    const voteMsg = {
      typeUrl: '/cosmos.gov.v1beta1.MsgVote',
      value: {
        proposalId: proposalId.toString(),
        voter: this.userAddress,
        option: vote === 'yes' ? 1 : vote === 'no' ? 3 : 2
      }
    };

    try {
      const fee = this.calculateFee();
      const result = await this.signingClient.signAndBroadcast(
        this.userAddress,
        [voteMsg],
        fee
      );

      const votingPower = await this.getVotingPower(this.userAddress);

      return {
        voted: true,
        votingPower,
        txHash: result.transactionHash
      };
    } catch (error) {
      console.error('❌ Failed to vote on proposal:', error);
      throw new Error('Failed to vote on identity proposal');
    }
  }

  /**
   * Get user's reputation score
   */
  async getReputation(address?: string): Promise<number> {
    const targetAddress = address || this.userAddress;
    if (!targetAddress) throw new Error('No address provided');

    // For now, calculate based on stake amount
    // In production, this would query the blockchain state
    const balance = await this.getBalance(targetAddress);
    const stakeAmount = balance * 1000000; // Convert to upersona
    
    return this.calculateReputationScore({
      baseScore: 100,
      stakeMultiplier: this.getStakeMultiplier(stakeAmount),
      verificationCount: 0, // TODO: Query from chain
      timeWeight: 1,
      networkContribution: 0
    });
  }

  /**
   * Calculate reputation score
   */
  private calculateReputationScore(persona: PersonaReputation): number {
    const basePoints = persona.baseScore;
    const stakeBonus = Math.min(persona.stakeMultiplier, 10); // Cap at 10x
    const verificationBonus = Math.min(persona.verificationCount * 5, 500);
    const timeBonus = Math.min(persona.timeWeight * 10, 200);
    const networkBonus = persona.networkContribution * 20;
    
    return Math.min(
      basePoints * stakeBonus + verificationBonus + timeBonus + networkBonus, 
      10000
    );
  }

  /**
   * Get stake multiplier based on amount
   */
  private getStakeMultiplier(stakeAmount: number): number {
    if (stakeAmount >= 1000000000000) return 10; // 1M PERSONA = 10x
    if (stakeAmount >= 100000000000) return 5;   // 100K PERSONA = 5x
    if (stakeAmount >= 10000000000) return 2;    // 10K PERSONA = 2x
    return Math.max(1, stakeAmount / 1000000000); // 1K PERSONA = 1x
  }

  /**
   * Calculate reputation from address and stake
   */
  private async calculateReputation(address: string, stakeAmount?: number): Promise<number> {
    const balance = stakeAmount || (await this.getBalance(address) * 1000000);
    
    return this.calculateReputationScore({
      baseScore: 100,
      stakeMultiplier: this.getStakeMultiplier(balance),
      verificationCount: 0, // TODO: Query from chain
      timeWeight: 1,
      networkContribution: 0
    });
  }

  /**
   * Generate DID Document
   */
  private generateDIDDocument(credentials: any[]): any {
    if (!this.userAddress) throw new Error('No user address');

    return {
      "@context": ["https://www.w3.org/ns/did/v1"],
      id: `did:persona:${this.userAddress}`,
      controller: this.userAddress,
      verificationMethod: [{
        id: `did:persona:${this.userAddress}#key-1`,
        type: "Ed25519VerificationKey2020",
        controller: `did:persona:${this.userAddress}`,
        publicKeyMultibase: this.userAddress
      }],
      authentication: [`did:persona:${this.userAddress}#key-1`],
      assertionMethod: [`did:persona:${this.userAddress}#key-1`],
      keyAgreement: [`did:persona:${this.userAddress}#key-1`],
      credentials: credentials,
      created: new Date().toISOString(),
      updated: new Date().toISOString()
    };
  }

  /**
   * Calculate transaction fee
   */
  private calculateFee() {
    return {
      amount: [{ denom: this.config.stakingDenom, amount: "5000" }],
      gas: "200000"
    };
  }

  /**
   * Extract event attribute from transaction result
   */
  private extractEventAttribute(result: any, eventType: string, attributeKey: string): string | null {
    try {
      const event = result.events?.find((e: any) => e.type === eventType);
      const attribute = event?.attributes?.find((a: any) => a.key === attributeKey);
      return attribute?.value || null;
    } catch {
      return null;
    }
  }

  /**
   * Extract reward amount from transaction result
   */
  private extractReward(result: any): number {
    try {
      const rewardStr = this.extractEventAttribute(result, 'reward_earned', 'amount');
      return rewardStr ? parseInt(rewardStr) / 1000000 : 0; // Convert from upersona
    } catch {
      return 0;
    }
  }

  /**
   * Get voting power for governance
   */
  private async getVotingPower(address: string): Promise<number> {
    const balance = await this.getBalance(address);
    return balance; // 1 PERSONA = 1 vote
  }

  /**
   * Check network status
   */
  async getNetworkStatus(): Promise<{ healthy: boolean; chainId: string; blockHeight: number }> {
    if (!this.client) throw new Error('Client not connected');

    try {
      const status = await this.client.getChainId();
      const height = await this.client.getHeight();
      
      return {
        healthy: true,
        chainId: status,
        blockHeight: height
      };
    } catch (error) {
      return {
        healthy: false,
        chainId: this.config.chainId,
        blockHeight: 0
      };
    }
  }
}

// Export singleton instance
export const personaChainClient = new PersonaChainClient();