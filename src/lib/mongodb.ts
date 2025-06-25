import mongoose, { Connection } from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI

// Ensure the MONGODB_URI is set correctly in the environment variables
if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local')
}

// Global variable to maintain a cached database connection across hot reloads in development
let cached = (global as unknown as { mongoose: { conn: Connection | null; promise: Promise<Connection> | null } }).mongoose

if (!cached) {
  cached = (global as unknown as { mongoose: { conn: Connection | null; promise: Promise<Connection> | null } }).mongoose = { conn: null, promise: null }
}

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI!, {
      dbName: 'artistly', // Optional: helps MongoDB identify the default DB
      bufferCommands: false, // Optional: disable buffer commands to optimize the connection
    }).then((mongoose) => mongoose.connection) // Ensure the result is a mongoose.Connection
  }

  cached.conn = await cached.promise
  return cached.conn
}
