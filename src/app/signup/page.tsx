
'use client'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useRouter } from 'next/navigation'

const schema = yup.object().shape({
  name: yup.string().required('Required'),
  email: yup.string().email('Invalid email').required('Required'),
  password: yup.string().min(6,'Min 6 chars').required('Required'),
})

type FormValues = { name: string; email: string; password: string }

export default function SignupPage() {
  const { register, handleSubmit, formState:{errors, isSubmitting} } = useForm<FormValues>({
    resolver: yupResolver(schema),
  })
  const router = useRouter()

  const onSubmit = async data => {
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ ...data, role: 'client' }),
    })
    if (res.ok) router.push('/login?role=client')
    else alert((await res.json()).error)
  }

  return (
    <section className="max-w-md mx-auto py-12 px-4">
      <h2 className="text-2xl font-bold text-center mb-6">Sign Up as Client</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {['name','email','password'].map(key => (
          <div key={key}>
            <label className="block text-sm font-medium">{key[0].toUpperCase()+key.slice(1)}</label>
            <input
              type={key==='email'?'email': key==='password'?'password':'text'}
              {...register(key)}
              className="w-full p-2 border rounded mt-1"
            />
            <p className="text-sm text-red-500">{errors[key]?.message}</p>
          </div>
        ))}

        <button disabled={isSubmitting}
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700">
          {isSubmitting? 'Signing Up...' : 'Sign Up'}
        </button>
      </form>
    </section>
  )
}
