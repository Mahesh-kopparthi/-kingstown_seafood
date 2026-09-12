import React from 'react'
import { Trash2, ShoppingCart, X, Plus, Minus, MessageCircle, Package, Truck } from 'lucide-react'
import { productDetails } from '../../data/productDetails'
import { asset } from '../../utils/assets'

export default function CartSidebar({ cartItems, onRemoveItem, onUpdateQuantity, onClearCart, isOpen, onClose, onCheckout }) {
  const packagingCharge = 60
  const deliveryCharge  = 50

  const subtotal      = cartItems.reduce((sum, item) => sum + item.total, 0)
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0)
  const discount      = totalQuantity >= 6 ? subtotal * 0.10 : totalQuantity >= 3 ? subtotal * 0.05 : 0
  const total         = subtotal - discount + packagingCharge + deliveryCharge

  const fmt = (v) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(v)

  const handleWhatsApp = () => {
    const lines = cartItems.map((i) => `• ${i.name} (${i.size}) - ${i.quantity} Kg - ${fmt(i.total)}`).join('\n')
    const msg = `Hello Kingstown Seafood! I'd like to place an order:\n\n${lines}\n\n*Subtotal: ${fmt(subtotal)}*\n*Packaging: ${fmt(packagingCharge)}*\n*Delivery: ${fmt(deliveryCharge)}*${discount > 0 ? `\n*Discount: -${fmt(discount)}*` : ''}\n\n*Total: ${fmt(total)}*\n\nPlease confirm my order.`
    window.open(`https://wa.me/919858664999?text=${encodeURIComponent(msg)}`, '_blank')
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/55 backdrop-blur-sm" onClick={onClose} />
      <aside className="relative w-full max-w-md max-h-[90vh] rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col" style={{ background: '#fff' }}>

        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5" style={{ background: '#0B2638' }}>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: 'rgba(8,127,140,0.25)', color: '#fff' }}>
              <ShoppingCart size={19} />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Your Cart</p>
              <p className="text-xs" style={{ color: '#20B8C5' }}>{totalQuantity} item{totalQuantity !== 1 ? 's' : ''}</p>
            </div>
          </div>
          <button type="button" onClick={onClose} className="p-2 rounded-full transition hover:bg-white/10 text-white" aria-label="Close cart">
            <X size={19} />
          </button>
        </div>

        {cartItems.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <div className="w-18 h-18 rounded-full mb-4 flex items-center justify-center" style={{ background: '#EDE3D2', width: 72, height: 72 }}>
              <ShoppingCart size={32} style={{ color: '#8A9BA6' }} />
            </div>
            <p className="text-base font-semibold mb-1" style={{ color: '#17232B' }}>Your cart is empty</p>
            <p className="text-sm mb-5" style={{ color: '#8A9BA6' }}>Add some fresh seafood to get started!</p>
            <button type="button" onClick={onClose}
              className="px-6 py-2.5 rounded-full text-sm font-bold text-white transition"
              style={{ background: '#087F8C' }}
              onMouseEnter={(e) => (e.currentTarget.style.background = '#0A9BA9')}
              onMouseLeave={(e) => (e.currentTarget.style.background = '#087F8C')}
            >
              Browse Products
            </button>
          </div>
        ) : (
          <>
            {/* Items */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3" style={{ background: '#FAF7F0' }}>
              {cartItems.map((item, index) => {
                const product = productDetails[item.id]
                return (
                  <div
                    key={`${item.id}-${item.size}-${index}`}
                    className="rounded-2xl p-3 sm:p-4 shadow-sm"
                    style={{ background: '#fff', border: '1.5px solid #EDE3D2' }}
                  >
                    <div className="flex gap-3 sm:gap-4">
                      <div className="w-16 h-16 sm:w-18 sm:h-18 flex-shrink-0 rounded-xl overflow-hidden" style={{ background: '#EDE3D2', width: 64, height: 64 }}>
                        <img src={product?.image || asset('/images/prawns.jpg')} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <p className="text-sm font-semibold truncate" style={{ color: '#17232B' }}>{item.name}</p>
                            <p className="text-xs mt-0.5" style={{ color: '#8A9BA6' }}>{item.size}</p>
                          </div>
                          <button type="button" onClick={() => onRemoveItem(index)}
                            className="p-1 transition flex-shrink-0" aria-label="Remove item"
                            style={{ color: '#8A9BA6' }}
                            onMouseEnter={(e) => (e.currentTarget.style.color = '#dc2626')}
                            onMouseLeave={(e) => (e.currentTarget.style.color = '#8A9BA6')}
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                        <div className="mt-2 flex items-center justify-between">
                          <p className="text-xs font-semibold" style={{ color: '#087F8C' }}>{fmt(item.unitPrice)}/Kg</p>
                          <p className="text-xs font-bold" style={{ color: '#17232B' }}>{fmt(item.total)}</p>
                        </div>
                        <div className="mt-2 flex items-center gap-2">
                          <button type="button" onClick={() => onUpdateQuantity?.(index, item.quantity - 1)}
                            className="w-7 h-7 rounded-full flex items-center justify-center shadow-sm transition"
                            style={{ background: '#fff', border: '1.5px solid #EDE3D2' }}
                            onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#087F8C')}
                            onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#EDE3D2')}
                            aria-label="Decrease">
                            <Minus size={13} style={{ color: '#4A5E6A' }} />
                          </button>
                          <span className="w-10 text-center text-xs font-semibold" style={{ color: '#17232B' }}>{item.quantity} Kg</span>
                          <button type="button" onClick={() => onUpdateQuantity?.(index, item.quantity + 1)}
                            className="w-7 h-7 rounded-full flex items-center justify-center shadow-sm transition"
                            style={{ background: '#fff', border: '1.5px solid #EDE3D2' }}
                            onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#087F8C')}
                            onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#EDE3D2')}
                            aria-label="Increase">
                            <Plus size={13} style={{ color: '#4A5E6A' }} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Totals */}
            <div className="p-4 sm:p-5 space-y-2.5" style={{ background: '#fff', borderTop: '1.5px solid #EDE3D2' }}>
              {[
                { label: 'Subtotal', value: fmt(subtotal), icon: null },
                { label: 'Packaging', value: fmt(packagingCharge), icon: <Package size={13} /> },
                { label: 'Delivery',  value: fmt(deliveryCharge),  icon: <Truck size={13} /> },
              ].map((row) => (
                <div key={row.label} className="flex items-center justify-between text-xs sm:text-sm">
                  <span className="flex items-center gap-1.5" style={{ color: '#5A6E7A' }}>
                    {row.icon}
                    {row.label}
                  </span>
                  <span className="font-semibold" style={{ color: '#17232B' }}>{row.value}</span>
                </div>
              ))}
              {discount > 0 && (
                <div className="flex items-center justify-between text-xs sm:text-sm font-semibold" style={{ color: '#2F7A5E' }}>
                  <span>Bulk Discount</span>
                  <span>-{fmt(discount)}</span>
                </div>
              )}
              <div className="flex items-center justify-between pt-2.5" style={{ borderTop: '2px solid #EDE3D2' }}>
                <span className="text-base font-bold" style={{ color: '#17232B' }}>Grand Total</span>
                <span className="text-lg font-extrabold" style={{ color: '#087F8C' }}>{fmt(total)}</span>
              </div>
              {discount > 0 && (
                <p className="text-xs text-center font-medium" style={{ color: '#2F7A5E' }}>
                  You're saving {fmt(discount)} with a bulk order!
                </p>
              )}

              {/* Actions */}
              <div className="flex gap-2 sm:gap-3 pt-1">
                <button type="button" onClick={onCheckout}
                  className="flex-1 py-2.5 sm:py-3 rounded-full text-sm font-bold text-white flex items-center justify-center gap-1.5 transition"
                  style={{ background: '#087F8C', boxShadow: '0 4px 14px -3px rgba(8,127,140,0.4)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = '#0A9BA9')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = '#087F8C')}
                >
                  Checkout
                </button>
                <button type="button" onClick={handleWhatsApp}
                  className="py-2.5 sm:py-3 px-3.5 rounded-full font-bold text-white flex items-center justify-center transition"
                  style={{ background: '#2F7A5E' }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = '#3a9470')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = '#2F7A5E')}
                  aria-label="Order via WhatsApp"
                >
                  <MessageCircle size={17} />
                </button>
                <button type="button" onClick={onClearCart}
                  className="py-2.5 sm:py-3 px-3.5 rounded-full font-bold text-sm transition"
                  style={{ border: '2px solid #EDE3D2', color: '#5A6E7A' }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#dc2626'; e.currentTarget.style.color = '#dc2626' }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#EDE3D2'; e.currentTarget.style.color = '#5A6E7A' }}
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
