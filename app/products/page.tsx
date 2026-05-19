'use client'

import { Suspense, useEffect, useMemo, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Filter, Grid, List } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import ProductFilter, { FilterState } from '@/components/product/ProductFilter'
import ProductSort, { SortOption } from '@/components/product/ProductSort'
import ProductGrid from '@/components/product/ProductGrid'
import { mockProducts } from '@/lib/mockData'
import {
  parseBrandSlugsFromParam,
  slugsToFilterBrands,
  getProductBrand,
} from '@/lib/brandCatalog'
import {
  buildProductsFilterUrl,
  parseCategorySlugsFromParam,
  parseSpecialSlugsFromParam,
  slugsToFilterCategories,
  slugsToFilterTags,
} from '@/lib/navigation'

const ITEMS_PER_PAGE = 12

function ProductsPageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get('category')
  const specialParam = searchParams.get('special')
  const brandParam = searchParams.get('brand')
  const categoriesFromUrl = slugsToFilterCategories(
    parseCategorySlugsFromParam(categoryParam),
  )
  const tagsFromUrl = slugsToFilterTags(parseSpecialSlugsFromParam(specialParam))
  const brandsFromUrl = slugsToFilterBrands(parseBrandSlugsFromParam(brandParam))
  const filterKey = `${categoryParam ?? ''}-${specialParam ?? ''}-${brandParam ?? ''}`

  const [filters, setFilters] = useState<FilterState>({
    categories: categoriesFromUrl,
    brands: brandsFromUrl,
    priceRange: [0, 1000],
    rating: null,
    tags: tagsFromUrl,
  })
  const [sortBy, setSortBy] = useState<SortOption>('latest')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      categories: categoriesFromUrl,
      tags: tagsFromUrl,
      brands: brandsFromUrl,
    }))
    setCurrentPage(1)
  }, [categoryParam, specialParam, brandParam])

  const listChanged = (a: string[], b: string[]) =>
    a.length !== b.length ||
    a.some((item) => !b.includes(item)) ||
    b.some((item) => !a.includes(item))

  const handleFilterChange = (newFilters: FilterState) => {
    const categoriesChanged = listChanged(newFilters.categories, filters.categories)
    const tagsChanged = listChanged(newFilters.tags, filters.tags)
    const brandsChanged = listChanged(newFilters.brands, filters.brands)

    setFilters(newFilters)
    setCurrentPage(1)

    if (categoriesChanged || tagsChanged || brandsChanged) {
      router.replace(buildProductsFilterUrl(newFilters), { scroll: false })
    }
  }

  const filteredProducts = useMemo(() => {
    let result = [...mockProducts]

    if (filters.categories.length > 0) {
      result = result.filter((p) => filters.categories.includes(p.category))
    }

    if (filters.brands.length > 0) {
      result = result.filter((p) => filters.brands.includes(getProductBrand(p)))
    }

    result = result.filter(
      (p) => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1],
    )

    if (filters.rating !== null) {
      result = result.filter((p) => (p.rating || 0) >= filters.rating!)
    }

    if (filters.tags.length > 0) {
      result = result.filter((p) => {
        if (filters.tags.includes('Sale') && !p.discount) return false
        if (filters.tags.includes('New Arrival') && !p.isNew) return false
        if (filters.tags.includes('Featured') && !p.isFeatured) return false
        return true
      })
    }

    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        result.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0))
        break
      case 'latest':
      default:
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
    }

    return result
  }, [filters, sortBy])

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE)
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  )

  const titleParts = [...filters.categories, ...filters.brands, ...filters.tags]
  const pageTitle = titleParts.length > 0 ? titleParts.join(' & ') : 'All Products'

  return (
    <div className="min-h-screen">
      <section className="border-b border-border py-8">
        <div className="container-responsive mx-auto">
          <h1 className="font-serif text-3xl sm:text-4xl font-bold mb-2">{pageTitle}</h1>
          <p className="text-muted-foreground">
            Showing {filteredProducts.length} of {mockProducts.length} products
          </p>
        </div>
      </section>

      <div className="container-responsive mx-auto py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="hidden lg:block">
            <ProductFilter
              key={filterKey || 'all'}
              initialCategories={categoriesFromUrl}
              initialTags={tagsFromUrl}
              initialBrands={brandsFromUrl}
              onFilterChange={handleFilterChange}
            />
          </div>

          <div className="lg:col-span-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div className="flex items-center gap-2">
                <Sheet>
                  <SheetTrigger asChild className="lg:hidden">
                    <Button variant="outline" size="icon">
                      <Filter className="w-5 h-5" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-80">
                    <ProductFilter
                      key={`mobile-${filterKey || 'all'}`}
                      initialCategories={categoriesFromUrl}
                      initialTags={tagsFromUrl}
                      initialBrands={brandsFromUrl}
                      onFilterChange={handleFilterChange}
                    />
                  </SheetContent>
                </Sheet>

                <div className="flex items-center border border-border rounded-lg p-1">
                  <button
                    type="button"
                    onClick={() => setViewMode('grid')}
                    aria-label="Grid view"
                    aria-pressed={viewMode === 'grid'}
                    className={`p-2 rounded transition-colors ${
                      viewMode === 'grid'
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:bg-secondary'
                    }`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode('list')}
                    aria-label="List view"
                    aria-pressed={viewMode === 'list'}
                    className={`p-2 rounded transition-colors ${
                      viewMode === 'list'
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:bg-secondary'
                    }`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <ProductSort value={sortBy} onChange={setSortBy} />
            </div>

            <ProductGrid
              products={paginatedProducts}
              viewMode={viewMode}
              isEmpty={filteredProducts.length === 0}
              emptyMessage="No products match your filters. Try adjusting them."
            />

            {totalPages > 1 && (
              <div className="mt-20 flex justify-center items-center gap-4">
                <Button
                  variant="outline"
                  disabled={currentPage === 1}
                  onClick={() => {
                    setCurrentPage((prev) => Math.max(1, prev - 1))
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }}
                  className="rounded-full px-6 font-bold"
                >
                  Previous
                </Button>

                <div className="flex items-center gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => {
                        setCurrentPage(page)
                        window.scrollTo({ top: 0, behavior: 'smooth' })
                      }}
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                        currentPage === page
                          ? 'bg-black text-white shadow-lg scale-110'
                          : 'text-muted-foreground hover:bg-secondary hover:text-black'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                <Button
                  variant="outline"
                  disabled={currentPage === totalPages}
                  onClick={() => {
                    setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }}
                  className="rounded-full px-6 font-bold"
                >
                  Next
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center text-muted-foreground">
          Loading products...
        </div>
      }
    >
      <ProductsPageContent />
    </Suspense>
  )
}
