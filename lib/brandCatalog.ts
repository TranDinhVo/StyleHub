export type ShopBrand = {
  slug: string
  label: string
}

export const shopBrands: ShopBrand[] = [
  { slug: 'elegance-collective', label: 'Elegance Collective' },
  { slug: 'urban-modern', label: 'Urban Modern' },
  { slug: 'natures-haven', label: "Nature's Haven" },
  { slug: 'luxe-essentials', label: 'Luxe Essentials' },
  { slug: 'artisan-workshop', label: 'Artisan Workshop' },
  { slug: 'style-vanguard', label: 'Style Vanguard' },
]

export const brandSlugToLabel: Record<string, string> = Object.fromEntries(
  shopBrands.map((brand) => [brand.slug, brand.label]),
)

export const brandLabelToSlug: Record<string, string> = Object.fromEntries(
  shopBrands.map((brand) => [brand.label, brand.slug]),
)

/** Assigns each product to one of the six featured brands by category. */
export function getProductBrand(product: { id: string; category: string }): string {
  const id = parseInt(product.id, 10)
  switch (product.category) {
    case 'Accessories':
      return id % 2 === 0 ? 'Elegance Collective' : 'Luxe Essentials'
    case 'Clothing':
      return id % 2 === 0 ? 'Urban Modern' : 'Style Vanguard'
    case 'Home Decor':
      return id % 2 === 0 ? "Nature's Haven" : 'Artisan Workshop'
    default:
      return 'Urban Modern'
  }
}

export function parseBrandSlugsFromParam(param: string | null): string[] {
  if (!param) return []
  return param
    .split(',')
    .map((slug) => slug.trim())
    .filter((slug) => slug in brandSlugToLabel)
}

export function slugsToFilterBrands(slugs: string[]): string[] {
  return slugs.map((slug) => brandSlugToLabel[slug]).filter(Boolean)
}

export function filterBrandsToSlugParam(brands: string[]): string {
  return brands
    .map((brand) => brandLabelToSlug[brand])
    .filter(Boolean)
    .join(',')
}
