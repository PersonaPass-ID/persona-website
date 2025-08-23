// Direct PERSONA Wallet Core test - server-side only components
const { createWalletClient, createPublicClient, http, parseEther, formatEther } = require('viem')
const { generatePrivateKey, privateKeyToAccount, privateKeyToAddress } = require('viem/accounts')

// PersonaChain Network Configuration  
const PERSONACHAIN_NETWORK = {
  id: 'personachain-1',
  name: 'PersonaChain',
  network: 'personachain',
  nativeCurrency: {
    decimals: 18,
    name: 'PERSONA',
    symbol: 'PERSONA',
  },
  rpcUrls: {
    default: {
      http: ['http://44.201.59.57:26657'],
    },
    public: {
      http: ['http://44.201.59.57:26657'],
    },
  },
  blockExplorers: {
    default: { name: 'PersonaChain Explorer', url: 'https://explorer.personapass.xyz' },
  },
  testnet: true,
}

async function testWalletCore() {
  try {
    console.log('🚀 Testing PERSONA Wallet Core with PersonaChain...\n')
    
    // Test 1: Create wallet
    console.log('1️⃣ Creating wallet...')
    const privateKey = generatePrivateKey()
    const account = privateKeyToAccount(privateKey)
    const address = privateKeyToAddress(privateKey)
    const did = `did:persona:${address.slice(2)}`
    
    console.log(`✅ Wallet created successfully!`)
    console.log(`🆔 DID: ${did}`)
    console.log(`💳 Address: ${address}`)
    console.log(`🔑 Private Key: ${privateKey.slice(0, 10)}...${privateKey.slice(-4)}`)
    
    // Test 2: Initialize clients
    console.log('\n2️⃣ Connecting to PersonaChain...')
    const publicClient = createPublicClient({
      chain: PERSONACHAIN_NETWORK,
      transport: http()
    })
    
    const walletClient = createWalletClient({
      account,
      chain: PERSONACHAIN_NETWORK,
      transport: http()
    })
    
    console.log('✅ Clients initialized successfully!')
    
    // Test 3: Check PersonaChain connectivity
    console.log('\n3️⃣ Testing PersonaChain RPC connectivity...')
    try {
      // Note: This might fail because PersonaChain RPC might not be fully EVM compatible
      const balance = await publicClient.getBalance({ address })
      console.log(`💰 Balance: ${formatEther(balance)} PERSONA`)
    } catch (error) {
      console.log(`⚠️ Balance check failed (expected - PersonaChain may not be fully EVM compatible)`)
      console.log(`Error: ${error.message}`)
    }
    
    // Test 4: Create DID Document
    console.log('\n4️⃣ Creating DID document...')
    const didDocument = {
      '@context': ['https://www.w3.org/ns/did/v1', 'https://w3id.org/security/v1'],
      id: did,
      publicKey: [{
        id: `${did}#key-1`,
        type: 'Secp256k1VerificationKey2018',
        controller: did,
        publicKeyHex: account.publicKey
      }],
      authentication: [`${did}#key-1`],
      service: [{
        id: `${did}#persona-service`,
        type: 'PersonaIdentityService',
        serviceEndpoint: 'https://api.personapass.xyz/api'
      }]
    }
    
    console.log('✅ DID document created:')
    console.log(JSON.stringify(didDocument, null, 2))
    
    // Test 5: Create verifiable credential
    console.log('\n5️⃣ Creating verifiable credential...')
    const credential = {
      id: `urn:uuid:${Math.random().toString(36).substring(7)}`,
      type: ['VerifiableCredential', 'EmailCredential'],
      credentialSubject: {
        id: did,
        email: 'test@personapass.me',
        verifiedAt: new Date().toISOString()
      },
      issuer: did,
      issuanceDate: new Date().toISOString()
    }
    
    console.log('✅ Credential created:')
    console.log(JSON.stringify(credential, null, 2))
    
    // Test 6: Sign message
    console.log('\n6️⃣ Testing message signing...')
    const message = `PersonaPass Identity Verification: ${new Date().toISOString()}`
    try {
      const signature = await walletClient.signMessage({ message })
      console.log(`✅ Message signed successfully!`)
      console.log(`📝 Message: ${message}`)
      console.log(`✍️ Signature: ${signature.slice(0, 20)}...${signature.slice(-10)}`)
    } catch (error) {
      console.log(`⚠️ Signing failed: ${error.message}`)
    }
    
    console.log('\n🎉 PERSONA Wallet Core test completed!')
    console.log('\n📊 Test Summary:')
    console.log('✅ Wallet creation: SUCCESS')
    console.log('✅ DID generation: SUCCESS') 
    console.log('✅ PersonaChain client setup: SUCCESS')
    console.log('✅ DID document creation: SUCCESS')
    console.log('✅ Credential creation: SUCCESS')
    console.log('⚠️ PersonaChain interaction: LIMITED (Cosmos SDK vs EVM)')
    
  } catch (error) {
    console.error('\n❌ Test failed:', error)
  }
}

// Run test
testWalletCore()