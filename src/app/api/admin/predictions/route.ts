import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'

// GET: Fetch all predictions with pagination and filters
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const sport = searchParams.get('sport')
    const status = searchParams.get('status')
    const isVvip = searchParams.get('isVvip')

    const where: any = {}
    if (sport) where.sport = sport
    if (status) where.status = status
    if (isVvip) where.isVvip = isVvip === 'true'

    const [predictions, total] = await Promise.all([
      prisma.prediction.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { matchTime: 'desc' }
      }),
      prisma.prediction.count({ where })
    ])

    return NextResponse.json({
      predictions,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching predictions:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

// POST: Create a new prediction
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { sport, league, homeTeam, awayTeam, prediction, odds, confidence, matchTime, marketType, isVvip } = body

    const newPrediction = await prisma.prediction.create({
      data: {
        sport: sport || 'FOOTBALL',
        league,
        homeTeam,
        awayTeam,
        prediction,
        odds: parseFloat(odds),
        confidence: confidence || 'MEDIUM',
        matchTime: new Date(matchTime),
        marketType: marketType || 'FREE_BETS',
        isVvip: isVvip || false,
        status: 'PENDING'
      }
    })

    return NextResponse.json(newPrediction, { status: 201 })
  } catch (error) {
    console.error('Error creating prediction:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

// PUT: Update a prediction
export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const { id, status, isVvip, odds, confidence, prediction, homeTeam, awayTeam, league, matchTime } = body

    const updateData: any = {}
    if (status) updateData.status = status
    if (isVvip !== undefined) updateData.isVvip = isVvip
    if (odds) updateData.odds = parseFloat(odds)
    if (confidence) updateData.confidence = confidence
    if (prediction) updateData.prediction = prediction
    if (homeTeam) updateData.homeTeam = homeTeam
    if (awayTeam) updateData.awayTeam = awayTeam
    if (league) updateData.league = league
    if (matchTime) updateData.matchTime = new Date(matchTime)

    const updatedPrediction = await prisma.prediction.update({
      where: { id },
      data: updateData
    })

    return NextResponse.json(updatedPrediction)
  } catch (error) {
    console.error('Error updating prediction:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

// DELETE: Delete a prediction
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'Prediction ID is required' }, { status: 400 })
    }

    await prisma.prediction.delete({ where: { id } })

    return NextResponse.json({ message: 'Prediction deleted successfully' })
  } catch (error) {
    console.error('Error deleting prediction:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}