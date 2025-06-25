'use client'

import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useState } from 'react'

const categoriesOptions = ['Singer', 'DJ', 'Dancer', 'Speaker']
const languagesOptions = ['English', 'Hindi', 'Spanish', 'French', 'German']
const feeRanges = ['₹1L–3L', '₹2L–4L', '₹5L–7L']

const schema = yup.object({
  name: yup.string().required('Name is required'),
  bio: yup.string().required('Bio is required'),
  categories: yup.array().min(1, 'Select at least one category'),
  languages: yup.array().min(1, 'Select at least one language'),
  fee: yup.string().required('Fee range is required'),
  location: yup.string().required('Location is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 chars').required('Password is required'),
})

type FormValues = yup.InferType<typeof schema>

export default function OnboardPage() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  })

  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const onSubmit = async (data: FormValues) => {
    if (!imagePreview) {
      alert('Please upload a profile image first.')
      return
    }

    const formData = {
      ...data,
      image: imagePreview,
    }

    try {
      const res = await fetch('/api/onboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const result = await res.json()
      if (!res.ok) {
        alert(result.error || 'Something went wrong')
        return
      }

      alert('Artist registered successfully!')
      reset()
      setImagePreview(null)
    } catch (error) {
      console.error('Submission error:', error)
      alert('Failed to submit form')
    }
  }

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', 'artistly') // ✅ Replace with your actual preset

    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/dtcyfwug2/upload`, {
        method: 'POST',
        body: formData,
      })

      const data = await res.json()
      setImagePreview(data.secure_url)
    } catch (err) {
      console.error('Image upload error:', err)
      alert('Failed to upload image')
    }
  }

  return (
    <section className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-indigo-700 text-center mb-10">Artist Onboarding</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
        {/* Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Name *</label>
          <input
            {...register('name')}
            className={`w-full p-3 border rounded focus:ring-2 focus:ring-indigo-500 transition ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter your full name"
          />
          {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>}
        </div>

        {/* Bio */}
        <div>
          <label className="block text-sm font-medium mb-1">Bio *</label>
          <textarea
            rows={4}
            {...register('bio')}
            placeholder="Tell us about yourself"
            className={`w-full p-3 border rounded resize-none focus:ring-2 focus:ring-indigo-500 transition ${
              errors.bio ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.bio && <p className="text-sm text-red-500 mt-1">{errors.bio.message}</p>}
        </div>

        {/* Categories */}
        <div className="mb-6">
          <label className="block font-medium mb-2">Categories *</label>
          <Controller
            control={control}
            name="categories"
            render={({ field }) => (
              <div className="flex flex-wrap gap-4">
                {categoriesOptions.map((cat) => (
                  <label key={cat} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      value={cat}
                      checked={field.value?.includes(cat) || false}
                      onChange={() =>
                        field.value?.includes(cat)
                          ? field.onChange(field.value.filter((c) => c !== cat))
                          : field.onChange([...(field.value || []), cat])
                      }
                      className="form-checkbox text-indigo-600"
                    />
                    <span>{cat}</span>
                  </label>
                ))}
              </div>
            )}
          />
          {errors.categories && <p className="text-sm text-red-500 mt-1">{errors.categories.message}</p>}
        </div>

        {/* Languages */}
        <div className="mb-6">
          <label className="block font-medium mb-2">Languages Spoken *</label>
          <Controller
            control={control}
            name="languages"
            render={({ field }) => (
              <div className="flex flex-wrap gap-4">
                {languagesOptions.map((lang) => (
                  <label key={lang} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      value={lang}
                      checked={field.value?.includes(lang) || false}
                      onChange={() =>
                        field.value?.includes(lang)
                          ? field.onChange(field.value.filter((l) => l !== lang))
                          : field.onChange([...(field.value || []), lang])
                      }
                      className="form-checkbox text-indigo-600"
                    />
                    <span>{lang}</span>
                  </label>
                ))}
              </div>
            )}
          />
          {errors.languages && <p className="text-sm text-red-500 mt-1">{errors.languages.message}</p>}
        </div>

        {/* Fee Range */}
        <div className="mb-6">
          <label className="block font-medium mb-1">Fee Range *</label>
          <select
            {...register('fee')}
            defaultValue=""
            className={`w-full p-3 border rounded focus:ring-2 focus:ring-indigo-500 transition dark:bg-[rgb(14,13,13)] cursor-pointer ${
              errors.fee ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="" disabled>Select fee range</option>
            {feeRanges.map((fee) => (
              <option className="dark:text-black-200" key={fee} value={fee}>
                {fee}
              </option>
            ))}
          </select>
          {errors.fee && <p className="text-sm text-red-500 mt-1">{errors.fee.message}</p>}
        </div>

        {/* Location */}
        <div>
          <label className="block font-medium mb-1">Location *</label>
          <input
            {...register('location')}
            placeholder="City or region"
            className={`w-full p-3 border rounded focus:ring-2 focus:ring-indigo-500 transition ${
              errors.location ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.location && <p className="text-sm text-red-500 mt-1">{errors.location.message}</p>}
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block font-medium mb-1">Email *</label>
          <input
            type="email"
            {...register('email')}
            placeholder="you@example.com"
            className={`w-full p-3 border rounded focus:ring-2 focus:ring-indigo-500 transition ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
        </div>

        {/* Password */}
        <div>
          <label className="block font-medium mb-1">Password *</label>
          <input
            type="password"
            {...register('password')}
            placeholder="At least 6 characters"
            className={`w-full p-3 border rounded focus:ring-2 focus:ring-indigo-500 transition ${
              errors.password ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>}
        </div>

        {/* Profile Image Upload */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-4 dark:text-gray-200">Profile Image</h2>

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full text-sm text-gray-700"
          />

          {imagePreview && (
            <div className="mt-4">
              <p className="mb-1 text-sm text-gray-600 dark:text-gray-200">Preview:</p>
              <img
                src={imagePreview}
                alt="Preview"
                className="w-32 h-32 object-cover rounded shadow border"
              />
            </div>
          )}
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="cursor-pointer w-full bg-indigo-600 text-white py-3 rounded-lg text-lg font-medium hover:bg-indigo-700 transition"
          >
            Sign Up as Artist
          </button>
        </div>
      </form>
    </section>
  )
}
