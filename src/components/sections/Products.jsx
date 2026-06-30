import React, { useState } from 'react'
import { ArrowLeft, Star, Award, TrendingUp } from 'lucide-react'
import { productCategories } from '../../data/productCatalog'
import { productDetails } from '../../data/productDetails'

export default function Products({ onSelectProduct }) {
  const [selectedCategory, setSelectedCategory] = useState(null)

  const currentCategory = productCategories.find((category) => category.id === selectedCategory)

  // Flatten all products into a single list with category info
  const allProducts = productCategories.flatMap((category) =>
    category.items.map((item) => ({
      ...item,
      category: category.title,
      categoryImage: category.image,
    }))
  )

  const featuredProducts = allProducts.filter((p) => p.badge === 'Best Seller' || p.badge === 'Premium')

  if (currentCategory) {
    return (
      <section id="products" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <button
            type="button"
            onClick={() => setSelectedCategory(null)}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm transition hover:text-ocean"
          >
            <ArrowLeft size={16} />
            Back to all products
          </button>

          <div className="mb-10 rounded-[2rem] bg-white p-6 shadow-xl border border-slate-100 md:p-8">
            <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
              <div className="overflow-hidden rounded-3xl">
                <img src={currentCategory.image} alt={currentCategory.title} className="h-full w-full object-cover" />
              </div>
              <div className="flex flex-col justify-center">
                <div className="inline-flex w-fit rounded-full bg-ocean/10 px-3 py-2 text-sm font-semibold text-ocean mb-4">
                  {currentCategory.title}
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{currentCategory.title}</h3>
                <p className="text-lg text-gray-600 mb-6">{currentCategory.summary}</p>
                <div className="grid gap-4 md:grid-cols-2">
                  {currentCategory.items.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => onSelectProduct?.(item.id)}
                      className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md relative"
                    >
                      {item.badge && (
                        <span className="absolute top-3 right-3 bg-ocean text-white text-xs font-semibold px-3 py-1 rounded-full">
                          {item.badge}
                        </span>
                      )}
                      <img src={item.image} alt={item.name} className="mb-3 h-36 w-full rounded-xl object-cover" />
                      <h4 className="text-lg font-semibold text-gray-800">{item.name}</h4>
                      <p className="mt-2 text-sm font-bold text-ocean">{item.priceRange}</p>
                      <p className="mt-3 inline-flex rounded-full bg-ocean/10 px-3 py-1 text-sm font-semibold text-ocean">
                        View Details
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="products" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-12 animate-fadeInUp">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Our Products</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Browse our premium seafood collections with a clean, modern experience.
          </p>
        </div>

        {/* Featured Products */}
        {featuredProducts.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center gap-2 mb-8">
              <Star size={20} className="text-amber-500" />
              <h3 className="text-2xl font-bold text-gray-800">Featured Products</h3>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featuredProducts.map((product) => {
                const details = productDetails[product.id]
                const minPrice = details?.sizes?.length
                  ? Math.min(...details.sizes.map((s) => s.price))
                  : 0

                return (
                  <button
                    key={product.id}
                    type="button"
                    onClick={() => onSelectProduct?.(product.id)}
                    className="group text-left overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg transition hover:-translate-y-2 hover:shadow-2xl"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent" />
                      <div className="absolute top-3 left-3">
                        <span className="inline-flex items-center gap-1 bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                          <Award size={12} />
                          {product.badge}
                        </span>
                      </div>
                      <div className="absolute bottom-3 left-3 right-3">
                        <h4 className="text-lg font-bold text-white">{product.name}</h4>
                        <p className="text-sm text-slate-200">{product.category}</p>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-ocean">
                          {minPrice > 0 ? `₹${minPrice}/kg` : product.priceRange}
                        </span>
                        <span className="text-xs bg-ocean/10 text-ocean px-2 py-1 rounded-full">
                          View Details
                        </span>
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* All Products by Category */}
        <div>
          <div className="flex items-center gap-2 mb-8">
            <div className="w-8 h-1 bg-ocean rounded-full" />
            <h3 className="text-2xl font-bold text-gray-800">All Products</h3>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {allProducts.map((product) => {
              const details = productDetails[product.id]
              const minPrice = details?.sizes?.length
                ? Math.min(...details.sizes.map((s) => s.price))
                : 0

              return (
                <button
                  key={product.id}
                  type="button"
                  onClick={() => onSelectProduct?.(product.id)}
                  className="group text-left overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent" />
                    {product.badge && (
                      <div className="absolute top-3 left-3">
                        <span className="inline-flex items-center gap-1 bg-ocean text-white px-3 py-1 rounded-full text-xs font-semibold">
                          {product.badge === 'Best Seller' ? <Star size={12} /> : product.badge === 'Premium' ? <Award size={12} /> : <TrendingUp size={12} />}
                          {product.badge}
                        </span>
                      </div>
                    )}
                    <div className="absolute bottom-3 left-3 right-3">
                      <h4 className="text-lg font-bold text-white">{product.name}</h4>
                      <p className="text-sm text-slate-200">{product.category}</p>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-ocean">
                        {minPrice > 0 ? `₹${minPrice}/kg` : product.priceRange}
                      </span>
                      <span className="text-xs bg-ocean/10 text-ocean px-2 py-1 rounded-full">
                        View Details
                      </span>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
