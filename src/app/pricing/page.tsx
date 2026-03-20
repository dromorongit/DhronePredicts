'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, Crown, Zap, Shield, Clock } from 'lucide-react'
import Link from 'next/link'
import { SUBSCRIPTION_PRICES, type SubscriptionTier } from '@/types'

const features = [
  { icon: Shield, text: 'Verified predictions' },
  { icon: Zap, text: 'Real-time updates' },
  { icon: Clock, text: '24/7 support' },
  { icon: Crown, text: 'Exclusive VVIP tips' },
]

export default function PricingPage() {
  const [isLoading, setIsLoading] = useState<string | null>(null)

  const handleSubscribe = async (tier: SubscriptionTier) => {
    setIsLoading(tier)
    
    try {
      const res = await fetch('/api/payments/initialize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tier }),
      })

      const data = await res.json()

      if (data.url) {
        window.location.href = data.url
      } else {
        alert('Payment initialization failed')
      }
    } catch (error) {
      alert('Something went wrong')
    } finally {
      setIsLoading(null)
    }
  }

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-vvip/10 text-vvip text-sm font-medium mb-6">
              <Crown className="w-4 h-4 mr-2" />
              VIP Membership
            </span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Choose Your Plan
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-textMuted max-w-2xl mx-auto"
          >
            Get access to premium predictions and win more with our VVIP membership
          </motion.p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {SUBSCRIPTION_PRICES.map((plan, index) => (
            <motion.div
              key={plan.tier}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className={`relative glass rounded-2xl p-8 ${
                plan.tier === 'MONTHLY' ? 'border-2 border-vvip' : ''
              }`}
            >
              {plan.tier === 'MONTHLY' && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-vvip text-black text-sm font-semibold rounded-full">
                  Most Popular
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-baseline justify-center">
                  <span className="text-4xl font-bold">{plan.currency}</span>
                  <span className="text-5xl font-bold ml-1">{plan.price}</span>
                </div>
                <p className="text-textMuted mt-2">
                  {plan.duration_days === 1 ? 'Per day' : 
                   plan.duration_days === 30 ? 'Per month' : 
                   `Per year (${Math.round(plan.price / 365)}/day)`}
                </p>
              </div>

              <ul className="space-y-4 mb-8">
                {features.map((feature) => (
                  <li key={feature.text} className="flex items-center">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                      <Check className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-textMuted">{feature.text}</span>
                  </li>
                ))}
                {plan.tier === 'YEARLY' && (
                  <>
                    <li className="flex items-center">
                      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                        <Check className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-textMuted">2 months free</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                        <Check className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-textMuted">Priority support</span>
                    </li>
                  </>
                )}
              </ul>

              <button
                onClick={() => handleSubscribe(plan.tier)}
                disabled={isLoading === plan.tier}
                className={`w-full py-3 rounded-xl font-semibold transition-colors ${
                  plan.tier === 'MONTHLY'
                    ? 'bg-vvip text-black hover:bg-vvip/90'
                    : 'bg-surfaceLight text-text hover:bg-surface'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {isLoading === plan.tier ? 'Processing...' : 
                 plan.tier === 'YEARLY' ? 'Get Yearly Access' : 
                 plan.tier === 'MONTHLY' ? 'Get Monthly Access' : 
                 'Get Daily Access'}
              </button>
            </motion.div>
          ))}
        </div>

        {/* FAQ or Additional Info */}
        <div className="mt-20 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="glass rounded-xl p-6">
              <h3 className="font-semibold mb-2">How do I access VVIP predictions?</h3>
              <p className="text-textMuted">
                Once subscribed, you'll get instant access to exclusive VVIP predictions 
                through your dashboard. All predictions are verified and updated in real-time.
              </p>
            </div>
            <div className="glass rounded-xl p-6">
              <h3 className="font-semibold mb-2">Can I cancel anytime?</h3>
              <p className="text-textMuted">
                Yes, you can cancel your subscription anytime. Your access will remain active 
                until the end of your current billing period.
              </p>
            </div>
            <div className="glass rounded-xl p-6">
              <h3 className="font-semibold mb-2">What payment methods are available?</h3>
              <p className="text-textMuted">
                We accept all major payment methods through Paystack including Mobile Money, 
                Visa, Mastercard, and Bank transfers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
