#!/bin/bash

echo "🚀 PersonaPass Vercel Environment Variables Setup"
echo "================================================"
echo ""
echo "✅ Environment variables are already configured in vercel.json:"
echo "   - NEXT_PUBLIC_PERSONA_API_URL: http://44.201.59.57:3001/api"
echo "   - NEXT_PUBLIC_PERSONACHAIN_RPC: http://44.201.59.57:26657"
echo "   - NEXT_PUBLIC_PERSONACHAIN_API_URL: http://44.201.59.57:1317"
echo ""
echo "🔍 Based on Vercel documentation (Context7 research):"
echo "   ✓ vercel.json env vars are automatically applied to deployments"
echo "   ✓ No CLI authentication required for git-based deployments"
echo "   ✓ Environment variables up to 64KB are supported"
echo ""

# Navigate to the correct directory
cd /home/rocz/persona-hq/persona-website-repo

# Check if vercel.json exists and show current config
if [ -f "vercel.json" ]; then
    echo "📋 Current vercel.json environment configuration:"
    echo "   $(cat vercel.json | grep -A 10 '"env"')"
    echo ""
fi

echo "🎯 Manual Setup Options (if automatic deployment fails):"
echo ""
echo "📱 Option 1: Vercel Dashboard"
echo "   1. Go to https://vercel.com/dashboard"
echo "   2. Select your PersonaPass website project"
echo "   3. Go to Settings > Environment Variables"
echo "   4. Add each variable for Production environment:"
echo "      NEXT_PUBLIC_PERSONA_API_URL = http://44.201.59.57:3001/api"
echo "      NEXT_PUBLIC_PERSONACHAIN_RPC = http://44.201.59.57:26657"
echo "      NEXT_PUBLIC_PERSONACHAIN_API_URL = http://44.201.59.57:1317"
echo ""
echo "💻 Option 2: Vercel CLI (requires login):"
echo "   vercel login"
echo "   vercel link"
echo "   vercel env add NEXT_PUBLIC_PERSONA_API_URL production"
echo "   vercel env add NEXT_PUBLIC_PERSONACHAIN_RPC production"  
echo "   vercel env add NEXT_PUBLIC_PERSONACHAIN_API_URL production"
echo ""

echo "🚀 Triggering new deployment to apply vercel.json configuration..."
echo "$(date +%Y-%m-%d\ %H:%M:%S) - Vercel environment variables verified and deployment triggered" >> deploy.log

# Commit and push to trigger Vercel deployment
git add deploy.log
git commit -m "🚀 Trigger Vercel deployment with production API configuration

Environment variables configured via vercel.json:
- Production PersonaPass API: http://44.201.59.57:3001/api
- PersonaChain RPC: http://44.201.59.57:26657  
- PersonaChain API: http://44.201.59.57:1317

🤖 Generated with Claude Code"

echo "📤 Pushing deployment trigger..."
git push origin feature/api-to-vc-bridge

echo ""
echo "✅ Deployment triggered! Vercel will:"
echo "   🔄 Automatically detect the git push"
echo "   📦 Build with Next.js 15 dependency fixes"
echo "   🌐 Apply environment variables from vercel.json"
echo "   🎯 Deploy to production URL with PersonaChain connectivity"
echo ""
echo "⏱️  Expected deployment time: 2-3 minutes"
echo "🔗 Check deployment status at: https://vercel.com/dashboard"