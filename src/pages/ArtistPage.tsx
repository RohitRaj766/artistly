'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useFilterContext } from '@/context/FilterContext'
import ArtistCard from '@/components/ArtistCard'
import FilterBlock from '@/components/FilterBlock'
import { Button } from '@/components/ui/button'


type Artist = {
  _id?: string
  name: string
  bio: string
  categories: string[] // An array of categories
  languages: string[]
  fee: string
  location: string
  image?: string
}

export default function ArtistListingPage() {
  const searchParams = useSearchParams()
  const { category, setCategory, location, price } = useFilterContext()

  const [artists, setArtists] = useState<Artist[]>([])
  const [filteredArtists, setFilteredArtists] = useState<Artist[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true) // 🟡 Add loading state
  const artistsPerPage = 6

  // Set initial category from URL
  useEffect(() => {
    const queryCategory = searchParams?.get('category')
    if (queryCategory) {
      setCategory(queryCategory)
    }
  }, [searchParams, setCategory])

  // Load artist data from MongoDB
  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const res = await fetch('/api/onboard')
        const data = await res.json()

        const formatted = data.map((artist: Artist, index: number) => ({
          id: artist._id || index,
          name: artist.name,
          bio: artist.bio,
          categories: artist.categories || [],
          languages: artist.languages,
          location: artist.location,
          price: artist.fee,
          image: artist.image,
        }))

        setArtists(formatted)
        setFilteredArtists(formatted)
      } catch (error) {
        console.error('Error loading artists:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchArtists()
  }, [])

  // Apply filters
  useEffect(() => {
    let result = [...artists]

    if (category) {
      // Check if the category is inside the artist's categories array
      result = result.filter((a) => a.categories.includes(category))
    }
    if (location) {
      result = result.filter((a) =>
        a.location.toLowerCase().includes(location.toLowerCase())
      )
    }
    if (price) {
      result = result.filter((a) => a.fee.includes(price))
    }

    setFilteredArtists(result)
    setCurrentPage(1)
  }, [category, location, price, artists])

  // Pagination logic
  const indexOfLast = currentPage * artistsPerPage
  const indexOfFirst = indexOfLast - artistsPerPage
  const currentArtists = filteredArtists.slice(indexOfFirst, indexOfLast)
  const totalPages = Math.ceil(filteredArtists.length / artistsPerPage)

  return (

    <section className="max-w-6xl mx-auto px-4 py-10 space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
          Available Artists
        </h1>
        <p className="mt-1 text-gray-500 dark:text-gray-400 text-sm">
          Browse through talented performers for your next event.
        </p>
      </div>

      {/* Filter */}
      <FilterBlock />

      {/* Loader or Results */}
      {loading ? (
        <div className="text-center text-gray-500 dark:text-gray-300 py-20">
          Loading artists...
        </div>
      ) : (
        <>
          {/* Results */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentArtists.length > 0 ? (
              currentArtists.map((artist) => (
                <ArtistCard key={artist._id} artist={artist} />
              ))
            ) : (
              <p className="text-center text-gray-500 dark:text-gray-300 col-span-full py-10">
                No artists match your filters.
              </p>
            )}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-8">
              <Button
                variant="outline"
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="cursor-pointer"
              >
                ← Prev
              </Button>
              <span className="text-gray-700 dark:text-gray-200 text-sm">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="cursor-pointer"
              >
                Next →
              </Button>
            </div>
          )}
        </>
      )}
    </section>

  )
}
