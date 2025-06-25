import './globals.css'
import { Inter } from 'next/font/google'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { FilterProvider } from '@/context/FilterContext'
import { ThemeProvider } from 'next-themes'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Artistly.com',
  description: 'Book and manage performing artists seamlessly.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <FilterProvider>
            <Header />
            <main className="min-h-screen">{children}</main>
            <Footer />
          </FilterProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
