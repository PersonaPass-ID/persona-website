#!/usr/bin/env ts-node

/**
 * API-to-VC Bridge Demonstration Script
 * 
 * This script demonstrates the complete GitHub OAuth 2.0 to Verifiable Credential
 * issuance pipeline implemented in the issuer-service.
 * 
 * Flow:
 * 1. GitHub OAuth 2.0 authentication
 * 2. GitHub API data retrieval  
 * 3. Data validation and transformation
 * 4. Verifiable Credential issuance
 * 5. Credential verification
 */

import axios from 'axios';
import { Logger } from '@nestjs/common';

const logger = new Logger('API-to-VC-Bridge-Demo');

interface DemoConfig {
  issuerServiceUrl: string;
  githubClientId: string;
  redirectUri: string;
}

interface GitHubContributions {
  totalCommits: number;
  totalRepositories: number;
  totalPullRequests: number;
  totalIssues: number;
  totalStars: number;
  totalForks: number;
  languages: string[];
  contributionScore: number;
}

interface VerifiableCredential {
  id: string;
  type: string;
  status: string;
  credentialData: any;
  issuanceDate: string;
  expirationDate: string;
  subject: any;
  evidence: any;
}

class ApiToVcBridgeDemo {
  private config: DemoConfig;
  private accessToken?: string;

  constructor(config: DemoConfig) {
    this.config = config;
  }

  /**
   * Step 1: Initiate GitHub OAuth 2.0 flow
   */
  async initiateGitHubAuth(): Promise<string> {
    logger.log('🔐 Step 1: Initiating GitHub OAuth 2.0 flow...');
    
    const authUrl = `${this.config.issuerServiceUrl}/auth/github/initiate?redirect_uri=${encodeURIComponent(this.config.redirectUri)}`;
    
    logger.log(`📋 OAuth URL: ${authUrl}`);
    logger.log('📝 Manual Step Required: Visit the URL above to authenticate with GitHub');
    
    return authUrl;
  }

  /**
   * Step 2: Handle OAuth callback and extract JWT token
   */
  async handleOAuthCallback(authorizationCode: string): Promise<void> {
    logger.log('🔑 Step 2: Processing GitHub OAuth callback...');
    
    try {
      const response = await axios.get(
        `${this.config.issuerServiceUrl}/auth/github/callback`,
        {
          params: { code: authorizationCode },
          maxRedirects: 0,
          validateStatus: (status) => status < 400,
        }
      );

      // Extract token from response
      if (response.data && response.data.accessToken) {
        this.accessToken = response.data.accessToken;
        logger.log('✅ OAuth authentication successful');
        logger.log(`👤 User: ${response.data.user.githubUsername}`);
      } else {
        throw new Error('No access token received');
      }
    } catch (error) {
      logger.error(`❌ OAuth callback failed: ${error.message}`);
      throw error;
    }
  }

  /**
   * Step 3: Retrieve GitHub contribution data via API
   */
  async fetchGitHubContributions(): Promise<GitHubContributions> {
    logger.log('📊 Step 3: Fetching GitHub contribution statistics...');
    
    if (!this.accessToken) {
      throw new Error('Access token not available. Complete OAuth flow first.');
    }

    try {
      const response = await axios.get(
        `${this.config.issuerServiceUrl}/auth/github/contributions`,
        {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
          },
        }
      );

      const contributions: GitHubContributions = response.data;
      
      logger.log('✅ GitHub contributions retrieved successfully:');
      logger.log(`   📈 Total Commits: ${contributions.totalCommits}`);
      logger.log(`   📦 Total Repositories: ${contributions.totalRepositories}`);
      logger.log(`   🔀 Total Pull Requests: ${contributions.totalPullRequests}`);
      logger.log(`   🐛 Total Issues: ${contributions.totalIssues}`);
      logger.log(`   ⭐ Total Stars: ${contributions.totalStars}`);
      logger.log(`   🍴 Total Forks: ${contributions.totalForks}`);
      logger.log(`   💻 Languages: ${contributions.languages.join(', ')}`);
      logger.log(`   🏆 Contribution Score: ${contributions.contributionScore}`);

      return contributions;
    } catch (error) {
      logger.error(`❌ Failed to fetch GitHub contributions: ${error.message}`);
      throw error;
    }
  }

  /**
   * Step 4: Issue Verifiable Credential based on GitHub data
   */
  async issueGitHubContributorCredential(
    contributionData: GitHubContributions
  ): Promise<VerifiableCredential> {
    logger.log('🎓 Step 4: Issuing GitHub Contributor Verifiable Credential...');
    
    if (!this.accessToken) {
      throw new Error('Access token not available. Complete OAuth flow first.');
    }

    try {
      const credentialRequest = {
        credentialType: 'github_contributor',
      };

      const response = await axios.post(
        `${this.config.issuerServiceUrl}/credentials/github-contributor`,
        credentialRequest,
        {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const credential: VerifiableCredential = response.data;
      
      logger.log('✅ Verifiable Credential issued successfully:');
      logger.log(`   🆔 Credential ID: ${credential.id}`);
      logger.log(`   📋 Type: ${credential.type}`);
      logger.log(`   📅 Issued: ${credential.issuanceDate}`);
      logger.log(`   ⏰ Expires: ${credential.expirationDate}`);
      logger.log(`   🎯 Status: ${credential.status}`);

      return credential;
    } catch (error) {
      logger.error(`❌ Failed to issue credential: ${error.message}`);
      throw error;
    }
  }

  /**
   * Step 5: Verify the issued Verifiable Credential
   */
  async verifyCredential(credential: VerifiableCredential): Promise<boolean> {
    logger.log('🔍 Step 5: Verifying Verifiable Credential...');
    
    if (!this.accessToken) {
      throw new Error('Access token not available. Complete OAuth flow first.');
    }

    try {
      const verificationRequest = {
        credential: JSON.stringify(credential.credentialData),
      };

      const response = await axios.post(
        `${this.config.issuerServiceUrl}/credentials/verify`,
        verificationRequest,
        {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const { valid, message } = response.data;
      
      if (valid) {
        logger.log('✅ Credential verification successful');
        logger.log(`   📝 Message: ${message}`);
      } else {
        logger.warn('⚠️ Credential verification failed');
        logger.warn(`   📝 Message: ${message}`);
      }

      return valid;
    } catch (error) {
      logger.error(`❌ Credential verification error: ${error.message}`);
      return false;
    }
  }

  /**
   * Complete demonstration flow
   */
  async runCompleteDemo(): Promise<void> {
    logger.log('🚀 Starting API-to-VC Bridge Complete Demonstration');
    logger.log('=' .repeat(60));
    
    try {
      // Step 1: Generate OAuth URL
      const authUrl = await this.initiateGitHubAuth();
      
      // Note: In a real implementation, this would redirect the user
      // For demo purposes, we log the URL and assume manual completion
      logger.log('\n⚠️  MANUAL STEP REQUIRED:');
      logger.log('1. Visit the OAuth URL above');
      logger.log('2. Complete GitHub authentication');
      logger.log('3. Extract the authorization code from callback');
      logger.log('4. Call handleOAuthCallback(code) with the code');
      
      logger.log('\n🎯 Demo Flow Overview:');
      logger.log('GitHub OAuth → API Data Retrieval → VC Issuance → Verification');
      
    } catch (error) {
      logger.error(`❌ Demo failed: ${error.message}`);
      throw error;
    }
  }

  /**
   * Run automated portions of the demo (after manual OAuth completion)
   */
  async runAutomatedDemo(authCode: string): Promise<void> {
    try {
      // Step 2: Handle OAuth callback
      await this.handleOAuthCallback(authCode);
      
      // Step 3: Fetch GitHub data
      const contributions = await this.fetchGitHubContributions();
      
      // Step 4: Issue VC
      const credential = await this.issueGitHubContributorCredential(contributions);
      
      // Step 5: Verify VC
      const isValid = await this.verifyCredential(credential);
      
      logger.log('\n' + '='.repeat(60));
      logger.log('🎉 API-to-VC Bridge Demo Completed Successfully!');
      logger.log('=' .repeat(60));
      
      logger.log('\n📋 Summary:');
      logger.log(`✅ GitHub OAuth: Completed`);
      logger.log(`✅ API Data Retrieval: ${contributions.totalCommits} commits, ${contributions.totalRepositories} repos`);
      logger.log(`✅ VC Issuance: Credential ${credential.id}`);
      logger.log(`✅ VC Verification: ${isValid ? 'Valid' : 'Invalid'}`);
      
    } catch (error) {
      logger.error(`❌ Automated demo failed: ${error.message}`);
      throw error;
    }
  }
}

// Demo configuration
const demoConfig: DemoConfig = {
  issuerServiceUrl: process.env.ISSUER_SERVICE_URL || 'http://localhost:3000',
  githubClientId: process.env.GITHUB_CLIENT_ID || 'your-github-client-id',
  redirectUri: process.env.REDIRECT_URI || 'http://localhost:3000/auth/callback',
};

// Run the demo
async function main() {
  const demo = new ApiToVcBridgeDemo(demoConfig);
  
  const args = process.argv.slice(2);
  const command = args[0];
  
  switch (command) {
    case 'start':
      await demo.runCompleteDemo();
      break;
    case 'complete':
      const authCode = args[1];
      if (!authCode) {
        logger.error('❌ Authorization code required for complete demo');
        process.exit(1);
      }
      await demo.runAutomatedDemo(authCode);
      break;
    default:
      logger.log('📖 Usage:');
      logger.log('  npm run demo:api-to-vc start     - Start the demo (manual OAuth required)');
      logger.log('  npm run demo:api-to-vc complete <auth-code> - Complete demo with auth code');
      process.exit(1);
  }
}

// Execute if run directly
if (require.main === module) {
  main().catch((error) => {
    logger.error(`💥 Demo failed: ${error.message}`);
    process.exit(1);
  });
}

export { ApiToVcBridgeDemo, DemoConfig, GitHubContributions, VerifiableCredential };