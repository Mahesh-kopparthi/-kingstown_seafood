import { asset } from '../utils/assets'

export const productCategories = [
  {
    id: 'prawns',
    title: 'Prawns',
    image: asset('/images/prawns.jpg'),
    summary: 'Farm-fresh prawns sourced from trusted aquaculture ponds in Bhimavaram.',
    items: [
      {
        id: 'vannamei-prawns',
        name: 'Vannamei Prawns',
        image: asset('/images/prawns-vanamei (2).jpg'),
        priceRange: '₹510–890/kg',
        badge: 'Best Seller',
        source: 'Farm Sourced',
      },
      {
        id: 'tiger-prawns',
        name: 'Tiger Prawns',
        image: asset('/images/tiger-prawns.jpg'),
        priceRange: '₹820–1250/kg',
        badge: 'Premium',
        source: 'Farm Sourced',
      },
      {
        id: 'dry-prawns',
        name: 'Dry Prawns',
        image: asset('/images/dry-prawns.jpg'),
        priceRange: '₹950–1350/kg',
        badge: 'Traditional',
        source: 'Coastal Sourced',
      },
    ],
  },
  {
    id: 'fish',
    title: 'Fish',
    image: asset('/images/fishes.jpg'),
    summary: 'Fresh fish varieties from local farms and trusted suppliers.',
    items: [
      {
        id: 'rohu-fish',
        name: 'Rohu Fish',
        image: asset('/images/The-Rohu-fish.jpg'),
        priceRange: '₹100–150/kg',
        badge: 'Farm Fresh',
        source: 'Farm Sourced',
      },
      {
        id: 'murrel-fish',
        name: 'Murrel (Korameenu)',
        image: asset('/images/murrel-koramenu-fish.jpg'),
        priceRange: 'Coming Soon',
        badge: 'Coming Soon',
        source: 'Farm Sourced',
      },
      {
        id: 'thullu-fish',
        name: 'Thullu Fish',
        image: asset('/images/Thullu-fish.jpg'),
        priceRange: 'Coming Soon',
        badge: 'Coming Soon',
        source: 'Farm Sourced',
      },
    ],
  },
]
