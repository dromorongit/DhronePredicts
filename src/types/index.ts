import 'next-auth'

declare module 'next-auth' {
  interface User {
    id: string
    role: string
  }

  interface Session {
    user: {
      id: string
      email: string
      name?: string | null
      image?: string | null
      role: string
    }
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string
    role: string
  }
}

export type Sport = 'FOOTBALL' | 'BASKETBALL' | 'TENNIS'
export type MarketType = 
  | 'FREE_BETS' 
  | 'BANKERS' 
  | 'FREE_2_ODDS' 
  | 'SUPER_SINGLE' 
  | 'OVER_1_5' 
  | 'OVER_2_5' 
  | 'BTTS_GG' 
  | 'OVER_3_5' 
  | 'DOUBLE_CHANCE' 
  | 'CORNERS' 
  | 'CORRECT_SCORES' 
  | 'DRAWS'
export type ConfidenceLevel = 'LOW' | 'MEDIUM' | 'HIGH'
export type PredictionStatus = 'PENDING' | 'WON' | 'LOST' | 'VOID' | 'CANCELLED'
export type SubscriptionTier = 'DAILY' | 'MONTHLY' | 'YEARLY'
export type Role = 'USER' | 'ADMIN'

export interface Prediction {
  id: string
  sport: Sport
  league: string
  homeTeam: string
  awayTeam: string
  prediction: string
  odds: number
  confidence: ConfidenceLevel
  matchTime: Date
  status: PredictionStatus
  marketType: MarketType
  isVvip: boolean
  result?: string | null
  createdAt: Date
  updatedAt: Date
}

export interface Subscription {
  id: string
  userId: string
  tier: SubscriptionTier
  startDate: Date
  endDate: Date
  isActive: boolean
}

export interface User {
  id: string
  email: string
  name?: string | null
  role: Role
  subscription?: Subscription | null
}

export const MARKET_TYPES: { value: MarketType; label: string }[] = [
  { value: 'FREE_BETS', label: 'Free Bets' },
  { value: 'BANKERS', label: 'Bankers' },
  { value: 'FREE_2_ODDS', label: 'Free 2 Odds' },
  { value: 'SUPER_SINGLE', label: 'Super Single' },
  { value: 'OVER_1_5', label: 'Over 1.5 Goals' },
  { value: 'OVER_2_5', label: 'Over 2.5 Goals' },
  { value: 'BTTS_GG', label: 'BTTS/GG' },
  { value: 'OVER_3_5', label: 'Over 3.5 Goals' },
  { value: 'DOUBLE_CHANCE', label: 'Double Chance' },
  { value: 'CORNERS', label: 'Over/Under Corners' },
  { value: 'CORRECT_SCORES', label: 'Correct Scores' },
  { value: 'DRAWS', label: 'Draws' },
]

export const SPORTS: { value: Sport; label: string }[] = [
  { value: 'FOOTBALL', label: 'Football' },
  { value: 'BASKETBALL', label: 'Basketball' },
  { value: 'TENNIS', label: 'Tennis' },
]

export const SUBSCRIPTION_PRICES: { tier: SubscriptionTier; name: string; price: number; currency: string; duration_days: number }[] = [
  { tier: 'DAILY', name: 'Daily', price: 50, currency: 'GHS', duration_days: 1 },
  { tier: 'MONTHLY', name: 'Monthly', price: 400, currency: 'GHS', duration_days: 30 },
  { tier: 'YEARLY', name: 'Yearly', price: 2350, currency: 'GHS', duration_days: 365 },
]
