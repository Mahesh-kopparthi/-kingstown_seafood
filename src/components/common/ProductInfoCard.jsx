import React from 'react'

export default function ProductInfoCard({ label, value }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-ocean">{label}</p>
      <p className="mt-2 text-base font-medium text-slate-700">{value}</p>
    </div>
  )
}
