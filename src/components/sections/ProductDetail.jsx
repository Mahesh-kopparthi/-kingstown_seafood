import React from 'react'
import { ArrowLeft, Fish } from 'lucide-react'

const detailContent = {
  'fresh-fish': {
    title: 'Fresh Fish',
    image: '/images/seafood-fish.svg',
    intro: 'Fresh fish delivered with care, perfect for homes, restaurants, and special occasions.',
    highlights: ['Daily fresh catch', 'Clean and premium quality', 'Suitable for grilling, frying, and curries'],
    icon: Fish,
  },
  prawns: {
    title: 'Prawns',
    image: '/images/seafood-prawns.svg',
    intro: 'Juicy prawns with a rich, satisfying texture and excellent flavor.',
    highlights: ['Freshly sourced', 'Ideal for grilling and seafood dishes', 'Popular for families and events'],
    icon: Fish,
  },
}

export default function ProductDetail({ slug, onBack }) {
  const content = detailContent[slug]

  if (!content) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 md:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Product not found</h2>
          <p className="text-gray-600">Please return to the products section and choose a valid item.</p>
        </div>
      </section>
    )
  }

  const Icon = content.icon

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <button
          type="button"
          onClick={onBack}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm transition hover:text-ocean"
        >
          <ArrowLeft size={16} />
          Back to products
        </button>

        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] rounded-3xl bg-white p-6 shadow-xl border border-slate-100">
          <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-ocean to-aqua p-4">
            <img src={content.image} alt={content.title} className="h-full w-full rounded-2xl object-cover" />
          </div>

          <div className="flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-ocean/10 px-3 py-2 text-sm font-semibold text-ocean mb-4">
              <Icon size={16} />
              {content.title}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{content.title}</h2>
            <p className="text-lg text-gray-600 mb-6">{content.intro}</p>
            <ul className="space-y-3">
              {content.highlights.map((item) => (
                <li key={item} className="flex items-start gap-3 rounded-2xl bg-slate-50 px-4 py-3 text-gray-700">
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-ocean" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <a
              href="#contact"
              className="mt-8 inline-flex w-fit items-center rounded-full bg-ocean px-6 py-3 font-semibold text-white transition hover:bg-aqua"
            >
              Contact for availability
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
