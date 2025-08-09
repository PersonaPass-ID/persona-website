// 🚀 UNIFIED API CLIENT - PersonaPass Backend Connectivity
// Centralized API client with proper error handling and health monitoring
// Fixes CORS issues and infinite retry loops

export interface HealthStatus {
  status: 'healthy' | 'unhealthy' | 'degraded';
  timestamp: string;
  services: {
    [serviceName: string]: {
      status: 'up' | 'down' | 'unknown';
      responseTime?: number;
      error?: string;
    };
  };
  version?: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: string;
}

export class UnifiedApiClient {
  private static instance: UnifiedApiClient;
  private baseUrls: {
    main: string;
    blockchain: string;
    compute: string;
  };
  private healthStatus: HealthStatus | null = null;
  private lastHealthCheck = 0;
  private readonly HEALTH_CHECK_INTERVAL = 30000; // 30 seconds
  private retryCount = 0;
  private readonly MAX_RETRIES = 3;

  private constructor() {
    // Centralized API URL configuration
    this.baseUrls = {
      // Main API (personapass.xyz backend)
      main: process.env.NEXT_PUBLIC_API_URL || 'https://personapass.xyz/api',
      
      // Blockchain RPC (PersonaChain) - Live AWS Load Balancer
      blockchain: process.env.NEXT_PUBLIC_PERSONACHAIN_RPC || 'http://personachain-rpc-lb-463662045.us-east-1.elb.amazonaws.com',
      
      // Compute service (AWS Lambda/Fargate)
      compute: process.env.NEXT_PUBLIC_COMPUTE_URL || 'https://personapass.xyz/compute'
    };

    console.log('🔗 UnifiedApiClient initialized:', this.baseUrls);
  }

  static getInstance(): UnifiedApiClient {
    if (!UnifiedApiClient.instance) {
      UnifiedApiClient.instance = new UnifiedApiClient();
    }
    return UnifiedApiClient.instance;
  }

  /**
   * Make HTTP request with proper error handling and retry logic
   */
  private async makeRequest<T>(
    url: string,
    options: RequestInit = {},
    retryAttempt = 0
  ): Promise<ApiResponse<T>> {
    try {
      console.log(`🌐 API Request [${retryAttempt + 1}/${this.MAX_RETRIES + 1}]: ${options.method || 'GET'} ${url}`);
      
      const defaultHeaders = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Requested-With': 'PersonaPass-Frontend',
        'X-Client-Version': '2.0.0',
      };

      // Add timeout to prevent infinite hanging
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

      const response = await fetch(url, {
        ...options,
        headers: {
          ...defaultHeaders,
          ...options.headers,
        },
        signal: controller.signal,
        // Remove credentials to avoid CORS issues
        credentials: 'omit', 
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('✅ API Response:', { status: response.status, data });

      // Reset retry count on success
      this.retryCount = 0;

      return {
        success: true,
        data,
        timestamp: new Date().toISOString(),
      };

    } catch (error) {
      console.error(`❌ API Error [attempt ${retryAttempt + 1}]:`, error);
      
      // Retry logic for network errors (not for 4xx/5xx errors)
      if (retryAttempt < this.MAX_RETRIES && this.shouldRetry(error)) {
        console.log(`🔄 Retrying in ${(retryAttempt + 1) * 1000}ms...`);
        await this.delay((retryAttempt + 1) * 1000);
        return this.makeRequest<T>(url, options, retryAttempt + 1);
      }

      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
      };
    }
  }

  /**
   * Determine if error should trigger a retry
   */
  private shouldRetry(error: unknown): boolean {
    if (error instanceof Error) {
      // Don't retry on client errors (4xx) or authentication errors
      if (error.message.includes('HTTP 4')) return false;
      
      // Retry on network errors, timeouts, and server errors (5xx)
      return error.message.includes('fetch') || 
             error.message.includes('timeout') || 
             error.message.includes('aborted') ||
             error.message.includes('HTTP 5');
    }
    return false;
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Get the appropriate service URL for an endpoint
   */
  private getServiceUrl(endpoint: string): string {
    // Route to blockchain for DID/credential operations
    if (endpoint.includes('/did') || endpoint.includes('/credential') || endpoint.includes('/blockchain')) {
      return this.baseUrls.blockchain;
    }
    
    // Route to compute for heavy operations
    if (endpoint.includes('/zk-proof') || endpoint.includes('/compute')) {
      return this.baseUrls.compute;
    }
    
    // Default to main API
    return this.baseUrls.main;
  }

  /**
   * Comprehensive health check across all services
   */
  async checkHealth(forceRefresh = false): Promise<HealthStatus> {
    const now = Date.now();
    
    // Return cached result if recent and not forced
    if (!forceRefresh && this.healthStatus && (now - this.lastHealthCheck) < this.HEALTH_CHECK_INTERVAL) {
      return this.healthStatus;
    }

    console.log('🏥 Performing comprehensive health check...');
    
    const services: HealthStatus['services'] = {};
    
    // Test each service endpoint
    const healthChecks = [
      { name: 'main-api', url: `${this.baseUrls.main}/health` },
      { name: 'blockchain', url: `${this.baseUrls.blockchain}/status` },
      { name: 'compute', url: `${this.baseUrls.compute}/health` },
    ];

    for (const check of healthChecks) {
      const startTime = Date.now();
      
      try {
        const response = await this.makeRequest(check.url, { method: 'GET' });
        const responseTime = Date.now() - startTime;
        
        services[check.name] = {
          status: response.success ? 'up' : 'down',
          responseTime,
          error: response.error
        };
      } catch (error) {
        services[check.name] = {
          status: 'down',
          responseTime: Date.now() - startTime,
          error: error instanceof Error ? error.message : 'Unknown error'
        };
      }
    }

    // Determine overall status
    const upServices = Object.values(services).filter(s => s.status === 'up').length;
    const totalServices = Object.keys(services).length;
    
    let overallStatus: HealthStatus['status'];
    if (upServices === totalServices) {
      overallStatus = 'healthy';
    } else if (upServices > 0) {
      overallStatus = 'degraded';
    } else {
      overallStatus = 'unhealthy';
    }

    this.healthStatus = {
      status: overallStatus,
      timestamp: new Date().toISOString(),
      services,
      version: '2.0.0'
    };

    this.lastHealthCheck = now;
    
    console.log(`🏥 Health check complete: ${overallStatus}`, this.healthStatus);
    return this.healthStatus;
  }

  /**
   * Start phone verification
   */
  async startPhoneVerification(phoneNumber: string): Promise<ApiResponse> {
    const url = `${this.getServiceUrl('/verification')}/phone/start`;
    return this.makeRequest(url, {
      method: 'POST',
      body: JSON.stringify({ phoneNumber })
    });
  }

  /**
   * Verify phone code
   */
  async verifyPhoneCode(phoneNumber: string, code: string): Promise<ApiResponse> {
    const url = `${this.getServiceUrl('/verification')}/phone/verify`;
    return this.makeRequest(url, {
      method: 'POST',
      body: JSON.stringify({ phoneNumber, code })
    });
  }

  /**
   * Create DID on blockchain
   */
  async createDID(walletAddress: string, userData: Record<string, unknown>): Promise<ApiResponse> {
    const url = `${this.getServiceUrl('/did')}/create`;
    return this.makeRequest(url, {
      method: 'POST',
      body: JSON.stringify({ walletAddress, ...userData })
    });
  }

  /**
   * Get user credentials
   */
  async getCredentials(walletAddress: string): Promise<ApiResponse> {
    const url = `${this.getServiceUrl('/credential')}/user/${walletAddress}`;
    return this.makeRequest(url, { method: 'GET' });
  }

  /**
   * Get current health status (cached)
   */
  getCurrentHealth(): HealthStatus | null {
    return this.healthStatus;
  }

  /**
   * Test connection to specific service
   */
  async testServiceConnection(serviceName: 'main' | 'blockchain' | 'compute'): Promise<boolean> {
    const url = this.baseUrls[serviceName];
    const response = await this.makeRequest(`${url}/health`);
    return response.success;
  }
}

// Export singleton instance
export const unifiedApiClient = UnifiedApiClient.getInstance();
export default unifiedApiClient;