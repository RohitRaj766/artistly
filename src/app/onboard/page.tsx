'use client'

import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import CategorySelector from '@/components/form/CategorySelector'
import { useState } from 'react'

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  bio: yup.string().required('Bio is required'),
  categories: yup.array().min(1, 'Select at least one category'),
  languages: yup.array().min(1, 'Select at least one language'),
  fee: yup.string().required('Fee range is required'),
  location: yup.string().required('Location is required'),
})

type FormValues = {
  name: string
  bio: string
  categories: string[]
  languages: string[]
  fee: string
  location: string
  image?: FileList
  imagePreview?: string
}

export default function OnboardPage() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
    watch,
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  })

  const [artistList, setArtistList] = useLocalStorage<FormValues[]>('artists', [])
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const imageFile = watch('image')?.[0]

  // Show image preview
  if (imageFile && !previewUrl) {
    const reader = new FileReader()
    reader.onloadend = () => setPreviewUrl(reader.result as string)
    reader.readAsDataURL(imageFile)
  }

  const onSubmit = (data: FormValues) => {
    const artistData = {
      ...data,
      imagePreview: previewUrl || '',
    }
    setArtistList([...artistList, artistData])
    alert('Artist submitted successfully!')
    setPreviewUrl(null)
    reset()
  }

  return (
    <section className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-indigo-700">Artist Onboarding</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            type="text"
            {...register('name')}
            className="mt-1 w-full border p-2 rounded"
          />
          <p className="text-sm text-red-500">{errors.name?.message}</p>
        </div>

        {/* Bio */}
        <div>
          <label className="block text-sm font-medium">Bio</label>
          <textarea
            {...register('bio')}
            className="mt-1 w-full border p-2 rounded"
            rows={3}
          />
          <p className="text-sm text-red-500">{errors.bio?.message}</p>
        </div>

        {/* Categories */}
        <div>
          <label className="block text-sm font-medium">Category</label>
          <Controller
            control={control}
            name="categories"
            render={({ field }) => (
              <CategorySelector
                options={['Singer', 'DJ', 'Dancer', 'Speaker']}
                selected={field.value || []}
                onChange={field.onChange}
              />
            )}
          />
          <p className="text-sm text-red-500">{errors.categories?.message}</p>
        </div>

        {/* Languages */}
        <div>
          <label className="block text-sm font-medium">Languages Spoken</label>
          <Controller
            control={control}
            name="languages"
            render={({ field }) => (
              <CategorySelector
                options={['Hindi', 'English', 'Punjabi', 'Marathi']}
                selected={field.value || []}
                onChange={field.onChange}
              />
            )}
          />
          <p className="text-sm text-red-500">{errors.languages?.message}</p>
        </div>

        {/* Fee */}
        <div>
          <label className="block text-sm font-medium">Fee Range</label>
          <select {...register('fee')} className="w-full border p-2 rounded mt-1">
            <option value="">Select</option>
            <option value="₹1L–3L">₹1L–3L</option>
            <option value="₹2L–4L">₹2L–4L</option>
            <option value="₹5L–7L">₹5L–7L</option>
          </select>
          <p className="text-sm text-red-500">{errors.fee?.message}</p>
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium">Location</label>
          <input
            type="text"
            {...register('location')}
            className="mt-1 w-full border p-2 rounded"
          />
          <p className="text-sm text-red-500">{errors.location?.message}</p>
        </div>

        {/* Image Upload + Preview */}
        <div>
          <label className="block text-sm font-medium">Profile Image (optional)</label>
          <input type="file" {...register('image')} accept="image/*" className="mt-1" />
          {previewUrl && (
            <img
              src={previewUrl}
              alt="Preview"
              className="w-32 h-32 object-cover mt-3 rounded shadow"
            />
          )}
        </div>

        <button
          type="submit"
          className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700"
        >
          Submit
        </button>
      </form>
    </section>
  )
}
