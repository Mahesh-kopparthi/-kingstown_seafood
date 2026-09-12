import { asset } from '../utils/assets'

export const productDetails = {
  'vannamei-prawns': {
    id: 'vannamei-prawns',
    name: 'Vannamei Prawns',
    category: 'Prawns',
    source: 'Farm Sourced',
    image: asset('/images/prawns-vanamei.jpg'),
    description:
      'Fresh Vannamei Prawns sourced from trusted aquaculture farms in Bhimavaram. Processed and packed daily under hygienic conditions and delivered fresh to your door.',
    badges: ['Farm Fresh', 'Freshly Sourced', 'Bhimavaram'],
    specs: {
      Species: 'Litopenaeus vannamei',
      Origin: 'Aquaculture farms, Bhimavaram region',
      Source: 'Farm / Pond Sourced',
      'Processing Type': 'Hygienically cleaned, chilled and packed',
      'Available Sizes': '20/30, 30/40, 40/50, 50/60, 60/70, 70/90, 90/120',
      'Shelf Life': '3–5 days chilled',
      Storage: '0–4°C chilled storage',
      Packaging: 'Food-grade insulated cartons',
      Delivery: 'Same-day dispatch for fresh retail and bulk orders',
    },
    sizes: [
      { size: '20/30', availability: 'Freshly available', approxCount: '20–25 pieces per Kg', price: 890 },
      { size: '30/40', availability: 'Freshly available', approxCount: '30–35 pieces per Kg', price: 820 },
      { size: '40/50', availability: 'Freshly available', approxCount: '40–45 pieces per Kg', price: 760 },
      { size: '50/60', availability: 'Limited fresh stock', approxCount: '50–55 pieces per Kg', price: 680 },
      { size: '60/70', availability: 'Freshly available', approxCount: '60–70 pieces per Kg', price: 620 },
      { size: '70/90', availability: 'Freshly available', approxCount: '70–90 pieces per Kg', price: 560 },
      { size: '90/120', availability: 'Freshly available', approxCount: '90–120 pieces per Kg', price: 510 },
    ],
    whyChoose: [
      { title: 'Farm Sourced', description: 'Sourced directly from trusted aquaculture farms in Bhimavaram.' },
      { title: 'Fresh Daily', description: 'Processed and packed with strict freshness standards every day.' },
      { title: 'Premium Quality', description: 'Selected for firm texture and excellent taste.' },
      { title: 'Hygienic Packing', description: 'Handled in clean, food-safe facilities for every order.' },
      { title: 'Retail & Bulk', description: 'Available for small household orders and large event supply.' },
      { title: 'Reliable Delivery', description: 'Secure delivery with freshness preserved throughout.' },
    ],
    reviews: [
      { name: 'Ravi Kumar',    role: 'Restaurant Owner', rating: 5, text: 'Excellent quality and consistent freshness. Our customers notice the difference immediately.' },
      { name: 'Priya Sharma',  role: 'Home Chef',         rating: 5, text: 'The prawns are always fresh and the sizing is accurate. Will keep ordering.' },
      { name: 'Daniel Brooks', role: 'Wholesale Distributor', rating: 5, text: 'Great pricing, fast delivery, and the product quality is consistently strong.' },
    ],
    related: [
      { id: 'tiger-prawns', name: 'Tiger Prawns', image: asset('/images/tiger-prawns.jpg') },
      { id: 'dry-prawns',   name: 'Dry Prawns',   image: asset('/images/dry-prawns.jpg') },
    ],
  },

  'tiger-prawns': {
    id: 'tiger-prawns',
    name: 'Tiger Prawns',
    category: 'Prawns',
    source: 'Farm Sourced',
    image: asset('/images/tiger-prawns.jpg'),
    description:
      'Rich in flavor and premium in texture, Tiger Prawns are sourced from trusted farms and are ideal for restaurants, hotels, and upscale seafood orders.',
    badges: ['Farm Fresh', 'Premium', 'Bhimavaram'],
    specs: {
      Species: 'Penaeus monodon',
      Origin: 'Aquaculture farms, Bhimavaram region',
      Source: 'Farm / Pond Sourced',
      'Processing Type': 'Headless or Shell-On, hygienically packed',
      'Available Sizes': 'U/10, 10/20, 20/30, 30/40',
      'Shelf Life': '3–5 days chilled',
      Storage: '0–4°C chilled storage',
      Packaging: 'Food-grade trays and insulated boxes',
      Delivery: 'Fresh dispatch for retail and bulk requirements',
    },
    sizes: [
      { size: 'U/10',  availability: 'Freshly available',  approxCount: '8–10 pieces per Kg',  price: 1250 },
      { size: '10/20', availability: 'Freshly available',  approxCount: '10–20 pieces per Kg', price: 1050 },
      { size: '20/30', availability: 'Freshly available',  approxCount: '20–30 pieces per Kg', price: 930  },
      { size: '30/40', availability: 'Limited fresh stock', approxCount: '30–40 pieces per Kg', price: 820  },
    ],
    whyChoose: [
      { title: 'Farm Sourced',    description: 'Sourced from trusted aquaculture farms for consistent quality.' },
      { title: 'Premium Texture', description: 'Ideal for premium culinary presentations and upscale menus.' },
      { title: 'Fresh Processing',description: 'Delivered with consistent quality standards every batch.' },
      { title: 'Hygienic Packing',description: 'Handled under clean processing conditions.' },
      { title: 'Retail & Bulk',   description: 'Perfect for restaurants, hotels, and events.' },
    ],
    reviews: [
      { name: 'Mina Patel',   role: 'Chef',    rating: 5, text: 'The size and flavor are excellent. It has become a staple for our menu.' },
      { name: 'Suresh Reddy', role: 'Caterer', rating: 5, text: 'Consistent quality every time. My clients always appreciate the freshness.' },
    ],
    related: [
      { id: 'vannamei-prawns', name: 'Vannamei Prawns', image: asset('/images/prawns-vanamei.jpg') },
      { id: 'dry-prawns',      name: 'Dry Prawns',      image: asset('/images/dry-prawns.jpg') },
    ],
  },

  'dry-prawns': {
    id: 'dry-prawns',
    name: 'Dry Prawns',
    category: 'Prawns',
    source: 'Coastal Sourced',
    image: asset('/images/dry-prawns.jpg'),
    description:
      'Carefully processed dry prawns with rich concentrated flavor, ideal for traditional dishes, spice blends, chutneys, and wholesale orders.',
    badges: ['Quality Checked', 'Long Shelf Life', 'Hygienic Packing'],
    specs: {
      Type: 'Dried prawns',
      Origin: 'Selected coastal sources near Bhimavaram',
      'Processing Type': 'Sun-dried / machine-dried after fresh cleaning',
      'Available Sizes': 'Small / Medium / Large',
      'Shelf Life': '6–12 months in dry storage',
      Storage: 'Store in a cool, dry place',
      Packaging: 'Vacuum-sealed and bulk-ready packing',
      Delivery: 'Available for retail and bulk supply',
    },
    sizes: [
      { size: 'Small',  availability: 'Available',      approxCount: '40–50 pieces per Kg', price: 950  },
      { size: 'Medium', availability: 'Available',      approxCount: '30–40 pieces per Kg', price: 1150 },
      { size: 'Large',  availability: 'Limited stock',  approxCount: '20–30 pieces per Kg', price: 1350 },
    ],
    whyChoose: [
      { title: 'Rich Flavor',       description: 'Concentrated natural flavor perfect for traditional cooking.' },
      { title: 'Long Shelf Life',   description: 'Easy to store and distribute without refrigeration.' },
      { title: 'Hygienic Processing', description: 'Clean and hygienic drying methods used throughout.' },
      { title: 'Wholesale Ready',   description: 'Available in bulk quantities for distributors and retailers.' },
    ],
    reviews: [
      { name: 'Anitha Rao',  role: 'Home Cook',      rating: 5, text: 'The best dry prawns I have found. Rich flavor and very clean product.' },
      { name: 'Vinod Naidu', role: 'Wholesale Buyer', rating: 5, text: 'Consistent quality and good packaging for bulk orders.' },
    ],
    related: [
      { id: 'vannamei-prawns', name: 'Vannamei Prawns', image: asset('/images/prawns-vanamei.jpg') },
      { id: 'tiger-prawns',    name: 'Tiger Prawns',    image: asset('/images/tiger-prawns.jpg') },
    ],
  },

  'rohu-fish': {
    id: 'rohu-fish',
    name: 'Rohu Fish',
    category: 'Fish',
    source: 'Farm Sourced',
    image: asset('/images/The-Rohu-fish.jpg'),
    description:
      'Fresh Rohu (Labeo rohita), a popular freshwater fish sourced from local aquaculture farms. Known for its mild flavor and firm texture, ideal for curries and fry dishes.',
    badges: ['Farm Fresh', 'Freshwater Fish', 'Bhimavaram'],
    specs: {
      Species: 'Labeo rohita (Rohu)',
      Origin: 'Freshwater aquaculture farms, Bhimavaram region',
      Source: 'Farm / Pond Sourced',
      'Processing Type': 'Whole or cut, hygienically cleaned and packed',
      'Available Weight': '500g, 1 Kg, 2 Kg',
      'Shelf Life': '2–3 days chilled',
      Storage: '0–4°C chilled storage',
      Packaging: 'Food-grade sealed packaging',
      Delivery: 'Fresh dispatch for retail orders',
    },
    sizes: [
      { size: '500g', availability: 'Available', approxCount: '1 fish approx',     price: 75  },
      { size: '1 Kg', availability: 'Available', approxCount: '1–2 fish approx',   price: 140 },
      { size: '2 Kg', availability: 'Available', approxCount: '2–3 fish approx',   price: 270 },
    ],
    whyChoose: [
      { title: 'Farm Sourced',    description: 'Raised in clean freshwater ponds with proper aquaculture practices.' },
      { title: 'Mild & Versatile',description: 'Excellent for curries, fry preparations, and traditional recipes.' },
      { title: 'Fresh Daily',     description: 'Sourced and dispatched fresh to preserve natural taste.' },
      { title: 'Hygienic Handling',description: 'Cleaned and packed under hygienic conditions.' },
    ],
    reviews: [
      { name: 'Lakshmi Devi', role: 'Home Cook', rating: 5, text: 'Very fresh fish, great for curry. Will order again.' },
    ],
    related: [
      { id: 'vannamei-prawns', name: 'Vannamei Prawns', image: asset('/images/prawns-vanamei.jpg') },
      { id: 'tiger-prawns',    name: 'Tiger Prawns',    image: asset('/images/tiger-prawns.jpg') },
    ],
  },
}
