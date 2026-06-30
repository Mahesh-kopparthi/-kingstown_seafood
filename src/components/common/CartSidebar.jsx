import React from 'react'
import { Trash2, ShoppingCart, X, Plus, Minus, MessageCircle, Package, Truck } from 'lucide-react'
import { productDetails } from '../../data/productDetails'

export default function CartSidebar({
  cartItems,
  onRemoveItem,
  onUpdateQuantity,
  onClearCart,
  isOpen,
  onClose,
  onCheckout,
}) {
  const packagingCharge = 60
  const deliveryCharge = 50

  const subtotal = cartItems.reduce((sum, item) => sum + item.total, 0)
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0)
  const discount = totalQuantity >= 3 ? subtotal * 0.05 : totalQuantity >= 6 ? subtotal * 0.1 : 0
  const total = subtotal - discount + packagingCharge + deliveryCharge

  const formatINR = (value) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(value)

  const handleWhatsAppOrder = () => {
    const orderText = cartItems
      .map(
        (item) =>
          `• ${item.name} (${item.size}) - ${item.quantity} Kg - ${formatINR(item.total)}`
      )
      .join('\n')
    const message = `Hello Kings Town Seafood! I would like to place an order:\n\n${orderText}\n\n*Subtotal: ${formatINR(subtotal)}*\n*Packaging: ${formatINR(packagingCharge)}*\n*Delivery: ${formatINR(deliveryCharge)}*${discount > 0 ? `\n*Discount: -${formatINR(discount)}*` : ''}\n\n*Total: ${formatINR(total)}*\n\nPlease confirm my order.`
    const encodedMessage = encodeURIComponent(message)
    window.open(`https://wa.me/918586164999?text=${encodedMessage}`, '_blank')
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <aside className="relative w-full max-w-md max-h-[90vh] bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        <div className="flex items-center justify-between border-b border-slate-200 p-5 bg-gradient-to-r from-ocean to-aqua">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/20 text-white">
              <ShoppingCart size={20} />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Your Cart</p>
              <p className="text-xs text-teal">{totalQuantity} item(s)</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/20 transition"
            aria-label="Close cart"
          >
            <X size={20} className="text-white" />
          </button>
        </div>

        {cartItems.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <ShoppingCart size={48} className="text-slate-300 mb-4" />
            <p className="text-gray-600 text-lg">Your cart is empty</p>
            <p className="text-gray-400 text-sm mt-2">Add some fresh seafood to get started!</p>
            <button
              type="button"
              onClick={onClose}
              className="mt-6 bg-ocean hover:bg-aqua text-white px-6 py-3 rounded-full font-semibold transition"
            >
              Browse Products
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {cartItems.map((item, index) => {
                const product = productDetails[item.id]
                return (
                  <div
                    key={`${item.id}-${item.size}-${index}`}
                    className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                  >
                    <div className="flex gap-4">
                      <div className="w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden bg-slate-200">
                        <img
                          src={product?.image || '/images/placeholder.jpg'}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-gray-900 truncate">{item.name}</p>
                            <p className="mt-1 text-sm text-gray-600">{item.size}</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => onRemoveItem(index)}
                            className="text-gray-400 transition hover:text-red-500 flex-shrink-0"
                            aria-label="Remove item"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                        <div className="mt-2 flex items-center justify-between">
                          <p className="text-sm font-semibold text-ocean">
                            {formatINR(item.unitPrice)}/Kg
                          </p>
                          <p className="text-sm font-bold text-gray-900">
                            {formatINR(item.total)}
                          </p>
                        </div>
                        <div className="mt-3 flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity?.(index, item.quantity - 1)}
                            className="w-7 h-7 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:border-ocean transition"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={14} className="text-gray-600" />
                          </button>
                          <span className="w-8 text-center font-semibold text-gray-900 text-sm">
                            {item.quantity} Kg
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity?.(index, item.quantity + 1)}
                            className="w-7 h-7 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:border-ocean transition"
                            aria-label="Increase quantity"
                          >
                            <Plus size={14} className="text-gray-600" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="border-t border-slate-200 p-5 bg-white space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold text-gray-900">{formatINR(subtotal)}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 flex items-center gap-1">
                  <Package size={14} />
                  Packaging
                </span>
                <span className="font-semibold text-gray-900">{formatINR(packagingCharge)}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 flex items-center gap-1">
                  <Truck size={14} />
                  Delivery
                </span>
                <span className="font-semibold text-gray-900">{formatINR(deliveryCharge)}</span>
              </div>
              {discount > 0 && (
                <div className="flex items-center justify-between text-sm text-green-600">
                  <span className="font-semibold">Bulk Discount</span>
                  <span className="font-semibold">-{formatINR(discount)}</span>
                </div>
              )}
              <div className="border-t border-slate-200 pt-3 flex items-center justify-between">
                <span className="text-lg font-bold text-gray-900">Grand Total</span>
                <span className="text-xl font-bold text-ocean">{formatINR(total)}</span>
              </div>
              {discount > 0 && (
                <p className="text-xs text-green-600 text-center">
                  🎉 You're saving {formatINR(discount)} by ordering in bulk!
                </p>
              )}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={onCheckout}
                  className="flex-1 bg-gradient-to-r from-ocean to-aqua hover:from-aqua hover:to-ocean text-white px-4 py-3 rounded-full font-semibold transition flex items-center justify-center gap-2"
                >
                  Checkout
                </button>
                <button
                  type="button"
                  onClick={handleWhatsAppOrder}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-full font-semibold transition flex items-center justify-center gap-2"
                >
                  <MessageCircle size={18} />
                </button>
                <button
                  type="button"
                  onClick={onClearCart}
                  className="px-4 py-3 rounded-full border border-slate-200 text-gray-600 font-semibold hover:border-red-500 hover:text-red-500 transition"
                >
                  Clear
                </button>
              </div>
            </div>
          </>
        )}
      </aside>
    </div>
  )
}
