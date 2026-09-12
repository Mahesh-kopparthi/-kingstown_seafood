import React from 'react'

export default function FeatureCard({ icon, title, description }) {
  return (
    <div className="group bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 hover:shadow-lg hover:border-ocean/25 hover:-translate-y-1 transition-all duration-300">
      <div className="text-4xl mb-4" aria-hidden="true">{icon}</div>
      <h3 className="text-lg font-bold text-slate-900 mb-2">{title}</h3>
      <p className="text-slate-500 text-sm leading-relaxed">{description}</p>
    </div>
  )
}
