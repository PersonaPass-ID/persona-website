'use client'

import dynamic from 'next/dynamic'

const GetStartedClient = dynamic(
  () => import('./GetStartedClient'),
  { 
    ssr: false,
    loading: () => (
      <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading PersonaPass...</p>
        </div>
      </div>
    )
  }
)

export default function GetStartedV2Page() {
  return <GetStartedClient />
}