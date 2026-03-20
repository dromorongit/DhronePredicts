'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Crown, Clock, Trophy, TrendingUp, CreditCard, Bell } from 'lucide-react'
import Link from 'next/link'
import { PredictionCard } from '@/components/prediction-card'
import { getDaysRemaining, isSubscriptionActive } from '@/lib/utils'

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
    isVvip: true,
  },
]

const mockSubscription = {
  tier: 'MONTHLY',
  isActive: true,
  endDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
}

export default function DashboardPage() {
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
  const daysRemaining = getDaysRemaining(subscription.endDate)

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Welcome back, {session.user?.name || 'User'}!
          </h1>
          <p className="text-textMuted">Here's your prediction overview</p>
        </div>

        {/* Subscription Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`rounded-2xl p-6 mb-8 ${
            hasActiveSubscription 
              ? 'bg-gradient-to-r from-vvip/20 to-yellow-600/10 border border-vvip/30' 
              : 'glass'
          }`}
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                hasActiveSubscription ? 'bg-vvip' : 'bg-surfaceLight'
              }`}>
                <Crown className={`w-6 h-6 ${hasActiveSubscription ? 'text-black' : 'text-textMuted'}`} />
              </div>
              <div>
                <h3 className="text-lg font-semibold">
                  {hasActiveSubscription ? 'VVIP Member' : 'Free Plan'}
                </h3>
                <p className="text-textMuted text-sm">
                  {hasActiveSubscription 
                    ? `${daysRemaining} days remaining` 
                    : 'Upgrade to access VVIP predictions'}
                </p>
              </div>
            </div>
            {!hasActiveSubscription && (
              <Link
                href="/pricing"
                className="px-6 py-2 bg-vvip text-black font-semibold rounded-xl hover:bg-vvip/90 transition-colors"
              >
                Upgrade Now
              </Link>
            )}
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass rounded-xl p-6"
          >
            <Clock className="w-8 h-8 text-primary mb-3" />
            <div className="text-2xl font-bold mb-1">12</div>
            <div className="text-sm text-textMuted">Pending Predictions</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass rounded-xl p-6"
          >
            <Trophy className="w-8 h-8 text-green-400 mb-3" />
            <div className="text-2xl font-bold mb-1">45</div>
            <div className="text-sm text-textMuted">Wins This Month</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass rounded-xl p-6"
          >
            <TrendingUp className="w-8 h-8 text-blue-400 mb-3" />
            <div className="text-2xl font-bold mb-1">85%</div>
            <div className="text-sm text-textMuted">Win Rate</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass rounded-xl p-6"
          >
            <CreditCard className="w-8 h-8 text-purple-400 mb-3" />
            <div className="text-2xl font-bold mb-1">₵2,450</div>
            <div className="text-sm text-textMuted">Total Earnings</div>
          </motion.div>
        </div>

        {/* Latest Predictions */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Latest Predictions</h2>
            <Link href="/predictions" className="text-primary hover:text-primary/80 text-sm">
              View All
            </Link>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {mockPredictions.map((prediction, index) => (
              <motion.div
                key={prediction.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <PredictionCard prediction={prediction} showLock />
              </motion.div>
            ))}
          </div>
        </div>

        {/* VVIP Section */}
        {!hasActiveSubscription && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-2xl p-8 text-center"
          >
            <Crown className="w-12 h-12 mx-auto mb-4 text-vvip" />
            <h2 className="text-2xl font-bold mb-2">Unlock VVIP Access</h2>
            <p className="text-textMuted mb-6 max-w-md mx-auto">
              Get access to exclusive high-value predictions, bankers, and premium tips 
              with our VVIP membership.
            </p>
            <Link
              href="/pricing"
              className="inline-flex items-center px-8 py-3 bg-vvip text-black font-semibold rounded-xl hover:bg-vvip/90 transition-colors"
            >
              <Crown className="w-5 h-5 mr-2" />
              Become VVIP
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  )
}
