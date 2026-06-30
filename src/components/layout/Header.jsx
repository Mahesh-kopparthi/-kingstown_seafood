import React, { useState } from 'react'
import { Menu, X, ShoppingCart } from 'lucide-react'

export default function Header({ onNavigate, cartItems = [], onCartToggle }) {
  const [isOpen, setIsOpen] = useState(false)

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Products', href: '#products' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Why Us', href: '#why-us' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'Contact', href: '#contact' },
    { name: 'Admin', href: '#admin' },
  ]

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/90 backdrop-blur-xl shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 py-4 md:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <button
            type="button"
            onClick={(event) => {
              event.preventDefault()
              onNavigate?.('#home')
            }}
            className="inline-flex items-center gap-3"
          >
            <div className="w-12 h-12 rounded-full overflow-hidden border border-slate-200 bg-white shadow-sm">
              <img src="/images/mainlogo.png" alt="Kingstown Sea Food" className="h-full w-full object-cover" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-ocean">Kingstown</h1>
              <p className="text-xs text-aqua font-semibold">Sea Food</p>
            </div>
          </button>
          </div>

          <div className="hidden md:flex gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(event) => {
                  if (onNavigate) {
                    event.preventDefault()
                    onNavigate(link.href)
                  }
                }}
                className="text-slate-700 hover:text-ocean transition font-medium text-sm"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <button
              type="button"
              onClick={onCartToggle}
              className="relative p-2 rounded-full hover:bg-slate-100 transition"
              aria-label="Shopping cart"
            >
              <ShoppingCart size={24} className="text-slate-700" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-ocean text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              type="button"
              onClick={(event) => {
                event.preventDefault()
                onNavigate?.('#contact')
              }}
              className="bg-gradient-to-r from-ocean to-aqua hover:from-aqua hover:to-ocean text-white px-6 py-2 rounded-full font-semibold transition text-sm shadow-lg shadow-ocean/20"
            >
              Order Now
            </button>
          </div>

          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden mt-4 pb-4 border-t pt-4 animate-slideIn">
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(event) => {
                    if (onNavigate) {
                      event.preventDefault()
                      onNavigate(link.href)
                    }
                    setIsOpen(false)
                  }}
                  className="text-slate-700 hover:text-ocean transition font-medium py-2"
                >
                  {link.name}
                </a>
              ))}
              <div className="flex items-center gap-3 mt-2">
                <button
                  type="button"
                  onClick={() => {
                    onCartToggle()
                    setIsOpen(false)
                  }}
                  className="relative p-2 rounded-full hover:bg-slate-100 transition"
                  aria-label="Shopping cart"
                >
                  <ShoppingCart size={24} className="text-slate-700" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-ocean text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </button>
                <a
                  href="#contact"
                  className="flex-1 bg-gradient-to-r from-ocean to-aqua hover:from-aqua hover:to-ocean text-white px-4 py-2 rounded-full font-semibold transition text-center shadow-lg shadow-ocean/20"
                  onClick={() => setIsOpen(false)}
                >
                  Order Now
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
