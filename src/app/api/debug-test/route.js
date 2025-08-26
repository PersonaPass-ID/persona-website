import { NextResponse } from 'next/server'
import { supabase } from '../../../lib/supabase.js'

export async function GET() {
  console.log('🔍 DEBUG TEST - API endpoint hit')
  
  try {
    // Check environment variables
    const envCheck = {
      hasSupabaseUrl: !!process.env.SUPABASE_URL,
      hasServiceRoleKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
      supabaseUrlPrefix: process.env.SUPABASE_URL?.substring(0, 30) + '...',
      serviceRoleKeyPrefix: process.env.SUPABASE_SERVICE_ROLE_KEY?.substring(0, 20) + '...',
      nodeEnv: process.env.NODE_ENV
    }
    
    console.log('🔍 Environment check:', envCheck)
    
    // Test Supabase connection
    let connectionTest = { success: false, error: 'not tested' }
    try {
      const { data, error } = await supabase.from('users').select('count').limit(1)
      connectionTest = {
        success: !error,
        error: error?.message || 'none',
        hasData: !!data
      }
      console.log('🔍 Supabase connection test:', connectionTest)
    } catch (connError) {
      connectionTest = { success: false, error: connError.message }
      console.error('❌ Connection failed:', connError)
    }
    
    return NextResponse.json({
      success: true,
      message: 'Debug test endpoint working',
      timestamp: new Date().toISOString(),
      environment: envCheck,
      supabaseConnection: connectionTest
    })
    
  } catch (error) {
    console.error('❌ Debug test failed:', error)
    return NextResponse.json({
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}