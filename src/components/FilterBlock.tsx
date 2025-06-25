'use client'

import { useFilterContext } from '@/context/FilterContext'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

export default function FilterBlock() {
  const {
    category,
    setCategory,
    location,
    setLocation,
    fee,
    setFee,
    clearFilters,
  } = useFilterContext()

  return (
    <div className="bg-muted/30 dark:bg-muted/20 p-6 rounded-lg shadow-sm grid grid-cols-1 sm:grid-cols-3 gap-4">
      {/* Category Filter */}
      <div className="flex flex-col space-y-2">
        <Label htmlFor="category" className="text-foreground">
          Category
        </Label>
        <Select
          value={category || 'all'}
          onValueChange={(val) => setCategory(val === 'all' ? '' : val)}
        >
          <SelectTrigger id="category">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="Singer">Singer</SelectItem>
            <SelectItem value="DJ">DJ</SelectItem>
            <SelectItem value="Dancer">Dancer</SelectItem>
            <SelectItem value="Speaker">Speaker</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Location Filter */}
      <div className="flex flex-col space-y-2">
        <Label htmlFor="location" className="text-foreground">
          Location
        </Label>
        <Input
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Search by location"
        />
      </div>

      {/* Fee Filter + Reset */}
      <div className="flex flex-col space-y-2">
        <Label htmlFor="fee" className="text-foreground">
          Fee Range
        </Label>
        <div className="flex items-center gap-2">
          <Select
            value={fee || 'all'}
            onValueChange={(val) => setFee(val === 'all' ? '' : val)}
          >
            <SelectTrigger id="fee" className="flex-grow">
              <SelectValue placeholder="All fee" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All fees</SelectItem>
              <SelectItem value="₹1L–3L">₹1L–3L</SelectItem>
              <SelectItem value="₹2L–4L">₹2L–4L</SelectItem>
              <SelectItem value="₹5L–7L">₹5L–7L</SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant="link"
            onClick={clearFilters}
            className="text-red-500 text-xs px-0 cursor-pointer"
          >
            clear
          </Button>
        </div>
      </div>
    </div>
  )
}
