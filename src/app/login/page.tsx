'use client'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useSearchParams, useRouter } from 'next/navigation'

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
})

type FormValues = { email:string; password:string; role:string }

export default function LoginPage() {
  const params = useSearchParams()
  const defaultRole = params.get('role') || 'client'
  const { register, handleSubmit, formState:{errors, isSubmitting} } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: { role: defaultRole },
  })
  const router = useRouter()

  const onSubmit = async data => {
    const res = await fetch('/api/auth/login', {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify(data),
    })
    const body = await res.json()
    if (res.ok) {
      document.cookie = `token=${body.token}; path=/`
      const redirectMap = { client: '/dashboard/client', artist: '/dashboard/artist', manager:'/dashboard/manager' }
      router.push(redirectMap[data.role])
    } else alert(body.error)
  }

  return (
    <section className="max-w-sm mx-auto py-16 px-4">
      <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <select {...register('role')} className="w-full p-2 border rounded">
          <option value="client">Client</option>
          <option value="artist">Artist</option>
          <option value="manager">Manager</option>
        </select>
        {['email','password'].map(key => (
          <div key={key}>
            <label className="block text-sm font-medium">{key[0].toUpperCase()+key.slice(1)}</label>
            <input
              type={key==='email'?'email':'password'}
              {...register(key)}
              className="w-full p-2 border rounded mt-1"
            />
            <p className="text-sm text-red-500">{errors[key]?.message}</p>
          </div>
        ))}
        <button disabled={isSubmitting}
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700">
          {isSubmitting? 'Logging in...' : 'Login'}
        </button>
      </form>
    </section>
  )
}
