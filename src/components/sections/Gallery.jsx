import React from 'react'

export default function Gallery() {
  const images = [
    { src: '/images/prawns-vanamei.jpg', title: 'Vannamei Prawns' },
    { src: '/images/tiger-prawns.jpg', title: 'Tiger Prawns' },
    { src: '/images/dry-prawns.jpg', title: 'Dry Prawns' },
    { src: '/images/fishes.jpg', title: 'Fresh Fish Selection' },
    { src: '/images/The-Rohu-fish.jpg', title: 'Rohu Fish' },
    { src: '/images/Thullu-fish.jpg', title: 'Fresh Catch' },
  ]

  return (
    <section id="gallery" className="py-20 bg-[#f4faff]">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-16 animate-fadeInUp">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Gallery</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Explore premium seafood imagery from our daily fresh collections and seafood sourcing.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((item) => (
            <a
              key={item.src}
              href={item.src}
              target="_blank"
              rel="noreferrer"
              className="group overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-lg transition hover:-translate-y-1 hover:shadow-2xl"
            >
              <div className="relative h-72 overflow-hidden">
                <img
                  src={item.src}
                  alt={item.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="p-5">
                <h3 className="text-xl font-semibold text-gray-900">{item.title}</h3>
                <p className="mt-2 text-sm text-gray-500">Click to view full image and discover our premium seafood quality.</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
