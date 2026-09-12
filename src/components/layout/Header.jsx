import React, { useState, useEffect } from 'react'
import { Menu, X, ShoppingCart } from 'lucide-react'
import { asset } from '../../utils/assets'

const navLinks = [
  { name: 'Home',     href: '#home' },
  { name: 'About',    href: '#about' },
  { name: 'Products', href: '#products' },
  { name: 'Gallery',  href: '#gallery' },
  { name: 'Why Us',   href: '#why-us' },
  { name: 'Reviews',  href: '#reviews' },
  { name: 'Contact',  href: '#contact' },
]

export default function Header({ onNavigate, cartItems = [], onCartToggle }) {
  const [isOpen,   setIsOpen]   = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 56)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNav = (e, href) => {
    e.preventDefault()
    onNavigate?.(href)
    setIsOpen(false)
  }

  return (
    <header
      className="sticky top-0 z-50 transition-all duration-300"
      style={
        scrolled
          ? {
              background: 'rgba(11,38,56,0.97)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              borderBottom: '1px solid rgba(8,127,140,0.2)',
              boxShadow: '0 4px 24px -4px rgba(0,0,0,0.35)',
            }
          : { background: 'transparent' }
      }
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-[4.5rem]">

          {/* ── Logo ── */}
          <button
            type="button"
            onClick={(e) => handleNav(e, '#home')}
            className="flex items-center gap-3 flex-shrink-0"
            aria-label="Kingstown Sea Food — homepage"
          >
            <div
              className="w-10 h-10 rounded-xl overflow-hidden flex-shrink-0 shadow-md"
              style={{ border: '2px solid rgba(32,184,197,0.3)', background: 'rgba(255,255,255,0.07)' }}
            >
              <img src={asset('/images/mainlogo.png')} alt="Kingstown Sea Food" className="h-full w-full object-cover" />
            </div>
            <div className="hidden sm:block">
              <p className="font-bold text-white leading-tight" style={{ fontSize: 15 }}>Kingstown Sea Food</p>
              <p className="text-[11px] font-medium tracking-widest uppercase" style={{ color: '#20B8C5' }}>
                Premium Seafood
              </p>
            </div>
          </button>

          {/* ── Desktop nav ── */}
          <div className="hidden md:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNav(e, link.href)}
                className="px-3.5 py-2 text-[13px] font-medium rounded-lg transition-all"
                style={{ color: 'rgba(255,255,255,0.72)' }}
                onMouseEnter={(e) => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.background = 'rgba(8,127,140,0.12)' }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.72)'; e.currentTarget.style.background = 'transparent' }}
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* ── Desktop actions ── */}
          <div className="hidden md:flex items-center gap-3">
            <button
              type="button"
              onClick={onCartToggle}
              className="relative p-2.5 rounded-xl transition"
              style={{ color: 'rgba(255,255,255,0.8)' }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(8,127,140,0.15)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
              aria-label={`Cart — ${cartCount} item${cartCount !== 1 ? 's' : ''}`}
            >
              <ShoppingCart size={21} />
              {cartCount > 0 && (
                <span
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center rounded-full text-white text-[10px] font-bold shadow"
                  style={{ background: '#E8783A' }}
                >
                  {cartCount > 9 ? '9+' : cartCount}
                </span>
              )}
            </button>
            <a
              href="#contact"
              onClick={(e) => handleNav(e, '#contact')}
              className="px-5 py-2.5 rounded-full font-bold text-[13px] text-white transition-all hover:-translate-y-0.5"
              style={{
                background: '#087F8C',
                boxShadow: '0 4px 18px -3px rgba(8,127,140,0.45)',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = '#0A9BA9')}
              onMouseLeave={(e) => (e.currentTarget.style.background = '#087F8C')}
            >
              Order Now
            </a>
          </div>

          {/* ── Mobile ── */}
          <div className="flex md:hidden items-center gap-2">
            <button
              type="button"
              onClick={onCartToggle}
              className="relative p-2 rounded-xl transition"
              style={{ color: 'rgba(255,255,255,0.8)' }}
              aria-label={`Cart (${cartCount})`}
            >
              <ShoppingCart size={21} />
              {cartCount > 0 && (
                <span
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center rounded-full text-white text-[10px] font-bold"
                  style={{ background: '#E8783A' }}
                >
                  {cartCount > 9 ? '9+' : cartCount}
                </span>
              )}
            </button>
            <button
              type="button"
              onClick={() => setIsOpen((o) => !o)}
              className="p-2 rounded-xl transition"
              style={{ color: 'rgba(255,255,255,0.8)' }}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* ── Mobile menu ── */}
        {isOpen && (
          <div
            className="md:hidden border-t py-4 animate-slideIn"
            style={{ borderColor: 'rgba(8,127,140,0.18)', background: 'rgba(11,38,56,0.98)' }}
          >
            <div className="flex flex-col gap-0.5 mb-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNav(e, link.href)}
                  className="px-4 py-3 text-sm font-medium rounded-xl transition"
                  style={{ color: 'rgba(255,255,255,0.75)' }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.background = 'rgba(8,127,140,0.12)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.75)'; e.currentTarget.style.background = 'transparent' }}
                >
                  {link.name}
                </a>
              ))}
            </div>
            <a
              href="#contact"
              onClick={(e) => handleNav(e, '#contact')}
              className="block w-full text-center px-4 py-3 rounded-full font-bold text-sm text-white"
              style={{ background: '#087F8C' }}
            >
              Order Now
            </a>
          </div>
        )}
      </nav>
    </header>
  )
}
