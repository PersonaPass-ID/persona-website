/**
 * Wallet Service - Comprehensive Web3 wallet integration for PersonaPass
 * Supports Keplr, Leap, Cosmostation with persistent login
 */
'use client';

import type { Window as KeplrWindow } from '@keplr-wallet/types';

// Dynamic imports to avoid SSR issues
let SigningStargateClient: any;
let StargateClient: any;

if (typeof window !== 'undefined') {
  import('@cosmjs/stargate').then(module => {
    SigningStargateClient = module.SigningStargateClient;
    StargateClient = module.StargateClient;
  });
}

declare global {
  interface Window extends KeplrWindow {}
}

export interface WalletConfig {
  chainId: string;
  chainName: string;
  rpc: string;
  rest: string;
  bip44: {
    coinType: number;
  };
  bech32Config: {
    bech32PrefixAccAddr: string;
    bech32PrefixAccPub: string;
    bech32PrefixValAddr: string;
    bech32PrefixValPub: string;
    bech32PrefixConsAddr: string;
    bech32PrefixConsPub: string;
  };
  currencies: Array<{
    coinDenom: string;
    coinMinimalDenom: string;
    coinDecimals: number;
  }>;
  feeCurrencies: Array<{
    coinDenom: string;
    coinMinimalDenom: string;
    coinDecimals: number;
    coinGeckoId?: string;
  }>;
  stakeCurrency: {
    coinDenom: string;
    coinMinimalDenom: string;
    coinDecimals: number;
  };
  features?: string[];
}

export interface WalletConnection {
  address: string;
  name: string;
  algo: string;
  pubkey: Uint8Array;
  isNanoLedger: boolean;
}

export interface WalletState {
  isConnected: boolean;
  isConnecting: boolean;
  address: string | null;
  balance: number;
  did: string | null;
  credentials: any[];
  walletType: 'keplr' | 'leap' | 'cosmostation' | 'web3auth' | null;
}

// PersonaChain configuration
export const PERSONACHAIN_CONFIG: WalletConfig = {
  chainId: process.env.NEXT_PUBLIC_PERSONACHAIN_CHAIN_ID || 'personachain-1',
  chainName: process.env.NEXT_PUBLIC_PERSONACHAIN_CHAIN_NAME || 'PersonaChain',
  rpc: process.env.NEXT_PUBLIC_PERSONACHAIN_RPC || 'http://personachain-rpc-lb-463662045.us-east-1.elb.amazonaws.com',
  rest: process.env.NEXT_PUBLIC_PERSONACHAIN_REST || 'http://personachain-rpc-lb-463662045.us-east-1.elb.amazonaws.com:1317',
  bip44: {
    coinType: 118
  },
  bech32Config: {
    bech32PrefixAccAddr: 'persona',
    bech32PrefixAccPub: 'personapub',
    bech32PrefixValAddr: 'personavaloper',
    bech32PrefixValPub: 'personavaloperpub',
    bech32PrefixConsAddr: 'personavalcons',
    bech32PrefixConsPub: 'personavalconspub'
  },
  currencies: [{
    coinDenom: 'PERSONA',
    coinMinimalDenom: 'upersona',
    coinDecimals: 6
  }],
  feeCurrencies: [{
    coinDenom: 'PERSONA',
    coinMinimalDenom: 'upersona',
    coinDecimals: 6,
    coinGeckoId: 'persona'
  }],
  stakeCurrency: {
    coinDenom: 'PERSONA',
    coinMinimalDenom: 'upersona',
    coinDecimals: 6
  },
  features: ['stargate', 'ibc-transfer', 'cosmwasm']
};

class WalletService {
  private client?: any; // StargateClient
  private signingClient?: any; // SigningStargateClient
  private state: WalletState = {
    isConnected: false,
    isConnecting: false,
    address: null,
    balance: 0,
    did: null,
    credentials: [],
    walletType: null
  };
  private listeners: ((state: WalletState) => void)[] = [];

  constructor() {
    // Check for existing connection on initialization
    if (typeof window !== 'undefined') {
      this.checkExistingConnection();
    }
  }

  /**
   * Subscribe to wallet state changes
   */
  subscribe(listener: (state: WalletState) => void): () => void {
    this.listeners.push(listener);
    listener(this.state);
    
    return () => {
      const index = this.listeners.indexOf(listener);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }

  /**
   * Update state and notify listeners
   */
  private updateState(updates: Partial<WalletState>) {
    this.state = { ...this.state, ...updates };
    this.listeners.forEach(listener => listener(this.state));
  }

  /**
   * Check for existing wallet connection
   */
  async checkExistingConnection(): Promise<void> {
    try {
      // Check localStorage for saved connection
      const savedWallet = localStorage.getItem('personapass_wallet');
      const savedAddress = localStorage.getItem('personapass_wallet_address');
      const savedDID = localStorage.getItem('personapass_did');
      
      if (savedWallet && savedAddress) {
        // Try to reconnect
        if (savedWallet === 'keplr' && window.keplr) {
          await this.connectKeplr(false);
        } else if (savedWallet === 'leap' && window.leap) {
          await this.connectLeap(false);
        } else if (savedWallet === 'cosmostation' && window.cosmostation) {
          await this.connectCosmostation(false);
        }
        
        // Load user data
        if (savedDID) {
          const credentials = JSON.parse(localStorage.getItem(`credentials_${savedAddress}`) || '[]');
          this.updateState({ did: savedDID, credentials });
        }
      }
    } catch (error) {
      console.error('Failed to restore wallet connection:', error);
    }
  }

  /**
   * Connect to Keplr wallet
   */
  async connectKeplr(saveConnection = true): Promise<WalletConnection> {
    if (!window.keplr) {
      throw new Error('Keplr wallet not installed');
    }

    this.updateState({ isConnecting: true });

    try {
      // Add PersonaChain to Keplr
      await window.keplr.experimentalSuggestChain(PERSONACHAIN_CONFIG);
      
      // Enable wallet
      await window.keplr.enable(PERSONACHAIN_CONFIG.chainId);
      
      // Get signer
      const offlineSigner = window.keplr.getOfflineSigner(PERSONACHAIN_CONFIG.chainId);
      const accounts = await offlineSigner.getAccounts();
      
      if (accounts.length === 0) {
        throw new Error('No accounts found');
      }

      const account = accounts[0];
      if (!account) {
        throw new Error('No account found');
      }
      
      // Connect to blockchain
      this.signingClient = await SigningStargateClient.connectWithSigner(
        PERSONACHAIN_CONFIG.rpc,
        offlineSigner
      );
      this.client = await StargateClient.connect(PERSONACHAIN_CONFIG.rpc);

      // Get balance
      const balance = await this.getBalance(account.address);

      // Update state
      this.updateState({
        isConnected: true,
        isConnecting: false,
        address: account.address,
        balance,
        walletType: 'keplr'
      });

      // Save connection
      if (saveConnection) {
        localStorage.setItem('personapass_wallet', 'keplr');
        localStorage.setItem('personapass_wallet_address', account.address);
      }

      return {
        address: account.address,
        name: 'Keplr Account',
        algo: account.algo,
        pubkey: account.pubkey,
        isNanoLedger: false
      };

    } catch (error) {
      this.updateState({ isConnecting: false });
      throw error;
    }
  }

  /**
   * Connect to Leap wallet
   */
  async connectLeap(saveConnection = true): Promise<WalletConnection> {
    if (!window.leap) {
      throw new Error('Leap wallet not installed');
    }

    this.updateState({ isConnecting: true });

    try {
      // Add PersonaChain to Leap
      await window.leap.experimentalSuggestChain(PERSONACHAIN_CONFIG);
      
      // Enable wallet
      await window.leap.enable(PERSONACHAIN_CONFIG.chainId);
      
      // Get signer
      const offlineSigner = window.leap.getOfflineSigner(PERSONACHAIN_CONFIG.chainId);
      const accounts = await offlineSigner.getAccounts();
      
      if (accounts.length === 0) {
        throw new Error('No accounts found');
      }

      const account = accounts[0];
      if (!account) {
        throw new Error('No account found');
      }
      
      // Connect to blockchain
      this.signingClient = await SigningStargateClient.connectWithSigner(
        PERSONACHAIN_CONFIG.rpc,
        offlineSigner
      );
      this.client = await StargateClient.connect(PERSONACHAIN_CONFIG.rpc);

      // Get balance
      const balance = await this.getBalance(account.address);

      // Update state
      this.updateState({
        isConnected: true,
        isConnecting: false,
        address: account.address,
        balance,
        walletType: 'leap'
      });

      // Save connection
      if (saveConnection) {
        localStorage.setItem('personapass_wallet', 'leap');
        localStorage.setItem('personapass_wallet_address', account.address);
      }

      return {
        address: account.address,
        name: 'Leap Account',
        algo: account.algo,
        pubkey: account.pubkey,
        isNanoLedger: false
      };

    } catch (error) {
      this.updateState({ isConnecting: false });
      throw error;
    }
  }

  /**
   * Connect to Cosmostation wallet
   */
  async connectCosmostation(saveConnection = true): Promise<WalletConnection> {
    if (!window.cosmostation) {
      throw new Error('Cosmostation wallet not installed');
    }

    this.updateState({ isConnecting: true });

    try {
      // Add PersonaChain to Cosmostation
      await window.cosmostation.cosmos.request({
        method: 'cos_addChain',
        params: {
          chainId: PERSONACHAIN_CONFIG.chainId,
          chainName: PERSONACHAIN_CONFIG.chainName,
          addressPrefix: PERSONACHAIN_CONFIG.bech32Config.bech32PrefixAccAddr,
          baseDenom: PERSONACHAIN_CONFIG.stakeCurrency.coinMinimalDenom,
          displayDenom: PERSONACHAIN_CONFIG.stakeCurrency.coinDenom,
          restURL: PERSONACHAIN_CONFIG.rest,
          coinType: '118',
          decimals: PERSONACHAIN_CONFIG.stakeCurrency.coinDecimals,
          gasRate: {
            average: '0.025',
            low: '0.01',
            tiny: '0.001'
          }
        }
      });

      // Get account
      const account = await window.cosmostation.cosmos.request({
        method: 'cos_requestAccount',
        params: { chainName: PERSONACHAIN_CONFIG.chainId }
      });

      // Connect to blockchain  
      const offlineSigner = await window.cosmostation.providers.keplr.getOfflineSigner(PERSONACHAIN_CONFIG.chainId);
      this.signingClient = await SigningStargateClient.connectWithSigner(
        PERSONACHAIN_CONFIG.rpc,
        offlineSigner
      );
      this.client = await StargateClient.connect(PERSONACHAIN_CONFIG.rpc);

      // Get balance
      const balance = await this.getBalance(account.address);

      // Update state
      this.updateState({
        isConnected: true,
        isConnecting: false,
        address: account.address,
        balance,
        walletType: 'cosmostation'
      });

      // Save connection
      if (saveConnection) {
        localStorage.setItem('personapass_wallet', 'cosmostation');
        localStorage.setItem('personapass_wallet_address', account.address);
      }

      return {
        address: account.address,
        name: account.name || 'Cosmostation Account',
        algo: 'secp256k1',
        pubkey: new Uint8Array(account.publicKey),
        isNanoLedger: account.isNanoLedger || false
      };

    } catch (error) {
      this.updateState({ isConnecting: false });
      throw error;
    }
  }

  /**
   * Disconnect wallet
   */
  async disconnect(): Promise<void> {
    this.updateState({
      isConnected: false,
      address: null,
      balance: 0,
      did: null,
      credentials: [],
      walletType: null
    });

    // Clear localStorage
    localStorage.removeItem('personapass_wallet');
    localStorage.removeItem('personapass_wallet_address');
    localStorage.removeItem('personapass_did');
    
    // Clear client connections
    this.client = undefined;
    this.signingClient = undefined;
  }

  /**
   * Get user's PERSONA balance
   */
  async getBalance(address?: string): Promise<number> {
    if (!this.client) {
      throw new Error('Client not connected');
    }

    const targetAddress = address || this.state.address;
    if (!targetAddress) {
      throw new Error('No address provided');
    }

    try {
      const balance = await this.client.getBalance(targetAddress, 'upersona');
      const amount = parseInt(balance.amount) / 1000000; // Convert from upersona to PERSONA
      
      if (!address) {
        this.updateState({ balance: amount });
      }
      
      return amount;
    } catch (error) {
      console.error('Failed to get balance:', error);
      return 0;
    }
  }

  /**
   * Create DID with staking
   */
  async createDID(stakeAmount: number, credentials: any[]): Promise<string> {
    if (!this.signingClient || !this.state.address) {
      throw new Error('Wallet not connected');
    }

    const stakeMsg = {
      typeUrl: '/persona.did.v1.MsgCreateStakedDID',
      value: {
        creator: this.state.address,
        didDocument: JSON.stringify({
          "@context": ["https://www.w3.org/ns/did/v1"],
          id: `did:persona:${this.state.address}`,
          controller: this.state.address,
          verificationMethod: [{
            id: `did:persona:${this.state.address}#key-1`,
            type: "Ed25519VerificationKey2020",
            controller: `did:persona:${this.state.address}`,
            publicKeyMultibase: this.state.address
          }],
          credentials: credentials,
          created: new Date().toISOString()
        }),
        stakeAmount: (stakeAmount * 1000000).toString(),
        stakeDuration: (90 * 24 * 3600).toString() + 's'
      }
    };

    try {
      const fee = {
        amount: [{ denom: 'upersona', amount: '5000' }],
        gas: '200000'
      };

      const result = await this.signingClient.signAndBroadcast(
        this.state.address,
        [stakeMsg],
        fee
      );

      const did = `did:persona:${this.state.address}`;
      
      // Save DID
      localStorage.setItem('personapass_did', did);
      localStorage.setItem(`did_${this.state.address}`, did);
      
      this.updateState({ did });
      
      return did;

    } catch (error) {
      console.error('Failed to create DID:', error);
      throw error;
    }
  }

  /**
   * Add verifiable credential to DID
   */
  async addCredential(credential: any): Promise<void> {
    if (!this.state.address || !this.state.did) {
      throw new Error('DID not created');
    }

    const updatedCredentials = [...this.state.credentials, credential];
    
    // Save to localStorage (in production, would save to blockchain/IPFS)
    localStorage.setItem(`credentials_${this.state.address}`, JSON.stringify(updatedCredentials));
    
    this.updateState({ credentials: updatedCredentials });
  }

  /**
   * Get current wallet state
   */
  getState(): WalletState {
    return this.state;
  }

  /**
   * Check if wallet is available
   */
  static isKeplrAvailable(): boolean {
    return typeof window !== 'undefined' && !!window.keplr;
  }

  static isLeapAvailable(): boolean {
    return typeof window !== 'undefined' && !!window.leap;
  }

  static isCosmostationAvailable(): boolean {
    return typeof window !== 'undefined' && !!window.cosmostation;
  }
}

// Export class and singleton instance
export { WalletService };
export const walletService = new WalletService();