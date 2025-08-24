import { NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'
import { storeDID, getDIDByUserInfo } from '../../../../lib/supabase.js'

// Simple wallet address generator for development
function generateWalletAddress() {
  return '0x' + Array.from({ length: 40 }, () => 
    Math.floor(Math.random() * 16).toString(16)
  ).join('')
}

// Enhanced DID generator with persona-specific format
function generateDID(userData) {
  const timestamp = Date.now().toString(36)
  const random = Math.random().toString(36).substr(2, 8)
  const nameHash = btoa(`${userData.firstName}-${userData.lastName}`).slice(0, 8).toLowerCase()
  
  return `did:persona:${nameHash}-${timestamp}-${random}`
}

// Generate blockchain info for DID
function generateBlockchainInfo(did, walletAddress) {
  return {
    network: 'PersonaChain',
    chainId: 'persona-1',
    blockNumber: Math.floor(Math.random() * 1000000) + 1,
    transactionHash: '0x' + Array.from({ length: 64 }, () => 
      Math.floor(Math.random() * 16).toString(16)
    ).join(''),
    walletAddress,
    did,
    timestamp: new Date().toISOString(),
    gasUsed: Math.floor(Math.random() * 100000) + 21000,
    status: 'confirmed'
  }
}

export async function POST(request) {
  try {
    const body = await request.json()
    console.log('🆔 DID creation request:', { 
      firstName: body.firstName,
      lastName: body.lastName,
      country: body.country 
    })

    const { 
      firstName, 
      lastName, 
      dateOfBirth, 
      country,
      email 
    } = body

    // Validate required fields
    if (!firstName || !lastName || !dateOfBirth || !country) {
      return NextResponse.json({ 
        error: 'All identity fields are required' 
      }, { status: 400 })
    }

    // Check if DID already exists for this user
    const existingDID = await getDIDByUserInfo(firstName, lastName)
    if (existingDID) {
      console.log('⚠️  DID already exists for user:', firstName, lastName)
      return NextResponse.json({
        message: 'DID already exists',
        did: existingDID.did,
        walletAddress: existingDID.blockchain_info?.walletAddress,
        blockchain: existingDID.blockchain_info
      })
    }

    // Generate DID and wallet address
    const userData = {
      firstName,
      lastName,
      dateOfBirth,
      country,
      email,
      createdAt: new Date().toISOString()
    }
    
    const did = generateDID(userData)
    const walletAddress = generateWalletAddress()
    const blockchain = generateBlockchainInfo(did, walletAddress)

    // Store DID in database
    const didRecord = await storeDID({
      did,
      walletAddress,
      userData,
      blockchain
    })

    console.log('✅ DID created successfully:', { 
      did: did.substring(0, 30) + '...',
      walletAddress: walletAddress.substring(0, 10) + '...',
      user: firstName + ' ' + lastName
    })

    return NextResponse.json({
      message: 'DID created successfully',
      did: didRecord.did,
      walletAddress: didRecord.wallet_address,
      blockchain: didRecord.blockchain_info,
      userData: didRecord.user_data,
      createdAt: didRecord.created_at
    })

  } catch (error) {
    console.error('❌ DID creation error:', error)
    
    // Handle database constraint errors
    if (error.message.includes('duplicate') || error.code === '23505') {
      return NextResponse.json({ 
        error: 'DID already exists for this identity' 
      }, { status: 409 })
    }

    return NextResponse.json({ 
      error: 'DID creation failed', 
      details: error.message 
    }, { status: 500 })
  }
}