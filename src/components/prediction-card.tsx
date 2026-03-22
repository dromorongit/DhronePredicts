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
import { Crown } from 'lucide-react'
import { cn } from '@/lib/utils'

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
        return <TrendingUp className="w-3.5 h-3.5" />
      case 'MEDIUM':
        return <Minus className="w-3.5 h-3.5" />
      case 'LOW':
        return <TrendingDown className="w-3.5 h-3.5" />
    }
  }

  const getStatusBorderColor = () => {
    switch (prediction.status) {
      case 'WON':
        return 'border-l-win'
      case 'LOST':
        return 'border-l-loss'
      default:
        return 'border-l-transparent'
    }
  }

  return (
    <div className={cn(
      "prediction-card relative overflow-hidden",
      isLocked ? 'opacity-60' : '',
      getStatusBorderColor()
    )}>
      {/* VVIP Badge */}
      {prediction.isVvip && (
        <div className="absolute top-4 right-4 flex items-center gap-1 px-2 py-0.5 rounded-full bg-vvip/20 text-vvip text-xs font-semibold">
          <Crown className="w-3 h-3" />
          <span>VVIP</span>
        </div>
      )}

      {/* Locked Overlay */}
      {isLocked && (
        <div className="absolute inset-0 bg-background/90 backdrop-blur-sm z-10 flex items-center justify-center rounded-xl">
          <div className="text-center">
            <Lock className="w-8 h-8 mx-auto mb-2 text-textMuted" />
            <p className="text-sm text-textMuted">Upgrade to VVIP</p>
          </div>
        </div>
      )}

      {/* League & Time */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-medium text-textMuted uppercase tracking-wide">{prediction.league}</span>
        <div className="flex items-center gap-1.5 text-xs text-textMuted">
          <Clock className="w-3.5 h-3.5" />
          <span>{formatDate(prediction.matchTime)} • {formatTime(prediction.matchTime)}</span>
        </div>
      </div>

      {/* Teams */}
      <div className="mb-5">
        <div className="text-base font-semibold text-text">{prediction.homeTeam}</div>
        <div className="text-base font-semibold text-textMuted">vs {prediction.awayTeam}</div>
      </div>

      {/* Prediction & Odds */}
      <div className="flex items-end justify-between mb-5 pb-5 border-b border-border/50">
        <div>
          <div className="text-xs text-textMuted mb-1">Prediction</div>
          <div className="text-lg font-bold text-text">{prediction.prediction}</div>
        </div>
        <div className="text-right">
          <div className="text-xs text-textMuted mb-1">Odds</div>
          <div className="text-2xl font-bold text-primary">{prediction.odds.toFixed(2)}</div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex items-center justify-between">
        {/* Market Type */}
        <span className={cn("market-badge", getMarketTypeColor(prediction.marketType))}>
          {formatMarketType(prediction.marketType)}
        </span>
        
        {/* Confidence Badge */}
        <div className={cn(
          "flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium",
          prediction.confidence === 'HIGH' && 'bg-win/10 text-win',
          prediction.confidence === 'MEDIUM' && 'bg-warning/10 text-warning',
          prediction.confidence === 'LOW' && 'bg-loss/10 text-loss'
        )}>
          {getConfidenceIcon()}
          <span>{prediction.confidence}</span>
        </div>
      </div>

      {/* Status (if not pending) */}
      {prediction.status !== 'PENDING' && (
        <div className={cn(
          "mt-4 py-2.5 rounded-lg flex items-center justify-center font-medium",
          getStatusBgColor(prediction.status),
          getStatusColor(prediction.status)
        )}>
          {prediction.status === 'WON' && <Trophy className="w-4 h-4 mr-2" />}
          <span>{prediction.status}</span>
        </div>
      )}
    </div>
  )
}
