import { connectToDatabase } from '@/lib/mongodb'
import User from '@/models/User'
import bcrypt from 'bcryptjs'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  await connectToDatabase()
  const body = await req.json()

  const { email, password, role, name, bio, categories, languages, fee, location, imagePreview } = body

  if (role === 'manager') {
    return NextResponse.json({ error: 'Managers cannot sign up' }, { status: 403 })
  }

  const existing = await User.findOne({ email })
  if (existing) {
    return NextResponse.json({ error: 'User already exists' }, { status: 400 })
  }

  const hashed = await bcrypt.hash(password, 10)

  const newUser = await User.create({
    name,
    email,
    password: hashed,
    role,
    bio,
    categories,
    languages,
    fee,
    location,
    imagePreview,
  })

  return NextResponse.json({ message: 'Signup successful', user: newUser })
}
