# 🚀 Vercel Deployment Configuration

## Critical: Update Environment Variables

The blockchain endpoints have been updated to use the live AWS infrastructure. Update these environment variables in your Vercel dashboard:

### 🔧 Required Environment Variables

Go to **Vercel Dashboard** → Your Project → **Settings** → **Environment Variables** and update these:

```bash
# Main API endpoint
NEXT_PUBLIC_API_URL=https://personapass.xyz/api

# PersonaChain Configuration - UPDATED: Live AWS Load Balancer
NEXT_PUBLIC_PERSONACHAIN_RPC=http://personachain-rpc-lb-463662045.us-east-1.elb.amazonaws.com
NEXT_PUBLIC_PERSONACHAIN_REST=http://personachain-rpc-lb-463662045.us-east-1.elb.amazonaws.com
NEXT_PUBLIC_PERSONACHAIN_CHAIN_ID=personachain-1
NEXT_PUBLIC_PERSONACHAIN_CHAIN_NAME=PersonaChain

# Compute Service
NEXT_PUBLIC_COMPUTE_URL=https://personapass.xyz/compute

# DIDit Integration
NEXT_PUBLIC_DIDIT_API_KEY=demo_key
NEXT_PUBLIC_DIDIT_API_URL=https://api.didit.id
NEXT_PUBLIC_DIDIT_ENV=sandbox

# Environment
NEXT_PUBLIC_ENVIRONMENT=production

# Health monitoring
NEXT_PUBLIC_HEALTH_CHECK_INTERVAL=30000
NEXT_PUBLIC_API_TIMEOUT=10000
```

### ✅ Verification

After updating environment variables:

1. **Redeploy** the application from Vercel dashboard
2. **Test the admin page** at `/admin` to verify connectivity
3. **Check health status** - all services should show as operational

### 🧪 Test Endpoints

The blockchain endpoints are verified and operational:

- **Status**: ✅ `http://personachain-rpc-lb-463662045.us-east-1.elb.amazonaws.com/status`
- **Health**: ✅ `http://personachain-rpc-lb-463662045.us-east-1.elb.amazonaws.com/health`
- **JSON-RPC**: ✅ `http://personachain-rpc-lb-463662045.us-east-1.elb.amazonaws.com` (POST)

### 📊 Expected Results

After deployment, the health monitor should show:
- ✅ **blockchain**: UP (PersonaChain operational)
- ⚠️ **main-api**: Status depends on backend setup
- ⚠️ **compute**: Status depends on backend setup

The application will now connect to your live PersonaChain blockchain infrastructure!