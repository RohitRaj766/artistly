// app/artists/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { useFilterContext } from '@/context/FilterContext'
import { Artist } from '@/types'
import ArtistCard from '@/components/ArtistCard'
import FilterBlock from '@/components/FilterBlock'

export default function ArtistListingPage() {
  const { category, location, price } = useFilterContext()
  const [artists, setArtists] = useState<Artist[]>([])
  const [filteredArtists, setFilteredArtists] = useState<Artist[]>([])

  useEffect(() => {
    fetch('/data/artists.json')
      .then((res) => res.json())
      .then((data) => {
        setArtists(data)
        setFilteredArtists(data)
      })
  }, [])

  useEffect(() => {
    let result = [...artists]

    if (category) result = result.filter((a) => a.category === category)
    if (location) result = result.filter((a) => a.location.toLowerCase().includes(location.toLowerCase()))
    if (price) result = result.filter((a) => a.price.includes(price))

    setFilteredArtists(result)
  }, [category, location, price, artists])

  return (
    <section className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold text-gray-800 mb-4">Available Artists</h1>
      <FilterBlock />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {filteredArtists.length > 0 ? (
          filteredArtists.map((artist) => <ArtistCard key={artist.id} artist={artist} />)
        ) : (
          <p className="text-gray-500 col-span-full">No artists match your filters.</p>
        )}
      </div>
    </section>
  )
}
