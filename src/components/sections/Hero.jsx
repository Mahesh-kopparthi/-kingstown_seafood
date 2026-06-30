import React from 'react'

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      <video
        className="absolute inset-0 h-full w-full object-cover opacity-80"
        autoPlay
        muted
        loop
        playsInline
        src="/images/bg.mp4"
      />
      <div className="absolute inset-0 bg-slate-950/50"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/30 via-slate-950/10 to-slate-950/70"></div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-8 text-center text-white animate-fadeInUp">
        {/* Logo Emoji */}
        <div className="text-8xl mb-6 animate-float">🌊</div>

        {/* Main Title */}
        <h1 className="text-5xl md:text-7xl font-bold mb-4 leading-tight">
          Kings Town
          <br />
          <span className="text-teal">Sea Food</span>
        </h1>

        {/* Tagline */}
        <p className="text-xl md:text-2xl text-slate-100 mb-6 font-light tracking-wide">
          Fresh From Farm To Your Plate
        </p>

        {/* Description */}
        <p className="text-base md:text-lg text-slate-200 mb-12 max-w-2xl mx-auto leading-8">
          Experience premium seafood delivered to your doorstep with the highest standards
          of quality, hygiene, and trust.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <a
            href="#products"
            className="bg-white text-ocean hover:bg-slate-100 px-8 py-4 rounded-full font-bold text-lg shadow-2xl transition transform hover:-translate-y-0.5 hover:scale-105"
          >
            Explore Products
          </a>
          <a
            href="#contact"
            className="bg-teal text-slate-950 hover:bg-cyan-300 px-8 py-4 rounded-full font-bold text-lg shadow-2xl transition transform hover:-translate-y-0.5 hover:scale-105"
          >
            Contact Us
          </a>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-white rounded-full animate-bounce"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
