import React, { useState } from 'react'
import { MapPin, Phone, Mail, MessageCircle, Send, CheckCircle2 } from 'lucide-react'

const contactInfo = [
  { icon: <Phone size={20} />,         label: 'Phone',    value: '+91 98586 64999',             href: 'tel:+919858664999' },
  { icon: <MessageCircle size={20} />, label: 'WhatsApp', value: '+91 98586 64999',             href: 'https://wa.me/919858664999' },
  { icon: <Mail size={20} />,          label: 'Email',    value: 'orders@kingstownseafood.com', href: 'mailto:orders@kingstownseafood.com' },
  { icon: <MapPin size={20} />,        label: 'Location', value: 'Bhimavaram, Andhra Pradesh',  href: null },
]

export default function Contact() {
  const [form, setForm]           = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Enquiry:', form)
    setSubmitted(true)
    setForm({ name: '', email: '', phone: '', subject: '', message: '' })
    setTimeout(() => setSubmitted(false), 4500)
  }

  return (
    <section id="contact" className="relative overflow-hidden" style={{ background: '#0B2638' }}>
      {/* Depth */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 right-1/4 w-80 h-80 rounded-full blur-3xl" style={{ background: 'rgba(8,127,140,0.08)' }} />
        <div className="absolute bottom-0 left-1/4 w-72 h-72 rounded-full blur-3xl" style={{ background: 'rgba(32,184,197,0.05)' }} />
      </div>
      <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, transparent, rgba(8,127,140,0.4), transparent)' }} aria-hidden="true" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">

        {/* Header */}
        <div className="text-center mb-14">
          <span
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold mb-5"
            style={{ background: 'rgba(8,127,140,0.15)', color: '#20B8C5', border: '1px solid rgba(32,184,197,0.25)' }}
          >
            <Send size={13} />
            Get In Touch
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight">
            Contact <span className="gradient-text-teal">Us</span>
          </h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color: 'rgba(221,243,239,0.55)' }}>
            Reach out for orders, bulk pricing, or any questions about our products.
          </p>
        </div>

        {/* Info strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-10">
          {contactInfo.map((info) => (
            <div
              key={info.label}
              className="rounded-2xl p-4 sm:p-5 text-center transition-all hover:-translate-y-0.5"
              style={{ background: 'rgba(8,127,140,0.1)', border: '1px solid rgba(8,127,140,0.2)' }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(32,184,197,0.4)')}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(8,127,140,0.2)')}
            >
              <div
                className="inline-flex h-11 w-11 items-center justify-center rounded-xl mb-3 mx-auto"
                style={{ background: '#087F8C', color: '#fff', boxShadow: '0 4px 16px -3px rgba(8,127,140,0.4)' }}
              >
                {info.icon}
              </div>
              <p className="text-[10px] font-black uppercase tracking-widest mb-1" style={{ color: '#20B8C5' }}>
                {info.label}
              </p>
              {info.href ? (
                <a
                  href={info.href}
                  className="text-xs sm:text-sm font-medium break-all leading-snug transition hover:text-white"
                  style={{ color: 'rgba(255,255,255,0.65)' }}
                  target={info.href.startsWith('http') ? '_blank' : undefined}
                  rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                >
                  {info.value}
                </a>
              ) : (
                <p className="text-xs sm:text-sm font-medium leading-snug" style={{ color: 'rgba(255,255,255,0.5)' }}>
                  {info.value}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Form + Map */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Form panel — white, clean */}
          <div className="rounded-3xl overflow-hidden shadow-2xl" style={{ background: '#fff', boxShadow: '0 20px 60px -10px rgba(0,0,0,0.4)' }}>
            {/* Header bar — teal, not gradient rainbow */}
            <div className="px-7 py-5" style={{ background: '#087F8C' }}>
              <h3 className="text-lg font-bold text-white">Send an Enquiry</h3>
              <p className="text-sm mt-0.5" style={{ color: 'rgba(221,243,239,0.8)' }}>We reply as soon as possible.</p>
            </div>

            <div className="p-6 sm:p-8">
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-12 gap-4">
                  <CheckCircle2 size={52} style={{ color: '#087F8C' }} />
                  <p className="font-bold text-lg text-center" style={{ color: '#087F8C' }}>Enquiry received!</p>
                  <p className="text-sm text-center" style={{ color: '#5A6E7A' }}>We'll get back to you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="c-name" className="block text-sm font-bold mb-1.5" style={{ color: '#374151' }}>
                        Name <span style={{ color: '#E8783A' }}>*</span>
                      </label>
                      <input id="c-name" type="text" name="name" value={form.name} onChange={handleChange} required
                        className="w-full px-4 py-2.5 rounded-xl text-sm transition-all focus:outline-none"
                        style={{ border: '2px solid #EDE3D2', background: '#FAF7F0' }}
                        onFocus={(e) => (e.target.style.borderColor = '#087F8C')}
                        onBlur={(e) => (e.target.style.borderColor = '#EDE3D2')}
                        placeholder="Your name" />
                    </div>
                    <div>
                      <label htmlFor="c-phone" className="block text-sm font-bold mb-1.5" style={{ color: '#374151' }}>Phone</label>
                      <input id="c-phone" type="tel" name="phone" value={form.phone} onChange={handleChange}
                        className="w-full px-4 py-2.5 rounded-xl text-sm transition-all focus:outline-none"
                        style={{ border: '2px solid #EDE3D2', background: '#FAF7F0' }}
                        onFocus={(e) => (e.target.style.borderColor = '#087F8C')}
                        onBlur={(e) => (e.target.style.borderColor = '#EDE3D2')}
                        placeholder="Phone number" />
                    </div>
                  </div>

                  {[
                    { id: 'c-email', type: 'email',  name: 'email',   label: 'Email',   req: true,  ph: 'your@email.com' },
                    { id: 'c-subject', type: 'text', name: 'subject', label: 'Subject', req: true,  ph: 'Order enquiry / Bulk pricing / Other' },
                  ].map((f) => (
                    <div key={f.id}>
                      <label htmlFor={f.id} className="block text-sm font-bold mb-1.5" style={{ color: '#374151' }}>
                        {f.label} {f.req && <span style={{ color: '#E8783A' }}>*</span>}
                      </label>
                      <input id={f.id} type={f.type} name={f.name} value={form[f.name]} onChange={handleChange} required={f.req}
                        className="w-full px-4 py-2.5 rounded-xl text-sm transition-all focus:outline-none"
                        style={{ border: '2px solid #EDE3D2', background: '#FAF7F0' }}
                        onFocus={(e) => (e.target.style.borderColor = '#087F8C')}
                        onBlur={(e) => (e.target.style.borderColor = '#EDE3D2')}
                        placeholder={f.ph} />
                    </div>
                  ))}

                  <div>
                    <label htmlFor="c-message" className="block text-sm font-bold mb-1.5" style={{ color: '#374151' }}>
                      Message <span style={{ color: '#E8783A' }}>*</span>
                    </label>
                    <textarea id="c-message" name="message" value={form.message} onChange={handleChange} required rows={4}
                      className="w-full px-4 py-2.5 rounded-xl text-sm transition-all focus:outline-none resize-none"
                      style={{ border: '2px solid #EDE3D2', background: '#FAF7F0' }}
                      onFocus={(e) => (e.target.style.borderColor = '#087F8C')}
                      onBlur={(e) => (e.target.style.borderColor = '#EDE3D2')}
                      placeholder="Tell us what you need..." />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 text-white transition-all hover:-translate-y-0.5 shadow-lg"
                    style={{ background: '#087F8C', boxShadow: '0 6px 22px -4px rgba(8,127,140,0.4)' }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = '#0A9BA9')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = '#087F8C')}
                  >
                    <Send size={15} />
                    Send Message
                  </button>

                  <p className="text-xs text-center" style={{ color: '#8A9BA6' }}>
                    For immediate orders:{' '}
                    <a href="https://wa.me/919858664999" className="font-bold hover:underline" style={{ color: '#2F7A5E' }}
                      target="_blank" rel="noopener noreferrer">WhatsApp us</a>
                  </p>
                </form>
              )}
            </div>
          </div>

          {/* Map */}
          <div className="rounded-3xl overflow-hidden min-h-[400px]"
            style={{ border: '1.5px solid rgba(8,127,140,0.2)', boxShadow: '0 20px 60px -10px rgba(0,0,0,0.35)' }}>
            <iframe
              title="Kingstown Sea Food — Bhimavaram, Andhra Pradesh"
              width="100%" height="100%"
              style={{ minHeight: '420px', border: 0, display: 'block' }}
              loading="lazy" allowFullScreen referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30674.77!2d81.5213!3d16.5449!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a37b2f6b8c1a6c7%3A0x4c5f5e1c5e2f8d9a!2sBhimavaram%2C%20Andhra%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
