import { NextResponse } from 'next/server'
import { supabase } from '../../../lib/supabase.js'

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get('email') || 'test@personapass.xyz'
    
    console.log('🧪 Testing database query for:', email.substring(0, 3) + '***')
    
    // Test direct Supabase query
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
    
    console.log('📊 Query result:', { 
      data: data?.length || 0, 
      error: error?.code || 'none',
      message: error?.message || 'success'
    })
    
    return NextResponse.json({
      success: true,
      query: {
        email: email.substring(0, 3) + '***',
        found: data?.length || 0,
        users: data || [],
        error: error ? {
          code: error.code,
          message: error.message,
          details: error.details
        } : null
      }
    })
    
  } catch (error) {
    console.error('🚨 Test query error:', error)
    return NextResponse.json({
      success: false,
      error: error.message,
      code: error.code || 'unknown',
      stack: process.env.NODE_ENV !== 'production' ? error.stack : undefined
    }, { status: 500 })
  }
}