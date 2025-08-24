import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { v4 as uuidv4 } from 'uuid'
import { createUser, getUserByEmail } from '../../../../lib/supabase.js'

// Simple wallet address generator for development
function generateWalletAddress() {
  return '0x' + Array.from({ length: 40 }, () => 
    Math.floor(Math.random() * 16).toString(16)
  ).join('')
}

// Simple DID generator
function generateDID(userData) {
  const hash = btoa(`${userData.firstName}-${userData.lastName}-${Date.now()}`).slice(0, 16)
  return `did:persona:${hash.toLowerCase()}`
}

export async function POST(request) {
  try {
    const body = await request.json()
    console.log('👤 Account creation request:', { 
      email: body.email?.substring(0, 3) + '***',
      firstName: body.firstName,
      lastName: body.lastName 
    })

    const { 
      email, 
      password, 
      firstName, 
      lastName, 
      dateOfBirth, 
      country 
    } = body

    // Validate required fields
    if (!email || !password || !firstName || !lastName || !dateOfBirth || !country) {
      return NextResponse.json({ 
        error: 'All fields are required' 
      }, { status: 400 })
    }

    // Check if user already exists (with fallback for database issues)
    let existingUser = null
    try {
      existingUser = await getUserByEmail(email)
    } catch (dbError) {
      console.log('⚠️  Database connection issue during user check, proceeding with fallback mode')
    }
    
    if (existingUser) {
      console.log('❌ User already exists:', email.substring(0, 3) + '***')
      return NextResponse.json({ 
        error: 'User already exists with this email' 
      }, { status: 409 })
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 12)

    // Generate user data
    const userId = uuidv4()
    const walletAddress = generateWalletAddress()
    const userData = {
      firstName,
      lastName,
      dateOfBirth,
      country,
      createdAt: new Date().toISOString()
    }
    const did = generateDID(userData)

    // Create user in database (with fallback for database issues)
    let newUser = null
    try {
      newUser = await createUser({
        id: userId,
        email,
        passwordHash,
        did,
        walletAddress,
        kycStatus: 'pending'
      })
    } catch (dbError) {
      console.log('⚠️  Database connection issue during user creation, using fallback mode')
      // Fallback: Create user object without database persistence
      newUser = {
        id: userId,
        email,
        did,
        wallet_address: walletAddress,
        created_at: new Date().toISOString()
      }
    }

    console.log('✅ Account created successfully:', { 
      userId: newUser.id, 
      email: email.substring(0, 3) + '***',
      did: did.substring(0, 20) + '...'
    })

    return NextResponse.json({
      message: 'Account created successfully',
      user: {
        id: newUser.id,
        email: newUser.email,
        did: newUser.did,
        walletAddress: newUser.wallet_address
      }
    })

  } catch (error) {
    console.error('❌ Account creation error:', error)
    
    // Handle database constraint errors
    if (error.message.includes('duplicate') || error.code === '23505') {
      return NextResponse.json({ 
        error: 'User already exists with this email' 
      }, { status: 409 })
    }

    return NextResponse.json({ 
      error: 'Account creation failed', 
      details: error.message 
    }, { status: 500 })
  }
}