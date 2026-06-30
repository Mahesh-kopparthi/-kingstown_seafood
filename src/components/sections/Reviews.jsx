import React from 'react'
import ReviewCard from '../common/ReviewCard'

export default function Reviews() {
  const reviews = [
    {
      name: 'Sarah Johnson',
      role: 'Home Chef',
      content: 'The freshness of their seafood is unmatched. Every product arrived in perfect condition.',
      rating: 5,
    },
    {
      name: 'Michael Chen',
      role: 'Restaurant Owner',
      content: 'Excellent quality and consistent service. My customers love the premium taste.',
      rating: 5,
    },
    {
      name: 'Emma Williams',
      role: 'Food Blogger',
      content: 'Kings Town delivers premium quality at reasonable prices. Highly recommended!',
      rating: 5,
    },
    {
      name: 'David Martinez',
      role: 'Caterer',
      content: 'Professional service and incredibly fresh products. Perfect for events.',
      rating: 5,
    },
    {
      name: 'Lisa Anderson',
      role: 'Home Cook',
      content: 'Best seafood I\'ve purchased online. Fast delivery and excellent customer service.',
      rating: 5,
    },
    {
      name: 'James Wilson',
      role: 'Seafood Enthusiast',
      content: 'The variety and quality are outstanding. Will definitely order again!',
      rating: 5,
    },
  ]

  return (
    <section id="reviews" className="py-20 bg-sand">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fadeInUp">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Customer Reviews</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            See what our satisfied customers have to say about our services.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, idx) => (
            <div
              key={idx}
              style={{ animationDelay: `${idx * 0.1}s` }}
              className="animate-fadeInUp"
            >
              <ReviewCard {...review} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
