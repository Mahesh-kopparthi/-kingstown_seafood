import React, { useState } from 'react'
import { X, ZoomIn } from 'lucide-react'
import { asset } from '../../utils/assets'

const images = [
  { src: asset('/images/prawns-vanamei.jpg'),      title: 'Vannamei Prawns',     tag: 'Farm Sourced' },
  { src: asset('/images/tiger-prawns.jpg'),         title: 'Tiger Prawns',         tag: 'Farm Sourced' },
  { src: asset('/images/dry-prawns.jpg'),           title: 'Dry Prawns',           tag: 'Quality Dried' },
  { src: asset('/images/The-Rohu-fish.jpg'),        title: 'Rohu Fish',            tag: 'Freshwater Farm' },
  { src: asset('/images/murrel-koramenu-fish.jpg'), title: 'Murrel (Korameenu)',   tag: 'Farm Fresh' },
  { src: asset('/images/Thullu-fish.jpg'),          title: 'Fresh Fish Selection', tag: 'Farm Fresh' },
]

export default function Gallery() {
  const [lightbox, setLightbox] = useState(null)

  return (
    <section id="gallery" className="relative overflow-hidden" style={{ background: '#0B2638' }}>
      {/* Depth glow */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full blur-3xl" style={{ background: 'rgba(8,127,140,0.1)' }} />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full blur-3xl" style={{ background: 'rgba(32,184,197,0.06)' }} />
      </div>
      {/* Top rule — teal only */}
      <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, transparent, rgba(8,127,140,0.45), transparent)' }} aria-hidden="true" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">

        {/* Header */}
        <div className="text-center mb-14">
          <span
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold mb-5"
            style={{ background: 'rgba(8,127,140,0.15)', color: '#20B8C5', border: '1px solid rgba(32,184,197,0.25)' }}
          >
            <ZoomIn size={13} />
            Fresh Catches
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight">
            Our Seafood <span className="gradient-text-teal">Gallery</span>
          </h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color: 'rgba(221,243,239,0.55)' }}>
            A look at the fresh farm-sourced prawns and fish we offer daily.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {images.map((item, idx) => (
            <button
              key={item.src}
              type="button"
              onClick={() => setLightbox(idx)}
              className="group relative overflow-hidden rounded-2xl aspect-[4/3] cursor-zoom-in text-left focus:outline-none transition-all duration-300 hover:-translate-y-1"
              style={{ background: '#0D3045', border: '1.5px solid rgba(8,127,140,0.15)' }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(32,184,197,0.4)')}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(8,127,140,0.15)')}
              aria-label={`View ${item.title}`}
            >
              <img
                src={item.src}
                alt={item.title}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                loading="lazy"
              />
              {/* Persistent base gradient */}
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(to top, rgba(11,38,56,0.82) 0%, transparent 50%)' }}
              />
              {/* Title — always visible */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-white font-bold text-base">{item.title}</p>
                <span
                  className="inline-flex items-center mt-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold"
                  style={{ background: 'rgba(32,184,197,0.2)', color: '#DDF3EF', border: '1px solid rgba(32,184,197,0.25)' }}
                >
                  {item.tag}
                </span>
              </div>
              {/* Zoom icon */}
              <div
                className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"
                style={{ background: 'rgba(8,127,140,0.5)', border: '1px solid rgba(32,184,197,0.3)' }}
              >
                <ZoomIn size={15} className="text-white" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(5,14,22,0.96)' }}
          onClick={() => setLightbox(null)}
          role="dialog" aria-modal="true"
          aria-label={`Image viewer: ${images[lightbox].title}`}
        >
          <div className="relative max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={images[lightbox].src}
              alt={images[lightbox].title}
              className="w-full rounded-2xl max-h-[80vh] object-contain"
              style={{ border: '1px solid rgba(32,184,197,0.15)' }}
            />
            <div
              className="absolute bottom-0 left-0 right-0 p-5 rounded-b-2xl"
              style={{ background: 'linear-gradient(to top, rgba(5,14,22,0.8), transparent)' }}
            >
              <p className="text-white font-bold text-lg">{images[lightbox].title}</p>
              <p className="text-sm font-medium mt-0.5" style={{ color: '#20B8C5' }}>{images[lightbox].tag}</p>
            </div>
            <button type="button" onClick={() => setLightbox(null)}
              className="absolute top-3 right-3 w-10 h-10 flex items-center justify-center rounded-full text-white transition"
              style={{ background: 'rgba(8,127,140,0.4)', border: '1px solid rgba(32,184,197,0.25)' }}
              aria-label="Close">
              <X size={18} />
            </button>
            {lightbox > 0 && (
              <button type="button"
                onClick={(e) => { e.stopPropagation(); setLightbox(lightbox - 1) }}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full text-white font-bold text-xl transition"
                style={{ background: 'rgba(8,127,140,0.4)', border: '1px solid rgba(32,184,197,0.25)' }}
                aria-label="Previous">‹</button>
            )}
            {lightbox < images.length - 1 && (
              <button type="button"
                onClick={(e) => { e.stopPropagation(); setLightbox(lightbox + 1) }}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full text-white font-bold text-xl transition"
                style={{ background: 'rgba(8,127,140,0.4)', border: '1px solid rgba(32,184,197,0.25)' }}
                aria-label="Next">›</button>
            )}
          </div>
        </div>
      )}
    </section>
  )
}
