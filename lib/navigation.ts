import { filterBrandsToSlugParam } from '@/lib/brandCatalog'

export type NavLink = {
  href: string
  label: string
}

export type ShopCategoryLink = NavLink & {
  slug: string
  filterCategory: string
}

export const shopAllLink: NavLink = {
  href: '/products',
  label: 'Shop All',
}

export const categoriesNavLink: NavLink = {
  href: '/categories',
  label: 'Categories',
}

export const shopCategories: ShopCategoryLink[] = [
  {
    slug: 'clothing',
    label: 'Clothing',
    filterCategory: 'Clothing',
    href: '/products?category=clothing',
  },
  {
    slug: 'accessories',
    label: 'Accessories',
    filterCategory: 'Accessories',
    href: '/products?category=accessories',
  },
  {
    slug: 'home-decor',
    label: 'Home Decor',
    filterCategory: 'Home Decor',
    href: '/products?category=home-decor',
  },
]

export const categorySlugToFilter: Record<string, string> = Object.fromEntries(
  shopCategories.map((item) => [item.slug, item.filterCategory]),
)

export const filterCategoryToSlug: Record<string, string> = Object.fromEntries(
  shopCategories.map((item) => [item.filterCategory, item.slug]),
)

export function parseCategorySlugsFromParam(param: string | null): string[] {
  if (!param) return []
  return param
    .split(',')
    .map((slug) => slug.trim())
    .filter((slug) => slug in categorySlugToFilter)
}

export function slugsToFilterCategories(slugs: string[]): string[] {
  return slugs.map((slug) => categorySlugToFilter[slug]).filter(Boolean)
}

export function filterCategoriesToSlugParam(categories: string[]): string {
  return categories
    .map((category) => filterCategoryToSlug[category])
    .filter(Boolean)
    .join(',')
}

export const specialSlugToLabel: Record<string, string> = {
  sale: 'Sale',
  'new-arrival': 'New Arrival',
  featured: 'Featured',
}

export const labelToSpecialSlug: Record<string, string> = {
  Sale: 'sale',
  'New Arrival': 'new-arrival',
  Featured: 'featured',
}

export function parseSpecialSlugsFromParam(param: string | null): string[] {
  if (!param) return []
  return param
    .split(',')
    .map((slug) => slug.trim())
    .filter((slug) => slug in specialSlugToLabel)
}

export function slugsToFilterTags(slugs: string[]): string[] {
  return slugs.map((slug) => specialSlugToLabel[slug]).filter(Boolean)
}

export function filterTagsToSlugParam(tags: string[]): string {
  return tags
    .map((tag) => labelToSpecialSlug[tag])
    .filter(Boolean)
    .join(',')
}

export function buildProductsFilterUrl(filters: {
  categories: string[]
  tags: string[]
  brands?: string[]
}): string {
  const params = new URLSearchParams()
  const categorySlug = filterCategoriesToSlugParam(filters.categories)
  const specialSlug = filterTagsToSlugParam(filters.tags)

  if (categorySlug) params.set('category', categorySlug)
  if (specialSlug) params.set('special', specialSlug)

  if (filters.brands?.length) {
    const brandSlug = filterBrandsToSlugParam(filters.brands)
    if (brandSlug) params.set('brand', brandSlug)
  }

  const query = params.toString()
  return query ? `/products?${query}` : '/products'
}

export const mainNavLinks: NavLink[] = [
  { href: '/categories', label: 'Categories' },
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact Us' },
  { href: '/brands', label: 'Brands' },
]

export const desktopNavLinkClass =
  'text-sm font-bold uppercase tracking-widest hover:text-primary transition-colors'
