import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const sport = searchParams.get('sport')
    const marketType = searchParams.get('marketType')
    const status = searchParams.get('status')
    const isVvip = searchParams.get('isVvip')

    const where: any = {}

    if (sport && sport !== 'ALL') {
      where.sport = sport
    }

    if (marketType && marketType !== 'ALL') {
      where.marketType = marketType
    }

    if (status && status !== 'ALL') {
      where.status = status
    }

    if (isVvip !== null) {
      where.isVvip = isVvip === 'true'
    }

    const predictions = await prisma.prediction.findMany({
      where,
      orderBy: { matchTime: 'desc' },
      take: 100,
    })

    return NextResponse.json(predictions)
  } catch (error) {
    console.error('Get predictions error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(req: Request) {
  try {
    const {
      sport,
      league,
      homeTeam,
      awayTeam,
      prediction,
      odds,
      confidence,
      matchTime,
      marketType,
      isVvip,
    } = await req.json()

    const newPrediction = await prisma.prediction.create({
      data: {
        sport,
        league,
        homeTeam,
        awayTeam,
        prediction,
        odds,
        confidence,
        matchTime: new Date(matchTime),
        marketType,
        isVvip: isVvip || false,
        status: 'PENDING',
      },
    })

    return NextResponse.json(newPrediction)
  } catch (error) {
    console.error('Create prediction error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
