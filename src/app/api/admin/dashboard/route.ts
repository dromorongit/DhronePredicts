import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    // Fetch dashboard statistics
    const [totalUsers, totalRevenue, predictionsToday, recentActivity] = await Promise.all([
      prisma.user.count(),
      prisma.payment.aggregate({ _sum: { amount: true }, where: { status: 'COMPLETED' } }),
      prisma.prediction.count({
        where: {
          createdAt: {
            gte: new Date(new Date().setHours(0, 0, 0, 0))
          }
        }
      }),
      prisma.prediction.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          homeTeam: true,
          awayTeam: true,
          prediction: true,
          status: true,
          createdAt: true
        }
      })
    ])

    // Get active VIP users (users with subscription)
    const activeVipUsers = await prisma.subscription.count({ where: { isActive: true } })

    // Calculate win rate
    const wonPredictions = await prisma.prediction.count({ where: { status: 'WON' } })
    const lostPredictions = await prisma.prediction.count({ where: { status: 'LOST' } })
    const totalFinished = wonPredictions + lostPredictions
    const winRateValue = totalFinished > 0 ? (wonPredictions / totalFinished) * 100 : 0

    // Format recent activity
    const formattedRecentActivity = recentActivity.map(pred => ({
      id: pred.id,
      match: `${pred.homeTeam} vs ${pred.awayTeam}`,
      prediction: pred.prediction,
      status: pred.status,
      time: pred.createdAt.toLocaleString()
    }))

    return NextResponse.json({
      totalUsers: totalUsers || 0,
      activeVipUsers: activeVipUsers || 0,
      totalRevenue: totalRevenue._sum.amount || 0,
      winRate: Math.round(winRateValue * 10) / 10,
      predictionsToday: predictionsToday || 0,
      recentActivity: formattedRecentActivity
    })
  } catch (error) {
    console.error('Error fetching admin dashboard data:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}