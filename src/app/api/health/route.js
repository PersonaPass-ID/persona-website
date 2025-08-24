import { NextResponse } from 'next/server'
import { checkDatabaseHealth } from '../../../lib/supabase.js'

export async function GET() {
  const timestamp = new Date().toISOString()
  console.log(`🏥 HEALTH CHECK [${timestamp}]`)
  console.log('Environment:', process.env.VERCEL_ENV || 'local')
  console.log('Region:', process.env.VERCEL_REGION || 'local')
  
  try {
    const dbHealth = await checkDatabaseHealth()
    console.log('✅ Health check passed - all systems operational')
    
    return NextResponse.json({
      status: 'healthy',
      timestamp,
      environment: {
        vercel: !!process.env.VERCEL,
        env: process.env.VERCEL_ENV || 'development',
        region: process.env.VERCEL_REGION || 'local'
      },
      services: {
        api: {
          status: 'operational',
          version: '1.0.0'
        },
        database: dbHealth
      },
      uptime: process.uptime()
    })
  } catch (error) {
    console.error('❌ Health check failed:', error.message)
    console.log('🔍 For detailed diagnostics, visit /api/diagnostics')
    
    return NextResponse.json({
      status: 'degraded',
      timestamp,
      error: error.message,
      services: {
        api: {
          status: 'operational',
          version: '1.0.0'
        },
        database: {
          status: 'unhealthy',
          error: error.message
        }
      },
      diagnosticsUrl: '/api/diagnostics'
    }, { status: 503 })
  }
}