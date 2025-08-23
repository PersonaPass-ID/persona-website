import { NextRequest, NextResponse } from 'next/server'
import * as speakeasy from 'speakeasy'
import QRCode from 'qrcode'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Email is required' 
        },
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

    // Generate backup codes
    const backupCodes = Array.from({ length: 5 }, () => 
      Math.random().toString().slice(2, 10)
    )

    return NextResponse.json({
      success: true,
      data: {
        qrCode: qrCodeUrl,
        secret: secret.base32,
        backupCodes: backupCodes
      },
      message: 'TOTP setup successful'
    })

  } catch (error) {
    console.error('TOTP setup error:', error)
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to setup TOTP' 
      },
      { status: 500 }
    )
  }
}