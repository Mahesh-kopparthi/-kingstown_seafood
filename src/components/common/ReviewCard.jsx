import React from 'react'
import { Star } from 'lucide-react'

export default function ReviewCard({ name, role, content, rating }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition">
      {/* Rating */}
      <div className="flex gap-1 mb-3">
        {Array.from({ length: rating }).map((_, i) => (
          <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
        ))}
      </div>

      {/* Content */}
      <p className="text-gray-700 mb-4 text-sm italic">"{content}"</p>

      {/* Author */}
      <div>
        <p className="font-semibold text-gray-800">{name}</p>
        <p className="text-xs text-aqua">{role}</p>
      </div>
    </div>
  )
}
