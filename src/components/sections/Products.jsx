import React, { useState } from 'react'
import { Leaf, ShoppingBag, ChevronRight } from 'lucide-react'
import { productCategories } from '../../data/productCatalog'
import { productDetails } from '../../data/productDetails'

/* Badge colours — restrained, no neon */
const badgeStyle = {
  'Best Seller': { bg: '#E8783A', color: '#fff' },   // coral — used sparingly
  'Premium':     { bg: '#087F8C', color: '#fff' },   // teal
  'Traditional': { bg: '#17232B', color: '#fff' },   // charcoal
  'Farm Fresh':  { bg: '#2F7A5E', color: '#fff' },   // muted green
  'Coming Soon': { bg: '#8A9BA6', color: '#fff' },   // muted slate
  'New':         { bg: '#456B7A', color: '#fff' },   // muted ocean
}

export default function Products({ onSelectProduct }) {
  const [selectedCategory, setSelectedCategory] = useState(null)

  const allProducts = productCategories.flatMap((cat) =>
    cat.items.map((item) => ({ ...item, categoryId: cat.id, categoryTitle: cat.title }))
  )
  const displayed = selectedCategory
    ? allProducts.filter((p) => p.categoryId === selectedCategory)
    : allProducts

  const categories = [
    { id: null, label: 'All Products' },
    ...productCategories.map((c) => ({ id: c.id, label: c.title })),
  ]

  return (
    <section id="products" className="relative overflow-hidden" style={{ background: '#FAF7F0' }}>
      {/* Top edge — muted teal, not orange */}
      <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, transparent, rgba(8,127,140,0.3), transparent)' }} aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">

        {/* Header */}
        <div className="text-center mb-14">
          <span
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold mb-5"
            style={{ background: 'rgba(8,127,140,0.1)', color: '#087F8C', border: '1px solid rgba(8,127,140,0.18)' }}
          >
            <Leaf size={13} />
            Farm-Fresh Seafood
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold mb-5 leading-tight" style={{ color: '#17232B' }}>
            Our Product <span className="gradient-text-teal">Catalog</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: '#4A5E6A' }}>
            Prawns and fish sourced from trusted aquaculture farms and selected suppliers.
            Freshness and quality checked before every order.
          </p>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2.5 justify-center mb-12">
          {categories.map((cat) => (
            <button
              key={String(cat.id)}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className="px-6 py-2.5 rounded-full text-sm font-bold transition-all"
              style={
                selectedCategory === cat.id
                  ? { background: '#087F8C', color: '#fff', border: '2px solid #087F8C', boxShadow: '0 4px 16px -3px rgba(8,127,140,0.4)' }
                  : { background: '#fff', color: '#4A5E6A', border: '2px solid #D4C4A8' }
              }
              onMouseEnter={(e) => { if (selectedCategory !== cat.id) e.currentTarget.style.borderColor = '#087F8C' }}
              onMouseLeave={(e) => { if (selectedCategory !== cat.id) e.currentTarget.style.borderColor = '#D4C4A8' }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {displayed.map((product) => {
            const details     = productDetails[product.id]
            const minPrice    = details?.sizes?.length ? Math.min(...details.sizes.map((s) => s.price)) : null
            const isAvailable = Boolean(details)
            const bStyle      = badgeStyle[product.badge] || { bg: '#8A9BA6', color: '#fff' }

            return (
              <article
                key={`${product.categoryId}-${product.id}`}
                className="group flex flex-col rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5"
                style={{ background: '#fff', border: '1.5px solid #EDE3D2', boxShadow: '0 2px 16px -4px rgba(23,35,43,0.09)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(8,127,140,0.35)'
                  e.currentTarget.style.boxShadow = '0 16px 48px -8px rgba(8,127,140,0.18)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#EDE3D2'
                  e.currentTarget.style.boxShadow = '0 2px 16px -4px rgba(23,35,43,0.09)'
                }}
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden" style={{ background: '#EDE3D2' }}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: 'linear-gradient(to top, rgba(11,38,56,0.6), transparent 55%)' }}
                  />
                  {product.badge && (
                    <span
                      className="absolute top-3 left-3 px-3 py-1 text-xs font-black rounded-full shadow"
                      style={{ background: bStyle.bg, color: bStyle.color }}
                    >
                      {product.badge}
                    </span>
                  )}
                  {product.source && (
                    <span
                      className="absolute bottom-3 left-3 flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold shadow"
                      style={{ background: 'rgba(250,247,240,0.95)', color: '#087F8C' }}
                    >
                      <Leaf size={10} style={{ color: '#2F7A5E' }} />
                      {product.source}
                    </span>
                  )}
                </div>

                {/* Body */}
                <div className="p-5 flex flex-col flex-1">
                  <p className="text-[11px] font-black uppercase tracking-widest mb-1.5" style={{ color: '#087F8C' }}>
                    {product.categoryTitle}
                  </p>
                  <h3 className="text-[1.05rem] font-bold mb-4 leading-snug" style={{ color: '#17232B' }}>
                    {product.name}
                  </h3>

                  <div className="flex items-end justify-between mt-auto mb-4">
                    <div>
                      <span className="text-xl font-extrabold" style={{ color: '#087F8C' }}>
                        {minPrice != null ? `₹${minPrice}` : product.priceRange}
                      </span>
                      {minPrice != null && (
                        <span className="text-xs ml-1" style={{ color: '#8A9BA6' }}>/kg onwards</span>
                      )}
                    </div>
                    <span
                      className="text-xs font-bold px-2.5 py-1 rounded-full"
                      style={
                        isAvailable
                          ? { background: 'rgba(8,127,140,0.1)', color: '#087F8C', border: '1px solid rgba(8,127,140,0.2)' }
                          : { background: '#F0EBE0', color: '#8A9BA6' }
                      }
                    >
                      {isAvailable ? 'In Stock' : 'Soon'}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => isAvailable && onSelectProduct?.(product.id)}
                    disabled={!isAvailable}
                    aria-label={isAvailable ? `View ${product.name}` : `${product.name} coming soon`}
                    className="w-full py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all"
                    style={
                      isAvailable
                        ? { background: '#087F8C', color: '#fff', boxShadow: '0 4px 16px -3px rgba(8,127,140,0.35)' }
                        : { background: '#F0EBE0', color: '#8A9BA6', cursor: 'not-allowed' }
                    }
                    onMouseEnter={(e) => { if (isAvailable) e.currentTarget.style.background = '#0A9BA9' }}
                    onMouseLeave={(e) => { if (isAvailable) e.currentTarget.style.background = '#087F8C' }}
                  >
                    {isAvailable ? (<><ShoppingBag size={15} />View & Order</>) : 'Coming Soon'}
                  </button>
                </div>
              </article>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16">
          <div
            className="rounded-3xl px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-6"
            style={{ background: '#0B2638', border: '1px solid rgba(8,127,140,0.2)' }}
          >
            <div>
              <p className="text-white font-bold text-xl mb-1">Need a custom or bulk order?</p>
              <p className="text-sm" style={{ color: 'rgba(221,243,239,0.6)' }}>Contact us for wholesale pricing and special requirements.</p>
            </div>
            <a
              href="#contact"
              className="flex-shrink-0 inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm text-white transition-all hover:-translate-y-0.5"
              style={{ background: '#087F8C', boxShadow: '0 4px 18px -3px rgba(8,127,140,0.45)' }}
              onMouseEnter={(e) => (e.currentTarget.style.background = '#0A9BA9')}
              onMouseLeave={(e) => (e.currentTarget.style.background = '#087F8C')}
            >
              Contact Us <ChevronRight size={15} />
            </a>
          </div>
        </div>

      </div>
    </section>
  )
}
