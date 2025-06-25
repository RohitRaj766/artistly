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
    <div className="overflow-x-auto border rounded-lg dark:border-gray-700">
      <table className="min-w-full bg-white text-sm dark:bg-gray-800 dark:text-gray-200">
        <thead className="bg-indigo-50 border-b text-left dark:bg-gray-700 dark:border-gray-600">
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
            <tr key={artist._id} className="border-t hover:bg-gray-50 dark:hover:bg-gray-700 dark:border-gray-700">
              <td className="p-3">
                {artist.image ? (
                  <img
                    src={artist.image}
                    alt={artist.name}
                    className="w-10 h-10 rounded object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-10 h-10 bg-gray-200 rounded dark:bg-gray-600" />
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
      <div className="flex justify-between items-center p-4 dark:bg-gray-800">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50 cursor-pointer dark:bg-gray-700"
        >
          Previous
        </button>

        <span className="text-sm dark:text-gray-300">
          Page {page} of {totalPages}
        </span>

        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50 cursor-pointer dark:bg-gray-700"
        >
          Next
        </button>
      </div>
    </div>
  )
}
