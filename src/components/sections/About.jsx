import React from 'react'
import { Sparkles, Shield, Award, Heart } from 'lucide-react'

export default function About() {
  const values = [
    {
      icon: <Sparkles size={40} className="text-aqua" />,
      title: 'Freshness',
      description: 'Daily catch delivered fresh to ensure maximum quality and taste in every product.',
    },
    {
      icon: <Award size={40} className="text-aqua" />,
      title: 'Quality',
      description: 'Premium grade seafood sourced from trusted suppliers with rigorous quality checks.',
    },
    {
      icon: <Shield size={40} className="text-aqua" />,
      title: 'Hygiene',
      description: 'Certified hygienic handling and storage standards to ensure food safety.',
    },
    {
      icon: <Heart size={40} className="text-aqua" />,
      title: 'Trust',
      description: 'Building lasting relationships through transparency and exceptional service.',
    },
  ]

  return (
    <section id="about" className="py-20 bg-sand">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fadeInUp">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">About Us</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            We are committed to delivering the finest fresh seafood with exceptional quality and service.
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, idx) => (
            <div
              key={idx}
              className="bg-white p-8 rounded-lg shadow-md card-hover border border-gray-100 text-center"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="flex justify-center mb-4">{value.icon}</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">{value.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>

        {/* Bottom Text */}
        <div className="mt-16 text-center">
          <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
            With over a decade of experience in the seafood industry, Kings Town Sea Food has established itself 
            as a trusted name for quality and reliability. We work directly with fishermen and suppliers to ensure 
            every product meets our high standards.
          </p>
        </div>
      </div>
    </section>
  )
}
