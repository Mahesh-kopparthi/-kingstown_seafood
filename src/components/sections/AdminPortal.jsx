import React, { useState } from 'react'
import { Lock, PencilLine, PlusCircle, ShieldCheck, Trash2 } from 'lucide-react'

const blankProduct = {
  title: '',
  description: '',
  price: '',
  unit: 'per kg',
  image: '/images/seafood-prawns.svg',
  stock: 'In Stock',
  offer: '',
  category: 'Fresh Seafood',
}

export default function AdminPortal({
  products,
  isAdmin,
  onLogin,
  onLogout,
  onSaveProduct,
  onDeleteProduct,
}) {
  const [loginPassword, setLoginPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [formData, setFormData] = useState(blankProduct)
  const [editingId, setEditingId] = useState(null)

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0]
    if (!file) {
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      setFormData((currentData) => ({ ...currentData, image: reader.result || '' }))
    }
    reader.readAsDataURL(file)
  }

  const handleLogin = (event) => {
    event.preventDefault()
    const success = onLogin(loginPassword)
    if (!success) {
      setLoginError('Incorrect password. Please try again.')
      return
    }

    setLoginPassword('')
    setLoginError('')
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!formData.title || !formData.description || !formData.price) {
      setLoginError('Please fill in the title, description, and price fields.')
      return
    }

    onSaveProduct(formData, editingId)
    setFormData(blankProduct)
    setEditingId(null)
    setLoginError('')
  }

  const handleEdit = (product) => {
    setEditingId(product.id)
    setFormData({
      title: product.title,
      description: product.description,
      price: product.price,
      unit: product.unit || 'per kg',
      image: product.image || '/images/seafood-prawns.svg',
      stock: product.stock || 'In Stock',
      offer: product.offer || '',
      category: product.category || 'Fresh Seafood',
    })
    setLoginError('')
  }

  const handleReset = () => {
    setFormData(blankProduct)
    setEditingId(null)
    setLoginError('')
  }

  return (
    <section id="admin" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-10 animate-fadeInUp">
          <div className="inline-flex items-center gap-2 bg-ocean/10 text-ocean px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <ShieldCheck size={16} />
            Live admin control panel
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Admin Portal</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Update prices, availability, and offers instantly. Your public storefront reflects changes immediately.
          </p>
        </div>

        {!isAdmin ? (
          <div className="max-w-xl mx-auto bg-white rounded-3xl shadow-lg p-8 border border-slate-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-ocean/10 flex items-center justify-center">
                <Lock className="text-ocean" size={22} />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800">Secure admin access</h3>
                <p className="text-sm text-gray-500">Use the password to unlock the product manager.</p>
              </div>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="password"
                value={loginPassword}
                onChange={(event) => setLoginPassword(event.target.value)}
                placeholder="Enter admin password"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-ocean"
              />
              <button
                type="submit"
                className="w-full rounded-xl bg-ocean hover:bg-aqua text-white px-4 py-3 font-semibold transition"
              >
                Unlock portal
              </button>
            </form>

            {loginError && <p className="mt-4 text-sm text-red-600">{loginError}</p>}
            <p className="mt-4 text-sm text-gray-500">
              The current setup uses a browser-based admin password for this static deployment. For a fully secure multi-user setup, a backend database would be the next step.
            </p>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="bg-white rounded-3xl shadow-lg p-6 border border-slate-100">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-semibold text-gray-800">
                    {editingId ? 'Edit product' : 'Add a new product'}
                  </h3>
                  <p className="text-sm text-gray-500">Changes appear instantly on the website.</p>
                </div>
                <button
                  type="button"
                  onClick={onLogout}
                  className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-gray-600 transition hover:border-ocean hover:text-ocean"
                >
                  Logout
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <input
                    value={formData.title}
                    onChange={(event) => setFormData({ ...formData, title: event.target.value })}
                    placeholder="Product name"
                    className="rounded-xl border border-slate-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-ocean"
                  />
                  <input
                    value={formData.price}
                    onChange={(event) => setFormData({ ...formData, price: event.target.value })}
                    placeholder="Price (e.g. $12-18/lb)"
                    className="rounded-xl border border-slate-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-ocean"
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <input
                    value={formData.unit}
                    onChange={(event) => setFormData({ ...formData, unit: event.target.value })}
                    placeholder="Unit"
                    className="rounded-xl border border-slate-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-ocean"
                  />
                  <div className="space-y-2">
                    <input
                      value={formData.image}
                      onChange={(event) => setFormData({ ...formData, image: event.target.value })}
                      placeholder="Image URL or /images/file.jpg"
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-ocean"
                    />
                    <label className="block text-sm text-gray-500">
                      <span className="font-medium text-gray-700">Upload a photo:</span>{' '}
                      <input type="file" accept="image/*" onChange={handleImageUpload} className="mt-1 block text-sm" />
                    </label>
                  </div>
                </div>

                <p className="text-sm text-gray-500">
                  Tip: place your product photos in the public/images folder and use paths like /images/fish.jpg.
                </p>

                <textarea
                  value={formData.description}
                  onChange={(event) => setFormData({ ...formData, description: event.target.value })}
                  placeholder="Product description"
                  rows="3"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-ocean"
                />

                <div className="grid gap-4 md:grid-cols-2">
                  <input
                    value={formData.offer}
                    onChange={(event) => setFormData({ ...formData, offer: event.target.value })}
                    placeholder="Offer or note"
                    className="rounded-xl border border-slate-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-ocean"
                  />
                  <select
                    value={formData.stock}
                    onChange={(event) => setFormData({ ...formData, stock: event.target.value })}
                    className="rounded-xl border border-slate-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-ocean"
                  >
                    <option>In Stock</option>
                    <option>Limited Stock</option>
                    <option>Out of Stock</option>
                  </select>
                </div>

                <input
                  value={formData.category}
                  onChange={(event) => setFormData({ ...formData, category: event.target.value })}
                  placeholder="Category"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-ocean"
                />

                <div className="flex flex-wrap gap-3">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-full bg-ocean hover:bg-aqua text-white px-5 py-3 font-semibold transition"
                  >
                    <PlusCircle size={18} />
                    {editingId ? 'Save changes' : 'Add product'}
                  </button>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="rounded-full border border-slate-200 px-5 py-3 font-semibold text-gray-600 transition hover:border-ocean hover:text-ocean"
                  >
                    Clear form
                  </button>
                </div>
              </form>
            </div>

            <div className="bg-white rounded-3xl shadow-lg p-6 border border-slate-100">
              <div className="flex items-center gap-2 mb-4">
                <PencilLine className="text-ocean" size={18} />
                <h3 className="text-2xl font-semibold text-gray-800">Live catalog</h3>
              </div>
              <p className="text-sm text-gray-500 mb-6">
                Products are saved in this browser so the public page updates instantly.
              </p>

              <div className="space-y-3">
                {products.map((product) => (
                  <div key={product.id} className="rounded-2xl border border-slate-200 p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-lg">{product.image}</span>
                          <h4 className="font-semibold text-gray-800">{product.title}</h4>
                        </div>
                        <p className="text-sm text-gray-600">{product.description}</p>
                        <div className="mt-2 flex flex-wrap gap-2 text-sm">
                          <span className="rounded-full bg-ocean/10 text-ocean px-3 py-1 font-medium">{product.price}</span>
                          <span className="rounded-full bg-slate-100 text-gray-600 px-3 py-1">{product.stock}</span>
                          {product.offer ? (
                            <span className="rounded-full bg-amber-100 text-amber-700 px-3 py-1">{product.offer}</span>
                          ) : null}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => handleEdit(product)}
                          className="rounded-full border border-slate-200 p-2 text-gray-600 transition hover:border-ocean hover:text-ocean"
                          aria-label={`Edit ${product.title}`}
                        >
                          <PencilLine size={16} />
                        </button>
                        <button
                          type="button"
                          onClick={() => onDeleteProduct(product.id)}
                          className="rounded-full border border-slate-200 p-2 text-gray-600 transition hover:border-red-500 hover:text-red-500"
                          aria-label={`Delete ${product.title}`}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
