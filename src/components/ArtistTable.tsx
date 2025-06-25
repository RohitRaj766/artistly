type Artist = {
  _id?: string
  name: string
  bio: string
  categories: string[]
  languages: string[]
  fee: string
  location: string
  image?: string
}

type Props = {
  artists: Artist[]
  onDelete?: (id: string) => void
  page: number
  pageSize: number
  onPageChange: (newPage: number) => void
}

export default function ArtistTable({
  artists,
  onDelete,
  page,
  pageSize,
  onPageChange,
}: Props) {
  const totalPages = Math.ceil(artists.length / pageSize)
  const startIndex = (page - 1) * pageSize
  const currentPageData = artists.slice(startIndex, startIndex + pageSize)

  return (
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
            {onDelete && <th className="p-3">Action</th>}
          </tr>
        </thead>
        <tbody>
          {currentPageData.map((artist) => (
            <tr key={artist._id} className="border-t hover:bg-gray-50">
              <td className="p-3">
                {artist.image ? (
                  <img
                    src={artist.image}
                    alt={artist.name}
                    className="w-10 h-10 rounded object-cover"
                    loading="lazy"
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
              {onDelete && artist._id && (
                <td className="p-3">
                  <button
                    onClick={() => onDelete(artist._id!)}
                    className="text-red-500 hover:underline text-sm"
                  >
                    Delete
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center p-4">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50 cursor-pointer"
        >
          Previous
        </button>

        <span className="text-sm">
          Page {page} of {totalPages}
        </span>

        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50 cursor-pointer"
        >
          Next
        </button>
      </div>
    </div>
  )
}
