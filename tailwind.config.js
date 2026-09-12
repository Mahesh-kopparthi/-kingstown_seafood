/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        /* ── Exact specified palette ── */
        navy:     '#0B2638',  // primary dark — header, footer, dark sections
        teal:     '#087F8C',  // primary brand/accent — buttons, links, interactive
        aqua:     '#20B8C5',  // secondary highlight — use sparingly
        cream:    '#FAF7F0',  // primary light background
        sand:     '#EDE3D2',  // subtle bg sections, borders
        seafoam:  '#DDF3EF',  // light accent — freshness sections
        charcoal: '#17232B',  // primary text on light backgrounds
        coral:    '#E8783A',  // warm CTA accent — very sparingly
        /* Legacy aliases so existing className="text-ocean" etc still work */
        ocean:    '#087F8C',
        deep:     '#0B2638',
        /* Used in a few CSS utilities */
        navyMid:  '#0D3045',  // slightly lighter navy for cards on dark
        navyCard: '#112F45',  // card bg on dark sections
        sandDark: '#D4C4A8',  // darker sand for borders
      },
      animation: {
        fadeInUp:  'fadeInUp 0.65s ease-out both',
        fadeIn:    'fadeIn 0.5s ease-out both',
        slideIn:   'slideIn 0.45s ease-out both',
        pulseSoft: 'pulseSoft 2.4s ease-in-out infinite',
        bubbleUp:  'bubbleUp var(--dur,3s) ease-in var(--delay,0s) infinite',
      },
      keyframes: {
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(22px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        slideIn: {
          from: { opacity: '0', transform: 'translateX(-18px)' },
          to:   { opacity: '1', transform: 'translateX(0)' },
        },
        pulseSoft: {
          '0%,100%': { opacity: '0.6' },
          '50%':     { opacity: '1' },
        },
        bubbleUp: {
          '0%':   { transform: 'translateY(0) scale(1)', opacity: '0.5' },
          '100%': { transform: 'translateY(-110px) scale(0.3)', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}
