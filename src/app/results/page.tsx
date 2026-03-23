'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Trophy, XCircle, Clock } from 'lucide-react'
import { PredictionCard } from '@/components/prediction-card'
import { MARKET_TYPES, type MarketType } from '@/types'
import { cn } from '@/lib/utils'

// Mock data
const mockResults = [
  {
    id: '1',
    league: 'Premier League',
    homeTeam: 'Arsenal',
    awayTeam: 'Liverpool',
    prediction: 'Over 2.5 Goals',
    odds: 1.75,
    confidence: 'HIGH' as const,
    matchTime: new Date(Date.now() - 3600000 * 2),
    status: 'WON' as const,
    marketType: 'OVER_2_5' as const,
    isVvip: false,
  },
  {
    id: '2',
    league: 'La Liga',
    homeTeam: 'Real Madrid',
    awayTeam: 'Barcelona',
    prediction: 'BTTS/GG',
    odds: 1.65,
    confidence: 'HIGH' as const,
    matchTime: new Date(Date.now() - 3600000 * 4),
    status: 'WON' as const,
    marketType: 'BTTS_GG' as const,
    isVvip: false,
  },
  {
    id: '3',
    league: 'Serie A',
    homeTeam: 'Juventus',
    awayTeam: 'AC Milan',
    prediction: 'Double Chance: Draw or Away',
    odds: 1.85,
    confidence: 'MEDIUM' as const,
    matchTime: new Date(Date.now() - 3600000 * 6),
    status: 'LOST' as const,
    marketType: 'DOUBLE_CHANCE' as const,
    isVvip: true,
  },
  {
    id: '4',
    league: 'Bundesliga',
    homeTeam: 'Bayern Munich',
    awayTeam: 'Dortmund',
    prediction: 'Home Win',
    odds: 1.55,
    confidence: 'HIGH' as const,
    matchTime: new Date(Date.now() - 3600000 * 8),
    status: 'WON' as const,
    marketType: 'BANKERS' as const,
    isVvip: true,
  },
  {
    id: '5',
    league: 'Ligue 1',
    homeTeam: 'PSG',
    awayTeam: 'Marseille',
    prediction: 'Over 3.5 Goals',
    odds: 2.10,
    confidence: 'MEDIUM' as const,
    matchTime: new Date(Date.now() - 3600000 * 10),
    status: 'LOST' as const,
    marketType: 'OVER_3_5' as const,
    isVvip: false,
  },
  {
    id: '6',
    league: 'Premier League',
    homeTeam: 'Manchester City',
    awayTeam: 'Chelsea',
    prediction: 'Correct Score: 2-1',
    odds: 8.50,
    confidence: 'LOW' as const,
    matchTime: new Date(Date.now() - 3600000 * 12),
    status: 'WON' as const,
    marketType: 'CORRECT_SCORES' as const,
    isVvip: true,
  },
]

export default function ResultsPage() {
  const [selectedMarket, setSelectedMarket] = useState<MarketType | 'ALL'>('ALL')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredResults = mockResults.filter((r) => {
    if (selectedMarket !== 'ALL' && r.marketType !== selectedMarket) return false
    if (searchQuery && !r.homeTeam.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !r.awayTeam.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !r.league.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  const wins = filteredResults.filter(r => r.status === 'WON').length
  const losses = filteredResults.filter(r => r.status === 'LOST').length
  const winRate = filteredResults.length > 0 ? Math.round((wins / filteredResults.length) * 100) : 0

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Results</h1>
          <p className="text-textMuted">Track our prediction performance</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="glass rounded-xl p-4 text-center">
            <Trophy className="w-8 h-8 mx-auto mb-2 text-green-400" />
            <div className="text-2xl font-bold">{wins}</div>
            <div className="text-sm text-textMuted">Wins</div>
          </div>
          <div className="glass rounded-xl p-4 text-center">
            <XCircle className="w-8 h-8 mx-auto mb-2 text-red-400" />
            <div className="text-2xl font-bold">{losses}</div>
            <div className="text-sm text-textMuted">Losses</div>
          </div>
          <div className="glass rounded-xl p-4 text-center">
            <div className="w-8 h-8 mx-auto mb-2 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-primary font-bold">{winRate}%</span>
            </div>
            <div className="text-2xl font-bold">{winRate}%</div>
            <div className="text-sm text-textMuted">Win Rate</div>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-textMuted" />
              <input
                type="text"
                placeholder="Search teams or leagues..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-surface border border-white/5 rounded-xl text-text placeholder:text-textMuted focus:outline-none focus:border-primary/50 transition-colors"
              />
            </div>
          </div>

          {/* Market Type Pills */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedMarket('ALL')}
              className={cn(
                'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                selectedMarket === 'ALL'
                  ? 'bg-primary text-black'
                  : 'bg-surface text-textMuted hover:text-text'
              )}
            >
              All
            </button>
            {MARKET_TYPES.slice(0, 6).map((market) => (
              <button
                key={market.value}
                onClick={() => setSelectedMarket(market.value)}
                className={cn(
                  'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                  selectedMarket === market.value
                    ? 'bg-primary text-black'
                    : 'bg-surface text-textMuted hover:text-text'
                )}
              >
                {market.label}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6 text-textMuted">
          Showing {filteredResults.length} results
        </div>

        {/* Results Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResults.map((result, index) => (
            <motion.div
              key={result.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <PredictionCard prediction={result} />
            </motion.div>
          ))}
        </div>

        {filteredResults.length === 0 && (
          <div className="text-center py-20">
            <p className="text-textMuted text-lg">No results found</p>
          </div>
        )}
      </div>
    </div>
  )
}
