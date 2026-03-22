import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET: Fetch all payments with pagination and filters
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const status = searchParams.get('status')

    const where: any = {}
    if (status) where.status = status

    const [payments, total] = await Promise.all([
      prisma.payment.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true
            }
          }
        }
      }),
      prisma.payment.count({ where })
    ])

    // Get subscription stats
    const subscriptionStats = await prisma.subscription.groupBy({
      by: ['tier'],
      _count: true,
      where: { isActive: true }
    })

    const totalRevenue = await prisma.payment.aggregate({
      _sum: { amount: true },
      where: { status: 'COMPLETED' }
    })

    return NextResponse.json({
      payments,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      },
      stats: {
        totalRevenue: totalRevenue._sum.amount || 0,
        subscriptionStats
      }
    })
  } catch (error) {
    console.error('Error fetching payments:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

// PUT: Update payment status (approve/reject)
export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const { id, status } = body

    const updatedPayment = await prisma.payment.update({
      where: { id },
      data: { status }
    })

    // If payment is approved, create or update subscription
    if (status === 'COMPLETED') {
      const payment = await prisma.payment.findUnique({ where: { id } })
      if (payment) {
        const endDate = new Date()
        switch (payment.tier) {
          case 'DAILY':
            endDate.setDate(endDate.getDate() + 1)
            break
          case 'MONTHLY':
            endDate.setMonth(endDate.getMonth() + 1)
            break
          case 'YEARLY':
            endDate.setFullYear(endDate.getFullYear() + 1)
            break
        }

        await prisma.subscription.upsert({
          where: { userId: payment.userId },
          update: {
            tier: payment.tier,
            isActive: true,
            endDate
          },
          create: {
            userId: payment.userId,
            tier: payment.tier,
            isActive: true,
            endDate
          }
        })
      }
    }

    return NextResponse.json(updatedPayment)
  } catch (error) {
    console.error('Error updating payment:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}