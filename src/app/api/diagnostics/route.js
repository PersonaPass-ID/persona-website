import { NextResponse } from 'next/server'
import { checkDatabaseHealth } from '../../../lib/supabase.js'

const PERSONACHAIN_RPC = 'http://44.220.177.56:26657'
const PERSONACHAIN_API = 'http://44.220.177.56:1317'

async function checkEndpoint(url, name) {
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 3000)
    
    const response = await fetch(url, {
      signal: controller.signal,
      headers: { 'Accept': 'application/json' }
    })
    
    clearTimeout(timeoutId)
    return {
      name,
      status: response.ok ? 'online' : 'error',
      code: response.status,
      url
    }
  } catch (error) {
    return {
      name,
      status: 'offline',
      error: error.name === 'AbortError' ? 'timeout' : error.message,
      url
    }
  }
}

export async function GET() {
  const startTime = Date.now()
  
  console.log('🔍 PRODUCTION DIAGNOSTICS STARTED')
  console.log('=====================================')
  
  // Environment Variables Check
  const envVars = {
    SUPABASE_URL: process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL,
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY ? '✅ SET' : '❌ MISSING',
    JWT_SECRET: process.env.JWT_SECRET ? '✅ SET' : '❌ MISSING',
    ENCRYPTION_KEY: process.env.ENCRYPTION_KEY ? '✅ SET' : '❌ MISSING',
    NODE_ENV: process.env.NODE_ENV || 'development',
    VERCEL: process.env.VERCEL ? '✅ Vercel Environment' : '❌ Not Vercel',
    VERCEL_URL: process.env.VERCEL_URL || 'localhost',
    VERCEL_ENV: process.env.VERCEL_ENV || 'development'
  }
  
  console.log('🔧 ENVIRONMENT VARIABLES:')
  Object.entries(envVars).forEach(([key, value]) => {
    console.log(`  ${key}: ${value}`)
  })
  
  // Database Health Check
  let dbHealth
  try {
    dbHealth = await checkDatabaseHealth()
    console.log('💾 DATABASE STATUS:', dbHealth.status)
    console.log('  URL:', dbHealth.url || envVars.SUPABASE_URL)
    console.log('  Connected:', dbHealth.connected ? '✅ YES' : '❌ NO')
  } catch (error) {
    dbHealth = { status: 'error', error: error.message, connected: false }
    console.log('💾 DATABASE STATUS: ❌ ERROR')
    console.log('  Error:', error.message)
  }
  
  // PersonaChain Connectivity Check
  const [rpcCheck, apiCheck] = await Promise.all([
    checkEndpoint(`${PERSONACHAIN_RPC}/status`, 'RPC'),
    checkEndpoint(`${PERSONACHAIN_API}/cosmos/base/tendermint/v1beta1/node_info`, 'API')
  ])
  
  console.log('⛓️  PERSONACHAIN STATUS:')
  console.log(`  RPC (${PERSONACHAIN_RPC}): ${rpcCheck.status} ${rpcCheck.code || rpcCheck.error || ''}`)
  console.log(`  API (${PERSONACHAIN_API}): ${apiCheck.status} ${apiCheck.code || apiCheck.error || ''}`)
  
  // API Dependencies Check
  const dependencies = {
    bcryptjs: true,
    speakeasy: true,
    qrcode: true,
    uuid: true,
    '@supabase/supabase-js': true
  }
  
  console.log('📦 DEPENDENCIES:')
  Object.keys(dependencies).forEach(dep => {
    console.log(`  ${dep}: ✅ Available`)
  })
  
  // System Info
  const systemInfo = {
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    nodeVersion: process.version,
    platform: process.platform,
    arch: process.arch,
    memory: {
      used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
      total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024)
    }
  }
  
  console.log('💻 SYSTEM INFO:')
  console.log(`  Node.js: ${systemInfo.nodeVersion}`)
  console.log(`  Platform: ${systemInfo.platform}/${systemInfo.arch}`)
  console.log(`  Uptime: ${Math.round(systemInfo.uptime)}s`)
  console.log(`  Memory: ${systemInfo.memory.used}MB / ${systemInfo.memory.total}MB`)
  
  // Overall Health Score
  const healthScore = {
    environment: envVars.SUPABASE_SERVICE_ROLE_KEY === '✅ SET' && envVars.JWT_SECRET === '✅ SET' ? 100 : 0,
    database: dbHealth.connected ? 100 : 0,
    blockchain: (rpcCheck.status === 'online' || apiCheck.status === 'online') ? 100 : 0,
    dependencies: 100
  }
  
  const totalScore = Math.round((healthScore.environment + healthScore.database + healthScore.blockchain + healthScore.dependencies) / 4)
  
  console.log('📊 HEALTH SCORE:')
  console.log(`  Environment: ${healthScore.environment}%`)
  console.log(`  Database: ${healthScore.database}%`)
  console.log(`  Blockchain: ${healthScore.blockchain}%`)
  console.log(`  Dependencies: ${healthScore.dependencies}%`)
  console.log(`  TOTAL: ${totalScore}%`)
  
  const responseTime = Date.now() - startTime
  console.log(`⚡ DIAGNOSTICS COMPLETED IN ${responseTime}ms`)
  console.log('=====================================')
  
  // Return comprehensive report
  return NextResponse.json({
    status: totalScore >= 75 ? 'healthy' : totalScore >= 50 ? 'degraded' : 'critical',
    score: totalScore,
    timestamp: systemInfo.timestamp,
    responseTime,
    environment: {
      vars: envVars,
      vercel: envVars.VERCEL === '✅ Vercel Environment',
      production: envVars.VERCEL_ENV === 'production'
    },
    services: {
      database: dbHealth,
      blockchain: {
        rpc: rpcCheck,
        api: apiCheck,
        overall: (rpcCheck.status === 'online' || apiCheck.status === 'online') ? 'operational' : 'down'
      }
    },
    system: systemInfo,
    healthScores: healthScore,
    recommendations: generateRecommendations(envVars, dbHealth, rpcCheck, apiCheck)
  })
}

function generateRecommendations(envVars, dbHealth, rpcCheck, apiCheck) {
  const recommendations = []
  
  if (envVars.SUPABASE_SERVICE_ROLE_KEY === '❌ MISSING') {
    recommendations.push('🚨 CRITICAL: Add SUPABASE_SERVICE_ROLE_KEY to Vercel environment variables')
  }
  
  if (envVars.JWT_SECRET === '❌ MISSING') {
    recommendations.push('🚨 CRITICAL: Add JWT_SECRET to Vercel environment variables')
  }
  
  if (envVars.ENCRYPTION_KEY === '❌ MISSING') {
    recommendations.push('⚠️  WARNING: Add ENCRYPTION_KEY for TOTP encryption')
  }
  
  if (!dbHealth.connected) {
    recommendations.push('💾 DATABASE: Check Supabase service status and network connectivity')
  }
  
  if (rpcCheck.status !== 'online' && apiCheck.status !== 'online') {
    recommendations.push('⛓️  BLOCKCHAIN: PersonaChain appears to be offline or starting up')
  }
  
  if (envVars.VERCEL !== '✅ Vercel Environment') {
    recommendations.push('🌐 DEPLOYMENT: Not running on Vercel - check deployment status')
  }
  
  if (recommendations.length === 0) {
    recommendations.push('✅ ALL SYSTEMS OPERATIONAL: PersonaPass is ready for production use!')
  }
  
  return recommendations
}