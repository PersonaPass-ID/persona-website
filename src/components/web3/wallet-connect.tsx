"use client"

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { Button } from '@/components/ui/button'
import { AnimatedGradientText } from '@/components/ui/animated-gradient-text'
import { useState, useEffect } from 'react'
interface WalletOptionProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  connector: any
  onClick: () => void
}

function WalletOption({ connector, onClick }: WalletOptionProps) {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    ;(async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const provider = await connector.getProvider()
      setReady(!!provider)
    })()
  }, [connector])

  return (
    <Button
      variant="glass"
      size="lg"
      disabled={!ready}
      onClick={onClick}
      className="w-full"
    >
      <span className="flex items-center gap-3">
        {connector.name}
        {!ready && <span className="text-xs opacity-70">Detecting...</span>}
      </span>
    </Button>
  )
}

function WalletOptions() {
  const { connectors, connect } = useConnect()

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <AnimatedGradientText>
          Connect Your Wallet
        </AnimatedGradientText>
        <p className="text-white/70 mt-2">
          Choose your preferred wallet to get started with Persona
        </p>
      </div>
      <div className="grid gap-3">
        {connectors.map((connector) => (
          <WalletOption
            key={connector.uid}
            connector={connector}
            onClick={() => connect({ connector })}
          />
        ))}
      </div>
    </div>
  )
}

function Account() {
  const { address } = useAccount()
  const { disconnect } = useDisconnect()

  return (
    <div className="glass-card space-y-4">
      <div className="text-center">
        <AnimatedGradientText>
          Wallet Connected
        </AnimatedGradientText>
        {address && (
          <div className="mt-4 p-3 glass rounded-lg">
            <p className="text-white/70 text-sm">Connected Address:</p>
            <p className="text-white font-mono text-sm break-all">
              {address}
            </p>
          </div>
        )}
      </div>
      <Button
        variant="outline"
        onClick={() => disconnect()}
        className="w-full border-white/20 text-white hover:bg-white/10"
      >
        Disconnect Wallet
      </Button>
    </div>
  )
}

export function WalletConnect() {
  const { isConnected } = useAccount()

  return (
    <div className="max-w-md mx-auto">
      {isConnected ? <Account /> : <WalletOptions />}
    </div>
  )
}