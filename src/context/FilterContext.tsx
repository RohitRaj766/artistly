'use client'

import { createContext, useContext, useState, ReactNode, useEffect } from 'react'

type FilterContextType = {
  category: string
  location: string
  fee: string
  setCategory: (val: string) => void
  setLocation: (val: string) => void
  setFee: (val: string) => void
  clearFilters: () => void
}

const FilterContext = createContext<FilterContextType | null>(null)

export function useFilterContext() {
  const ctx = useContext(FilterContext)
  if (!ctx) throw new Error('useFilterContext must be used inside FilterProvider')
  return ctx
}

export function FilterProvider({ children }: { children: ReactNode }) {
  const [category, setCategory] = useState('')
  const [location, setLocation] = useState('')
  const [fee, setFee] = useState('')

  useEffect(() => {
   
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      const queryCategory = params.get('category') || ''
      const queryLocation = params.get('location') || ''
      const queryPrice = params.get('fee') || ''

      setCategory(queryCategory)
      setLocation(queryLocation)
      setFee(queryPrice)
    }
  }, [])

  function clearFilters() {
    setCategory('')
    setLocation('')
    setFee('')
  }

  return (
    <FilterContext.Provider
      value={{ category, location, fee, setCategory, setLocation, setFee, clearFilters }}
    >
      {children}
    </FilterContext.Provider>
  )
}
