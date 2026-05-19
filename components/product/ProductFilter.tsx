'use client'

import { useState } from 'react'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { X } from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { shopBrands } from '@/lib/brandCatalog'

interface ProductFilterProps {
  onFilterChange?: (filters: FilterState) => void
  onClose?: () => void
  initialCategories?: string[]
  initialTags?: string[]
  initialBrands?: string[]
}

export interface FilterState {
  categories: string[]
  brands: string[]
  priceRange: [number, number]
  rating: number | null
  tags: string[]
}

export default function ProductFilter({
  onFilterChange,
  onClose,
  initialCategories = [],
  initialTags = [],
  initialBrands = [],
}: ProductFilterProps) {
  const [filters, setFilters] = useState<FilterState>({
    categories: initialCategories,
    brands: initialBrands,
    priceRange: [0, 1000],
    rating: null,
    tags: initialTags,
  })

  const handleCategoryChange = (category: string) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter((c) => c !== category)
      : [...filters.categories, category]

    const newFilters = { ...filters, categories: newCategories }
    setFilters(newFilters)
    onFilterChange?.(newFilters)
  }

  const handlePriceChange = (value: number[]) => {
    const newFilters = { ...filters, priceRange: [value[0], value[1]] as [number, number] }
    setFilters(newFilters)
    onFilterChange?.(newFilters)
  }

  const handleRatingChange = (rating: number | null) => {
    const newFilters = { ...filters, rating: filters.rating === rating ? null : rating }
    setFilters(newFilters)
    onFilterChange?.(newFilters)
  }

  const handleTagChange = (tag: string) => {
    const newTags = filters.tags.includes(tag)
      ? filters.tags.filter(t => t !== tag)
      : [...filters.tags, tag]
    
    const newFilters = { ...filters, tags: newTags }
    setFilters(newFilters)
    onFilterChange?.(newFilters)
  }

  const handleBrandChange = (brand: string) => {
    const newBrands = filters.brands.includes(brand)
      ? filters.brands.filter((b) => b !== brand)
      : [...filters.brands, brand]

    const newFilters = { ...filters, brands: newBrands }
    setFilters(newFilters)
    onFilterChange?.(newFilters)
  }

  const resetFilters = () => {
    const emptyFilters: FilterState = {
      categories: [],
      brands: [],
      priceRange: [0, 1000],
      rating: null,
      tags: []
    }
    setFilters(emptyFilters)
    onFilterChange?.(emptyFilters)
  }

  const hasActiveFilters = filters.categories.length > 0 ||
    filters.brands.length > 0 ||
    filters.rating !== null || 
    filters.tags.length > 0 ||
    filters.priceRange[0] > 0 || 
    filters.priceRange[1] < 1000

  return (
    <div className="space-y-8 pr-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="font-serif text-2xl font-bold">Filters</h3>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={resetFilters}
            className="text-xs text-muted-foreground hover:text-primary underline px-0 h-auto"
          >
            Clear all
          </Button>
        )}
        {onClose && (
          <button onClick={onClose} className="lg:hidden p-1">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <Accordion type="multiple" defaultValue={['categories', 'brands', 'price', 'tags']} className="w-full">
        {/* Categories */}
        <AccordionItem value="categories" className="border-none">
          <AccordionTrigger className="font-bold py-4 hover:no-underline">Category</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-wrap gap-2 pt-2">
              {['Accessories', 'Clothing', 'Home Decor'].map(category => (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${
                    filters.categories.includes(category)
                      ? 'bg-black text-white'
                      : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <Separator className="my-2" />

        {/* Brands */}
        <AccordionItem value="brands" className="border-none">
          <AccordionTrigger className="font-bold py-4 hover:no-underline">Brands</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-wrap gap-2 pt-2 max-h-48 overflow-y-auto">
              {shopBrands.map((brand) => (
                <button
                  key={brand.slug}
                  type="button"
                  onClick={() => handleBrandChange(brand.label)}
                  className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${
                    filters.brands.includes(brand.label)
                      ? 'bg-black text-white'
                      : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                  }`}
                >
                  {brand.label}
                </button>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <Separator className="my-2" />

        {/* Price Range */}
        <AccordionItem value="price" className="border-none">
          <AccordionTrigger className="font-bold py-4 hover:no-underline">Price Range</AccordionTrigger>
          <AccordionContent>
            <div className="px-2 pt-6 pb-2">
              <Slider
                min={0}
                max={1000}
                step={10}
                value={filters.priceRange}
                onValueChange={handlePriceChange}
                className="mb-6"
              />
              <div className="flex justify-between items-center text-sm font-medium">
                <span className="bg-secondary px-3 py-1 rounded-md">${filters.priceRange[0]}</span>
                <span className="text-muted-foreground">to</span>
                <span className="bg-secondary px-3 py-1 rounded-md">${filters.priceRange[1]}</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <Separator className="my-2" />

        {/* Rating */}
        <AccordionItem value="rating" className="border-none">
          <AccordionTrigger className="font-bold py-4 hover:no-underline">Customer Rating</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 pt-2">
              {[5, 4, 3].map(rating => (
                <div key={rating} className="flex items-center space-x-3 cursor-pointer group" onClick={() => handleRatingChange(rating)}>
                  <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${filters.rating === rating ? 'bg-black border-black' : 'border-gray-300 group-hover:border-black'}`}>
                    {filters.rating === rating && <div className="w-2 h-2 bg-white rounded-full" />}
                  </div>
                  <Label className="text-sm cursor-pointer flex items-center gap-1 font-normal group-hover:font-medium transition-all">
                    {rating} Star{rating !== 1 ? 's' : ''} & up
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <Separator className="my-2" />

        {/* Tags */}
        <AccordionItem value="tags" className="border-none">
          <AccordionTrigger className="font-bold py-4 hover:no-underline">Specials</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-wrap gap-2 pt-2">
              {['Sale', 'New Arrival', 'Featured'].map(tag => (
                <button
                  key={tag}
                  onClick={() => handleTagChange(tag)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
                    filters.tags.includes(tag)
                      ? 'bg-black border-black text-white'
                      : 'border-gray-200 hover:border-black text-gray-600'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
