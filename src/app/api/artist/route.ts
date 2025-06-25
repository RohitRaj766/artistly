import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb'
import { Artist } from '@/models/Artist'
import { withAuth } from '@/lib/auth'

export async function GET() {
  try {
    await connectToDatabase()
    const artists = await Artist.find().select('-password') 
    return NextResponse.json(artists)
  } catch (error) {
    console.error('GET error:', error)
    return NextResponse.json({ error: 'Failed to fetch artists' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  const payload = withAuth(req)
  if (!payload?.role) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')!
  await connectToDatabase()
  await Artist.deleteOne({ _id: id })
  return NextResponse.json({ message: 'Deleted' })
}
