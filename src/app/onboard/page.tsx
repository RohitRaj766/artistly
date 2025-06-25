'use client'

import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import CategorySelector from '@/components/Form/CategorySelector'

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  bio: yup.string().required('Bio is required'),
  categories: yup.array().min(1, 'Select at least one category'),
  languages: yup.array().min(1, 'Select at least one language'),
  fee: yup.string().required('Fee range is required'),
  location: yup.string().required('Location is required'),
  email: yup.string().email().required('Email is required'),
  password: yup.string().min(6).required('Password is required'),
})

type FormValues = {
  name: string
  bio: string
  categories: string[]
  languages: string[]
  fee: string
  location: string
  image?: FileList
  email: string
  password: string
}

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

  const onSubmit = async (data: FormValues) => {
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          imagePreview: '', // handle upload later if needed
          role: 'artist',
        }),
      })

      const result = await response.json()

      if (response.ok) {
        alert('Artist registered successfully!')
        reset()
      } else {
        alert(result.error || 'Signup failed')
      }
    } catch (err) {
      console.error(err)
      alert('Something went wrong')
    }
  }

  return (
    <section className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-indigo-700">Artist Onboarding</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

        {/* Name, Bio, Categories, etc. (unchanged) */}
        {/* ...reuse your previous code for all artist fields... */}

        {/* Email */}
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            {...register('email')}
            className="mt-1 w-full border p-2 rounded"
          />
          <p className="text-sm text-red-500">{errors.email?.message}</p>
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium">Password</label>
          <input
            type="password"
            {...register('password')}
            className="mt-1 w-full border p-2 rounded"
          />
          <p className="text-sm text-red-500">{errors.password?.message}</p>
        </div>

        <button
          type="submit"
          className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700"
        >
          Sign Up as Artist
        </button>
      </form>
    </section>
  )
}
