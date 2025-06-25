'use client'

import { useEffect, useState } from 'react'

export default function ArtistDashboard() {
  const [me, setMe] = useState(null)
  useEffect(() => {
    fetch('/api/auth/me').then(res=>res.json()).then(setMe)
  }, [])

  if (!me) return <p>Loading...</p>

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <h2 className="text-2xl font-bold mb-4">Your Profile</h2>
      <div className="border rounded p-6 bg-white shadow">
        <h3 className="text-xl font-semibold">{me.name}</h3>
        <p className="text-gray-600">{me.email}</p>
        <p className="mt-2"><strong>Categories:</strong> {me.categories.join(', ')}</p>
        <p><strong>Languages:</strong> {me.languages.join(', ')}</p>
        <p><strong>Fee:</strong> {me.fee}</p>
        <p><strong>Location:</strong> {me.location}</p>
      </div>
    </div>
  )
}
