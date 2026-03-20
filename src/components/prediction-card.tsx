'use client'

import { 
  Clock, 
  Trophy, 
  Lock,
  TrendingUp,
  TrendingDown,
  Minus
} from 'lucide-react'
import { 
  formatDate, 
  formatTime, 
  getStatusColor, 
  getStatusBgColor,
  getConfidenceColor,
  getMarketTypeColor,
  formatMarketType
} from '@/lib/utils'
import Link from 'next/link'
import { Crown } from 'lucide-react'

interface PredictionCardProps {
  prediction: {
    id: string
    league: string
    homeTeam: string
    awayTeam: string
    prediction: string
    odds: number
    confidence: 'LOW' | 'MEDIUM' | 'HIGH'
    matchTime: Date
    status: 'PENDING' | 'WON' | 'LOST' | 'VOID' | 'CANCELLED'
    marketType: string
    isVvip: boolean
  }
  showLock?: boolean
}

export function PredictionCard({ prediction, showLock = false }: PredictionCardProps) {
  const isLocked = showLock && prediction.isVvip

  const getConfidenceIcon = () => {
    switch (prediction.confidence) {
      case 'HIGH':
        return <TrendingUp className="w-4 h-4" />
      case 'MEDIUM':
        return <Minus className="w-4 h-4" />
      case 'LOW':
        return <TrendingDown className="w-4 h-4" />
    }
  }

  return (
    <div className={`prediction-card relative ${isLocked ? 'opacity-60' : ''}`}>
      {/* VVIP Badge */}
      {prediction.isVvip && (
        <div className="absolute top-4 right-4 flex items-center space-x-1 px-2 py-1 rounded-full bg-vvip/20 text-vvip text-xs font-medium">
          <Crown className="w-3 h-3" />
          <span>VVIP</span>
        </div>
      )}

      {/* Locked Overlay */}
      {isLocked && (
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-10 flex items-center justify-center rounded-xl">
          <div className="text-center">
            <Lock className="w-8 h-8 mx-auto mb-2 text-textMuted" />
            <p className="text-sm text-textMuted">Upgrade to VVIP</p>
          </div>
        </div>
      )}

      {/* League & Time */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-textMuted">{prediction.league}</span>
        <div className="flex items-center text-sm text-textMuted">
          <Clock className="w-4 h-4 mr-1" />
          {formatDate(prediction.matchTime)} • {formatTime(prediction.matchTime)}
        </div>
      </div>

      {/* Teams */}
      <div className="mb-4">
        <div className="text-lg font-semibold mb-1">{prediction.homeTeam}</div>
        <div className="text-lg font-semibold text-textMuted">vs {prediction.awayTeam}</div>
      </div>

      {/* Prediction */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-sm text-textMuted mb-1">Prediction</div>
          <div className="text-xl font-bold">{prediction.prediction}</div>
        </div>
        <div className="text-right">
          <div className="text-sm text-textMuted mb-1">Odds</div>
          <div className="text-2xl font-bold text-primary">{prediction.odds.toFixed(2)}</div>
        </div>
      </div>

      {/* Market Type & Confidence */}
      <div className="flex items-center justify-between pt-4 border-t border-white/5">
        <span className={`market-badge ${getMarketTypeColor(prediction.marketType)}`}>
          {formatMarketType(prediction.marketType)}
        </span>
        <div className={`flex items-center space-x-1 ${getConfidenceColor(prediction.confidence)}`}>
          {getConfidenceIcon()}
          <span className="text-sm font-medium">{prediction.confidence}</span>
        </div>
      </div>

      {/* Status (if not pending) */}
      {prediction.status !== 'PENDING' && (
        <div className={`mt-4 px-3 py-2 rounded-lg ${getStatusBgColor(prediction.status)} ${getStatusColor(prediction.status)} flex items-center justify-center`}>
          {prediction.status === 'WON' && <Trophy className="w-4 h-4 mr-2" />}
          <span className="font-medium">{prediction.status}</span>
        </div>
      )}
    </div>
  )
}
