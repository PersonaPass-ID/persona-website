import { NextRequest, NextResponse } from 'next/server'
import * as speakeasy from 'speakeasy'
import * as bcrypt from 'bcryptjs'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request: NextRequest) {
  try {
    const {
      email,
      password,
      firstName,
      lastName,
      dateOfBirth,
      totpSecret,
      totpCode,
      did,
      walletAddress,
      publicKey,
      privateKeyEncrypted
    } = await request.json()

    // Validate required fields
    if (!email || !password || !firstName || !lastName || !totpCode || !totpSecret) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Verify TOTP code
    const verified = speakeasy.totp.verify({
      secret: totpSecret,
      encoding: 'base32',
      token: totpCode,
      window: 1
    })

    if (!verified) {
      return NextResponse.json(
        { error: 'Invalid authentication code' },
        { status: 400 }
      )
    }

    // Check if user already exists
    const { data: existingUser } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .single()

    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 409 }
      )
    }

    // Hash password
    const saltRounds = 12
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    // Encrypt TOTP secret (in production, use proper encryption)
    const encryptedTotpSecret = Buffer.from(totpSecret).toString('base64')

    // Insert user into database
    const { data: user, error: userError } = await supabase
      .from('users')
      .insert({
        email,
        password_hash: hashedPassword,
        first_name: firstName,
        last_name: lastName,
        date_of_birth: dateOfBirth,
        totp_secret: encryptedTotpSecret,
        did,
        wallet_address: walletAddress,
        public_key: publicKey,
        private_key_encrypted: privateKeyEncrypted,
        email_verified: false,
        totp_verified: true, // Already verified during registration
        status: 'active',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select()
      .single()

    if (userError) {
      console.error('Database error:', userError)
      return NextResponse.json(
        { error: 'Failed to create user account' },
        { status: 500 }
      )
    }

    // Log registration activity
    await supabase
      .from('user_activity')
      .insert({
        user_id: user.id,
        activity_type: 'registration',
        activity_details: {
          method: 'email_totp',
          did_created: !!did,
          wallet_created: !!walletAddress
        },
        ip_address: request.headers.get('x-forwarded-for') || 'unknown',
        user_agent: request.headers.get('user-agent') || 'unknown',
        created_at: new Date().toISOString()
      })

    // Return success (excluding sensitive data)
    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
        did: user.did,
        walletAddress: user.wallet_address,
        createdAt: user.created_at
      },
      message: 'Registration successful'
    })

  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'Registration failed' },
      { status: 500 }
    )
  }
}