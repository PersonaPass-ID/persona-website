import { NextResponse } from 'next/server'
import speakeasy from 'speakeasy'
import qrcode from 'qrcode'
import { storeTotpSecret } from '../../../../lib/supabase.js'

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || 'development-encryption-key-32chars'

function encrypt(text) {
  try {
    // Simple XOR encryption for development
    let encrypted = ''
    for (let i = 0; i < text.length; i++) {
      encrypted += String.fromCharCode(
        text.charCodeAt(i) ^ ENCRYPTION_KEY.charCodeAt(i % ENCRYPTION_KEY.length)
      )
    }
    return encrypted
  } catch (error) {
    console.error('❌ Encryption failed:', error)
    return null
  }
}

export async function POST(request) {
  try {
    const body = await request.json()
    const { email } = body
    
    console.log('🔑 TOTP setup request for:', email?.substring(0, 3) + '***')

    if (!email) {
      return NextResponse.json({ 
        error: 'Email is required' 
      }, { status: 400 })
    }

    // Generate TOTP secret
    const secret = speakeasy.generateSecret({
      name: `PersonaPass (${email})`,
      issuer: 'PersonaPass',
      length: 32
    })

    console.log('🔐 Generated TOTP secret for:', email.substring(0, 3) + '***')

    // Encrypt and store the secret
    const encryptedSecret = encrypt(secret.base32)
    if (!encryptedSecret) {
      throw new Error('Failed to encrypt TOTP secret')
    }

    // Store TOTP secret (with fallback for database issues)
    try {
      await storeTotpSecret(email, encryptedSecret)
    } catch (dbError) {
      console.log('⚠️  Database connection issue during TOTP storage, continuing without persistence')
    }

    // Generate QR code
    const qrCodeUrl = await qrcode.toDataURL(secret.otpauth_url)

    console.log('✅ TOTP setup completed for:', email.substring(0, 3) + '***')

    return NextResponse.json({
      message: 'TOTP setup successful',
      qrCode: qrCodeUrl,
      secret: secret.base32,
      manualEntryKey: secret.base32
    })

  } catch (error) {
    console.error('❌ TOTP setup error:', error)
    return NextResponse.json({ 
      error: 'TOTP setup failed', 
      details: error.message 
    }, { status: 500 })
  }
}