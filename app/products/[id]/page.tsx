import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import ProductDetail from '@/components/product/ProductDetail'
import ProductCard from '@/components/product/ProductCard'
import { getProductById, getRelatedProducts, mockProducts } from '@/lib/mockData'

interface PageProps {
  params: Promise<{ id: string }>
}

export const revalidate = 3600

export async function generateStaticParams() {
  return mockProducts.map((product) => ({
    id: product.id,
  }))
}

export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {
  const { id } = await params
  const product = getProductById(id)

  if (!product) {
    return {
      title: 'Product Not Found',
    }
  }

  return {
    title: `${product.name} | StyleHub`,
    description: product.description,
  }
}

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params
  const product = getProductById(id)

  if (!product) {
    notFound()
  }

  const relatedProducts = getRelatedProducts(id, 4)

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <section className="border-b border-border py-4">
        <div className="container-responsive mx-auto">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <a href="/" className="hover:text-foreground transition-colors">Home</a>
            <span>/</span>
            <a href="/products" className="hover:text-foreground transition-colors">Products</a>
            <span>/</span>
            <a href={`/categories/${product.category.toLowerCase()}`} className="hover:text-foreground transition-colors">
              {product.category}
            </a>
            <span>/</span>
            <span className="text-foreground">{product.name}</span>
          </div>
        </div>
      </section>

      {/* Product Detail */}
      <section className="container-responsive mx-auto py-8">
        <ProductDetail product={product} />
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="border-t border-border py-12">
          <div className="container-responsive mx-auto">
            <h2 className="font-serif text-3xl font-bold mb-8">Related Products</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} {...p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
