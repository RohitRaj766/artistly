// app/layout.tsx
import './globals.css'
import { Inter } from 'next/font/google'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { FilterProvider } from '@/context/FilterContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Artistly.com',
  description: 'Book and manage performing artists seamlessly.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <FilterProvider>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </FilterProvider>
      </body>
    </html>
  )
}
