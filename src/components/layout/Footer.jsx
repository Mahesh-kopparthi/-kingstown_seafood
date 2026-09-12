import React from 'react'
import { MapPin, Phone, Mail, Facebook, Instagram } from 'lucide-react'
import { asset } from '../../utils/assets'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer style={{ background: '#0B2638', borderTop: '1px solid rgba(8,127,140,0.2)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div
                className="w-11 h-11 rounded-xl overflow-hidden flex-shrink-0 shadow-md"
                style={{ border: '2px solid rgba(32,184,197,0.28)', background: 'rgba(255,255,255,0.06)' }}
              >
                <img src={asset('/images/mainlogo.png')} alt="Kingstown Sea Food" className="h-full w-full object-cover" />
              </div>
              <div>
                <p className="font-bold text-white leading-tight">Kingstown Sea Food</p>
                <p className="text-[11px] font-medium tracking-widest uppercase" style={{ color: '#20B8C5' }}>
                  Premium Seafood
                </p>
              </div>
            </div>
            <p className="text-[13px] leading-relaxed mb-5" style={{ color: 'rgba(221,243,239,0.45)' }}>
              Farm-fresh prawns and fish sourced from trusted aquaculture farms in
              Bhimavaram, Andhra Pradesh.
            </p>
            <div className="flex gap-3">
              {[
                { Icon: Facebook, label: 'Facebook' },
                { Icon: Instagram, label: 'Instagram' },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  className="w-9 h-9 flex items-center justify-center rounded-full transition hover:-translate-y-0.5"
                  style={{ background: 'rgba(8,127,140,0.2)', border: '1px solid rgba(32,184,197,0.15)', color: '#fff' }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = '#087F8C')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(8,127,140,0.2)')}
                  aria-label={label}
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-white mb-5">Quick Links</h4>
            <ul className="space-y-2.5">
              {[['Home','#home'],['Products','#products'],['About Us','#about'],['Gallery','#gallery'],['Contact','#contact']].map(([label, href]) => (
                <li key={label}>
                  <a
                    href={href}
                    className="text-sm flex items-center gap-1.5 transition hover:text-white"
                    style={{ color: 'rgba(221,243,239,0.45)' }}
                  >
                    <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: '#087F8C' }} />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-white mb-5">Our Products</h4>
            <ul className="space-y-2.5">
              {['Vannamei Prawns','Tiger Prawns','Dry Prawns','Rohu Fish','Murrel (Korameenu)'].map((name) => (
                <li key={name}>
                  <a
                    href="#products"
                    className="text-sm flex items-center gap-1.5 transition hover:text-white"
                    style={{ color: 'rgba(221,243,239,0.45)' }}
                  >
                    <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: '#20B8C5' }} />
                    {name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-white mb-5">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2.5">
                <Phone size={13} style={{ color: '#20B8C5', flexShrink: 0 }} />
                <a href="tel:+919858664999" className="text-sm transition hover:text-white" style={{ color: 'rgba(221,243,239,0.5)' }}>
                  +91 98586 64999
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={13} style={{ color: '#20B8C5', flexShrink: 0 }} />
                <a href="mailto:orders@kingstownseafood.com" className="text-sm transition hover:text-white break-all" style={{ color: 'rgba(221,243,239,0.5)' }}>
                  orders@kingstownseafood.com
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin size={13} style={{ color: '#20B8C5', flexShrink: 0, marginTop: 2 }} />
                <span className="text-sm" style={{ color: 'rgba(221,243,239,0.5)' }}>
                  Bhimavaram, Andhra Pradesh, India
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div
          className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs"
          style={{ borderTop: '1px solid rgba(8,127,140,0.15)', color: 'rgba(221,243,239,0.3)' }}
        >
          <p>© {year} Kingstown Sea Food. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#087F8C' }} />
            Farm Fresh · Bhimavaram, Andhra Pradesh
          </p>
        </div>
      </div>
    </footer>
  )
}
