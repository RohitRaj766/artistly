'use client'

import Link from 'next/link'
import ThemeToggle from './ThemeToggle'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)
  const closeMenu = () => setIsOpen(false)

  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
          Artistly
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-5 text-gray-700 dark:text-gray-200 text-sm font-medium">
          <Link href="/" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">
            Home
          </Link>
          <Link href="/artists" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">
            Artists
          </Link>
          <Link href="/onboard" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">
            Onboard Artist
          </Link>
      
          <Link
            href="/login"
            className="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700 transition"
          >
            Manager
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700 dark:text-gray-200 focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <nav className="md:hidden px-4 pb-4 text-gray-700 dark:text-gray-200 text-sm font-medium space-y-2 flex justify-center items-center flex-col gap-1">
          <Link href="/" onClick={closeMenu} className="block hover:text-indigo-600 dark:hover:text-indigo-400">
            Home
          </Link>
          <Link href="/artists" onClick={closeMenu} className="block hover:text-indigo-600 dark:hover:text-indigo-400">
            Artists
          </Link>
          <Link href="/onboard" onClick={closeMenu} className="block hover:text-indigo-600 dark:hover:text-indigo-400">
            Onboard Artist
          </Link>

             <Link
            href="/login"
            className="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700 transition min-w-[80%] text-center"
          >
            Manager
          </Link>

          <div className="pt-2">
            <ThemeToggle />
          </div>
        </nav>
      )}
    </header>
  )
}
