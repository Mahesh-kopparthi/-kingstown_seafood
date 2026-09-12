import React, { useEffect, useMemo, useState } from 'react'
import { ArrowLeft, CheckCircle2, ChevronLeft, ChevronRight, MessageCircle, ShoppingBag, Star, Leaf, Clock, Truck } from 'lucide-react'
import { productDetails } from '../../data/productDetails'
import ProductInfoCard from '../common/ProductInfoCard'
import ReviewCard from '../common/ReviewCard'

const fmt = (v) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(v)

export default function ProductDetailsPage({ productId, onBack, onContactRequest, onAddToCart }) {
  const [selectedSize, setSelectedSize] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const product = productDetails[productId]

  useEffect(() => {
    if (product?.sizes?.length) setSelectedSize(product.sizes[0].size)
  }, [product])

  const sizeData = useMemo(() => {
    if (!product?.sizes?.length) return null
    return product.sizes.find((s) => s.size === selectedSize) || product.sizes[0]
  }, [product, selectedSize])

  const price    = sizeData?.price || 0
  const discount = quantity >= 6 ? price * quantity * 0.10 : quantity >= 3 ? price * quantity * 0.05 : 0
  const total    = price * quantity - discount

  if (!product) {
    return (
      <section className="min-h-[60vh] flex items-center justify-center" style={{ background: '#FAF7F0' }}>
        <div className="text-center px-4">
          <p className="text-5xl mb-4">🦐</p>
          <h2 className="text-2xl font-bold mb-3" style={{ color: '#17232B' }}>Product not found</h2>
          <button type="button" onClick={() => onBack()}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-white transition"
            style={{ background: '#087F8C' }}
          >
            <ArrowLeft size={15} /> Back to Products
          </button>
        </div>
      </section>
    )
  }

  return (
    <section className="min-h-screen py-8 sm:py-12 lg:py-16" style={{ background: '#FAF7F0' }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Back */}
        <button type="button" onClick={() => onBack()}
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold transition hover:-translate-x-0.5"
          style={{ color: '#087F8C' }}
        >
          <ArrowLeft size={14} /> Back to Products
        </button>

        <div className="grid gap-10 lg:gap-14 lg:grid-cols-2 mb-12">

          {/* Image */}
          <div>
            <div className="relative aspect-square rounded-3xl overflow-hidden" style={{ background: '#EDE3D2', border: '1.5px solid #D4C4A8' }}>
              <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
              {product.badges?.length > 0 && (
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  {product.badges.map((b) => (
                    <span key={b} className="px-3 py-1.5 text-xs font-bold rounded-full text-white shadow" style={{ background: '#087F8C' }}>
                      {b}
                    </span>
                  ))}
                </div>
              )}
              {product.source && (
                <div className="absolute bottom-4 left-4">
                  <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold" style={{ background: 'rgba(250,247,240,0.93)', color: '#087F8C', border: '1px solid rgba(8,127,140,0.2)' }}>
                    <Leaf size={11} style={{ color: '#2F7A5E' }} />{product.source}
                  </span>
                </div>
              )}
            </div>
            {product.specs && (
              <div className="grid grid-cols-2 gap-3 mt-4">
                {Object.entries(product.specs).slice(0, 4).map(([label, value]) => (
                  <ProductInfoCard key={label} label={label} value={value} />
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="flex flex-col gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2 flex-wrap">
                <span className="px-3 py-1 rounded-full text-sm font-bold" style={{ background: 'rgba(8,127,140,0.1)', color: '#087F8C' }}>
                  {product.category}
                </span>
                <span className="flex items-center gap-1 text-sm font-semibold" style={{ color: '#2F7A5E' }}>
                  <Clock size={13} /> Available Now
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold mb-3 leading-tight" style={{ color: '#17232B' }}>{product.name}</h1>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex gap-0.5" aria-label="4 out of 5 stars">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className={i < 4 ? 'fill-amber-400 text-amber-400' : 'fill-slate-200 text-slate-200'} />
                  ))}
                </div>
                <span className="text-sm" style={{ color: '#8A9BA6' }}>({product.reviews?.length || 0} reviews)</span>
              </div>
              <p className="leading-relaxed" style={{ color: '#4A5E6A' }}>{product.description}</p>
            </div>

            {/* Size selection */}
            <div className="rounded-2xl p-5 sm:p-6" style={{ background: '#fff', border: '1.5px solid #EDE3D2' }}>
              <h3 className="font-bold mb-4" style={{ color: '#17232B' }}>Select Size / Grade</h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((item) => (
                  <button key={item.size} type="button" onClick={() => setSelectedSize(item.size)}
                    aria-pressed={selectedSize === item.size}
                    className="px-4 py-2 rounded-xl text-sm font-semibold transition-all"
                    style={
                      selectedSize === item.size
                        ? { background: '#087F8C', color: '#fff', border: '2px solid #087F8C', boxShadow: '0 3px 12px -3px rgba(8,127,140,0.4)' }
                        : { background: '#FAF7F0', color: '#4A5E6A', border: '2px solid #EDE3D2' }
                    }
                    onMouseEnter={(e) => { if (selectedSize !== item.size) e.currentTarget.style.borderColor = '#087F8C' }}
                    onMouseLeave={(e) => { if (selectedSize !== item.size) e.currentTarget.style.borderColor = '#EDE3D2' }}
                  >
                    {item.size}
                  </button>
                ))}
              </div>
              {sizeData && (
                <div className="mt-3 flex flex-wrap gap-3 text-sm" style={{ color: '#8A9BA6' }}>
                  <span>Approx: <span className="font-medium" style={{ color: '#17232B' }}>{sizeData.approxCount}</span></span>
                  <span>Status: <span className="font-medium" style={{ color: '#2F7A5E' }}>{sizeData.availability}</span></span>
                </div>
              )}
            </div>

            {/* Quantity + price */}
            <div className="rounded-2xl p-5 sm:p-6" style={{ background: '#fff', border: '1.5px solid #EDE3D2' }}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold" style={{ color: '#17232B' }}>Quantity (Kg)</h3>
                <span className="text-2xl font-extrabold" style={{ color: '#087F8C' }}>{fmt(price)}/Kg</span>
              </div>
              <div className="flex items-center gap-5 mb-3">
                <div className="flex items-center gap-2 rounded-xl p-1.5" style={{ background: '#FAF7F0', border: '1.5px solid #EDE3D2' }}>
                  <button type="button" onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-9 h-9 flex items-center justify-center rounded-lg shadow-sm transition"
                    style={{ background: '#fff', border: '1.5px solid #EDE3D2' }}
                    onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#087F8C')}
                    onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#EDE3D2')}
                    aria-label="Decrease">
                    <ChevronLeft size={17} style={{ color: '#4A5E6A' }} />
                  </button>
                  <span className="text-xl font-bold w-12 text-center" style={{ color: '#17232B' }}>{quantity}</span>
                  <button type="button" onClick={() => setQuantity((q) => q + 1)}
                    className="w-9 h-9 flex items-center justify-center rounded-lg shadow-sm transition"
                    style={{ background: '#fff', border: '1.5px solid #EDE3D2' }}
                    onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#087F8C')}
                    onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#EDE3D2')}
                    aria-label="Increase">
                    <ChevronRight size={17} style={{ color: '#4A5E6A' }} />
                  </button>
                </div>
                <div>
                  <p className="text-xs mb-0.5" style={{ color: '#8A9BA6' }}>Total</p>
                  <p className="text-2xl font-extrabold" style={{ color: '#17232B' }}>{fmt(total)}</p>
                </div>
              </div>
              {discount > 0 && <p className="text-sm font-medium" style={{ color: '#2F7A5E' }}>Bulk discount applied — saving {fmt(discount)}</p>}
              <p className="text-xs mt-1" style={{ color: '#8A9BA6' }}>5% off for 3+ kg · 10% off for 6+ kg</p>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button type="button"
                onClick={() => onAddToCart?.({ id: product.id, name: product.name, size: sizeData?.size || '', quantity, unitPrice: price })}
                className="flex-1 inline-flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-base text-white transition-all hover:-translate-y-0.5 shadow-lg"
                style={{ background: '#087F8C', boxShadow: '0 6px 22px -4px rgba(8,127,140,0.4)' }}
                onMouseEnter={(e) => (e.currentTarget.style.background = '#0A9BA9')}
                onMouseLeave={(e) => (e.currentTarget.style.background = '#087F8C')}
              >
                <ShoppingBag size={19} /> Add to Cart
              </button>
              <button type="button" onClick={onContactRequest}
                className="flex-1 inline-flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-base text-white transition-all hover:-translate-y-0.5 shadow-lg"
                style={{ background: '#2F7A5E', boxShadow: '0 6px 22px -4px rgba(47,122,94,0.35)' }}
                onMouseEnter={(e) => (e.currentTarget.style.background = '#3a9470')}
                onMouseLeave={(e) => (e.currentTarget.style.background = '#2F7A5E')}
              >
                <MessageCircle size={19} /> Order via WhatsApp
              </button>
            </div>

            {/* Delivery note */}
            <div className="flex items-start gap-3 rounded-xl p-4" style={{ background: '#DDF3EF', border: '1px solid rgba(8,127,140,0.2)' }}>
              <Truck size={17} style={{ color: '#087F8C', flexShrink: 0, marginTop: 1 }} />
              <p className="text-sm" style={{ color: '#17232B' }}>
                Fresh dispatch on same day for orders placed before cut-off.
                Delivery with freshness-preserving packaging.
              </p>
            </div>

            {product.specs && Object.entries(product.specs).length > 4 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {Object.entries(product.specs).slice(4).map(([label, value]) => (
                  <ProductInfoCard key={label} label={label} value={value} />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Why choose */}
        {product.whyChoose?.length > 0 && (
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-6" style={{ color: '#17232B' }}>Why Choose Kingstown Sea Food</h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {product.whyChoose.map((item) => (
                <div key={item.title} className="rounded-2xl p-5 flex items-start gap-3" style={{ background: '#fff', border: '1.5px solid #EDE3D2' }}>
                  <div className="flex-shrink-0 h-9 w-9 rounded-xl flex items-center justify-center" style={{ background: 'rgba(8,127,140,0.1)' }}>
                    <CheckCircle2 size={17} style={{ color: '#087F8C' }} />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1" style={{ color: '#17232B' }}>{item.title}</h4>
                    <p className="text-sm leading-relaxed" style={{ color: '#4A5E6A' }}>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Reviews */}
        {product.reviews?.length > 0 && (
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-6" style={{ color: '#17232B' }}>Customer Reviews</h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {product.reviews.map((r) => (
                <ReviewCard key={r.name} name={r.name} role={r.role} content={r.text} rating={r.rating} />
              ))}
            </div>
          </div>
        )}

        {/* Related */}
        {product.related?.length > 0 && (
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-6" style={{ color: '#17232B' }}>Related Products</h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {product.related.map((item) => (
                <button key={item.id} type="button" onClick={() => onBack(item.id)}
                  className="group rounded-2xl overflow-hidden text-left transition-all hover:-translate-y-1"
                  style={{ background: '#fff', border: '1.5px solid #EDE3D2', boxShadow: '0 2px 12px -4px rgba(23,35,43,0.08)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(8,127,140,0.3)')}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#EDE3D2')}
                >
                  <div className="aspect-video overflow-hidden">
                    <img src={item.image} alt={item.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" loading="lazy" />
                  </div>
                  <div className="p-4 flex items-center justify-between">
                    <h4 className="font-bold" style={{ color: '#17232B' }}>{item.name}</h4>
                    <span className="text-xs font-semibold" style={{ color: '#087F8C' }}>View →</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* CTA banner */}
        <div className="rounded-2xl p-8 sm:p-10 text-center" style={{ background: '#0B2638' }}>
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">Need a custom or bulk order?</h3>
          <p className="mb-6 max-w-xl mx-auto" style={{ color: 'rgba(221,243,239,0.65)' }}>
            Contact us for wholesale pricing, event supply, or special requirements.
          </p>
          <button type="button" onClick={onContactRequest}
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full font-bold text-white transition hover:-translate-y-0.5"
            style={{ background: '#087F8C', boxShadow: '0 4px 18px -3px rgba(8,127,140,0.5)' }}
            onMouseEnter={(e) => (e.currentTarget.style.background = '#0A9BA9')}
            onMouseLeave={(e) => (e.currentTarget.style.background = '#087F8C')}
          >
            <MessageCircle size={17} /> Contact Us
          </button>
        </div>

      </div>
    </section>
  )
}
