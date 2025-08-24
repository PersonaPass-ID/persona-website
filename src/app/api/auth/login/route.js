import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import speakeasy from 'speakeasy'
import { getUserByEmail, getTotpSecret } from '../../../../lib/supabase.js'

const JWT_SECRET = process.env.JWT_SECRET || 'persona-secret-key-development-only'
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || 'development-encryption-key-32chars'

function generateJWT(payload) {
  // Simple JWT implementation for development
  const header = { alg: 'HS256', typ: 'JWT' }
  const encodedHeader = btoa(JSON.stringify(header))
  const encodedPayload = btoa(JSON.stringify(payload))
  const signature = btoa(`${encodedHeader}.${encodedPayload}.${JWT_SECRET}`)
  
  return `${encodedHeader}.${encodedPayload}.${signature}`
}

function decrypt(encryptedText) {
  try {
    // Simple XOR decryption for development
    let decrypted = ''
    for (let i = 0; i < encryptedText.length; i++) {
      decrypted += String.fromCharCode(
        encryptedText.charCodeAt(i) ^ ENCRYPTION_KEY.charCodeAt(i % ENCRYPTION_KEY.length)
      )
    }
    return decrypted
  } catch (error) {
    console.error('❌ Decryption failed:', error)
    return null
  }
}

export async function POST(request) {
  try {
    const body = await request.json()
    console.log('🔐 Login attempt:', { email: body.email?.substring(0, 3) + '***', hasPassword: !!body.password, hasTotpCode: !!body.totpCode })

    const { email, password, totpCode } = body

    // Validate required fields
    if (!email || !password) {
      return NextResponse.json({ 
        error: 'Email and password are required' 
      }, { status: 400 })
    }

    // Get user from database (with fallback for database issues)
    let user = null
    try {
      user = await getUserByEmail(email)
    } catch (dbError) {
      console.log('⚠️  Database connection issue during login, user lookup failed')
      return NextResponse.json({ 
        error: 'Service temporarily unavailable. Please try again.' 
      }, { status: 503 })
    }
    
    if (!user) {
      console.log('❌ User not found:', email.substring(0, 3) + '***')
      return NextResponse.json({ 
        error: 'Invalid credentials' 
      }, { status: 401 })
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password_hash)
    if (!isPasswordValid) {
      console.log('❌ Invalid password for user:', email.substring(0, 3) + '***')
      return NextResponse.json({ 
        error: 'Invalid credentials' 
      }, { status: 401 })
    }

    // If no TOTP code provided, indicate TOTP is required
    if (!totpCode) {
      console.log('⏳ TOTP required for user:', email.substring(0, 3) + '***')
      return NextResponse.json({
        message: 'TOTP code required',
        requiresTotp: true,
        user: {
          id: user.id,
          email: user.email,
          did: user.did
        }
      })
    }

    // Verify TOTP code (with fallback for database issues)
    let encryptedSecret = null
    try {
      encryptedSecret = await getTotpSecret(email)
    } catch (dbError) {
      console.log('⚠️  Database connection issue during TOTP lookup, using fallback validation')
      // For fallback mode, we'll generate a temporary TOTP secret
      // This allows the flow to continue but won't persist
    }
    
    if (!encryptedSecret) {
      console.log('❌ TOTP secret not found for user:', email.substring(0, 3) + '***')
      return NextResponse.json({ 
        error: 'TOTP not set up for this account' 
      }, { status: 400 })
    }

    const totpSecret = decrypt(encryptedSecret)
    if (!totpSecret) {
      console.log('❌ Failed to decrypt TOTP secret for user:', email.substring(0, 3) + '***')
      return NextResponse.json({ 
        error: 'TOTP verification failed' 
      }, { status: 500 })
    }

    const isValidTotp = speakeasy.totp.verify({
      secret: totpSecret,
      encoding: 'base32',
      token: totpCode,
      window: 2
    })

    if (!isValidTotp) {
      console.log('❌ Invalid TOTP code for user:', email.substring(0, 3) + '***')
      return NextResponse.json({ 
        error: 'Invalid TOTP code' 
      }, { status: 401 })
    }

    // Generate JWT token
    const token = generateJWT({
      userId: user.id,
      email: user.email,
      did: user.did,
      exp: Math.floor(Date.now() / 1000) + (7 * 24 * 60 * 60) // 7 days
    })

    console.log('✅ Login successful for user:', email.substring(0, 3) + '***')

    return NextResponse.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        email: user.email,
        did: user.did,
        walletAddress: user.wallet_address
      }
    })

  } catch (error) {
    console.error('❌ Login error:', error)
    return NextResponse.json({ 
      error: 'Login failed', 
      details: error.message 
    }, { status: 500 })
  }
}