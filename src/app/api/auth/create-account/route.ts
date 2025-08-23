import { NextRequest, NextResponse } from 'next/server'
import * as speakeasy from 'speakeasy'

// In-memory store for TOTP secrets (in production, use database)
const userSecrets = new Map()

export async function POST(request: NextRequest) {
  try {
    const { email, password, totpCode } = await request.json()

    // Validate required fields
    if (!email || !password || !totpCode) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Email, password, and TOTP code are required' 
        },
        { status: 400 }
      )
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Invalid email format' 
        },
        { status: 400 }
      )
    }

    // For development, we'll use a simple in-memory validation
    // In production, this should validate against the database
    
    // Check if we have TOTP secret for this email
    // For now, we'll accept any 6-digit code for development
    if (!/^\d{6}$/.test(totpCode)) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'TOTP code must be 6 digits' 
        },
        { status: 400 }
      )
    }

    // Generate mock user data
    const userId = `user_${Date.now()}`
    const walletAddress = `persona1${Math.random().toString(36).substring(2, 15)}`
    const did = `did:persona:${walletAddress}`

    // Return success response
    return NextResponse.json({
      success: true,
      data: {
        id: userId,
        email: email,
        did: did,
        walletAddress: walletAddress,
        totpSetup: true
      },
      message: 'Account created successfully'
    })

  } catch (error) {
    console.error('Account creation error:', error)
    return NextResponse.json(
      { 
        success: false, 
        message: 'Account creation failed' 
      },
      { status: 500 }
    )
  }
}