import { NextRequest, NextResponse } from 'next/server'
import { v2 as cloudinary } from 'cloudinary'
import { IncomingForm } from 'formidable'
import fs from 'fs'
import { promisify } from 'util'

export const config = {
  api: {
    bodyParser: false,
  },
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
})

const readFile = promisify(fs.readFile)

export async function POST(req: NextRequest) {
  const form = new IncomingForm({ keepExtensions: true })

  const buffer = await req.arrayBuffer()
  const body = Buffer.from(buffer)

  const tempFilePath = `/tmp/upload-${Date.now()}`
  fs.writeFileSync(tempFilePath, body)

  try {
    const result = await cloudinary.uploader.upload(tempFilePath)
    fs.unlinkSync(tempFilePath)
    return NextResponse.json({ url: result.secure_url }, { status: 200 })
  } catch (err) {
    fs.unlinkSync(tempFilePath)
    console.error('Upload error:', err)
    return NextResponse.json({ error: 'Image upload failed' }, { status: 500 })
  }
}
