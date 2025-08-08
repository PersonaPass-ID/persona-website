'use client';

import React, { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { personaChainClient } from '../lib/personachain-client';

interface TradingPair {
  id: string;
  baseToken: string;
  quoteToken: string;
  price: number;
  volume24h: number;
  priceChange24h: number;
  liquidity: number;
}

interface Portfolio {
  persona: number;
  osmo: number;
  atom: number;
  usdc: number;
}

interface TradeOrder {
  type: 'buy' | 'sell';
  pair: string;
  amount: number;
  price: number;
  total: number;
}

const MOCK_TRADING_PAIRS: TradingPair[] = [
  {
    id: 'PERSONA/OSMO',
    baseToken: 'PERSONA',
    quoteToken: 'OSMO',
    price: 1.25,
    volume24h: 2847392,
    priceChange24h: 12.5,
    liquidity: 10250000
  },
  {
    id: 'PERSONA/ATOM',
    baseToken: 'PERSONA',
    quoteToken: 'ATOM',
    price: 0.14,
    volume24h: 1523847,
    priceChange24h: -3.2,
    liquidity: 5840000
  },
  {
    id: 'PERSONA/USDC',
    baseToken: 'PERSONA',
    quoteToken: 'USDC',
    price: 1.25,
    volume24h: 3951847,
    priceChange24h: 8.7,
    liquidity: 15670000
  }
];

const MOCK_PORTFOLIO: Portfolio = {
  persona: 125000,
  osmo: 8500,
  atom: 2100,
  usdc: 15750
};

export function PersonaTradingIntegration() {
  const [selectedPair, setSelectedPair] = useState<TradingPair>(MOCK_TRADING_PAIRS[0]!);
  const [portfolio, setPortfolio] = useState<Portfolio>(MOCK_PORTFOLIO);
  const [tradeType, setTradeType] = useState<'buy' | 'sell'>('buy');
  const [tradeAmount, setTradeAmount] = useState<string>('');
  const [tradePrice, setTradePrice] = useState<string>(selectedPair.price.toString());
  const [isTrading, setIsTrading] = useState(false);
  const [balance, setBalance] = useState(0);

  // Load user's PERSONA balance
  useEffect(() => {
    async function loadBalance() {
      try {
        await personaChainClient.connect();
        if (personaChainClient.userAddress) {
          const userBalance = await personaChainClient.getBalance();
          setBalance(userBalance);
        }
      } catch (error) {
        console.error('Failed to load balance:', error);
      }
    }
    loadBalance();
  }, []);

  const handleTradeSubmit = async () => {
    if (!tradeAmount || !tradePrice) {
      alert('Please enter trade amount and price');
      return;
    }

    const amount = parseFloat(tradeAmount);
    const price = parseFloat(tradePrice);
    const total = amount * price;

    setIsTrading(true);

    try {
      // Simulate IBC transfer and DEX trade
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Update portfolio based on trade
      if (tradeType === 'buy') {
        setPortfolio(prev => ({
          ...prev,
          persona: prev.persona + amount,
          osmo: prev.osmo - total
        }));
        alert(`✅ Successfully bought ${amount.toLocaleString()} PERSONA for ${total.toLocaleString()} OSMO`);
      } else {
        setPortfolio(prev => ({
          ...prev,
          persona: prev.persona - amount,
          osmo: prev.osmo + total
        }));
        alert(`✅ Successfully sold ${amount.toLocaleString()} PERSONA for ${total.toLocaleString()} OSMO`);
      }

      setTradeAmount('');
    } catch (error) {
      alert(`❌ Trade failed: ${error}`);
    } finally {
      setIsTrading(false);
    }
  };

  const getPriceChangeColor = (change: number) => {
    return change >= 0 ? 'text-green-600' : 'text-red-600';
  };

  const getTradeButtonColor = (type: 'buy' | 'sell') => {
    return type === 'buy' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700';
  };

  return (
    <div className="space-y-6">
      {/* Market Overview */}
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-6">PERSONA Token Trading</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {MOCK_TRADING_PAIRS.map(pair => (
            <Card 
              key={pair.id}
              className={`p-4 cursor-pointer transition-all hover:shadow-md ${
                selectedPair.id === pair.id ? 'ring-2 ring-blue-500 bg-blue-50' : ''
              }`}
              onClick={() => {
                setSelectedPair(pair);
                setTradePrice(pair.price.toString());
              }}
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-bold text-lg">{pair.id}</h3>
                <span className={`text-sm font-semibold ${getPriceChangeColor(pair.priceChange24h)}`}>
                  {pair.priceChange24h >= 0 ? '+' : ''}{pair.priceChange24h.toFixed(1)}%
                </span>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Price:</span>
                  <span className="font-semibold">${pair.price.toFixed(4)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">24h Volume:</span>
                  <span className="text-sm">${pair.volume24h.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Liquidity:</span>
                  <span className="text-sm">${pair.liquidity.toLocaleString()}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Card>

      {/* Trading Interface */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Order Form */}
        <Card className="p-6">
          <h3 className="text-xl font-bold mb-4">Trade {selectedPair.id}</h3>
          
          {/* Buy/Sell Toggle */}
          <div className="flex mb-4 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setTradeType('buy')}
              className={`flex-1 py-2 px-4 rounded-md transition-all ${
                tradeType === 'buy' ? 'bg-green-600 text-white' : 'text-gray-600 hover:text-green-600'
              }`}
            >
              Buy PERSONA
            </button>
            <button
              onClick={() => setTradeType('sell')}
              className={`flex-1 py-2 px-4 rounded-md transition-all ${
                tradeType === 'sell' ? 'bg-red-600 text-white' : 'text-gray-600 hover:text-red-600'
              }`}
            >
              Sell PERSONA
            </button>
          </div>

          <div className="space-y-4">
            {/* Amount Input */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Amount ({selectedPair.baseToken})
              </label>
              <Input
                type="number"
                value={tradeAmount}
                onChange={(e) => setTradeAmount(e.target.value)}
                placeholder="0.00"
                className="w-full"
              />
            </div>

            {/* Price Input */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Price ({selectedPair.quoteToken})
              </label>
              <Input
                type="number"
                value={tradePrice}
                onChange={(e) => setTradePrice(e.target.value)}
                placeholder="0.00"
                className="w-full"
              />
            </div>

            {/* Total */}
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="flex justify-between">
                <span className="font-medium">Total:</span>
                <span className="font-bold">
                  {tradeAmount && tradePrice ? 
                    `${(parseFloat(tradeAmount) * parseFloat(tradePrice)).toFixed(4)} ${selectedPair.quoteToken}` 
                    : '0.00'
                  }
                </span>
              </div>
            </div>

            {/* Trade Button */}
            <Button
              onClick={handleTradeSubmit}
              disabled={isTrading || !tradeAmount || !tradePrice}
              className={`w-full ${getTradeButtonColor(tradeType)} text-white`}
            >
              {isTrading ? 'Processing...' : `${tradeType === 'buy' ? 'Buy' : 'Sell'} PERSONA`}
            </Button>
          </div>
        </Card>

        {/* Portfolio */}
        <Card className="p-6">
          <h3 className="text-xl font-bold mb-4">Portfolio Balance</h3>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                  P
                </div>
                <span className="font-medium">PERSONA</span>
              </div>
              <div className="text-right">
                <p className="font-bold">{portfolio.persona.toLocaleString()}</p>
                <p className="text-sm text-gray-600">
                  ${(portfolio.persona * selectedPair.price).toLocaleString()}
                </p>
              </div>
            </div>

            <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                  O
                </div>
                <span className="font-medium">OSMO</span>
              </div>
              <div className="text-right">
                <p className="font-bold">{portfolio.osmo.toLocaleString()}</p>
                <p className="text-sm text-gray-600">
                  ${(portfolio.osmo * 1.1).toLocaleString()}
                </p>
              </div>
            </div>

            <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white font-bold">
                  A
                </div>
                <span className="font-medium">ATOM</span>
              </div>
              <div className="text-right">
                <p className="font-bold">{portfolio.atom.toLocaleString()}</p>
                <p className="text-sm text-gray-600">
                  ${(portfolio.atom * 8.5).toLocaleString()}
                </p>
              </div>
            </div>

            <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">
                  $
                </div>
                <span className="font-medium">USDC</span>
              </div>
              <div className="text-right">
                <p className="font-bold">{portfolio.usdc.toLocaleString()}</p>
                <p className="text-sm text-gray-600">
                  ${portfolio.usdc.toLocaleString()}
                </p>
              </div>
            </div>

            {/* Total Portfolio Value */}
            <div className="pt-4 border-t">
              <div className="flex justify-between items-center">
                <span className="font-bold text-lg">Total Value:</span>
                <span className="font-bold text-xl text-green-600">
                  ${((portfolio.persona * selectedPair.price) + (portfolio.osmo * 1.1) + 
                     (portfolio.atom * 8.5) + portfolio.usdc).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Trading Features */}
      <Card className="p-6">
        <h3 className="text-xl font-bold mb-4">🚀 Advanced Trading Features</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <h4 className="font-semibold text-blue-600 mb-2">Cross-Chain Transfers</h4>
            <p className="text-sm text-gray-700">
              Seamlessly move PERSONA tokens between PersonaChain and Osmosis via IBC bridge for trading.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-green-600 mb-2">Liquidity Provision</h4>
            <p className="text-sm text-gray-700">
              Provide liquidity to PERSONA/OSMO pools and earn fees from every trade on the platform.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-purple-600 mb-2">Staking Integration</h4>
            <p className="text-sm text-gray-700">
              Use your PERSONA holdings for identity staking while still participating in DeFi trading.
            </p>
          </div>
        </div>
      </Card>

      {/* Market Stats */}
      <Card className="p-6">
        <h3 className="text-xl font-bold mb-4">📊 Market Statistics</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <p className="text-2xl font-bold text-blue-600">${selectedPair.price.toFixed(4)}</p>
            <p className="text-sm text-gray-600">Current Price</p>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <p className="text-2xl font-bold text-green-600">
              ${selectedPair.volume24h.toLocaleString()}
            </p>
            <p className="text-sm text-gray-600">24h Volume</p>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <p className="text-2xl font-bold text-purple-600">
              ${selectedPair.liquidity.toLocaleString()}
            </p>
            <p className="text-sm text-gray-600">Total Liquidity</p>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <p className="text-2xl font-bold text-orange-600">1,000,000,000</p>
            <p className="text-sm text-gray-600">Circulating Supply</p>
          </div>
        </div>
      </Card>

      {/* IBC Integration Info */}
      <Card className="p-6">
        <h3 className="text-xl font-bold mb-4">🌐 Inter-Blockchain Communication</h3>
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">PersonaChain → Osmosis</h4>
            <div className="text-sm space-y-1">
              <p><span className="font-medium">Channel:</span> channel-0</p>
              <p><span className="font-medium">Denom:</span> ibc/PERSONA-IBC-HASH</p>
              <p><span className="font-medium">Transfer Time:</span> ~3-5 seconds</p>
              <p><span className="font-medium">Fee:</span> 0.025 upersona</p>
            </div>
          </div>
          
          <div className="p-4 bg-green-50 rounded-lg">
            <h4 className="font-semibold text-green-800 mb-2">Trading Pairs Available</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
              <span className="px-2 py-1 bg-white rounded font-mono">PERSONA/OSMO</span>
              <span className="px-2 py-1 bg-white rounded font-mono">PERSONA/ATOM</span>
              <span className="px-2 py-1 bg-white rounded font-mono">PERSONA/USDC</span>
              <span className="px-2 py-1 bg-white rounded font-mono">PERSONA/USDT</span>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
            <div>
              <h4 className="font-semibold text-yellow-800">🚧 Demo Mode Active</h4>
              <p className="text-sm text-yellow-700">
                IBC channel setup in progress. Trading currently simulated.
              </p>
            </div>
            <Button variant="outline" size="sm">
              View Setup Progress
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}