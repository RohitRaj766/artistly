import jwt from 'jsonwebtoken'
const JWT_SECRET = process.env.JWT_SECRET || 'yoursecret'

export function generateToken(payload: any) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' })
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET)
  } catch (err) {
    return null
  }
}
