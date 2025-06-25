'use client'

import { useEffect, useState } from 'react'

export default function ClientDashboard() {
  const [artists, setArtists] = useState([])
  useEffect(() => {
    fetch('/api/artists').then(res => res.json()).then(data => setArtists(data.artists))
  }, [])

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h2 className="text-2xl font-bold mb-6">Browse Artists</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {artists.length
          ? artists.map(a => (
            <div key={a._id} className="border p-4 rounded shadow">
              <h3 className="font-semibold">{a.name}</h3>
              <p className="text-sm">{a.categories.join(', ')}</p>
              <p className="text-sm text-gray-500">📍 {a.location}</p>
              <button className="mt-2 text-indigo-600 hover:underline">Request Quote</button>
            </div>
          ))
          : <p>No artists available.</p>}
      </div>
    </div>
  )
}
