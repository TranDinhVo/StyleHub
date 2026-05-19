export type CategoryCatalogItem = {
  slug: string
  name: string
  title: string
  description: string
  image: string
  filterCategory: string
}

export const categoryCatalog: CategoryCatalogItem[] = [
  {
    slug: 'clothing',
    name: 'Clothing',
    title: 'Curated Clothing Collection',
    description:
      'Elevate your style with timeless basics and statement pieces for every occasion.',
    image: '/lifestyle-tee.webp',
    filterCategory: 'Clothing',
  },
  {
    slug: 'accessories',
    name: 'Accessories',
    title: 'Premium Accessories',
    description:
      'From elegant watches to designer bags — complete your look with curated accessories.',
    image: '/lifestyle-tote.webp',
    filterCategory: 'Accessories',
  },
  {
    slug: 'home-decor',
    name: 'Home Decor',
    title: 'Transform Your Space',
    description:
      'Design-led decor and furnishings to create a home that reflects your style.',
    image: '/lifestyle-decor.webp',
    filterCategory: 'Home Decor',
  },
]

export function getCategoryBySlug(slug: string) {
  return categoryCatalog.find((item) => item.slug === slug)
}
