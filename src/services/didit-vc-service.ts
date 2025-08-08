/**
 * DIDit Verifiable Credential Service
 * Integrates with DIDit for KYC, proof of personhood, and other verifiable credentials
 */

export interface VerifiableCredential {
  "@context": string[];
  id: string;
  type: string[];
  issuer: string;
  issuanceDate: string;
  expirationDate?: string;
  credentialSubject: any;
  proof: {
    type: string;
    created: string;
    verificationMethod: string;
    proofPurpose: string;
    jws: string;
  };
}

export interface KYCCredential extends VerifiableCredential {
  credentialSubject: {
    id: string;
    fullName: string;
    email: string;
    phone: string;
    dateOfBirth: string;
    governmentId: string;
    address: string;
    kycLevel: 'basic' | 'advanced' | 'institutional';
    verifiedAt: string;
  };
}

export interface ProofOfPersonhood extends VerifiableCredential {
  credentialSubject: {
    id: string;
    personhoodScore: number;
    biometricHash?: string;
    livenessCheck: boolean;
    uniquenessVerified: boolean;
    verificationMethod: 'biometric' | 'government_id' | 'social_proof' | 'multi_factor';
  };
}

export interface SocialCredential extends VerifiableCredential {
  credentialSubject: {
    id: string;
    platform: 'github' | 'twitter' | 'linkedin' | 'discord';
    username: string;
    verified: boolean;
    followers?: number;
    reputation?: number;
    accountAge?: string;
  };
}

export interface ProfessionalCredential extends VerifiableCredential {
  credentialSubject: {
    id: string;
    type: 'education' | 'employment' | 'certification';
    institution?: string;
    employer?: string;
    position?: string;
    degree?: string;
    certification?: string;
    startDate?: string;
    endDate?: string;
    verified: boolean;
  };
}

export interface FinancialCredential extends VerifiableCredential {
  credentialSubject: {
    id: string;
    type: 'bank_account' | 'credit_score' | 'income_verification';
    institutionVerified: boolean;
    scoreRange?: string;
    incomeRange?: string;
    accountType?: string;
    verifiedAt: string;
  };
}

export interface DIDitConfig {
  apiKey: string;
  apiUrl: string;
  environment: 'sandbox' | 'production';
}

class DIDitVCService {
  private config: DIDitConfig = {
    apiKey: process.env.NEXT_PUBLIC_DIDIT_API_KEY || 'demo_key',
    apiUrl: process.env.NEXT_PUBLIC_DIDIT_API_URL || 'https://api.didit.id',
    environment: (process.env.NEXT_PUBLIC_DIDIT_ENV as 'sandbox' | 'production') || 'sandbox'
  };

  /**
   * Initialize KYC verification flow
   */
  async initiateKYCVerification(
    did: string,
    userData: {
      fullName: string;
      email: string;
      phone: string;
      dateOfBirth: string;
      governmentId: string;
      address: string;
    }
  ): Promise<{ verificationId: string; verificationUrl?: string }> {
    try {
      // In production, this would call DIDit API
      // For demo, we'll simulate the flow
      if (this.config.environment === 'sandbox') {
        return {
          verificationId: `kyc_${Date.now()}`,
          verificationUrl: `https://verify.didit.id/kyc/${Date.now()}`
        };
      }

      // Production API call
      const response = await fetch(`${this.config.apiUrl}/v1/kyc/initiate`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          did,
          userData,
          level: 'basic'
        })
      });

      return await response.json();
    } catch (error) {
      console.error('Failed to initiate KYC:', error);
      throw error;
    }
  }

  /**
   * Complete KYC verification and get credential
   */
  async completeKYCVerification(
    verificationId: string,
    did: string
  ): Promise<KYCCredential> {
    try {
      // In production, this would check verification status with DIDit
      // For demo, we'll create a mock credential
      if (this.config.environment === 'sandbox') {
        return this.createMockKYCCredential(did, 'basic');
      }

      // Production API call
      const response = await fetch(`${this.config.apiUrl}/v1/kyc/complete/${verificationId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ did })
      });

      return await response.json();
    } catch (error) {
      console.error('Failed to complete KYC:', error);
      throw error;
    }
  }

  /**
   * Verify proof of personhood
   */
  async verifyProofOfPersonhood(
    did: string,
    verificationMethod: 'biometric' | 'government_id' | 'social_proof' | 'multi_factor'
  ): Promise<ProofOfPersonhood> {
    try {
      // In production, this would use DIDit's proof of personhood API
      if (this.config.environment === 'sandbox') {
        return this.createMockProofOfPersonhood(did, verificationMethod);
      }

      const response = await fetch(`${this.config.apiUrl}/v1/personhood/verify`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          did,
          verificationMethod,
          timestamp: new Date().toISOString()
        })
      });

      return await response.json();
    } catch (error) {
      console.error('Failed to verify proof of personhood:', error);
      throw error;
    }
  }

  /**
   * Verify social media account
   */
  async verifySocialAccount(
    did: string,
    platform: 'github' | 'twitter' | 'linkedin' | 'discord',
    username: string
  ): Promise<SocialCredential> {
    try {
      // In production, this would use OAuth or API verification
      if (this.config.environment === 'sandbox') {
        return this.createMockSocialCredential(did, platform, username);
      }

      const response = await fetch(`${this.config.apiUrl}/v1/social/verify`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          did,
          platform,
          username
        })
      });

      return await response.json();
    } catch (error) {
      console.error('Failed to verify social account:', error);
      throw error;
    }
  }

  /**
   * Verify professional credentials
   */
  async verifyProfessionalCredential(
    did: string,
    type: 'education' | 'employment' | 'certification',
    details: any
  ): Promise<ProfessionalCredential> {
    try {
      if (this.config.environment === 'sandbox') {
        return this.createMockProfessionalCredential(did, type, details);
      }

      const response = await fetch(`${this.config.apiUrl}/v1/professional/verify`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          did,
          type,
          details
        })
      });

      return await response.json();
    } catch (error) {
      console.error('Failed to verify professional credential:', error);
      throw error;
    }
  }

  /**
   * Verify financial credentials
   */
  async verifyFinancialCredential(
    did: string,
    type: 'bank_account' | 'credit_score' | 'income_verification'
  ): Promise<FinancialCredential> {
    try {
      if (this.config.environment === 'sandbox') {
        return this.createMockFinancialCredential(did, type);
      }

      const response = await fetch(`${this.config.apiUrl}/v1/financial/verify`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          did,
          type
        })
      });

      return await response.json();
    } catch (error) {
      console.error('Failed to verify financial credential:', error);
      throw error;
    }
  }

  /**
   * Batch verify multiple credentials
   */
  async batchVerifyCredentials(
    did: string,
    credentialTypes: Array<{
      type: 'kyc' | 'personhood' | 'social' | 'professional' | 'financial';
      details?: any;
    }>
  ): Promise<VerifiableCredential[]> {
    const credentials: VerifiableCredential[] = [];

    for (const credential of credentialTypes) {
      try {
        let vc: VerifiableCredential | null = null;

        switch (credential.type) {
          case 'kyc':
            const { verificationId } = await this.initiateKYCVerification(did, credential.details);
            vc = await this.completeKYCVerification(verificationId, did);
            break;
          case 'personhood':
            vc = await this.verifyProofOfPersonhood(did, credential.details.method);
            break;
          case 'social':
            vc = await this.verifySocialAccount(did, credential.details.platform, credential.details.username);
            break;
          case 'professional':
            vc = await this.verifyProfessionalCredential(did, credential.details.type, credential.details);
            break;
          case 'financial':
            vc = await this.verifyFinancialCredential(did, credential.details.type);
            break;
        }

        if (vc) {
          credentials.push(vc);
        }
      } catch (error) {
        console.error(`Failed to verify ${credential.type} credential:`, error);
      }
    }

    return credentials;
  }

  // Mock credential creation methods for sandbox environment
  private createMockKYCCredential(did: string, level: 'basic' | 'advanced' | 'institutional'): KYCCredential {
    return {
      "@context": [
        "https://www.w3.org/2018/credentials/v1",
        "https://www.didit.id/contexts/kyc/v1"
      ],
      id: `urn:uuid:kyc-${Date.now()}`,
      type: ["VerifiableCredential", "KYCCredential"],
      issuer: "did:didit:kyc-issuer",
      issuanceDate: new Date().toISOString(),
      expirationDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
      credentialSubject: {
        id: did,
        fullName: "Demo User",
        email: "demo@personapass.xyz",
        phone: "+1234567890",
        dateOfBirth: "1990-01-01",
        governmentId: "****1234",
        address: "123 Demo Street, City, Country",
        kycLevel: level,
        verifiedAt: new Date().toISOString()
      },
      proof: {
        type: "Ed25519Signature2020",
        created: new Date().toISOString(),
        verificationMethod: "did:didit:kyc-issuer#key-1",
        proofPurpose: "assertionMethod",
        jws: `mock_kyc_signature_${Date.now()}`
      }
    };
  }

  private createMockProofOfPersonhood(
    did: string,
    method: 'biometric' | 'government_id' | 'social_proof' | 'multi_factor'
  ): ProofOfPersonhood {
    return {
      "@context": [
        "https://www.w3.org/2018/credentials/v1",
        "https://www.didit.id/contexts/personhood/v1"
      ],
      id: `urn:uuid:personhood-${Date.now()}`,
      type: ["VerifiableCredential", "ProofOfPersonhood"],
      issuer: "did:didit:personhood-issuer",
      issuanceDate: new Date().toISOString(),
      expirationDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString(),
      credentialSubject: {
        id: did,
        personhoodScore: 95,
        biometricHash: method === 'biometric' ? `hash_${Date.now()}` : undefined,
        livenessCheck: true,
        uniquenessVerified: true,
        verificationMethod: method
      },
      proof: {
        type: "Ed25519Signature2020",
        created: new Date().toISOString(),
        verificationMethod: "did:didit:personhood-issuer#key-1",
        proofPurpose: "assertionMethod",
        jws: `mock_personhood_signature_${Date.now()}`
      }
    };
  }

  private createMockSocialCredential(
    did: string,
    platform: string,
    username: string
  ): SocialCredential {
    return {
      "@context": [
        "https://www.w3.org/2018/credentials/v1",
        "https://www.didit.id/contexts/social/v1"
      ],
      id: `urn:uuid:social-${platform}-${Date.now()}`,
      type: ["VerifiableCredential", "SocialCredential"],
      issuer: `did:didit:${platform}-issuer`,
      issuanceDate: new Date().toISOString(),
      credentialSubject: {
        id: did,
        platform: platform as any,
        username,
        verified: true,
        followers: Math.floor(Math.random() * 10000),
        reputation: Math.floor(Math.random() * 100),
        accountAge: "2 years"
      },
      proof: {
        type: "Ed25519Signature2020",
        created: new Date().toISOString(),
        verificationMethod: `did:didit:${platform}-issuer#key-1`,
        proofPurpose: "assertionMethod",
        jws: `mock_${platform}_signature_${Date.now()}`
      }
    };
  }

  private createMockProfessionalCredential(
    did: string,
    type: string,
    details: any
  ): ProfessionalCredential {
    return {
      "@context": [
        "https://www.w3.org/2018/credentials/v1",
        "https://www.didit.id/contexts/professional/v1"
      ],
      id: `urn:uuid:professional-${type}-${Date.now()}`,
      type: ["VerifiableCredential", "ProfessionalCredential"],
      issuer: `did:didit:professional-issuer`,
      issuanceDate: new Date().toISOString(),
      credentialSubject: {
        id: did,
        type: type as any,
        institution: details.institution,
        employer: details.employer,
        position: details.position,
        degree: details.degree,
        certification: details.certification,
        startDate: details.startDate,
        endDate: details.endDate,
        verified: true
      },
      proof: {
        type: "Ed25519Signature2020",
        created: new Date().toISOString(),
        verificationMethod: `did:didit:professional-issuer#key-1`,
        proofPurpose: "assertionMethod",
        jws: `mock_professional_signature_${Date.now()}`
      }
    };
  }

  private createMockFinancialCredential(
    did: string,
    type: string
  ): FinancialCredential {
    return {
      "@context": [
        "https://www.w3.org/2018/credentials/v1",
        "https://www.didit.id/contexts/financial/v1"
      ],
      id: `urn:uuid:financial-${type}-${Date.now()}`,
      type: ["VerifiableCredential", "FinancialCredential"],
      issuer: `did:didit:financial-issuer`,
      issuanceDate: new Date().toISOString(),
      expirationDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
      credentialSubject: {
        id: did,
        type: type as any,
        institutionVerified: true,
        scoreRange: type === 'credit_score' ? '700-850' : undefined,
        incomeRange: type === 'income_verification' ? '$50,000-$100,000' : undefined,
        accountType: type === 'bank_account' ? 'checking' : undefined,
        verifiedAt: new Date().toISOString()
      },
      proof: {
        type: "Ed25519Signature2020",
        created: new Date().toISOString(),
        verificationMethod: `did:didit:financial-issuer#key-1`,
        proofPurpose: "assertionMethod",
        jws: `mock_financial_signature_${Date.now()}`
      }
    };
  }
}

// Export singleton instance
export const diditVCService = new DIDitVCService();