import React from 'react'
import { Plus, Minus, ShoppingCart } from 'lucide-react'

export default function ProductCard({
  image,
  title,
  description,
  price,
  stock = 'Available',
  offer = '',
  badge = '',
  onView,
  onAddToCart,
  showQuantity = false,
  quantity = 1,
  onQuantityChange,
}) {
  const stockClasses =
    stock === 'Out of Stock'
      ? 'text-red-600 bg-red-50'
      : stock === 'Limited Stock'
        ? 'text-amber-600 bg-amber-50'
        : 'text-emerald-600 bg-emerald-50'

  const hasImage = typeof image === 'string' && image.trim() !== ''
  const isRemoteImage = hasImage && /^(https?:|data:|\/)/i.test(image)

  const formatINR = (value) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(value)

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md card-hover border border-gray-100">
      <div className="h-48 bg-gradient-to-br from-ocean to-aqua relative overflow-hidden">
        {hasImage && isRemoteImage ? (
          <img src={image} alt={title} className="h-full w-full object-cover" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-5xl">{image}</div>
        )}
        {badge && (
          <div className="absolute top-4 left-4 rounded-full bg-ocean text-white px-3 py-1 text-xs font-semibold">
            {badge}
          </div>
        )}
        {offer && (
          <div className="absolute top-4 right-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-ocean">
            {offer}
          </div>
        )}
      </div>

      <div className="p-5">
        <div className="flex items-center justify-between mb-3">
          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${stockClasses}`}>{stock}</span>
          {price && (
            <span className="text-lg font-bold text-ocean">{formatINR(price)}</span>
          )}
        </div>

        <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{description}</p>

        {showQuantity && onQuantityChange ? (
          <div className="flex items-center gap-3 mb-4">
            <span className="text-sm text-gray-600">Quantity:</span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
                className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition"
                aria-label="Decrease quantity"
              >
                <Minus size={16} className="text-gray-600" />
              </button>
              <span className="w-8 text-center font-semibold text-gray-900">{quantity}</span>
              <button
                type="button"
                onClick={() => onQuantityChange(quantity + 1)}
                className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition"
                aria-label="Increase quantity"
              >
                <Plus size={16} className="text-gray-600" />
              </button>
            </div>
          </div>
        ) : null}

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onView}
            className="flex-1 border border-ocean text-ocean hover:bg-ocean hover:text-white px-4 py-2 rounded-lg text-sm font-semibold transition"
          >
            View Details
          </button>
          {onAddToCart && stock !== 'Out of Stock' && (
            <button
              type="button"
              onClick={onAddToCart}
              className="flex-1 bg-ocean hover:bg-aqua text-white px-4 py-2 rounded-lg text-sm font-semibold transition flex items-center justify-center gap-2"
            >
              <ShoppingCart size={16} />
              Add
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
