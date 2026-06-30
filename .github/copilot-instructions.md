# Kings Town Sea Food - Copilot Instructions

## Project Overview
Modern, responsive React + Tailwind CSS website for a premium seafood business. Single-page application with smooth scrolling navigation and mobile-first responsive design.

**Stack**: React 18 + Vite + Tailwind CSS + Lucide Icons

## Architecture & Structure
```
src/
├── components/
│   ├── layout/          # Header, Footer - persistent UI wrapper
│   ├── sections/        # Page sections: Hero, About, Products, Gallery, etc.
│   └── common/          # Reusable cards: ProductCard, ReviewCard, FeatureCard, WhatsAppButton
├── App.jsx              # Main component composing all sections in order
├── index.css            # Global styles + custom Tailwind utilities
└── main.jsx            # React entry point
```

**Key Patterns**:
- **Section-based architecture**: Each website section is an independent, self-contained component
- **Reusable card components**: ProductCard, ReviewCard, FeatureCard accept data as props
- **Responsive grid layout**: All sections use responsive grid (1 col mobile → 2-3 cols tablet/desktop)
- **Smooth animations**: CSS animations (fadeInUp, float, slideIn) defined in tailwind.config.js

## Development Commands
- `npm install` - Install dependencies (React, Tailwind, Lucide, Vite)
- `npm run dev` - Start dev server on http://localhost:3000 (auto-opens browser)
- `npm run build` - Production build to `dist/` folder
- `npm run preview` - Preview production build locally

## Color Scheme & Styling
**Tailwind Config Colors** (in `tailwind.config.js`):
- `ocean` (#0077be) - Primary brand blue
- `aqua` (#00a8e8) - Secondary accent
- `teal` (#00c9ff) - Light accent
- `sand` (#f5f5f0) - Light background

**Custom Classes** (in `index.css`):
- `.gradient-ocean` - Blue gradient background
- `.gradient-text` - Text with blue-to-teal gradient
- `.card-hover` - Scale + shadow on hover
- `.glass-effect` - Frosted glass effect (unused, for future enhancements)

## Component Data Patterns
Components receive data as **props using object spread**:
```jsx
// Products/ProductCard
<ProductCard image="🐟" title="Fresh Fish" description="..." price="$12-18/lb" />

// Reviews/ReviewCard  
<ReviewCard name="John" role="Chef" content="Great!" rating={5} />

// WhyChooseUs/FeatureCard
<FeatureCard icon="⚡" title="Fresh Daily" description="..." />
```

## Mobile Responsiveness
- **Header**: Hamburger menu on mobile (hidden md:flex), full nav on desktop
- **Grids**: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` pattern throughout
- **Typography**: Responsive sizes (text-4xl md:text-5xl)
- **Spacing**: Consistent px-4 md:px-8 padding pattern
- **WhatsApp button**: Appears only after scroll (display: fixed, z-index: 40)

## Navigation & Sections
All sections use **id-based smooth scrolling**:
- `#home` → Hero
- `#about` → About Us
- `#products` → Seafood Products
- `#gallery` → Gallery
- `#why-us` → Why Choose Us
- `#reviews` → Customer Reviews
- `#contact` → Contact Form + Maps

**Header/Footer** include navigation links to all sections.

## Form Handling
Contact form (`Contact.jsx`) uses **local React state**:
- `useState` for form fields (name, email, phone, subject, message)
- `handleChange` captures input updates
- `handleSubmit` prevents default, logs data (replace with API call if needed)
- Success message displays for 3 seconds after submission

## Customization Points
1. **Phone/Email/Address**: Update in Footer.jsx and Contact.jsx
2. **Product catalog**: Modify products array in Products.jsx
3. **Gallery images**: Replace emoji/alt text in Gallery.jsx
4. **Testimonials**: Edit reviews array in Reviews.jsx
5. **WhatsApp link**: Update `href="https://wa.me/1234567890"` in WhatsAppButton.jsx
6. **Google Maps**: Update iframe `src` URL in Contact.jsx

## Animation Framework
- **Keyframes** defined in tailwind.config.js: fadeInUp, float, slideIn
- **Applied via classes**: `animate-fadeInUp`, `animate-float`, `animate-slideIn`
- **Stagger effect**: Use `style={{ animationDelay: \`${idx * 0.1}s\` }}` on grid items

## Important Notes
- **Emoji placeholders**: Images use Unicode emojis instead of image files (reduce complexity, fast loading)
- **No external APIs**: Form submission only logs to console; integrate backend as needed
- **Tailwind JIT**: All styles compiled on-the-fly; unused styles removed in production
- **Lucide icons**: Used only for Header/Footer/Contact (Phone, Mail, MapPin, etc.)

## Common Tasks
**Add a new section**: 
1. Create component in `src/components/sections/NewSection.jsx`
2. Import in `App.jsx` and insert in correct order
3. Add id for navigation (e.g., `id="new-section"`)
4. Add link in Header.jsx navLinks array

**Modify styling**: Edit Tailwind classes directly in JSX or add custom CSS to `index.css`

**Responsive fixes**: Use md: and lg: prefixes (mobile-first); test at 375px (mobile) and 1024px (desktop)
