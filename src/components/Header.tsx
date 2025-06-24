'use client'

import Link from 'next/link'

export function Header() {
  return (
    <header className="bg-white shadow-sm p-4 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-indigo-600">
          Artistly
        </Link>
        <nav className="space-x-4 text-gray-600 font-medium">
          <Link href="/">Home</Link>
          <Link href="/artists">Artists</Link>
          <Link href="/onboard">Onboard Artist</Link>
        </nav>
      </div>
    </header>
  )
}
