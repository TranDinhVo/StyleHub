"use client";

import { useState, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ProductCard from "@/components/product/ProductCard";
import { mockProducts } from "@/lib/mockData";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialQuery = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQuery);

  // Mock search history
  const [searchHistory, setSearchHistory] = useState<string[]>([
    "Leather Handbag",
    "Cashmere",
    "Gold Bracelet",
  ]);

  const results = useMemo(() => {
    if (!query.trim()) return [];

    const searchLower = query.toLowerCase();
    return mockProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower) ||
        product.category.toLowerCase().includes(searchLower),
    );
  }, [query]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
      if (!searchHistory.includes(query)) {
        setSearchHistory([query, ...searchHistory.slice(0, 4)]);
      }
    }
  };

  const handleHistoryClick = (item: string) => {
    setQuery(item);
    router.push(`/search?q=${encodeURIComponent(item)}`);
  };

  const handleClearHistory = () => {
    setSearchHistory([]);
  };

  return (
    <div className="min-h-screen">
      {/* Search Header */}
      <section className="border-b border-border py-8">
        <div className="container-responsive mx-auto">
          <h1 className="font-serif text-3xl sm:text-4xl font-bold mb-6">
            Search Products
          </h1>

          <form onSubmit={handleSearch} className="max-w-2xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for products, categories..."
                className="pl-12 py-3 text-base h-12"
                autoFocus
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
            <Button type="submit" className="mt-3 w-full">
              Search
            </Button>
          </form>
        </div>
      </section>

      {/* Main Content */}
      <div className="container-responsive mx-auto py-8">
        {query ? (
          // Search Results
          <div>
            <div className="mb-8">
              <p className="text-muted-foreground">
                {results.length === 0
                  ? `No results found for "${query}"`
                  : `${results.length} result${results.length !== 1 ? "s" : ""} found for "${query}"`}
              </p>
            </div>

            {results.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {results.map((product) => (
                  <ProductCard key={product.id} {...product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-6">
                  Try adjusting your search terms or browse our categories.
                </p>
                <div className="space-y-2">
                  <p className="text-sm font-medium mb-3">Popular searches:</p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {["Handbag", "Watch", "Clothing", "Home Decor"].map(
                      (item) => (
                        <button
                          key={item}
                          onClick={() => handleHistoryClick(item)}
                          className="px-3 py-1 rounded-full border border-border hover:border-primary hover:text-accent transition-colors text-sm"
                        >
                          {item}
                        </button>
                      ),
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          // Empty State with Suggestions
          <div className="max-w-2xl mx-auto">
            <h2 className="font-serif text-2xl font-bold mb-6">
              What are you looking for?
            </h2>

            {/* Search History */}
            {searchHistory.length > 0 && (
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">Recent Searches</h3>
                  <button
                    onClick={handleClearHistory}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Clear
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {searchHistory.map((item) => (
                    <button
                      key={item}
                      onClick={() => handleHistoryClick(item)}
                      className="px-3 py-2 bg-secondary rounded-full hover:bg-secondary/80 transition-colors text-sm"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Suggestions */}
            <div>
              <h3 className="font-semibold mb-4">Browse by Category</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { name: "Accessories", href: "/categories/accessories" },
                  { name: "Clothing", href: "/categories/clothing" },
                  { name: "Home Decor", href: "/categories/home-decor" },
                ].map((cat) => (
                  <a
                    key={cat.name}
                    href={cat.href}
                    className="p-6 border border-border rounded-lg hover:border-primary hover:bg-secondary/20 transition-colors text-center group"
                  >
                    <p className="font-semibold group-hover:text-accent transition-colors">
                      {cat.name}
                    </p>
                  </a>
                ))}
              </div>
            </div>

            {/* Popular Products */}
            <div className="mt-12">
              <h3 className="font-semibold mb-4">Popular Products</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {mockProducts.slice(0, 4).map((product) => (
                  <ProductCard key={product.id} {...product} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
