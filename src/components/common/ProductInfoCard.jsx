import React from 'react'

export default function ProductInfoCard({ label, value }) {
  return (
    <div
      className="rounded-xl p-3 sm:p-4 transition-all hover:-translate-y-0.5"
      style={{
        background: '#FAF7F0',
        border: '1.5px solid #EDE3D2',
        boxShadow: '0 1px 8px -3px rgba(23,35,43,0.07)',
      }}
    >
      <p className="text-[11px] font-black uppercase tracking-[0.18em] mb-1.5" style={{ color: '#087F8C' }}>
        {label}
      </p>
      <p className="text-sm font-medium" style={{ color: '#17232B' }}>{value}</p>
    </div>
  )
}
