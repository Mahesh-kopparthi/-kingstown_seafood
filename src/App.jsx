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
import LoadingSpinner from './components/common/LoadingSpinner'

function App() {
  const [productData, setProductData] = useState(null)
  const [selectedProductId, setSelectedProductId] = useState(null)
  const [showContact, setShowContact] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true)
        const response = await fetch('/data/products.json')
        if (!response.ok) {
          throw new Error('Unable to load product data')
        }
        const data = await response.json()
        setProductData(data)
        setError(null)
      } catch (error) {
        console.error(error)
        setError('Failed to load product data. Please refresh the page.')
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [])

  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('kingstownCart')
    return savedCart ? JSON.parse(savedCart) : []
  })

  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)

  useEffect(() => {
    localStorage.setItem('kingstownCart', JSON.stringify(cartItems))
  }, [cartItems])

  const handleSelectProduct = (productId) => {
    setSelectedProductId(productId)
    setShowContact(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleBackToProducts = (productId = null) => {
    if (productId) {
      setSelectedProductId(productId)
      setShowContact(false)
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    setSelectedProductId(null)
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
      const existingIndex = prev.findIndex((item) => item.id === id && item.size === size)
      if (existingIndex >= 0) {
        const updated = [...prev]
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
          total: updated[existingIndex].total + total,
        }
        return updated
      }
      return [...prev, { id, name, size, quantity, unitPrice, total }]
    })
  }

  const handleRemoveFromCart = (index) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index))
  }

  const handleUpdateQuantity = (index, newQuantity) => {
    if (newQuantity < 1) return
    setCartItems((prev) => {
      const updated = [...prev]
      updated[index] = {
        ...updated[index],
        quantity: newQuantity,
        total: updated[index].unitPrice * newQuantity,
      }
      return updated
    })
  }

  const handleClearCart = () => {
    setCartItems([])
  }

  useEffect(() => {
    if (!showContact) return

    const timer = window.setTimeout(() => {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 120)

    return () => window.clearTimeout(timer)
  }, [showContact])

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#f7fbff] flex items-center justify-center">
        <div className="text-center p-8">
          <p className="text-red-600 text-lg mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-ocean hover:bg-aqua text-white px-6 py-3 rounded-full font-semibold transition"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f7fbff]">
      <Header onNavigate={handleNavigate} cartItems={cartItems} onCartToggle={() => setIsCartOpen(!isCartOpen)} />
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
          <Products productData={productData} onSelectProduct={handleSelectProduct} />
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
  )
}

export default App
