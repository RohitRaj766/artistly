import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

export async function GET(req: NextRequest) {
  const token = req.cookies.get('authToken')?.value

  if (!token) {
    return NextResponse.json({ authenticated: false }, { status: 401 })
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET!)
    return NextResponse.json({ authenticated: true })
  } catch (err) {
    return NextResponse.json({ authenticated: false }, { status: 401 })
  }
}
