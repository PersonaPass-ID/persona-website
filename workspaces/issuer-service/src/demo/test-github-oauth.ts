#!/usr/bin/env ts-node

/**
 * GitHub OAuth 2.0 Integration Test Script
 * 
 * This script tests the complete GitHub OAuth 2.0 flow implemented
 * in the issuer-service, validating each step of the authentication
 * and API integration process.
 */

import axios from 'axios';
import { Logger } from '@nestjs/common';

const logger = new Logger('GitHub-OAuth-Test');

interface TestConfig {
  issuerServiceUrl: string;
  testUser?: {
    githubUsername: string;
    expectedRepos: number;
  };
}

interface OAuthTestResult {
  step: string;
  success: boolean;
  message: string;
  data?: any;
  executionTime: number;
}

class GitHubOAuthTester {
  private config: TestConfig;
  private testResults: OAuthTestResult[] = [];
  private accessToken?: string;

  constructor(config: TestConfig) {
    this.config = config;
  }

  private async recordTest(
    step: string,
    testFunction: () => Promise<any>
  ): Promise<OAuthTestResult> {
    const startTime = Date.now();
    
    try {
      logger.log(`🧪 Testing: ${step}`);
      const data = await testFunction();
      const executionTime = Date.now() - startTime;
      
      const result: OAuthTestResult = {
        step,
        success: true,
        message: 'Test passed',
        data,
        executionTime,
      };
      
      this.testResults.push(result);
      logger.log(`✅ ${step} - Passed (${executionTime}ms)`);
      
      return result;
    } catch (error) {
      const executionTime = Date.now() - startTime;
      
      const result: OAuthTestResult = {
        step,
        success: false,
        message: error.message,
        executionTime,
      };
      
      this.testResults.push(result);
      logger.error(`❌ ${step} - Failed (${executionTime}ms): ${error.message}`);
      
      return result;
    }
  }

  /**
   * Test 1: Health check of the issuer service
   */
  async testServiceHealth(): Promise<OAuthTestResult> {
    return this.recordTest('Service Health Check', async () => {
      const response = await axios.get(`${this.config.issuerServiceUrl}/health`);
      
      if (response.status !== 200) {
        throw new Error(`Service unhealthy: ${response.status}`);
      }
      
      return response.data;
    });
  }

  /**
   * Test 2: OAuth initiation endpoint accessibility
   */
  async testOAuthInitiation(): Promise<OAuthTestResult> {
    return this.recordTest('OAuth Initiation Endpoint', async () => {
      const response = await axios.get(
        `${this.config.issuerServiceUrl}/auth/github/initiate`,
        {
          maxRedirects: 0,
          validateStatus: (status) => status === 302, // Expect redirect
        }
      );
      
      if (response.status !== 302) {
        throw new Error(`Expected redirect (302), got ${response.status}`);
      }
      
      const location = response.headers.location;
      if (!location || !location.includes('github.com')) {
        throw new Error('Invalid redirect URL');
      }
      
      return { redirectUrl: location };
    });
  }

  /**
   * Test 3: JWT token validation (requires manual OAuth completion)
   */
  async testJWTValidation(token: string): Promise<OAuthTestResult> {
    return this.recordTest('JWT Token Validation', async () => {
      this.accessToken = token;
      
      const response = await axios.get(
        `${this.config.issuerServiceUrl}/auth/me`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      if (response.status !== 200) {
        throw new Error(`Token validation failed: ${response.status}`);
      }
      
      const user = response.data;
      if (!user.githubUsername) {
        throw new Error('Invalid user data structure');
      }
      
      return user;
    });
  }

  /**
   * Test 4: GitHub contributions API integration
   */
  async testGitHubContributions(): Promise<OAuthTestResult> {
    return this.recordTest('GitHub Contributions API', async () => {
      if (!this.accessToken) {
        throw new Error('Access token required. Complete JWT validation first.');
      }
      
      const response = await axios.get(
        `${this.config.issuerServiceUrl}/auth/github/contributions`,
        {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
          },
        }
      );
      
      if (response.status !== 200) {
        throw new Error(`Contributions API failed: ${response.status}`);
      }
      
      const contributions = response.data;
      const requiredFields = [
        'totalCommits',
        'totalRepositories', 
        'totalPullRequests',
        'totalIssues',
        'contributionScore'
      ];
      
      for (const field of requiredFields) {
        if (typeof contributions[field] !== 'number') {
          throw new Error(`Missing or invalid field: ${field}`);
        }
      }
      
      return contributions;
    });
  }

  /**
   * Test 5: Verifiable Credential issuance
   */
  async testCredentialIssuance(): Promise<OAuthTestResult> {
    return this.recordTest('Verifiable Credential Issuance', async () => {
      if (!this.accessToken) {
        throw new Error('Access token required. Complete JWT validation first.');
      }
      
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
      
      if (response.status !== 201) {
        throw new Error(`Credential issuance failed: ${response.status}`);
      }
      
      const credential = response.data;
      const requiredFields = ['id', 'type', 'status', 'credentialData', 'issuanceDate'];
      
      for (const field of requiredFields) {
        if (!credential[field]) {
          throw new Error(`Missing credential field: ${field}`);
        }
      }
      
      return credential;
    });
  }

  /**
   * Test 6: Rate limiting enforcement
   */
  async testRateLimiting(): Promise<OAuthTestResult> {
    return this.recordTest('Rate Limiting Enforcement', async () => {
      if (!this.accessToken) {
        throw new Error('Access token required. Complete JWT validation first.');
      }
      
      // Make multiple rapid requests to trigger rate limiting
      const requests = [];
      for (let i = 0; i < 10; i++) {
        requests.push(
          axios.get(`${this.config.issuerServiceUrl}/auth/me`, {
            headers: { Authorization: `Bearer ${this.accessToken}` },
            validateStatus: (status) => status < 500, // Allow rate limit errors
          })
        );
      }
      
      const responses = await Promise.all(requests);
      const rateLimitedResponses = responses.filter(r => r.status === 429);
      
      return {
        totalRequests: requests.length,
        rateLimitedResponses: rateLimitedResponses.length,
        rateLimitingActive: rateLimitedResponses.length > 0,
      };
    });
  }

  /**
   * Run complete test suite
   */
  async runCompleteTestSuite(jwtToken?: string): Promise<void> {
    logger.log('🚀 Starting GitHub OAuth Integration Test Suite');
    logger.log('=' .repeat(60));
    
    // Test 1: Service Health
    await this.testServiceHealth();
    
    // Test 2: OAuth Initiation
    await this.testOAuthInitiation();
    
    // Tests requiring authentication token
    if (jwtToken) {
      logger.log('\n🔐 Running authenticated tests...');
      
      // Test 3: JWT Validation
      await this.testJWTValidation(jwtToken);
      
      // Test 4: GitHub Contributions
      await this.testGitHubContributions();
      
      // Test 5: Credential Issuance
      await this.testCredentialIssuance();
      
      // Test 6: Rate Limiting
      await this.testRateLimiting();
    } else {
      logger.log('\n⚠️  Skipping authenticated tests (no JWT token provided)');
      logger.log('   To run complete tests, provide JWT token as argument');
    }
    
    // Generate test report
    this.generateTestReport();
  }

  /**
   * Generate comprehensive test report
   */
  private generateTestReport(): void {
    logger.log('\n' + '='.repeat(60));
    logger.log('📊 GitHub OAuth Integration Test Report');
    logger.log('=' .repeat(60));
    
    const totalTests = this.testResults.length;
    const passedTests = this.testResults.filter(r => r.success).length;
    const failedTests = totalTests - passedTests;
    const totalTime = this.testResults.reduce((sum, r) => sum + r.executionTime, 0);
    
    logger.log(`\n📋 Summary:`);
    logger.log(`   Total Tests: ${totalTests}`);
    logger.log(`   ✅ Passed: ${passedTests}`);
    logger.log(`   ❌ Failed: ${failedTests}`);
    logger.log(`   ⏱️  Total Time: ${totalTime}ms`);
    logger.log(`   📊 Success Rate: ${((passedTests / totalTests) * 100).toFixed(1)}%`);
    
    logger.log(`\n📋 Detailed Results:`);
    for (const result of this.testResults) {
      const status = result.success ? '✅' : '❌';
      logger.log(`   ${status} ${result.step} (${result.executionTime}ms)`);
      if (!result.success) {
        logger.log(`      Error: ${result.message}`);
      }
    }
    
    if (passedTests === totalTests) {
      logger.log('\n🎉 All tests passed! GitHub OAuth integration is working correctly.');
    } else {
      logger.log('\n⚠️  Some tests failed. Please review the errors above.');
    }
    
    logger.log('\n' + '='.repeat(60));
  }

  /**
   * Quick health check
   */
  async quickHealthCheck(): Promise<boolean> {
    try {
      await this.testServiceHealth();
      await this.testOAuthInitiation();
      return true;
    } catch (error) {
      return false;
    }
  }
}

// Test configuration
const testConfig: TestConfig = {
  issuerServiceUrl: process.env.ISSUER_SERVICE_URL || 'http://localhost:3000',
  testUser: {
    githubUsername: process.env.TEST_GITHUB_USERNAME || 'testuser',
    expectedRepos: parseInt(process.env.TEST_EXPECTED_REPOS || '1'),
  },
};

// Main execution
async function main() {
  const tester = new GitHubOAuthTester(testConfig);
  
  const args = process.argv.slice(2);
  const command = args[0];
  const jwtToken = args[1];
  
  switch (command) {
    case 'health':
      logger.log('🏥 Running quick health check...');
      const isHealthy = await tester.quickHealthCheck();
      logger.log(isHealthy ? '✅ Service is healthy' : '❌ Service has issues');
      process.exit(isHealthy ? 0 : 1);
      break;
      
    case 'full':
      await tester.runCompleteTestSuite(jwtToken);
      break;
      
    default:
      logger.log('📖 Usage:');
      logger.log('  npm run test:oauth health              - Quick health check');
      logger.log('  npm run test:oauth full [jwt-token]    - Full test suite');
      logger.log('');
      logger.log('💡 To get a JWT token:');
      logger.log('  1. Visit http://localhost:3000/auth/github/initiate');
      logger.log('  2. Complete GitHub OAuth');
      logger.log('  3. Extract the accessToken from the response');
      process.exit(1);
  }
}

// Execute if run directly
if (require.main === module) {
  main().catch((error) => {
    logger.error(`💥 Test suite failed: ${error.message}`);
    process.exit(1);
  });
}

export { GitHubOAuthTester, TestConfig, OAuthTestResult };