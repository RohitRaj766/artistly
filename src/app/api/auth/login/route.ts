import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb'
import jwt from 'jsonwebtoken'

export async function POST(req: NextRequest) {
  const { id, passcode } = await req.json()
  if (id !== 'manager' || passcode !== '123456') {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  }

  await connectToDatabase()
  const token = jwt.sign({ role: 'manager' }, process.env.JWT_SECRET!, { expiresIn: '4h' })
  const res = NextResponse.json({ message: 'Logged in' })
  res.cookies.set('authToken', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' })
  return res
}
