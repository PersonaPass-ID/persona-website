import { createClient } from '@supabase/supabase-js'

// Supabase configuration
const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ylintzoasicfplpgjxws.supabase.co'
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseServiceKey) {
  console.error('❌ SUPABASE_SERVICE_ROLE_KEY not found in environment variables')
}

// Create Supabase client with service role key for backend operations
export const supabase = createClient(supabaseUrl, supabaseServiceKey || '', {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

// Database table schemas
export const TABLES = {
  users: 'users',
  totp_secrets: 'totp_secrets', 
  dids: 'dids',
  credentials: 'verifiable_credentials',
  transactions: 'transactions'
}

// Initialize database tables
export async function initializeDatabase() {
  try {
    console.log('🗄️  Initializing Supabase database connection...')
    
    // Test connection
    const { data, error } = await supabase.from('users').select('count').limit(1)
    if (error && error.code !== 'PGRST116') { // PGRST116 = relation does not exist
      throw error
    }
    
    console.log('✅ Supabase database connection successful')
    console.log('📊 Database URL:', supabaseUrl)
    
    return true
  } catch (error) {
    console.error('❌ Supabase database connection failed:', error.message)
    throw error
  }
}

// User management functions
export async function createUser(userData) {
  try {
    const { data, error } = await supabase
      .from(TABLES.users)
      .insert([{
        id: userData.id,
        email: userData.email,
        password_hash: userData.passwordHash,
        did: userData.did,
        wallet_address: userData.walletAddress,
        kyc_status: userData.kycStatus || 'pending',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }])
      .select()
      .single()
    
    if (error) throw error
    
    console.log('✅ User created in database', { userId: data.id, email: userData.email.substring(0, 3) + '***' })
    return data
  } catch (error) {
    console.error('❌ Failed to create user in database:', error.message)
    throw error
  }
}

export async function getUserByEmail(email) {
  try {
    const { data, error } = await supabase
      .from(TABLES.users)
      .select('*')
      .eq('email', email)
      .single()
    
    if (error && error.code !== 'PGRST116') throw error
    
    return data
  } catch (error) {
    if (error.code === 'PGRST116') {
      return null // User not found
    }
    console.error('❌ Failed to get user by email:', error.message)
    throw error
  }
}

// TOTP secret management
export async function storeTotpSecret(email, secret) {
  try {
    const { data, error } = await supabase
      .from(TABLES.totp_secrets)
      .upsert([{
        email: email,
        secret: secret,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }], {
        onConflict: 'email'
      })
      .select()
      .single()
    
    if (error) throw error
    
    console.log('✅ TOTP secret stored in database', { email: email.substring(0, 3) + '***' })
    return data
  } catch (error) {
    console.error('❌ Failed to store TOTP secret:', error.message)
    throw error
  }
}

export async function getTotpSecret(email) {
  try {
    const { data, error } = await supabase
      .from(TABLES.totp_secrets)
      .select('secret')
      .eq('email', email)
      .single()
    
    if (error && error.code !== 'PGRST116') throw error
    
    return data?.secret || null
  } catch (error) {
    if (error.code === 'PGRST116') {
      return null // Secret not found
    }
    console.error('❌ Failed to get TOTP secret:', error.message)
    throw error
  }
}

// DID management
export async function storeDID(didData) {
  try {
    const { data, error } = await supabase
      .from(TABLES.dids)
      .insert([{
        did: didData.did,
        wallet_address: didData.walletAddress,
        user_data: didData.userData,
        blockchain_info: didData.blockchain,
        created_at: new Date().toISOString()
      }])
      .select()
      .single()
    
    if (error) throw error
    
    console.log('✅ DID stored in database', { did: didData.did.substring(0, 20) + '...' })
    return data
  } catch (error) {
    console.error('❌ Failed to store DID:', error.message)
    throw error
  }
}

export async function getDIDByUserInfo(firstName, lastName) {
  try {
    const { data, error } = await supabase
      .from(TABLES.dids)
      .select('*')
      .eq('user_data->>firstName', firstName)
      .eq('user_data->>lastName', lastName)
      .single()
    
    if (error && error.code !== 'PGRST116') throw error
    
    return data
  } catch (error) {
    if (error.code === 'PGRST116') {
      return null // DID not found
    }
    console.error('❌ Failed to get DID:', error.message)
    throw error
  }
}

// Health check function
export async function checkDatabaseHealth() {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('count')
      .limit(1)
    
    return {
      status: 'healthy',
      connected: true,
      url: supabaseUrl,
      timestamp: new Date().toISOString()
    }
  } catch (error) {
    return {
      status: 'unhealthy',
      connected: false,
      error: error.message,
      timestamp: new Date().toISOString()
    }
  }
}

console.log('📦 Supabase client initialized', { url: supabaseUrl })