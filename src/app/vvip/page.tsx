'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Crown, Lock, Clock, Trophy } from 'lucide-react'
import Link from 'next/link'
import { PredictionCard } from '@/components/prediction-card'
import { isSubscriptionActive } from '@/lib/utils'

// Mock VVIP predictions
const mockVvipPredictions = [
  {
    id: '1',
    league: 'Serie A',
    homeTeam: 'Juventus',
    awayTeam: 'AC Milan',
    prediction: 'Double Chance: Draw or Away',
    odds: 1.85,
    confidence: 'HIGH' as const,
    matchTime: new Date(Date.now() + 3600000 * 8),
    status: 'PENDING' as const,
    marketType: 'DOUBLE_CHANCE' as const,
    isVvip: true,
  },
  {
    id: '2',
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
    id: '3',
    league: 'Premier League',
    homeTeam: 'Manchester City',
    awayTeam: 'Chelsea',
    prediction: 'Correct Score: 2-1',
    odds: 8.50,
    confidence: 'MEDIUM' as const,
    matchTime: new Date(Date.now() + 3600000 * 14),
    status: 'PENDING' as const,
    marketType: 'CORRECT_SCORES' as const,
    isVvip: true,
  },
  {
    id: '4',
    league: 'Champions League',
    homeTeam: 'Real Madrid',
    awayTeam: 'Manchester United',
    prediction: 'Over 2.5 Goals',
    odds: 1.70,
    confidence: 'HIGH' as const,
    matchTime: new Date(Date.now() + 3600000 * 18),
    status: 'PENDING' as const,
    marketType: 'SUPER_SINGLE' as const,
    isVvip: true,
  },
]

const mockSubscription = {
  tier: 'MONTHLY',
  isActive: true,
  endDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
}

export default function VvipPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [subscription, setSubscription] = useState(mockSubscription)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    }
  }, [status, router])

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!session) return null

  const hasActiveSubscription = isSubscriptionActive(subscription)

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Crown className="w-8 h-8 text-vvip" />
            <h1 className="text-3xl md:text-4xl font-bold">VVIP Predictions</h1>
          </div>
          <p className="text-textMuted">Exclusive premium predictions for our VVIP members</p>
        </div>

        {hasActiveSubscription ? (
          <>
            {/* Active Subscription Banner */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass rounded-xl p-4 mb-8 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-vvip/20 flex items-center justify-center">
                  <Crown className="w-5 h-5 text-vvip" />
                </div>
                <div>
                  <div className="font-semibold">VVIP Active</div>
                  <div className="text-sm text-textMuted">Your premium access is active</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-semibold text-vvip">Monthly</div>
                <div className="text-sm text-textMuted">15 days remaining</div>
              </div>
            </motion.div>

            {/* VVIP Predictions */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockVvipPredictions.map((prediction, index) => (
                <motion.div
                  key={prediction.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <PredictionCard prediction={prediction} />
                </motion.div>
              ))}
            </div>
          </>
        ) : (
          /* Locked State */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-2xl p-12 text-center"
          >
            <div className="w-20 h-20 rounded-full bg-vvip/20 flex items-center justify-center mx-auto mb-6">
              <Lock className="w-10 h-10 text-vvip" />
            </div>
            <h2 className="text-2xl font-bold mb-4">VVIP Content Locked</h2>
            <p className="text-textMuted max-w-md mx-auto mb-8">
              Upgrade to VVIP to get access to exclusive premium predictions, 
              bankers, and high-value tips with higher success rates.
            </p>
            <Link
              href="/pricing"
              className="inline-flex items-center px-8 py-3 bg-vvip text-black font-semibold rounded-xl hover:bg-vvip/90 transition-colors"
            >
              <Crown className="w-5 h-5 mr-2" />
              Upgrade to VVIP
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  )
}
