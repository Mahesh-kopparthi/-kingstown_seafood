import React from 'react'
import { Leaf, ShieldCheck, Package, Truck } from 'lucide-react'

const journey = [
  { step: '01', icon: <Leaf size={22} />,        title: 'Trusted Farms',     desc: 'Sourced from trusted aquaculture farms and selected suppliers in the Bhimavaram region.' },
  { step: '02', icon: <ShieldCheck size={22} />,  title: 'Quality Selection', desc: 'Each batch checked for freshness, size consistency, and condition before moving forward.' },
  { step: '03', icon: <Package size={22} />,      title: 'Hygienic Handling', desc: 'Cleaned and packed in food-safe conditions to preserve freshness and quality.' },
  { step: '04', icon: <Truck size={22} />,        title: 'Delivered Fresh',   desc: 'Packed carefully and dispatched fresh so you receive seafood at its best.' },
]

const values = [
  { title: 'Farm Sourced',        desc: 'Our prawns and fish come from trusted aquaculture farms and local suppliers — not mystery middlemen.' },
  { title: 'Freshness First',     desc: 'We process and dispatch with freshness as the priority — not convenience or cost-cutting.' },
  { title: 'Honest Quality',      desc: "We only offer what we can deliver. If a product is unavailable or below standard, we don't list it." },
  { title: 'Direct Relationship', desc: 'Working directly with farms keeps the supply chain short and quality high.' },
]

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden" style={{ background: '#FAF7F0' }}>
      {/* Subtle seafoam texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{ background: 'radial-gradient(ellipse at 15% 50%, rgba(221,243,239,0.55) 0%, transparent 50%), radial-gradient(ellipse at 85% 20%, rgba(8,127,140,0.06) 0%, transparent 45%)' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">

        {/* Section header */}
        <div className="text-center mb-20">
          <span
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold mb-5"
            style={{ background: 'rgba(8,127,140,0.1)', color: '#087F8C', border: '1px solid rgba(8,127,140,0.18)' }}
          >
            <Leaf size={13} />
            Farm to Table
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold mb-5 leading-tight" style={{ color: '#17232B' }}>
            Where Your Seafood
            <span className="block gradient-text-teal mt-1">Comes From</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: '#4A5E6A' }}>
            Kingstown Sea Food connects you with fresh seafood sourced from trusted aquaculture
            farms and selected suppliers in Bhimavaram, Andhra Pradesh.
          </p>
        </div>

        {/* Journey steps */}
        <div className="relative mb-20">
          {/* Connector line */}
          <div
            className="hidden lg:block absolute h-px pointer-events-none"
            aria-hidden="true"
            style={{ top: '3.5rem', left: '14%', right: '14%', background: 'linear-gradient(90deg, transparent, rgba(8,127,140,0.25) 25%, rgba(8,127,140,0.35) 75%, transparent)' }}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {journey.map((item, i) => (
              <div key={item.step} className="flex flex-col items-center text-center group">
                <div
                  className="relative z-10 w-28 h-28 rounded-3xl flex flex-col items-center justify-center mb-5 shadow-md transition-all duration-300 group-hover:-translate-y-1.5"
                  style={{
                    background: i % 2 === 0 ? '#DDF3EF' : '#FAF7F0',
                    border: '2px solid',
                    borderColor: i % 2 === 0 ? 'rgba(8,127,140,0.3)' : 'rgba(8,127,140,0.15)',
                    boxShadow: '0 6px 24px -6px rgba(8,127,140,0.18)',
                  }}
                >
                  <span
                    className="text-[10px] font-black tracking-widest uppercase mb-1"
                    style={{ color: '#087F8C' }}
                  >
                    {item.step}
                  </span>
                  <span style={{ color: '#087F8C' }}>{item.icon}</span>
                </div>
                <h3 className="text-base font-bold mb-2" style={{ color: '#17232B' }}>{item.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#5A6E7A' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Values grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-14">
          {values.map((v, i) => (
            <div
              key={v.title}
              className="rounded-2xl p-6 sm:p-7 transition-all hover:-translate-y-0.5"
              style={{
                background: i % 2 === 0 ? '#DDF3EF' : '#fff',
                border: '1.5px solid',
                borderColor: i % 2 === 0 ? 'rgba(8,127,140,0.2)' : '#EDE3D2',
              }}
            >
              <div className="flex items-center gap-2.5 mb-2">
                <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: '#087F8C' }} />
                <h3 className="text-base font-bold" style={{ color: '#17232B' }}>{v.title}</h3>
              </div>
              <p className="text-sm leading-relaxed pl-5" style={{ color: '#5A6E7A' }}>{v.desc}</p>
            </div>
          ))}
        </div>

        {/* Location banner */}
        <div
          className="rounded-3xl px-8 py-9 text-center"
          style={{ background: '#0B2638' }}
        >
          <p className="text-xl sm:text-2xl font-bold text-white mb-2">
            Based in Bhimavaram, Andhra Pradesh
          </p>
          <p className="text-base max-w-xl mx-auto leading-relaxed" style={{ color: 'rgba(221,243,239,0.7)' }}>
            One of India's most established seafood regions — home to high-quality aquaculture
            farms and a long tradition of prawn and fish production.
          </p>
        </div>

      </div>
    </section>
  )
}
