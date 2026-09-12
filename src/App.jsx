import React, { useEffect, useState } from 'react'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Products from './components/sections/Products'
import Gallery from './components/sections/Gallery'
import WhyChooseUs from './components/sections/WhyChooseUs'
import Reviews from './components/sections/Reviews'
import Contact from './components/sections/Contact'
import WhatsAppButton from './components/common/WhatsAppButton'
import ProductDetailsPage from './components/sections/ProductDetailsPage'
import CartSidebar from './components/common/CartSidebar'
import CheckoutForm from './components/common/CheckoutForm'
import SplashScreen from './components/common/SplashScreen'

function App() {
  const [splashDone, setSplashDone] = useState(false)
  const [appVisible, setAppVisible] = useState(false)

  // Splash done → fade the main app in
  const handleSplashDone = () => {
    setSplashDone(true)
    setTimeout(() => setAppVisible(true), 50)
  }

  const [selectedProductId, setSelectedProductId] = useState(null)
  const [showContact, setShowContact] = useState(false)

  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('kingstownCart')
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)

  useEffect(() => {
    localStorage.setItem('kingstownCart', JSON.stringify(cartItems))
  }, [cartItems])

  const handleSelectProduct = (id) => {
    setSelectedProductId(id)
    setShowContact(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleBackToProducts = (id = null) => {
    setSelectedProductId(id)
    setShowContact(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleContactRequest = () => {
    setSelectedProductId(null)
    setShowContact(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleNavigate = (href) => {
    const sectionId = href?.replace('#', '')
    setSelectedProductId(null)
    setShowContact(false)
    setTimeout(() => {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 120)
  }

  const handleAddToCart = ({ id, name, size, quantity, unitPrice }) => {
    const total = unitPrice * quantity
    setCartItems((prev) => {
      const idx = prev.findIndex((item) => item.id === id && item.size === size)
      if (idx >= 0) {
        const updated = [...prev]
        updated[idx] = {
          ...updated[idx],
          quantity: updated[idx].quantity + quantity,
          total: updated[idx].total + total,
        }
        return updated
      }
      return [...prev, { id, name, size, quantity, unitPrice, total }]
    })
  }

  const handleRemoveFromCart = (index) => setCartItems((prev) => prev.filter((_, i) => i !== index))

  const handleUpdateQuantity = (index, qty) => {
    if (qty < 1) return
    setCartItems((prev) => {
      const updated = [...prev]
      updated[index] = { ...updated[index], quantity: qty, total: updated[index].unitPrice * qty }
      return updated
    })
  }

  const handleClearCart = () => setCartItems([])

  useEffect(() => {
    if (!showContact) return
    const t = window.setTimeout(() => {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 120)
    return () => window.clearTimeout(t)
  }, [showContact])

  return (
    <>
      {/* Splash — unmounted after done to free memory */}
      {!splashDone && <SplashScreen onDone={handleSplashDone} />}

      {/* Main app — fades in when splash exits */}
      <div
        className={`min-h-screen transition-opacity duration-700 ${
          appVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <Header
          onNavigate={handleNavigate}
          cartItems={cartItems}
          onCartToggle={() => setIsCartOpen((o) => !o)}
        />

        {selectedProductId ? (
          <ProductDetailsPage
            productId={selectedProductId}
            onBack={handleBackToProducts}
            onContactRequest={handleContactRequest}
            onAddToCart={handleAddToCart}
          />
        ) : (
          <>
            <Hero />
            <About />
            <Products onSelectProduct={handleSelectProduct} />
            <Gallery />
            <WhyChooseUs />
            <Reviews />
            <Contact />
          </>
        )}

        <Footer />
        <WhatsAppButton />

        <CartSidebar
          cartItems={cartItems}
          onRemoveItem={handleRemoveFromCart}
          onUpdateQuantity={handleUpdateQuantity}
          onClearCart={handleClearCart}
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          onCheckout={() => {
            setIsCartOpen(false)
            setIsCheckoutOpen(true)
          }}
        />

        {isCheckoutOpen && (
          <CheckoutForm
            cartItems={cartItems}
            onClose={() => setIsCheckoutOpen(false)}
            onClearCart={handleClearCart}
          />
        )}
      </div>
    </>
  )
}

export default App
