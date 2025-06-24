import { Artist } from '@/types'

type Props = {
  artist: Artist
}

export default function ArtistCard({ artist }: Props) {
  return (
    <div className="border rounded p-4 shadow hover:shadow-lg transition">
      <h2 className="text-xl font-bold text-indigo-700">{artist.name}</h2>
      <p className="text-sm text-gray-500">{artist.category}</p>
      <p className="text-sm text-gray-500">📍 {artist.location}</p>
      <p className="text-sm text-gray-600 mt-2">💸 {artist.price}</p>
      <button className="mt-4 px-4 py-2 text-sm bg-indigo-600 text-white rounded hover:bg-indigo-700">
        Ask for Quote
      </button>
    </div>
  )
}
