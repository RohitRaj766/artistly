import mongoose, { Schema, model, models } from 'mongoose'

const ArtistSchema = new Schema(
  {
    name: String,
    bio: String,
    categories: [String],
    languages: [String],
    fee: String,
    location: String,
    email: { type: String, unique: true },
    password: String,
    image: String, // Store file URL or base64 or leave blank
  },
  { timestamps: true }
)

export const Artist = models.Artist || model('Artist', ArtistSchema)