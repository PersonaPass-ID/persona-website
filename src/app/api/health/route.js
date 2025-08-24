import { NextResponse } from 'next/server'
import { checkDatabaseHealth } from '../../../lib/supabase.js'

export async function GET() {
  try {
    const dbHealth = await checkDatabaseHealth()
    
    return NextResponse.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
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
    console.error('❌ Health check failed:', error)
    
    return NextResponse.json({
      status: 'degraded',
      timestamp: new Date().toISOString(),
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
      }
    }, { status: 503 })
  }
}