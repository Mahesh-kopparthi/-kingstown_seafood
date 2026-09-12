import React, { useState } from 'react'
import { ShieldCheck, Leaf, Truck, ChevronDown } from 'lucide-react'
import { asset } from '../../utils/assets'

const trust = [
  { icon: <Leaf size={14} />,        label: 'Farm Sourced' },
  { icon: <ShieldCheck size={14} />, label: 'Quality Checked' },
  { icon: <Truck size={14} />,       label: 'Fresh Delivery' },
]

export default function Hero() {
  const [videoError, setVideoError] = useState(false)

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(175deg, #0B2638 0%, #0D3045 55%, #0B2638 100%)' }}
    >
      {/* Background video */}
      {!videoError && (
        <video
          key="hero-video"
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay muted loop playsInline
          onError={() => setVideoError(true)}
          aria-hidden="true"
        >
          <source src={asset('/images/bg.mp4')} type="video/mp4" />
        </video>
      )}

      {/* Dark navy overlay — not cold blue-grey */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(175deg, rgba(11,38,56,0.87) 0%, rgba(13,48,69,0.65) 45%, rgba(11,38,56,0.92) 100%)' }}
        aria-hidden="true"
      />

      {/* Subtle teal depth glow — natural, not neon */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 60%, rgba(8,127,140,0.15) 0%, transparent 65%)' }}
        aria-hidden="true"
      />

      {/* Subtle seafoam tint at top */}
      <div
        className="absolute top-0 left-0 right-0 h-48 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, rgba(221,243,239,0.04), transparent)' }}
        aria-hidden="true"
      />

      {/* Floating bubbles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {[
          { size: 8,  left: '9%',  bottom: '18%', dur: '4.5s', delay: '0s' },
          { size: 5,  left: '21%', bottom: '32%', dur: '3.8s', delay: '1.2s' },
          { size: 12, left: '77%', bottom: '14%', dur: '5.2s', delay: '0.5s' },
          { size: 7,  left: '87%', bottom: '38%', dur: '4s',   delay: '2s' },
          { size: 4,  left: '58%', bottom: '55%', dur: '3.4s', delay: '0.9s' },
        ].map((b, i) => (
          <span
            key={i}
            className="bubble absolute"
            style={{ width: b.size, height: b.size, left: b.left, bottom: b.bottom, '--dur': b.dur, '--delay': b.delay }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-8 text-center text-white pt-20 pb-36">

        {/* Origin pill */}
        <div
          className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full text-sm font-semibold mb-10 animate-fadeInUp"
          style={{
            background: 'rgba(8,127,140,0.15)',
            border: '1px solid rgba(32,184,197,0.3)',
            color: 'rgba(255,255,255,0.88)',
          }}
        >
          <span
            className="w-2 h-2 rounded-full flex-shrink-0 animate-pulseSoft"
            style={{ background: '#20B8C5' }}
          />
          Aquaculture Farms · Bhimavaram, Andhra Pradesh
        </div>

        {/* Headline */}
        <h1 className="font-bold leading-tight mb-7 animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
          <span className="block text-5xl sm:text-6xl lg:text-7xl text-white">Fresh From</span>
          <span
            className="block text-5xl sm:text-6xl lg:text-7xl mt-1"
            style={{ color: '#20B8C5' }}
          >
            Trusted Farms
          </span>
          <span className="block text-3xl sm:text-4xl lg:text-5xl font-semibold mt-3" style={{ color: 'rgba(255,255,255,0.78)' }}>
            to Your Table
          </span>
        </h1>

        {/* Sub-headline */}
        <p
          className="text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed mb-12 animate-fadeInUp"
          style={{ color: 'rgba(255,255,255,0.65)', animationDelay: '0.2s' }}
        >
          Premium prawns and fresh fish, carefully sourced from trusted aquaculture
          farms in Bhimavaram — delivered to your door.
        </p>

        {/* CTAs */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fadeInUp"
          style={{ animationDelay: '0.3s' }}
        >
          {/* Primary CTA — teal, not blazing orange */}
          <a
            href="#products"
            className="w-full sm:w-auto inline-flex items-center justify-center px-9 py-4 rounded-full font-bold text-base sm:text-lg text-white transition-all hover:-translate-y-0.5"
            style={{
              background: '#087F8C',
              boxShadow: '0 8px 32px -6px rgba(8,127,140,0.6)',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = '#0A9BA9')}
            onMouseLeave={(e) => (e.currentTarget.style.background = '#087F8C')}
          >
            Shop Fresh Seafood
          </a>
          {/* Secondary — ghost */}
          <a
            href="#about"
            className="w-full sm:w-auto inline-flex items-center justify-center px-9 py-4 rounded-full font-semibold text-base sm:text-lg text-white transition-all hover:-translate-y-0.5"
            style={{
              background: 'rgba(255,255,255,0.07)',
              border: '1.5px solid rgba(255,255,255,0.22)',
            }}
          >
            Our Story
          </a>
        </div>

        {/* Trust badges */}
        <div
          className="flex flex-wrap items-center justify-center gap-3 animate-fadeInUp"
          style={{ animationDelay: '0.4s' }}
        >
          {trust.map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium"
              style={{
                background: 'rgba(221,243,239,0.08)',
                border: '1px solid rgba(32,184,197,0.2)',
                color: 'rgba(255,255,255,0.82)',
              }}
            >
              <span style={{ color: '#20B8C5' }}>{item.icon}</span>
              {item.label}
            </div>
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce cursor-pointer"
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
        aria-label="Scroll down"
      >
        <ChevronDown size={26} style={{ color: 'rgba(255,255,255,0.35)' }} />
      </div>
    </section>
  )
}
