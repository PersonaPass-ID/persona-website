import { NextResponse } from 'next/server'

const PERSONACHAIN_RPC = 'http://44.220.177.56:26657'
const PERSONACHAIN_API = 'http://44.220.177.56:1317'

async function checkEndpoint(url, name) {
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 5000)
    
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'PersonaPass/1.0'
      }
    })
    
    clearTimeout(timeoutId)
    
    if (response.ok) {
      const data = await response.json()
      return {
        status: 'online',
        url,
        responseTime: Date.now(),
        data: name === 'RPC' ? {
          network: data.result?.node_info?.network || 'unknown',
          version: data.result?.node_info?.version || 'unknown',
          latestBlockHeight: data.result?.sync_info?.latest_block_height || 'unknown'
        } : data
      }
    } else {
      return {
        status: 'error',
        url,
        error: `HTTP ${response.status}`,
        responseTime: Date.now()
      }
    }
  } catch (error) {
    return {
      status: 'offline',
      url,
      error: error.name === 'AbortError' ? 'timeout' : error.message,
      responseTime: Date.now()
    }
  }
}

export async function GET() {
  try {
    console.log('🔗 Checking PersonaChain blockchain status...')
    
    const startTime = Date.now()
    
    // Check both RPC and API endpoints in parallel
    const [rpcCheck, apiCheck] = await Promise.all([
      checkEndpoint(`${PERSONACHAIN_RPC}/status`, 'RPC'),
      checkEndpoint(`${PERSONACHAIN_API}/cosmos/base/tendermint/v1beta1/node_info`, 'API')
    ])
    
    const totalTime = Date.now() - startTime
    
    // Determine overall status
    const isHealthy = rpcCheck.status === 'online' || apiCheck.status === 'online'
    const status = isHealthy ? 'operational' : 'down'
    
    console.log(`🌐 PersonaChain status: ${status} (${totalTime}ms)`)
    
    return NextResponse.json({
      status,
      network: 'PersonaChain',
      chainId: 'persona-1',
      timestamp: new Date().toISOString(),
      responseTime: totalTime,
      endpoints: {
        rpc: {
          url: PERSONACHAIN_RPC,
          ...rpcCheck
        },
        api: {
          url: PERSONACHAIN_API,
          ...apiCheck
        }
      },
      services: {
        consensus: rpcCheck.status === 'online' ? 'operational' : 'degraded',
        api: apiCheck.status === 'online' ? 'operational' : 'degraded',
        identity: isHealthy ? 'operational' : 'degraded'
      }
    })
    
  } catch (error) {
    console.error('❌ Blockchain status check failed:', error)
    
    return NextResponse.json({
      status: 'error',
      network: 'PersonaChain',
      error: error.message,
      timestamp: new Date().toISOString(),
      services: {
        consensus: 'unknown',
        api: 'unknown',
        identity: 'unknown'
      }
    }, { status: 503 })
  }
}