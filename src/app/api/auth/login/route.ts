import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { connectToDatabase } from '@/lib/mongodb'
import User from '@/models/User'
import { generateToken } from '@/lib/auth'

export async function POST(req: Request) {
  await connectToDatabase()
  const { email, password, role } = await req.json()

  const user = await User.findOne({ email, role })
  if (!user) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })

  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })

  const token = generateToken({ id: user._id, role: user.role })

  return NextResponse.json({ token, user: { name: user.name, role: user.role, email: user.email } })
}
