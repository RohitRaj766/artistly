import Link from 'next/link'

const categories = [
  {
    title: 'Singers',
    description: 'Vocal talent for weddings, concerts & corporate shows',
    href: '/artists?category=Singers',
  },
  {
    title: 'DJs',
    description: 'Energize parties with popular DJs',
    href: '/artists?category=DJs',
  },
  {
    title: 'Dancers',
    description: 'Cultural to modern performances by expert dancers',
    href: '/artists?category=Dancers',
  },
  {
    title: 'Speakers',
    description: 'Motivational and industry speakers for your event',
    href: '/artists?category=Speakers',
  },
]

export default function HomePage() {
  return (
    <main className="max-w-7xl mx-auto px-4 py-12">
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white">
          Welcome to <span className="text-indigo-600 dark:text-indigo-400">Artistly</span>
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
          Discover & book top-tier performers for weddings, parties, conferences, and more.
        </p>

        <Link
          href="/artists"
          className="inline-block mt-6 px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition"
        >
          🎤 Explore Artists
        </Link>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-6 text-center">
          Artist Categories
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
          {categories.map((cat) => (
            <Link
              key={cat.title}
              href={cat.href}
              className="block bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-sm hover:shadow-md transition duration-200"
            >
              <h3 className="text-lg font-semibold text-indigo-600 dark:text-indigo-400">
                {cat.title}
              </h3>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{cat.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}
