'use client';

import { Navbar } from "@/components/navbar";
import HealthMonitor from "@/components/health/HealthMonitor";

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      
      <div className="pt-20">
        <div className="container mx-auto px-4 py-20">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              System Administration
            </h1>
            <p className="text-xl text-white/70 max-w-3xl mx-auto mb-16">
              Backend connectivity monitoring and system diagnostics for PersonaPass.
            </p>
          </div>
          
          {/* Backend Health Monitor */}
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="glass-card p-8">
              <h2 className="text-2xl font-bold text-white mb-6">🏥 Backend Health Monitor</h2>
              <HealthMonitor 
                showDetails={true} 
                autoRefresh={true} 
                refreshInterval={15000} 
              />
            </div>
            
            {/* Quick Actions */}
            <div className="glass-card p-8">
              <h2 className="text-2xl font-bold text-white mb-6">⚡ Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button 
                  onClick={() => window.location.reload()} 
                  className="btn-secondary w-full"
                >
                  🔄 Refresh Page
                </button>
                <button 
                  onClick={() => localStorage.clear()} 
                  className="btn-secondary w-full"
                >
                  🗑️ Clear Cache
                </button>
                <button 
                  onClick={() => window.open('/get-started', '_blank')} 
                  className="btn-primary w-full"
                >
                  🚀 Test Onboarding
                </button>
              </div>
            </div>
            
            {/* Environment Info */}
            <div className="glass-card p-8">
              <h2 className="text-2xl font-bold text-white mb-6">🔧 Environment Info</h2>
              <div className="space-y-3 font-mono text-sm">
                <div className="flex justify-between">
                  <span className="text-white/60">API URL:</span>
                  <span className="text-green-400">{process.env.NEXT_PUBLIC_API_URL || 'Not set'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Blockchain RPC:</span>
                  <span className="text-green-400">{process.env.NEXT_PUBLIC_PERSONACHAIN_RPC || 'Not set'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Environment:</span>
                  <span className="text-green-400">{process.env.NEXT_PUBLIC_ENVIRONMENT || 'development'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Build Time:</span>
                  <span className="text-green-400">{new Date().toISOString()}</span>
                </div>
              </div>
            </div>
            
            {/* Instructions */}
            <div className="glass-card p-8">
              <h2 className="text-2xl font-bold text-white mb-6">📋 Fix Instructions</h2>
              <div className="space-y-4 text-white/80">
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                  <h3 className="font-bold text-green-400 mb-2">✅ Fixes Implemented:</h3>
                  <ul className="space-y-1 text-sm">
                    <li>• Unified API client with proper error handling</li>
                    <li>• Fixed CORS issues by removing problematic headers</li>
                    <li>• Added retry logic with timeout (10s max)</li>
                    <li>• Standardized API endpoints to personapass.xyz</li>
                    <li>• Real-time health monitoring</li>
                  </ul>
                </div>
                
                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                  <h3 className="font-bold text-yellow-400 mb-2">⚠️ Backend Actions Required:</h3>
                  <ul className="space-y-1 text-sm">
                    <li>• Configure CORS to allow personapass.xyz domain</li>
                    <li>• Add /health endpoints to all services</li>
                    <li>• Update Vercel environment variables</li>
                    <li>• Test API connectivity manually</li>
                  </ul>
                </div>
                
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                  <h3 className="font-bold text-blue-400 mb-2">📚 Documentation:</h3>
                  <p className="text-sm">
                    See BACKEND_SETUP.md for complete setup instructions and troubleshooting guide.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}