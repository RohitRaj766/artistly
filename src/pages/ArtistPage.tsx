'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useFilterContext } from '@/context/FilterContext'
import { Artist } from '@/types'
import ArtistCard from '@/components/ArtistCard'
import FilterBlock from '@/components/FilterBlock'
import { Button } from '@/components/ui/button'

export default function ArtistListingPage() {
  const searchParams = useSearchParams()
  const {
    category,
    setCategory,
    location,
    price,
  } = useFilterContext()

  const [artists, setArtists] = useState<Artist[]>([])
  const [filteredArtists, setFilteredArtists] = useState<Artist[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const artistsPerPage = 6

  // Set initial category from URL
  useEffect(() => {
    const queryCategory = searchParams?.get('category')
    if (queryCategory) {
      setCategory(queryCategory)
    }
  }, [searchParams, setCategory])

  // Load artist data
  useEffect(() => {
    fetch('/data/artists.json')
      .then((res) => res.json())
      .then((data) => {
        setArtists(data)
        setFilteredArtists(data)
      })
  }, [])

  // Apply filters
  useEffect(() => {
    let result = [...artists]

    if (category) result = result.filter((a) => a.category === category)
    if (location) result = result.filter((a) =>
      a.location.toLowerCase().includes(location.toLowerCase())
    )
    if (price) result = result.filter((a) => a.price.includes(price))

    setFilteredArtists(result)
    setCurrentPage(1) // Reset to first page on filter change
  }, [category, location, price, artists])

  // Pagination logic
  const indexOfLast = currentPage * artistsPerPage
  const indexOfFirst = indexOfLast - artistsPerPage
  const currentArtists = filteredArtists.slice(indexOfFirst, indexOfLast)
  const totalPages = Math.ceil(filteredArtists.length / artistsPerPage)

  return (
    <section className="max-w-6xl mx-auto px-4 py-10 space-y-8">
      {/* Heading */}
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

      {/* Results */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentArtists.length > 0 ? (
          currentArtists.map((artist) => (
            <ArtistCard key={artist.id} artist={artist} />
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
            className = "cursor-pointer"
            variant="outline"
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
          >
            ← Prev
          </Button>
          <span className="text-gray-700 dark:text-gray-200 text-sm">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            className = "cursor-pointer"
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next →
          </Button>
        </div>
      )}
    </section>
  )
}
