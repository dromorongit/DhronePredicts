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
      return 'text-win'
    case 'LOST':
      return 'text-loss'
    case 'PENDING':
      return 'text-warning'
    case 'VOID':
    case 'CANCELLED':
      return 'text-textMuted'
    default:
      return 'text-textMuted'
  }
}

export function getStatusBgColor(status: string): string {
  switch (status) {
    case 'WON':
      return 'bg-win/15'
    case 'LOST':
      return 'bg-loss/15'
    case 'PENDING':
      return 'bg-warning/15'
    case 'VOID':
    case 'CANCELLED':
      return 'bg-surfaceLight'
    default:
      return 'bg-surfaceLight'
  }
}

export function getConfidenceColor(confidence: string): string {
  switch (confidence) {
    case 'HIGH':
      return 'text-win'
    case 'MEDIUM':
      return 'text-warning'
    case 'LOW':
      return 'text-loss'
    default:
      return 'text-textMuted'
  }
}

export function getMarketTypeColor(marketType: string): string {
  switch (marketType) {
    case 'BANKERS':
      return 'bg-purple-500/15 text-purple-400'
    case 'FREE_BETS':
      return 'bg-secondary/15 text-secondary'
    case 'FREE_2_ODDS':
      return 'bg-cyan-500/15 text-cyan-400'
    case 'SUPER_SINGLE':
      return 'bg-orange-500/15 text-orange-400'
    case 'OVER_1_5':
    case 'OVER_2_5':
    case 'OVER_3_5':
      return 'bg-win/15 text-win'
    case 'BTTS_GG':
      return 'bg-teal-500/15 text-teal-400'
    case 'DOUBLE_CHANCE':
      return 'bg-indigo-500/15 text-indigo-400'
    case 'CORNERS':
      return 'bg-pink-500/15 text-pink-400'
    case 'CORRECT_SCORES':
      return 'bg-amber-500/15 text-amber-400'
    case 'DRAWS':
      return 'bg-loss/15 text-loss'
    default:
      return 'bg-surfaceLight text-textMuted'
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
