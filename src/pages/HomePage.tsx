'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from '@/components/ui/pagination'
import { Music, Mic, Users, Volume2 } from 'lucide-react' // lucide icons are default with shadcn

const categories = [
  { title: 'Singers', description: 'Vocal talent for weddings, concerts & corporate shows', href: '/artists?category=Singer', icon: Mic },
  { title: 'DJs', description: 'Energize parties with popular DJs', href: '/artists?category=DJ', icon: Music },
  { title: 'Dancers', description: 'Cultural to modern performances by expert dancers', href: '/artists?category=Dancer', icon: Users },
  { title: 'Speakers', description: 'Motivational and industry speakers for your event', href: '/artists?category=Speaker', icon: Volume2 },
  { title: 'Dancers', description: 'Amazing cultural and freestyle performances', href: '/artists?category=Dancer', icon: Users },
  { title: 'Singers', description: 'From Bollywood to Western vocals', href: '/artists?category=Singer', icon: Mic },
  { title: 'DJs', description: 'High-energy music for your event', href: '/artists?category=DJ', icon: Music },
  { title: 'Speakers', description: 'Thought leaders and storytellers', href: '/artists?category=Speaker', icon: Volume2 },
]

const ITEMS_PER_PAGE = 4

export default function HomePage() {
  const [page, setPage] = useState(1)
  const totalPages = Math.ceil(categories.length / ITEMS_PER_PAGE)

  const paginated = categories.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)

  const goPrev = () => setPage((p) => Math.max(p - 1, 1))
  const goNext = () => setPage((p) => Math.min(p + 1, totalPages))

  return (
    <main className="min-w-full mx-auto">
      <section className="text-center flex flex-col justify-center items-center min-h-[92vh] w-full dark:bg-[#191919] bg-[#e4f0f2] p-5">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white">
          Welcome to <span className="text-indigo-600 dark:text-indigo-400">Artistly</span>
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-xl">
          Discover & book top-tier performers for weddings, parties, conferences, and more.
        </p>

        <Button asChild className="mt-6">
          <Link href="/artists">🎤 Explore Artists</Link>
        </Button>
      </section>

      <section className="pt-10 pb-16 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <h2 className="text-3xl sm:text-4xl font-semibold text-gray-800 dark:text-gray-100 mb-8 text-center">
          Artist Categories
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl w-full">
          {paginated.map((cat, i) => {
            const Icon = cat.icon
            return (
              <Link href={cat.href} key={i} className="w-full">
                <Card className="hover:shadow-md transition-shadow h-full flex flex-col items-center text-center p-6">
                  <Icon className="h-10 w-10 text-indigo-600 mb-4" />
                  <CardTitle>{cat.title}</CardTitle>
                  <CardContent className="text-sm text-muted-foreground mt-2">
                    {cat.description}
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>

        <Pagination className="mt-10">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious onClick={goPrev} className={page === 1 ? 'pointer-events-none opacity-50' : ''} />
            </PaginationItem>
            <PaginationItem>
              <span className="text-sm text-gray-700 dark:text-gray-200">
                Page {page} of {totalPages}
              </span>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext onClick={goNext} className={page === totalPages ? 'pointer-events-none opacity-50' : ''} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </section>
    </main>
  )
}
