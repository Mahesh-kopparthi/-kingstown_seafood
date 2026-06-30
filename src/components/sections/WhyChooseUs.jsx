import React from 'react'
import FeatureCard from '../common/FeatureCard'

export default function WhyChooseUs() {
  const features = [
    {
      icon: '⚡',
      title: 'Fresh Daily Catch',
      description: 'We source fresh seafood daily to guarantee maximum freshness and quality.',
    },
    {
      icon: '✨',
      title: 'Hygienic Handling',
      description: 'Certified storage and handling procedures to ensure food safety standards.',
    },
    {
      icon: '⭐',
      title: 'Quality Guaranteed',
      description: 'Every product passes rigorous quality checks before delivery to customers.',
    },
    {
      icon: '🤝',
      title: 'Trusted Service',
      description: 'Years of reliable service with thousands of satisfied customers nationwide.',
    },
    {
      icon: '🚚',
      title: 'Fast Delivery',
      description: 'Quick and efficient delivery to keep your seafood fresh and cold.',
    },
    {
      icon: '💰',
      title: 'Best Prices',
      description: 'Competitive pricing without compromising on quality or freshness.',
    },
  ]

  const trustBadges = [
    {
      icon: '🛡️',
      title: '100% Freshness Guarantee',
      description: 'If not satisfied, we replace or refund your order.',
    },
    {
      icon: '❄️',
      title: 'Cold Chain Delivery',
      description: 'Temperature-controlled delivery from source to your door.',
    },
    {
      icon: '✅',
      title: 'FSSAI Certified',
      description: 'Compliant with food safety regulations and standards.',
    },
    {
      icon: '🔄',
      title: 'Easy Returns',
      description: 'Hassle-free return policy for quality issues.',
    },
  ]

  return (
    <section id="why-us" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fadeInUp">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Why Choose Us?</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover what makes Kings Town Sea Food your perfect seafood partner.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div
              key={idx}
              style={{ animationDelay: `${idx * 0.1}s` }}
              className="animate-fadeInUp"
            >
              <FeatureCard {...feature} />
            </div>
          ))}
        </div>

        {/* Trust Badges Section */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">Our Guarantees</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We stand behind our products with comprehensive guarantees for your peace of mind.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trustBadges.map((badge, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-slate-50 to-white p-6 rounded-2xl border border-slate-200 text-center shadow-sm hover:shadow-md transition"
              >
                <div className="text-4xl mb-4">{badge.icon}</div>
                <h4 className="font-bold text-gray-800 mb-2">{badge.title}</h4>
                <p className="text-sm text-gray-600">{badge.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <a
            href="#contact"
            className="inline-block bg-ocean hover:bg-aqua text-white px-8 py-3 rounded-full font-bold transition transform hover:scale-105"
          >
            Start Your Order Today
          </a>
        </div>
      </div>
    </section>
  )
}
