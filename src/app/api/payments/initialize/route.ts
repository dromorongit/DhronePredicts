import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { SUBSCRIPTION_PRICES } from '@/types'

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { tier } = await req.json()

    const price = SUBSCRIPTION_PRICES.find(p => p.tier === tier)
    if (!price) {
      return NextResponse.json(
        { error: 'Invalid tier' },
        { status: 400 }
      )
    }

    // In production, integrate with Paystack here
    // For now, return a mock response
    const reference = `DHR_${Date.now()}_${Math.random().toString(36).substring(7)}`

    // Create payment record
    await prisma.payment.create({
      data: {
        userId: session.user.id,
        amount: price.price,
        currency: price.currency,
        tier: price.tier,
        reference,
        status: 'PENDING',
      },
    })

    // In production, initialize Paystack payment
    // const paystack = require('@paystack/paystack')(process.env.PAYSTACK_SECRET_KEY)
    // const payment = await paystack.transaction.initialize({
    //   amount: price.price * 100,
    //   email: user.email,
    //   reference,
    // })

    return NextResponse.json({
      reference,
      message: 'Payment initialized',
      // url: payment.data.authorization_url, // In production
      url: `/pricing?payment=success&reference=${reference}`, // Mock redirect
    })
  } catch (error) {
    console.error('Payment initialization error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
