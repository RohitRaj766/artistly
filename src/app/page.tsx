import Link from 'next/link'

const categories = [
  { title: 'Singers', description: 'Vocal talent for every event' },
  { title: 'DJs', description: 'Energetic sets by top DJs' },
  { title: 'Dancers', description: 'Electrifying performances' },
  { title: 'Speakers', description: 'Motivational & industry experts' },
]

export default function HomePage() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800">Welcome to Artistly</h1>
        <p className="text-gray-600 mt-2">Discover and book talented performers for any event.</p>
        <Link
          href="/artists"
          className="inline-block mt-6 px-6 py-3 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          Explore Artists
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {categories.map((cat) => (
          <div
            key={cat.title}
            className="p-4 border rounded shadow hover:shadow-md transition duration-200"
          >
            <h3 className="text-xl font-semibold text-indigo-600">{cat.title}</h3>
            <p className="text-sm text-gray-500">{cat.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
