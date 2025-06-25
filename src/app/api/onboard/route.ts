import { connectToDatabase } from '@/lib/mongodb'
import { Artist } from '@/models/Artist'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const data = await req.json()
    await connectToDatabase()

    const existing = await Artist.findOne({ email: data.email })
    if (existing) {
      return NextResponse.json({ error: 'Email already exists' }, { status: 409 })
    }

    const newArtist = new Artist(data)
    await newArtist.save()

    return NextResponse.json({ message: 'Artist created' }, { status: 201 })
  } catch (err) {
    console.error('Error saving artist:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function GET() {
  try {
    await connectToDatabase()
    const artists = await Artist.find().select('-password') // exclude password
    return NextResponse.json(artists)
  } catch (error) {
    console.error('GET error:', error)
    return NextResponse.json({ error: 'Failed to fetch artists' }, { status: 500 })
  }
}
