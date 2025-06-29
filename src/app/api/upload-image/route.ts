import { NextRequest, NextResponse } from 'next/server'
import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs'


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



export async function POST(req: NextRequest) {

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
