import React, { useState } from 'react'
import { User, Phone, MapPin, MessageCircle, X, CheckCircle2 } from 'lucide-react'

export default function CheckoutForm({ cartItems, onClose, onClearCart }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    pinCode: '',
    notes: '',
  })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

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

  const validateForm = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid 10-digit phone number'
    }
    if (!formData.address.trim()) newErrors.address = 'Address is required'
    if (!formData.city.trim()) newErrors.city = 'City is required'
    if (!formData.pinCode.trim()) {
      newErrors.pinCode = 'PIN code is required'
    } else if (!/^[0-9]{6}$/.test(formData.pinCode)) {
      newErrors.pinCode = 'Please enter a valid 6-digit PIN code'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!validateForm()) return

    const orderText = cartItems
      .map(
        (item) =>
          `• ${item.name} (${item.size}) - ${item.quantity} Kg - ${formatINR(item.total)}`
      )
      .join('\n')

    const message = `*New Order from Kings Town Seafood Website*\n\n` +
      `*Customer Details:*\n` +
      `Name: ${formData.name}\n` +
      `Phone: ${formData.phone}\n` +
      `Address: ${formData.address}\n` +
      `City: ${formData.city}\n` +
      `PIN Code: ${formData.pinCode}\n\n` +
      `*Order Items:*\n${orderText}\n\n` +
      `*Order Notes:* ${formData.notes || 'None'}\n\n` +
      `*Order Summary:*\n` +
      `Subtotal: ${formatINR(subtotal)}\n` +
      `Packaging: ${formatINR(packagingCharge)}\n` +
      `Delivery: ${formatINR(deliveryCharge)}${discount > 0 ? `\nDiscount: -${formatINR(discount)}` : ''}\n` +
      `Total Quantity: ${totalQuantity} Kg\n` +
      `Total Amount: ${formatINR(total)}\n\n` +
      `Please confirm my order.`

    const encodedMessage = encodeURIComponent(message)
    window.open(`https://wa.me/918586164999?text=${encodedMessage}`, '_blank')

    setSubmitted(true)
    onClearCart()
    setTimeout(() => {
      setSubmitted(false)
      onClose()
    }, 3000)
  }

  if (submitted) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
        <div className="relative bg-white rounded-3xl p-8 max-w-md mx-4 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 size={40} className="text-green-500" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Order Submitted!</h3>
          <p className="text-gray-600">Your order has been sent via WhatsApp. We'll contact you shortly to confirm.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        <div className="flex items-center justify-between border-b border-slate-200 p-5 bg-gradient-to-r from-ocean to-aqua">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/20 text-white">
              <MessageCircle size={20} />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Checkout</p>
              <p className="text-xs text-teal">{totalQuantity} item(s)</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/20 transition"
            aria-label="Close checkout"
          >
            <X size={20} className="text-white" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-4">Customer Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                    <User size={16} className="text-ocean" />
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-ocean focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                    <Phone size={16} className="text-ocean" />
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    pattern="[0-9]{10}"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-ocean focus:border-transparent"
                    placeholder="10-digit mobile number"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                    <MapPin size={16} className="text-ocean" />
                    Delivery Address *
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    rows="3"
                    className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:border-transparent resize-none ${errors.address ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 focus:ring-ocean'}`}
                    placeholder="Enter your complete delivery address"
                  />
                  {errors.address && <p className="mt-1 text-xs text-red-500">{errors.address}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                      <MapPin size={16} className="text-ocean" />
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:border-transparent ${errors.city ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 focus:ring-ocean'}`}
                      placeholder="City"
                    />
                    {errors.city && <p className="mt-1 text-xs text-red-500">{errors.city}</p>}
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                      <MapPin size={16} className="text-ocean" />
                      PIN Code *
                    </label>
                    <input
                      type="text"
                      name="pinCode"
                      value={formData.pinCode}
                      onChange={handleChange}
                      maxLength={6}
                      className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:border-transparent ${errors.pinCode ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 focus:ring-ocean'}`}
                      placeholder="6-digit PIN"
                    />
                    {errors.pinCode && <p className="mt-1 text-xs text-red-500">{errors.pinCode}</p>}
                  </div>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                    <MessageCircle size={16} className="text-ocean" />
                    Order Notes (Optional)
                  </label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    rows="2"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-ocean focus:border-transparent resize-none"
                    placeholder="Any special instructions for your order"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-4">Order Summary</h3>
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200">
                <div className="space-y-3 mb-4">
                  {cartItems.map((item, index) => (
                    <div key={`${item.id}-${item.size}-${index}`} className="flex justify-between items-start">
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">{item.name}</p>
                        <p className="text-sm text-gray-600">{item.size} • {item.quantity} Kg</p>
                      </div>
                      <p className="font-bold text-ocean">{formatINR(item.total)}</p>
                    </div>
                  ))}
                </div>
                <div className="border-t border-slate-200 pt-4 space-y-2">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Subtotal</span>
                    <span>{formatINR(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Packaging</span>
                    <span>{formatINR(packagingCharge)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Delivery</span>
                    <span>{formatINR(deliveryCharge)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Bulk Discount</span>
                      <span>-{formatINR(discount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center pt-2 border-t border-slate-200">
                    <span className="text-lg font-bold text-gray-900">Grand Total</span>
                    <span className="text-xl font-bold text-ocean">{formatINR(total)}</span>
                  </div>
                </div>
                {discount > 0 && (
                  <p className="mt-3 text-xs text-green-600 text-center">
                    🎉 You're saving {formatINR(discount)} by ordering in bulk!
                  </p>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 text-white px-6 py-4 rounded-full font-bold text-lg transition flex items-center justify-center gap-2 shadow-lg"
            >
              <MessageCircle size={20} />
              Send Order via WhatsApp
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
