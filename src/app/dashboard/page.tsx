'use client'

import { useLocalStorage } from '@/hooks/useLocalStorage'
import { useEffect, useState } from 'react'

type Artist = {
  name: string
  bio: string
  categories: string[]
  languages: string[]
  fee: string
  location: string
  imagePreview?: string
}

export default function DashboardPage() {
  const [artists, setArtists] = useLocalStorage<Artist[]>('artists', [])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const deleteArtist = (index: number) => {
    const updated = [...artists]
    updated.splice(index, 1)
    setArtists(updated)
  }

  if (!mounted) return null

  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-indigo-700 mb-6">Manager Dashboard</h1>

      {artists.length === 0 ? (
        <p className="text-gray-500">No artists submitted yet.</p>
      ) : (
        <div className="overflow-x-auto border rounded-lg">
          <table className="min-w-full bg-white text-sm">
            <thead className="bg-indigo-50 border-b text-left">
              <tr>
                <th className="p-3">Profile</th>
                <th className="p-3">Name</th>
                <th className="p-3">Category</th>
                <th className="p-3">City</th>
                <th className="p-3">Fee</th>
                <th className="p-3">Languages</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {artists.map((artist, idx) => (
                <tr key={idx} className="border-t hover:bg-gray-50">
                  <td className="p-3">
                    {artist.imagePreview ? (
                      <img
                        src={artist.imagePreview}
                        alt={artist.name}
                        className="w-10 h-10 rounded object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 bg-gray-200 rounded" />
                    )}
                  </td>
                  <td className="p-3">{artist.name}</td>
                  <td className="p-3">{artist.categories.join(', ')}</td>
                  <td className="p-3">{artist.location}</td>
                  <td className="p-3">{artist.fee}</td>
                  <td className="p-3">{artist.languages.join(', ')}</td>
                  <td className="p-3">
                    <button
                      onClick={() => deleteArtist(idx)}
                      className="text-red-500 hover:underline text-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}
