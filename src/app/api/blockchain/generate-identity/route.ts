import { NextRequest, NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'
import { randomBytes, createHash } from 'crypto'

// Generate a cryptographically secure DID
function generateDID(): string {
  const method = 'persona'
  const uniqueId = uuidv4().replace(/-/g, '')
  return `did:${method}:${uniqueId}`
}

// Generate Ed25519-style key pair for wallet (simplified for demo)
function generateKeyPair() {
  // Generate a 32-byte private key
  const privateKey = randomBytes(32)
  
  // Generate public key by hashing private key (simplified for demo)
  // In production, this would use proper Ed25519 key derivation
  const publicKey = createHash('sha256').update(privateKey).digest()
  
  return {
    privateKey: privateKey.toString('hex'),
    publicKey: publicKey.toString('hex')
  }
}

// Generate wallet address from public key
function generateWalletAddress(publicKey: string): string {
  // PersonaChain format: persona1... (bech32 format)
  // For demo purposes, we'll create a simplified format
  const prefix = 'persona1'
  const hash = createHash('sha256').update(Buffer.from(publicKey, 'hex')).digest('hex').slice(0, 38)
  return prefix + hash
}

export async function POST(request: NextRequest) {
  try {
    const { email, firstName, lastName } = await request.json()

    if (!email || !firstName || !lastName) {
      return NextResponse.json(
        { error: 'Email, first name, and last name are required' },
        { status: 400 }
      )
    }

    // Generate DID
    const did = generateDID()

    // Generate cryptographic key pair
    const { privateKey, publicKey } = generateKeyPair()

    // Generate wallet address
    const walletAddress = generateWalletAddress(publicKey)

    // In production, these would be:
    // 1. Private key encrypted with user's password-derived key
    // 2. DID registered on PersonaChain blockchain
    // 3. Wallet address derived using PersonaChain's bech32 format
    
    return NextResponse.json({
      did,
      walletAddress,
      publicKey,
      // Note: In production, private key would be encrypted client-side
      privateKeyEncrypted: privateKey, // This would be encrypted
      metadata: {
        createdAt: new Date().toISOString(),
        blockchain: 'PersonaChain',
        method: 'persona',
        keyType: 'Ed25519'
      }
    })

  } catch (error) {
    console.error('Identity generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate digital identity' },
      { status: 500 }
    )
  }
}