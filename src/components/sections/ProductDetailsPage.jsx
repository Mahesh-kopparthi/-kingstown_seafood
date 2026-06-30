import React, { useEffect, useMemo, useState } from 'react'
import {
  ArrowLeft,
  Award,
  Briefcase,
  Building,
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Gift,
  MessageCircle,
  Package,
  ShoppingBag,
  Truck,
  Star,
  Clock,
} from 'lucide-react'
import { productDetails } from '../../data/productDetails'
import ProductInfoCard from '../common/ProductInfoCard'
import ReviewCard from '../common/ReviewCard'

export default function ProductDetailsPage({ productId, onBack, onContactRequest, onAddToCart }) {
  const [selectedSize, setSelectedSize] = useState(null)
  const [quantity, setQuantity] = useState(1)

  const product = productDetails[productId]

  useEffect(() => {
    if (product?.sizes?.length) {
      setSelectedSize(product.sizes[0].size)
    }
  }, [product])

  const selectedSizeData = useMemo(() => {
    if (!product?.sizes?.length) return null
    return product.sizes.find((size) => size.size === selectedSize) || product.sizes[0]
  }, [product, selectedSize])

  const selectedPrice = selectedSizeData?.price || 0

  // Calculate discount based on quantity
  const discount = quantity >= 3 ? selectedPrice * quantity * 0.05 : quantity >= 6 ? selectedPrice * quantity * 0.1 : 0
  const totalPrice = selectedPrice * quantity - discount

  if (!product) {
    return (
      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-5xl px-4 text-center md:px-8">
          <h2 className="mb-4 text-3xl font-bold text-gray-800">Product not found</h2>
          <p className="text-gray-600">Please return to the products section and select a valid seafood item.</p>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-slate-50 py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <button
          type="button"
          onClick={onBack}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm transition hover:text-ocean"
        >
          <ArrowLeft size={16} />
          Back to products
        </button>

        <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-2xl">
          <div className="grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="relative min-h-[420px] overflow-hidden">
              <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/20 to-transparent" />
              <div className="absolute left-6 top-6 flex flex-wrap gap-3">
                {product.badges.map((badge) => (
                  <span key={badge} className="rounded-full border border-white/40 bg-white/15 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm">
                    {badge}
                  </span>
                ))}
              </div>
              <div className="absolute bottom-6 left-6 right-6">
                <p className="mb-2 text-sm font-semibold uppercase tracking-[0.25em] text-teal">Premium Seafood</p>
                <h1 className="text-3xl font-bold text-white md:text-5xl">{product.name}</h1>
                <p className="mt-4 max-w-xl text-base text-slate-100 md:text-lg">{product.description}</p>
              </div>
            </div>

            <div className="flex flex-col justify-center p-6 md:p-10">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <div className="inline-flex w-fit rounded-full bg-ocean/10 px-3 py-2 text-sm font-semibold text-ocean">
                  {product.category}
                </div>
                <div className="inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-2 text-sm font-semibold text-green-700">
                  <Clock size={14} />
                  Available Today
                </div>
              </div>
              
              <h2 className="mt-2 text-2xl font-bold text-gray-800 md:text-3xl">{product.name}</h2>
              
              <div className="mt-3 flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className={i < 4 ? "fill-amber-400 text-amber-400" : "text-gray-300"} />
                  ))}
                  <span className="text-sm text-gray-600 ml-1">(4.0)</span>
                </div>
                <span className="text-sm text-gray-500">|</span>
                <span className="text-sm text-gray-600">{product.reviews.length} reviews</span>
              </div>
              
              <p className="mt-4 text-base leading-7 text-gray-600">{product.description}</p>

              <div className="mt-6 rounded-2xl bg-slate-50 p-4 border border-slate-200">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold text-gray-600">Quick Add to Cart</span>
                  <span className="text-2xl font-bold text-ocean">{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(selectedPrice)}/Kg</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                      className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:border-ocean transition"
                      aria-label="Decrease quantity"
                    >
                      <ChevronLeft size={18} className="text-gray-600" />
                    </button>
                    <span className="w-12 text-center font-bold text-gray-900">{quantity} Kg</span>
                    <button
                      type="button"
                      onClick={() => setQuantity((prev) => prev + 1)}
                      className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:border-ocean transition"
                      aria-label="Increase quantity"
                    >
                      <ChevronRight size={18} className="text-gray-600" />
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => onAddToCart?.({ id: product.id, name: product.name, size: selectedSizeData?.size || '', quantity, unitPrice: selectedPrice })}
                    className="flex-1 rounded-full bg-gradient-to-r from-ocean to-aqua px-6 py-3 font-semibold text-white shadow-lg shadow-ocean/20 transition hover:-translate-y-0.5"
                  >
                    Add to Cart
                  </button>
                </div>
                {discount > 0 && (
                  <p className="mt-3 text-xs text-green-600 text-center">
                    🎉 Save {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(discount)} on this order!
                  </p>
                )}
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={onContactRequest}
                  className="rounded-full bg-green-500 hover:bg-green-600 text-white px-6 py-3 font-semibold transition flex items-center gap-2"
                >
                  <MessageCircle size={18} />
                  Order Now
                </button>
                <button
                  type="button"
                  onClick={onContactRequest}
                  className="rounded-full border border-slate-200 px-6 py-3 font-semibold text-slate-700 transition hover:border-ocean hover:text-ocean"
                >
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-xl">
            <h3 className="text-2xl font-bold text-gray-800">Product Information</h3>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {Object.entries(product.specs).map(([label, value]) => (
                <ProductInfoCard key={label} label={label} value={value} />
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-gradient-to-br from-slate-900 to-ocean p-6 md:p-8 text-white shadow-xl">
            <div className="flex items-center gap-3">
              <ShoppingBag size={24} />
              <h3 className="text-xl md:text-2xl font-bold">Size & Quantity</h3>
            </div>
            <p className="mt-4 text-sm md:text-base text-slate-200">Choose your preferred size and quantity.</p>

            <div className="mt-6 rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal mb-3">Available Sizes</p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((item) => (
                  <button
                    key={item.size}
                    type="button"
                    onClick={() => setSelectedSize(item.size)}
                    className={`rounded-full border px-3 py-1.5 text-xs md:text-sm font-semibold transition ${selectedSize === item.size ? 'border-teal bg-teal text-slate-950' : 'border-white/20 bg-white/10 text-white hover:border-teal hover:text-teal'}`}
                  >
                    {item.size}
                  </button>
                ))}
              </div>
              <p className="mt-2 text-xs text-slate-300">Selected: {selectedSizeData?.approxCount || ''}</p>
            </div>

            <div className="mt-6 rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal mb-3">Quantity (Kg)</p>
              <div className="flex items-center justify-between rounded-full bg-white/15 px-4 py-2">
                <button
                  type="button"
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-lg font-bold transition hover:bg-white/30"
                  aria-label="Decrease quantity"
                >
                  <ChevronLeft size={16} />
                </button>
                <div className="text-center">
                  <p className="text-xl md:text-2xl font-bold">{quantity}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setQuantity((prev) => prev + 1)}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-lg font-bold transition hover:bg-white/30"
                  aria-label="Increase quantity"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

            <div className="mt-6 rounded-2xl bg-white p-4 md:p-6 text-slate-900 shadow-lg">
              <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.2em] text-ocean">
                <span>Price per Kg</span>
                <span>Quantity</span>
              </div>
              <div className="mt-3 flex items-center justify-between text-2xl md:text-3xl font-bold text-slate-900">
                <span>{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(selectedPrice)}</span>
                <span>×</span>
                <span>{quantity}</span>
              </div>
              {discount > 0 && (
                <div className="mt-2 flex items-center justify-between text-sm text-green-600">
                  <span>Bulk Discount</span>
                  <span>-{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(discount)}</span>
                </div>
              )}
              <div className="mt-3 border-t border-slate-200 pt-3 text-2xl md:text-3xl font-bold text-ocean">
                = {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(totalPrice)}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 md:p-8 shadow-xl">
            <h3 className="text-2xl font-bold text-gray-800">Available Sizes & Pricing</h3>
            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {product.sizes.map((item) => (
                <div key={item.size} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 md:p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                  <div className="flex items-start justify-between mb-2">
                    <p className="text-lg font-semibold text-gray-800">{item.size}</p>
                    {selectedSize === item.size && (
                      <CheckCircle2 size={20} className="text-green-500" />
                    )}
                  </div>
                  <p className="text-sm text-gray-500 mb-2">{item.approxCount}</p>
                  <p className="text-sm text-gray-600 mb-3">{item.availability}</p>
                  <p className="text-xl md:text-2xl font-bold text-ocean">{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(item.price)} / Kg</p>
                  <button
                    type="button"
                    onClick={() => setSelectedSize(item.size)}
                    className={`mt-4 w-full rounded-full px-4 py-2 text-sm font-semibold transition ${selectedSize === item.size ? 'bg-ocean text-white' : 'bg-ocean/10 text-ocean hover:bg-ocean hover:text-white'}`}
                  >
                    {selectedSize === item.size ? 'Selected' : 'Select'}
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 md:p-8 shadow-xl">
            <h3 className="text-2xl font-bold text-gray-800">Packaging & Delivery</h3>
            <p className="mt-4 text-base leading-7 text-gray-600">
              Additional charges apply for packaging and delivery to ensure your seafood arrives fresh and safe.
            </p>
            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-3">
                  <Package size={20} className="text-ocean" />
                  <div>
                    <p className="font-semibold text-gray-800">Standard Packaging</p>
                    <p className="text-sm text-gray-500">Insulated packaging with ice packs</p>
                  </div>
                </div>
                <p className="font-bold text-ocean">₹60</p>
              </div>
              <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-3">
                  <Truck size={20} className="text-ocean" />
                  <div>
                    <p className="font-semibold text-gray-800">Delivery Charge</p>
                    <p className="text-sm text-gray-500">Same-day delivery within city limits</p>
                  </div>
                </div>
                <p className="font-bold text-ocean">₹50</p>
              </div>
            </div>
            <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-ocean/10 to-aqua/10 border border-ocean/20">
              <p className="text-sm font-semibold text-ocean">
                💡 Free delivery on orders above ₹2,000
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-xl">
          <h3 className="text-2xl font-bold text-gray-800">Why Choose Kingstown Seafood</h3>
          <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {product.whyChoose.map((item) => (
              <div key={item.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-ocean/10 text-ocean">
                  <CheckCircle2 size={22} />
                </div>
                <h4 className="text-lg font-semibold text-gray-800">{item.title}</h4>
                <p className="mt-2 text-sm leading-6 text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-xl">
          <h3 className="text-2xl font-bold text-gray-800">Customer Reviews</h3>
          <div className="mt-6 grid gap-6 lg:grid-cols-3">
            {product.reviews.map((review) => (
              <ReviewCard key={review.name} name={review.name} role={review.role} content={review.text} rating={review.rating} />
            ))}
          </div>
        </div>

        <div className="mt-12 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-xl">
          <h3 className="text-2xl font-bold text-gray-800">Related Products</h3>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {product.related.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => onBack(item.id)}
                className="group overflow-hidden rounded-[1.5rem] border border-slate-200 bg-slate-50 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <img src={item.image} alt={item.name} className="h-48 w-full object-cover transition duration-500 group-hover:scale-105" />
                <div className="p-5">
                  <h4 className="text-xl font-semibold text-gray-800">{item.name}</h4>
                  <p className="mt-2 text-sm text-gray-500">Explore this product for premium seafood orders.</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-12 rounded-[2rem] bg-gradient-to-r from-ocean to-aqua p-8 text-white shadow-2xl">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-teal">Custom Requirements</p>
              <h3 className="mt-2 text-2xl font-bold">Need a custom seafood order or special packing?</h3>
              <p className="mt-3 max-w-2xl text-base text-slate-100">Reach out to Kings Town Seafood for tailored solutions, wholesale pricing, and premium support for your business or event.</p>
            </div>
            <button
              type="button"
              onClick={onContactRequest}
              className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 font-semibold text-ocean transition hover:bg-slate-100"
            >
              <MessageCircle size={18} className="mr-2" />
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
