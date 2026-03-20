'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  TrendingUp, 
  Shield, 
  Zap, 
  Crown, 
  ArrowRight,
  Target,
  Users,
  Trophy
} from 'lucide-react'
import { PredictionCard } from '@/components/prediction-card'
import { MARKET_TYPES, SPORTS } from '@/types'

// Mock data for demo
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
]

const features = [
  {
    icon: Target,
    title: 'Expert Predictions',
    description: 'Advanced algorithms combined with expert analysis for accurate predictions'
  },
  {
    icon: Shield,
    title: 'Verified Results',
    description: 'Track our performance with transparent, verified outcomes'
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Real-time updates and instant access to premium predictions'
  },
  {
    icon: Crown,
    title: 'VVIP Access',
    description: 'Exclusive high-value predictions for premium subscribers'
  }
]

const stats = [
  { value: '85%', label: 'Win Rate' },
  { value: '2.5K+', label: 'Active Users' },
  { value: '10K+', label: 'Predictions' },
  { value: '50+', label: 'Leagues' }
]

export default function HomePage() {
  const [predictions, setPredictions] = useState(mockPredictions)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <Crown className="w-4 h-4 mr-2" />
                #1 Sports Prediction Platform
              </span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
            >
              Predict. Win.{' '}
              <span className="gradient-text">Profit.</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-textMuted max-w-2xl mx-auto mb-10"
            >
              Get expert sports predictions with our AI-powered system. 
              Join thousands of winning users today.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link
                href="/predictions"
                className="w-full sm:w-auto px-8 py-4 bg-primary text-black font-semibold rounded-xl hover:bg-primary/90 transition-colors flex items-center justify-center"
              >
                View Predictions
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link
                href="/pricing"
                className="w-full sm:w-auto px-8 py-4 bg-surfaceLight text-text font-semibold rounded-xl hover:bg-surface transition-colors flex items-center justify-center"
              >
                <Crown className="w-5 h-5 mr-2 text-vvip" />
                Go VVIP
              </Link>
            </motion.div>
          </div>

          {/* Stats */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {stats.map((stat, index) => (
              <div 
                key={stat.label}
                className="glass rounded-2xl p-6 text-center"
              >
                <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                  {stat.value}
                </div>
                <div className="text-textMuted text-sm">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose DhronePredicts?
            </h2>
            <p className="text-textMuted max-w-2xl mx-auto">
              We combine cutting-edge technology with sports expertise to deliver 
              predictions you can trust.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass rounded-2xl p-6 card-hover"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-textMuted text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Predictions Section */}
      <section className="py-20 bg-surface/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold mb-2">Latest Predictions</h2>
              <p className="text-textMuted">Fresh predictions updated in real-time</p>
            </div>
            <Link
              href="/predictions"
              className="hidden md:flex items-center text-primary hover:text-primary/80 transition-colors"
            >
              View All
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
            {predictions.map((prediction, index) => (
              <motion.div
                key={prediction.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <PredictionCard prediction={prediction} />
              </motion.div>
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link
              href="/predictions"
              className="inline-flex items-center text-primary hover:text-primary/80 transition-colors"
            >
              View All Predictions
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20" />
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
            <div className="relative p-8 md:p-16 text-center">
              <div className="w-16 h-16 rounded-2xl bg-vvip/20 flex items-center justify-center mx-auto mb-6">
                <Trophy className="w-8 h-8 text-vvip" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Start Winning?
              </h2>
              <p className="text-textMuted max-w-2xl mx-auto mb-8">
                Join our VVIP membership today and get access to exclusive high-value 
                predictions with higher success rates.
              </p>
              <Link
                href="/pricing"
                className="inline-flex items-center px-8 py-4 bg-vvip text-black font-semibold rounded-xl hover:bg-vvip/90 transition-colors"
              >
                <Crown className="w-5 h-5 mr-2" />
                Become VVIP
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-green-400 flex items-center justify-center">
                <span className="text-black font-bold">D</span>
              </div>
              <span className="font-bold">DhronePredicts</span>
            </div>
            <div className="text-textMuted text-sm">
              © 2024 DhronePredicts. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
