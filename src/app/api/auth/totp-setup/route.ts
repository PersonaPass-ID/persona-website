import { NextRequest, NextResponse } from 'next/server'
import * as speakeasy from 'speakeasy'
import QRCode from 'qrcode'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // Generate TOTP secret
    const secret = speakeasy.generateSecret({
      name: `PersonaPass (${email})`,
      issuer: 'PersonaPass',
      length: 32
    })

    // Generate QR code URL
    const qrCodeUrl = await QRCode.toDataURL(secret.otpauth_url!)

    return NextResponse.json({
      secret: secret.base32,
      qrCodeUrl,
      otpauthUrl: secret.otpauth_url
    })

  } catch (error) {
    console.error('TOTP setup error:', error)
    return NextResponse.json(
      { error: 'Failed to setup TOTP' },
      { status: 500 }
    )
  }
}