'use client'

import { useFilterContext } from '@/context/FilterContext'

export default function FilterBlock() {
  const { category, setCategory, location, setLocation, price, setPrice, clearFilters } =
    useFilterContext()

  return (
    <div className="bg-gray-50 p-4 rounded shadow grid grid-cols-1 sm:grid-cols-3 gap-4">
      <select value={category} onChange={(e) => setCategory(e.target.value)} className="p-2 border rounded">
        <option value="">All Categories</option>
        <option value="Singer">Singer</option>
        <option value="DJ">DJ</option>
        <option value="Dancer">Dancer</option>
        <option value="Speaker">Speaker</option>
      </select>

      <input
        value={location}
        type="text"
        placeholder="Search by location"
        onChange={(e) => setLocation(e.target.value)}
        className="p-2 border rounded"
      />

      <div className="flex gap-2">
        <select value={price} onChange={(e) => setPrice(e.target.value)} className="w-full p-2 border rounded">
          <option value="">All Prices</option>
          <option value="₹1L–3L">₹1L–3L</option>
          <option value="₹2L–4L">₹2L–4L</option>
          <option value="₹5L–7L">₹5L–7L</option>
        </select>
        <button onClick={clearFilters} className="text-sm text-red-500 underline">Reset</button>
      </div>
    </div>
  )
}
