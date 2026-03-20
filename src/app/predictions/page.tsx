'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Filter, Search, ChevronDown } from 'lucide-react'
import { PredictionCard } from '@/components/prediction-card'
import { MARKET_TYPES, SPORTS, type MarketType, type Sport } from '@/types'
import { cn } from '@/lib/utils'

// Mock data
const mockPredictions = [
  {
    id: '1',
    league: 'Premier League',
    homeTeam: 'Arsenal',
    awayTeam: 'Liverpool',
    prediction: 'Over 2.5 Goals',
    odds: 1.75,
    confidence: 'HIGH' as const,
    matchTime: new Date(Date.now() + 3600000 * 4),
    status: 'PENDING' as const,
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
    matchTime: new Date(Date.now() + 3600000 * 6),
    status: 'PENDING' as const,
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
    matchTime: new Date(Date.now() + 3600000 * 8),
    status: 'PENDING' as const,
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
    matchTime: new Date(Date.now() + 3600000 * 10),
    status: 'PENDING' as const,
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
    matchTime: new Date(Date.now() + 3600000 * 12),
    status: 'PENDING' as const,
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
    matchTime: new Date(Date.now() + 3600000 * 14),
    status: 'PENDING' as const,
    marketType: 'CORRECT_SCORES' as const,
    isVvip: true,
  },
]

export default function PredictionsPage() {
  const [selectedSport, setSelectedSport] = useState<Sport | 'ALL'>('ALL')
  const [selectedMarket, setSelectedMarket] = useState<MarketType | 'ALL'>('ALL')
  const [searchQuery, setSearchQuery] = useState('')
  const [showFilters, setShowFilters] = useState(false)

  const filteredPredictions = mockPredictions.filter((p) => {
    if (selectedSport !== 'ALL' && p.league.toLowerCase().includes(selectedSport.toLowerCase())) return false
    if (selectedMarket !== 'ALL' && p.marketType !== selectedMarket) return false
    if (searchQuery && !p.homeTeam.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !p.awayTeam.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !p.league.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Predictions</h1>
          <p className="text-textMuted">Browse our expert predictions across all sports</p>
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-4">
          {/* Search & Filter Toggle */}
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
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={cn(
                'px-4 py-3 rounded-xl border transition-colors flex items-center gap-2',
                showFilters ? 'bg-primary/10 border-primary text-primary' : 'border-white/10 text-textMuted hover:text-text'
              )}
            >
              <Filter className="w-5 h-5" />
              <span className="hidden sm:inline">Filters</span>
            </button>
          </div>

          {/* Filter Options */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-surface rounded-xl border border-white/5"
            >
              {/* Sport Filter */}
              <div>
                <label className="block text-sm text-textMuted mb-2">Sport</label>
                <select
                  value={selectedSport}
                  onChange={(e) => setSelectedSport(e.target.value as Sport | 'ALL')}
                  className="w-full px-4 py-2 bg-surfaceLight border border-white/5 rounded-lg text-text focus:outline-none focus:border-primary/50"
                >
                  <option value="ALL">All Sports</option>
                  {SPORTS.map((sport) => (
                    <option key={sport.value} value={sport.value}>
                      {sport.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Market Type Filter */}
              <div>
                <label className="block text-sm text-textMuted mb-2">Market Type</label>
                <select
                  value={selectedMarket}
                  onChange={(e) => setSelectedMarket(e.target.value as MarketType | 'ALL')}
                  className="w-full px-4 py-2 bg-surfaceLight border border-white/5 rounded-lg text-text focus:outline-none focus:border-primary/50"
                >
                  <option value="ALL">All Markets</option>
                  {MARKET_TYPES.map((market) => (
                    <option key={market.value} value={market.value}>
                      {market.label}
                    </option>
                  ))}
                </select>
              </div>
            </motion.div>
          )}

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
          Showing {filteredPredictions.length} predictions
        </div>

        {/* Predictions Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPredictions.map((prediction, index) => (
            <motion.div
              key={prediction.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <PredictionCard prediction={prediction} showLock />
            </motion.div>
          ))}
        </div>

        {filteredPredictions.length === 0 && (
          <div className="text-center py-20">
            <p className="text-textMuted text-lg">No predictions found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  )
}
