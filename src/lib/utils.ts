import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date | string): string {
  const d = new Date(date)
  return d.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  })
}

export function formatTime(date: Date | string): string {
  const d = new Date(date)
  return d.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function formatDateTime(date: Date | string): string {
  return `${formatDate(date)} ${formatTime(date)}`
}

export function getStatusColor(status: string): string {
  switch (status) {
    case 'WON':
      return 'text-green-400'
    case 'LOST':
      return 'text-red-400'
    case 'PENDING':
      return 'text-yellow-400'
    case 'VOID':
    case 'CANCELLED':
      return 'text-gray-400'
    default:
      return 'text-gray-400'
  }
}

export function getStatusBgColor(status: string): string {
  switch (status) {
    case 'WON':
      return 'bg-green-500/20'
    case 'LOST':
      return 'bg-red-500/20'
    case 'PENDING':
      return 'bg-yellow-500/20'
    case 'VOID':
    case 'CANCELLED':
      return 'bg-gray-500/20'
    default:
      return 'bg-gray-500/20'
  }
}

export function getConfidenceColor(confidence: string): string {
  switch (confidence) {
    case 'HIGH':
      return 'text-green-400'
    case 'MEDIUM':
      return 'text-yellow-400'
    case 'LOW':
      return 'text-red-400'
    default:
      return 'text-gray-400'
  }
}

export function getMarketTypeColor(marketType: string): string {
  switch (marketType) {
    case 'BANKERS':
      return 'bg-purple-500/20 text-purple-400'
    case 'FREE_BETS':
      return 'bg-blue-500/20 text-blue-400'
    case 'FREE_2_ODDS':
      return 'bg-cyan-500/20 text-cyan-400'
    case 'SUPER_SINGLE':
      return 'bg-orange-500/20 text-orange-400'
    case 'OVER_1_5':
    case 'OVER_2_5':
    case 'OVER_3_5':
      return 'bg-green-500/20 text-green-400'
    case 'BTTS_GG':
      return 'bg-teal-500/20 text-teal-400'
    case 'DOUBLE_CHANCE':
      return 'bg-indigo-500/20 text-indigo-400'
    case 'CORNERS':
      return 'bg-pink-500/20 text-pink-400'
    case 'CORRECT_SCORES':
      return 'bg-amber-500/20 text-amber-400'
    case 'DRAWS':
      return 'bg-red-500/20 text-red-400'
    default:
      return 'bg-gray-500/20 text-gray-400'
  }
}

export function formatMarketType(marketType: string): string {
  return marketType.replace(/_/g, ' ').toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase())
}

export function getDaysRemaining(endDate: Date): number {
  const now = new Date()
  const end = new Date(endDate)
  const diff = end.getTime() - now.getTime()
  return Math.ceil(diff / (1000 * 60 * 60 * 24))
}

export function isSubscriptionActive(subscription: { isActive: boolean; endDate: Date } | null): boolean {
  if (!subscription || !subscription.isActive) return false
  return new Date(subscription.endDate) > new Date()
}
