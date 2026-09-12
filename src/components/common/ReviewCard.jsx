import React from 'react'

import { Star } from 'lucide-react'



export default function ReviewCard({ name, role, content, rating }) {

  return (

    <div className="bg-gradient-to-br from-white to-slate-50 p-4 sm:p-5 md:p-6 rounded-xl shadow-md border border-slate-200 hover:shadow-lg hover:border-ocean/30 transition-all">

      {/* Rating */}

      <div className="flex gap-0.5 mb-3">

        {Array.from({ length: rating }).map((_, i) => (

          <Star key={i} size={16} className="fill-amber-400 text-amber-400" />

        ))}

      </div>



      {/* Content */}

      <p className="text-gray-700 mb-3 sm:mb-4 text-xs sm:text-sm italic leading-relaxed">"{content}"</p>



      {/* Author */}

      <div>

        <p className="text-sm sm:text-base font-semibold text-gray-800">{name}</p>

        <p className="text-xs text-ocean">{role}</p>

      </div>

    </div>

  )

}

