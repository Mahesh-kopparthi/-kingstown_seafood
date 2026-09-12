import React from 'react'
import { Leaf, ShieldCheck, Package, Truck, Users, BadgeCheck } from 'lucide-react'

const features = [
  {
    icon: <Leaf size={24} />,
    title: 'Farm Sourced',
    desc: 'Our seafood comes from trusted aquaculture farms and selected suppliers — keeping the supply chain short and quality high.',
    primary: true,
  },
  {
    icon: <ShieldCheck size={24} />,
    title: 'Quality Checked',
    desc: 'Every batch is reviewed for freshness, size consistency, and condition before it reaches you.',
    primary: false,
  },
  {
    icon: <Package size={24} />,
    title: 'Hygienic Handling',
    desc: 'Products are cleaned and packed in food-safe conditions to preserve their natural freshness.',
    primary: false,
  },
  {
    icon: <Truck size={24} />,
    title: 'Fresh Delivery',
    desc: 'We dispatch with packaging designed to keep your seafood in the best condition during transit.',
    primary: false,
  },
  {
    icon: <Users size={24} />,
    title: 'Direct Sourcing',
    desc: 'By working directly with farms we reduce unnecessary steps that compromise freshness.',
    primary: false,
  },
  {
    icon: <BadgeCheck size={24} />,
    title: 'Retail & Bulk',
    desc: 'Whether household orders or large-scale supply for events and restaurants, we can help.',
    primary: false,
  },
]

export default function WhyChooseUs() {
  return (
    <section id="why-us" className="relative overflow-hidden" style={{ background: '#0B2638' }}>
      {/* Soft depth glows — teal only, no orange */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/4 left-1/5 w-80 h-80 rounded-full blur-3xl" style={{ background: 'rgba(8,127,140,0.1)' }} />
        <div className="absolute bottom-1/4 right-1/5 w-72 h-72 rounded-full blur-3xl" style={{ background: 'rgba(32,184,197,0.06)' }} />
      </div>
      <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, transparent, rgba(8,127,140,0.4), transparent)' }} aria-hidden="true" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">

        {/* Header */}
        <div className="text-center mb-16">
          <span
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold mb-5"
            style={{ background: 'rgba(8,127,140,0.15)', color: '#20B8C5', border: '1px solid rgba(32,184,197,0.25)' }}
          >
            <BadgeCheck size={13} />
            Why Kingstown
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-5 leading-tight">
            What Makes Us <span className="gradient-text-teal block mt-1">Different</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: 'rgba(221,243,239,0.55)' }}>
            We are a seafood supplier focused on connecting you with fresh, farm-sourced
            prawns and fish you can trust.
          </p>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f) => (
            <div
              key={f.title}
              className="group rounded-2xl p-6 sm:p-7 transition-all duration-300 hover:-translate-y-1"
              style={{
                background: f.primary ? '#087F8C' : 'rgba(13,48,69,0.7)',
                border: f.primary ? 'none' : '1.5px solid rgba(8,127,140,0.2)',
              }}
              onMouseEnter={(e) => { if (!f.primary) e.currentTarget.style.borderColor = 'rgba(32,184,197,0.4)' }}
              onMouseLeave={(e) => { if (!f.primary) e.currentTarget.style.borderColor = 'rgba(8,127,140,0.2)' }}
            >
              <div
                className="inline-flex h-13 w-13 items-center justify-center rounded-xl mb-5"
                style={{
                  width: 52, height: 52,
                  background: f.primary ? 'rgba(255,255,255,0.18)' : 'rgba(8,127,140,0.2)',
                  color: f.primary ? '#DDF3EF' : '#20B8C5',
                }}
              >
                {f.icon}
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{f.title}</h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: f.primary ? 'rgba(255,255,255,0.82)' : 'rgba(221,243,239,0.5)' }}
              >
                {f.desc}
              </p>
            </div>
          ))}
        </div>

        {/* CTA — teal, not orange */}
        <div className="mt-14 text-center">
          <a
            href="#products"
            className="inline-flex items-center gap-2 px-9 py-4 rounded-full font-bold text-base text-white transition-all hover:-translate-y-0.5"
            style={{ background: '#087F8C', boxShadow: '0 6px 24px -4px rgba(8,127,140,0.5)' }}
            onMouseEnter={(e) => (e.currentTarget.style.background = '#0A9BA9')}
            onMouseLeave={(e) => (e.currentTarget.style.background = '#087F8C')}
          >
            Browse Our Seafood
          </a>
        </div>

      </div>
    </section>
  )
}
