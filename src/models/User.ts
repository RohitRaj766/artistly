import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ['artist', 'client', 'manager'], default: 'client' },

  // Artist profile fields
  bio: String,
  categories: [String],
  languages: [String],
  fee: String,
  location: String,
  imagePreview: String,
}, { timestamps: true })

export default mongoose.models.User || mongoose.model('User', UserSchema)
