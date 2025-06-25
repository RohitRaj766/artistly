
import { NextRequest } from 'next/server'
import jwt from 'jsonwebtoken'

export function withAuth(req: NextRequest) {
  const token = req.cookies.get('authToken')?.value
  try {
    return jwt.verify(token || '', process.env.JWT_SECRET!)
  } catch {
    return null
  }
}
