'use client'

import { useEffect, useState } from 'react'
import ArtistTable from '@/components/ArtistTable'
import LogoutButton from '@/components/Logout'
import { useRouter } from 'next/navigation'
import {Artist} from '@/types/Artist'

export default function DashboardPage() {
  const [artists, setArtists] = useState<Artist[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const pageSize = 5
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    async function checkAuth() {
      const res = await fetch('/api/auth/verify')
      if (res.ok) {
        setIsAuthenticated(true)
      } else {
        router.replace('/login')
      }
    }
    checkAuth()
  }, [router])

  const fetchArtists = async () => {
    try {
      const res = await fetch('/api/artist')
      const data = await res.json()
      setArtists(data)
    } catch (err) {
      console.error('Failed to load artists:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    const confirmed = confirm('Are you sure you want to delete this artist?')
    if (!confirmed) return

    try {
      const res = await fetch(`/api/artist?id=${id}`, {
        method: 'DELETE',
      })

      if (res.ok) {
        fetchArtists()
      } else {
        console.error('Failed to delete artist')
      }
    } catch (err) {
      console.error('Error deleting artist:', err)
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      fetchArtists()
    }
  }, [isAuthenticated])

  if (!isAuthenticated) return null

  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-indigo-700">Manager Dashboard</h1>
        <LogoutButton />
      </div>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : artists.length === 0 ? (
        <p className="text-gray-500">No artists submitted yet.</p>
      ) : (
        <ArtistTable
          artists={artists}
          onDelete={handleDelete}
          page={page}
          pageSize={pageSize}
          onPageChange={(newPage) => setPage(newPage)}
        />
      )}
    </section>
  )
}
