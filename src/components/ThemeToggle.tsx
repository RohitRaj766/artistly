'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      aria-label="Toggle Theme"
      className="
        fixed 
        bottom-10
        right-6 
        p-3 
        rounded-full 
        bg-gray-200 
        dark:bg-gray-700 
        text-xl 
        shadow-md 
        hover:bg-gray-300 
        dark:hover:bg-gray-600 
        transition-colors 
        duration-300
        cursor-pointer
      "
    >
      {theme === 'dark' ? '🌞' : '🌙'}
    </button>
  )
}
