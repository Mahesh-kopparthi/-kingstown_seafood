import React from 'react'
import { Star, Quote } from 'lucide-react'

const reviews = [
  { name: 'Ravi Kumar',   role: 'Restaurant Owner', rating: 5, content: 'The freshness is consistent and the sizing is accurate. Our kitchen relies on them for prawn dishes now.' },
  { name: 'Priya Sharma', role: 'Home Cook',         rating: 5, content: 'Ordered Vannamei prawns twice now. Both times the product arrived fresh and well-packed.' },
  { name: 'Suresh Reddy', role: 'Caterer',            rating: 5, content: 'Good quality Tiger Prawns at a fair price. The bulk ordering process was smooth.' },
  { name: 'Anitha Rao',   role: 'Home Cook',          rating: 5, content: 'The dry prawns are excellent — rich flavor and very clean product. Will reorder.' },
  { name: 'Venkat Naidu', role: 'Wholesale Buyer',    rating: 5, content: 'Reliable supply and consistent quality across batches. That matters most for our business.' },
  { name: 'Lakshmi Devi', role: 'Family Customer',    rating: 5, content: 'Fresh Rohu fish, great for curry. The family loved it. Easy to order and fast delivery.' },
]

export default function Reviews() {
  return (
    <section id="reviews" className="relative overflow-hidden" style={{ background: '#EDE3D2' }}>
      {/* Very subtle top teal rule */}
      <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, transparent, rgba(8,127,140,0.25), transparent)' }} aria-hidden="true" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">

        {/* Header */}
        <div className="text-center mb-14">
          <span
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold mb-5"
            style={{ background: 'rgba(8,127,140,0.1)', color: '#087F8C', border: '1px solid rgba(8,127,140,0.2)' }}
          >
            <Star size={13} className="fill-amber-500 text-amber-500" />
            Customer Feedback
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 leading-tight" style={{ color: '#17232B' }}>
            What Customers <span className="gradient-text-teal">Say</span>
          </h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color: '#4A5E6A' }}>
            Feedback from customers who have ordered directly from us.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {reviews.map((r) => (
            <div
              key={r.name}
              className="flex flex-col rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1"
              style={{ background: '#fff', border: '1.5px solid #D4C4A8', boxShadow: '0 2px 14px -4px rgba(23,35,43,0.08)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(8,127,140,0.3)'
                e.currentTarget.style.boxShadow = '0 12px 40px -8px rgba(8,127,140,0.14)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#D4C4A8'
                e.currentTarget.style.boxShadow = '0 2px 14px -4px rgba(23,35,43,0.08)'
              }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex gap-0.5" aria-label={`${r.rating} out of 5 stars`}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={15} className={i < r.rating ? 'fill-amber-400 text-amber-400' : 'fill-slate-200 text-slate-200'} />
                  ))}
                </div>
                <Quote size={18} style={{ color: 'rgba(8,127,140,0.18)', flexShrink: 0 }} />
              </div>

              <p className="text-sm leading-relaxed italic flex-1 mb-5" style={{ color: '#4A5E6A' }}>
                "{r.content}"
              </p>

              <div className="flex items-center gap-3 pt-4" style={{ borderTop: '1px solid #EDE3D2' }}>
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-black flex-shrink-0 shadow"
                  style={{ background: '#087F8C' }}
                >
                  {r.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-bold" style={{ color: '#17232B' }}>{r.name}</p>
                  <p className="text-xs font-semibold" style={{ color: '#087F8C' }}>{r.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
