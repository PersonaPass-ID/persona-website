# 🛠️ PersonaPass Backend Configuration Guide

## 🚨 CRITICAL FIXES IMPLEMENTED

This document outlines the backend connectivity issues found and the fixes implemented to resolve CORS errors and API connectivity problems.

## 🔍 Issues Identified

### 1. **Multiple Conflicting API Clients**
- **Problem**: 3 different API clients with conflicting base URLs
- **Files Affected**: 
  - `src/lib/api-client.ts` (AWS Lambda)
  - `src/lib/api-client-updated.ts` (Smart routing)
  - `src/lib/blockchain.ts` (Different AWS Lambda)
- **Solution**: Created unified API client at `src/lib/unified-api-client.ts`

### 2. **CORS Configuration Issues**
- **Problem**: API endpoints rejecting requests from `personapass.xyz` domain
- **Symptoms**: Infinite retry loops causing console floods
- **Solution**: 
  - Updated request headers to remove problematic credentials
  - Added proper timeout handling
  - Implemented retry logic with exponential backoff

### 3. **Environment Variable Inconsistencies**
- **Problem**: `.env.local` and API clients using different endpoints
- **Solution**: Standardized all endpoints to use `personapass.xyz` domain

## 🔧 Fixes Implemented

### ✅ 1. Unified API Client
**File**: `src/lib/unified-api-client.ts`
- Centralized API configuration
- Proper error handling and retry logic
- CORS-compliant request headers
- Timeout handling (10 second limit)
- Health monitoring capabilities

### ✅ 2. Health Monitoring Component
**File**: `src/components/health/HealthMonitor.tsx`
- Real-time backend connectivity monitoring
- Service-specific status indicators
- Auto-refresh capabilities
- Error reporting and diagnostics

### ✅ 3. Updated Environment Variables
**File**: `.env.local`
```bash
# Main API endpoint
NEXT_PUBLIC_API_URL=https://personapass.xyz/api

# PersonaChain RPC endpoints
NEXT_PUBLIC_PERSONACHAIN_RPC=https://personapass.xyz/rpc
NEXT_PUBLIC_PERSONACHAIN_REST=https://personapass.xyz/api/rest

# Compute service endpoint
NEXT_PUBLIC_COMPUTE_URL=https://personapass.xyz/compute
```

## 🌐 Vercel Deployment Requirements

### Environment Variables to Update in Vercel Dashboard

1. **Go to Vercel Dashboard** → Your Project → Settings → Environment Variables

2. **Update/Add these variables**:
   ```bash
   NEXT_PUBLIC_API_URL=https://personapass.xyz/api
   NEXT_PUBLIC_PERSONACHAIN_RPC=https://personapass.xyz/rpc  
   NEXT_PUBLIC_PERSONACHAIN_REST=https://personapass.xyz/api/rest
   NEXT_PUBLIC_COMPUTE_URL=https://personapass.xyz/compute
   NEXT_PUBLIC_HEALTH_CHECK_INTERVAL=30000
   NEXT_PUBLIC_API_TIMEOUT=10000
   ```

3. **Redeploy** after updating environment variables

## 🏥 Backend Service Requirements

Your backend services need to support these endpoints:

### Required Endpoints
```
# Health/Status endpoints
GET /health          - Service health check
GET /status         - Service status (for blockchain service)

# Authentication endpoints  
POST /auth/login    - User authentication
POST /auth/verify   - Token verification

# Verification endpoints
POST /phone/start   - Start phone verification
POST /phone/verify  - Verify phone code
POST /email/start   - Start email verification  
POST /email/verify  - Verify email code

# Blockchain endpoints
POST /did/create    - Create DID on blockchain
GET /credentials/{address} - Get user credentials

# Compute endpoints (for heavy operations)
POST /zk-proof/generate - Generate ZK proofs
POST /zk-proof/verify   - Verify ZK proofs
```

### CORS Configuration Required
Your backend services must allow requests from:
- `https://personapass.xyz`
- `https://www.personapass.xyz`
- `https://personapass.vercel.app` (if using Vercel preview deployments)

**Example CORS headers**:
```
Access-Control-Allow-Origin: https://personapass.xyz
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, X-Client-Version
Access-Control-Max-Age: 86400
```

## 🧪 Testing Backend Connectivity

### 1. Using Health Monitor Component
Add the health monitor to any page:
```tsx
import HealthMonitor from '@/components/health/HealthMonitor';

// In your component
<HealthMonitor showDetails={true} autoRefresh={true} />
```

### 2. Manual Testing with API Client
```tsx
import { unifiedApiClient } from '@/lib/unified-api-client';

// Check overall health
const healthStatus = await unifiedApiClient.checkHealth(true);
console.log('Health Status:', healthStatus);

// Test specific service
const isMainApiUp = await unifiedApiClient.testServiceConnection('main');
console.log('Main API:', isMainApiUp ? 'UP' : 'DOWN');
```

### 3. Browser Developer Tools
1. Open DevTools → Network tab
2. Look for successful `200` responses to `/health` endpoints
3. Verify no CORS errors in console

## 🔄 Migration Guide

### For Components Using Old API Clients

**Before** (using old api-client.ts):
```tsx
import { personaApiClient } from '@/lib/api-client';

const result = await personaApiClient.startPhoneVerification(phone);
```

**After** (using unified client):
```tsx
import { unifiedApiClient } from '@/lib/unified-api-client';

const result = await unifiedApiClient.startPhoneVerification(phone);
```

### Update Import Statements
Find and replace across your codebase:
```bash
# Find files using old API client
grep -r "from.*api-client" src/
grep -r "import.*api-client" src/

# Replace with unified client imports
# sed -i 's/from.*api-client/from "@\/lib\/unified-api-client"/g' src/**/*.{ts,tsx}
```

## 🚀 Next Steps

1. **✅ Deploy to Vercel** with updated environment variables
2. **🔧 Configure Backend CORS** to allow personapass.xyz domain
3. **🏥 Add Health Endpoints** to your backend services
4. **🧪 Test Connectivity** using the health monitor component
5. **📊 Monitor Performance** and adjust retry/timeout settings as needed

## 🆘 Troubleshooting

### Common Issues

**CORS Errors Still Occurring**:
- Verify backend CORS headers include `personapass.xyz`
- Check that environment variables are properly set in Vercel
- Ensure backend services are running and accessible

**Health Checks Failing**:
- Verify `/health` endpoints exist on your backend services
- Check that services are running on correct ports/URLs
- Test endpoints manually with curl/Postman

**Infinite Retry Loops**:
- The new unified client has proper retry limits (max 3 attempts)
- Old API clients should be replaced with unified client
- Check console for retry attempt logs

### Debug Commands
```bash
# Test backend connectivity
curl -X GET https://personapass.xyz/api/health
curl -X GET https://personapass.xyz/status

# Check CORS headers
curl -H "Origin: https://personapass.xyz" \
     -H "Access-Control-Request-Method: POST" \
     -X OPTIONS https://personapass.xyz/api/health
```

---

**⚡ This configuration should resolve all CORS errors and infinite retry issues you're experiencing!**